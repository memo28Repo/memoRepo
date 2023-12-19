/*
 * @Author: 邱狮杰
 * @Date: 2023-01-27 11:49:34
 * @LastEditTime: 2023-12-19 16:56:08
 * @Description:
 * @FilePath: /memo/vite/viteBuild/src/core/engine.ts
 */
import { PluginOption, UserConfigExport } from "vite";
import { Inspect, inspectOptions } from "../plugin/inspect";
import {
  ConfigureReactTechnologyStack,
  ConfigureTechnologyStack, ConfigureTechnologyStackUniApp,
  ConfigureVueTechnologyStack,
  injectDefaultTechnologyStackConfiguration,
  technologyStackTypes
} from "./configureTechnologyStack";
import injection from "./injection";
import { PlugInContainer } from "./plugInContainer";

class TechnologyStackDoesNotExist extends Error {
  constructor(private msg: string) {
    super(msg)
  }
}

/**
 *
 * 自带了 `vue` 和 `react` 的默认配置 和一些公共的通用插件
 *
 * @example
 * `vue` 默认配置
 *   - `jsx`
 *   - `legacy`
 *   - `printURL`
 *   - `vueMarcos`
 *
 * `react` 默认配置
 *   - `legacy`
 *   - `reactSwc`
 *   - `printURL`
 *
 *
 *
 * ```ts
 * new Engine()
 *  启动`vue`默认配置
 * .setTechnologyStack('vue')
 *  //  添加常用插件
 * .addPlugins(plugin => {    plugin.addAutoHooks()  })
 * .getBuildConfig({
 *  //   `vite` 配置
 *    root:''
 * })
 * ```
 *
 * @public
 *
 */
@injectDefaultTechnologyStackConfiguration({
  defaultModule: [ConfigureVueTechnologyStack, ConfigureReactTechnologyStack, ConfigureTechnologyStackUniApp]
})
export class Engine {
  private technology: ConfigureTechnologyStack = "";
  private pluginList: PluginOption[] = [];

  /**
   *  选择技术栈 注入默认插件
   *
   *  @public
   */
  setTechnologyStack<T extends ConfigureTechnologyStack = ConfigureTechnologyStack>(technology: T): this {
    this.technology = technology as ConfigureTechnologyStack;
    // @ts-ignore
    const defaultModule = injection.getValue<technologyStackTypes>(Engine, "defaultModule").get(this.technology);
    if (!defaultModule) {
      throw new TechnologyStackDoesNotExist(`未配置该技术栈 -> (${this.technology})`)
    }
    this.pluginList.push(Reflect.construct(defaultModule, []).initDefaultPlugin());
    return this;
  }

  /**
   * 添加插件
   *
   * @public
   */
  addPlugins(cb?: (container: Omit<PlugInContainer, "getPlugInContainerList">) => void) {
    const plugInContainer = new PlugInContainer();
    cb?.(plugInContainer);
    this.pluginList.push(plugInContainer.getPlugInContainerList());
    return this;
  }


  /**
   *
   * 打开调试模式
   *
   * @public
   */
  debugger(opt?: Partial<inspectOptions>) {
    this.pluginList.push(new Inspect().readConfiguration(opt).getPlugin());
    return this;
  }


  /**
   * 获取配置
   *
   * @public
   */
  getBuildConfig(config?: UserConfigExport): UserConfigExport {
    const userConfigPlugin = Reflect.get(config || {}, "plugins") || [];
    const plugins = [this.pluginList, ...userConfigPlugin]

    if (!this.technology.trim().length) {
      throw new TechnologyStackDoesNotExist("请调用 setTechnologyStack 函数 指定技术栈")
    }

    return {
      ...config,
      plugins
    };
  }
}
