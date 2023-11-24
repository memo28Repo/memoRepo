/*
 * @Author: 邱狮杰
 * @Date: 2023-01-27 11:49:34
 * @LastEditTime: 2023-04-14 23:09:44
 * @Description:
 * @FilePath: /memo/packages/viteBuild/src/core/engine.ts
 */
import { PluginOption, UserConfigExport } from "vite";
import {
  ConfigureReactTechnologyStack,
  ConfigureTechnologyStack, ConfigureTechnologyStackUniApp,
  ConfigureVueTechnologyStack,
  injectDefaultTechnologyStackConfiguration,
  technologyStackTypes
} from "./configureTechnologyStack";
import injection from "./injection";
import { PlugInContainer } from "./plugInContainer";
import { Inspect, inspectOptions } from "../plugin/inspect";

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
  defaultModule: [new ConfigureVueTechnologyStack(), new ConfigureReactTechnologyStack(), new ConfigureTechnologyStackUniApp()]
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
    this.pluginList.push(defaultModule);
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

    return {
      ...config,
      plugins: [this.pluginList, ...userConfigPlugin]
    };
  }
}
