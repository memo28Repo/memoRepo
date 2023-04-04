/*
 * @Author: 邱狮杰
 * @Date: 2023-01-28 11:45:50
 * @LastEditTime: 2023-04-04 10:52:36
 * @Description: 插件容器
 * @FilePath: /memo/packages/viteBuild/src/core/plugInContainer.ts
 */
import { PluginOption } from 'vite'
import { Alias, AliasOpt } from '../plugin/alias'
import { AutoHooks, AutoHooksOpt } from '../plugin/autoHooks'
import { BrowserSync, BrowserSyncOpt } from '../plugin/browserSync'
import { vitePluginMetaOpt, vitePluginMete } from '../plugin/meta'
import { Pwa, PwaOpt } from '../plugin/pwa'
import { SassDts, sassDtsOpt } from '../plugin/sassDts'
import { PluginVisualizerOptions, Visualizer } from '../plugin/visualizer'

export interface PluginTypes<T = object> {
  config: T | undefined
  readConfiguration(res?: T): this
  getPlugin(): PluginOption
}

export class PlugInContainer {
  private plugInContainerList: PluginOption[] = []

  addHTMLMeta(opt?: Partial<vitePluginMetaOpt>): this {
    this.injectPlugin(new vitePluginMete(), opt)
    return this
  }
  /**
   * @description auto import APIs on-demand for Vite, Webpack, Rollup and esbuild. With TypeScript support. Powered by unplugin.
   * @see https://www.npmjs.com/package/unplugin-auto-import
   */
  addAutoHooks(opt?: AutoHooksOpt) {
    this.injectPlugin(new AutoHooks(), opt)
    return this
  }

  /**
   * @description add alias
   * @returns
   */
  addAlias(opt?: AliasOpt): this {
    this.injectPlugin(new Alias(), opt)
    return this
  }
  /**
   * @description add BrowserSync in your Vite project.
   * @see https://browsersync.io/
   */
  addBrowserSync(opt?: BrowserSyncOpt) {
    this.injectPlugin(new BrowserSync(), opt)
    return this
  }
  /**
   * @description zero-config PWA Framework-agnostic Plugin for Vite
   * @see https://www.npmjs.com/package/vite-plugin-pwa
   * @returns
   */
  addPwa(opt?: PwaOpt): Omit<PlugInContainer, 'getPlugInContainerList'> {
    this.injectPlugin(new Pwa(), opt)
    return this
  }

  /**
   * @description visuallize your bundle
   * @see https://github.com/btd/rollup-plugin-visualizer
   */
  addRollupPluginVisualizer(opt?: Partial<PluginVisualizerOptions>) {
    this.injectPlugin(new Visualizer(), opt)
    return this
  }

  /**
   * @description a plugin that automatically creates a type file when using the CSS module type-safely.
   * @see https://www.npmjs.com/package/vite-plugin-sass-dts
   * @returns
   */
  addSassDts(opt?: sassDtsOpt): Omit<PlugInContainer, 'getPlugInContainerList'> {
    this.injectPlugin(new SassDts(), opt)
    return this
  }

  protected injectPlugin(pluginModule: PluginTypes, res: any) {
    pluginModule.readConfiguration(res)
    this.plugInContainerList.push(pluginModule.getPlugin())
  }

  getPlugInContainerList() {
    return this.plugInContainerList
  }
}
