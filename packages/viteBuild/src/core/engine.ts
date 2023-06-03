/*
 * @Author: 邱狮杰
 * @Date: 2023-01-27 11:49:34
 * @LastEditTime: 2023-04-14 23:09:44
 * @Description:
 * @FilePath: /memo/packages/viteBuild/src/core/engine.ts
 */
import { ConfigureTechnologyStack, technologyStackTypes, ConfigureReactTechnologyStack, ConfigureVueTechnologyStack, injectDefaultTechnologyStackConfiguration } from './configureTechnologyStack'
import { UserConfigExport, PluginOption } from 'vite'
import { PlugInContainer } from './plugInContainer'
import injection from './injection'

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
  defaultModule: [new ConfigureVueTechnologyStack(), new ConfigureReactTechnologyStack()],
})
export class Engine {
  private technology: ConfigureTechnologyStack = ''
  private pluginList: PluginOption[] = []
  /**
   *  @description 选择技术栈 注入默认插件
   */
  setTechnologyStack<T extends ConfigureTechnologyStack = ConfigureTechnologyStack>(technology: T): this {
    this.technology = technology
    const defaultModule = injection.getValue<technologyStackTypes>(Engine, 'defaultModule').get(this.technology)
    this.pluginList.push(defaultModule)
    return this
  }

  /**
   * @description 添加插件
   */
  addPlugins(cb?: (container: Omit<PlugInContainer, 'getPlugInContainerList'>) => void) {
    const plugInContainer = new PlugInContainer()
    cb?.(plugInContainer)
    this.pluginList.push(plugInContainer.getPlugInContainerList())
    return this
  }

  /**
   * @description 获取配置
   */
  getBuildConfig(config?: UserConfigExport): UserConfigExport {
    const userConfigPlugin = Reflect.get(config || {}, 'plugins') || []

    return {
      ...config,
      plugins: [this.pluginList, ...userConfigPlugin],
    }
  }
}

new Engine()
  .setTechnologyStack('vue')
  .addPlugins(plugin => {
    plugin.addAutoHooks()
  })
  .getBuildConfig()
