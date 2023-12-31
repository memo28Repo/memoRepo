/*
 * @Author: 邱狮杰
 * @Date: 2023-01-28 11:45:50
 * @LastEditTime: 2023-12-19 20:18:45
 * @Description: 插件容器
 * @FilePath: /memo/vite/viteBuild/src/core/plugInContainer.ts
 */
import { PluginOption } from "vite";
import { Alias, AliasOpt } from "../plugin/alias";
import { AutoHooks, AutoHooksFinalConfiguration } from "../plugin/autoHooks";
import { BrowserSync, BrowserSyncOpt } from "../plugin/browserSync";
import { vitePluginMetaOpt, vitePluginMete } from "../plugin/meta";
import { Pwa, PwaOpt } from "../plugin/pwa";
import { SassDts, sassDtsOpt } from "../plugin/sassDts";
import { UnPluginVueComponents, UnPluginVueComponentsOptions } from "../plugin/unpluginVueComponents";
import { PluginVisualizerOptions, Visualizer } from "../plugin/visualizer";
import { LogEnvPlugin, logEnvPluginOptions } from "../plugin/viteMsg";
import { RequireContext, requireContextOptions } from "../plugin/requireContext";
import { EnvSwitch, envSwitchPluginPluginConfig } from "../plugin/envSwitch";
import { ImageOptimizer, viteImageOptimizerOption } from "../plugin/imageOptimizer";


export interface PluginTypes<T = object> {
  config: T | undefined;

  readConfiguration(res?: T): this;

  getPlugin(): PluginOption;
}

export class PlugInContainer {
  private plugInContainerList: PluginOption[] = [];

  /**
   *
   * 优化图片资源配置
   *
   * 手动安装 sharp 或者 svgo
   *
   * @see https://github.com/FatehAK/vite-plugin-image-optimizer
   *
   * @public
   *
   */
  addImageOptimizer(opt: viteImageOptimizerOption) {
    this.injectPlugin(new ImageOptimizer(), opt);
    return this
  }

  /**
   *
   * 配置 require.context 插件
   *
   * @see https://github.com/originjs/vite-plugins/tree/main/packages/vite-plugin-require-context
   *
   * @public
   */
  addRequireContext(opt: requireContextOptions) {
    this.injectPlugin(new RequireContext(), opt);
    return this;
  }

  /**
   *
   * 不用停止服务也可切换环境
   *
   * @see  https://github.com/PengBoUESTC/vite-plugin-env-switch
   *
   * @public
   */
  addEnvSwitch(opt: Partial<envSwitchPluginPluginConfig>) {
    this.injectPlugin(new EnvSwitch(), opt);
    return this;
  }

  addHTMLMeta(opt?: Partial<vitePluginMetaOpt>): this {
    this.injectPlugin(new vitePluginMete(), opt);
    return this;
  }

  /**
   *
   * 在终端将 {@link logEnvPluginOptions['strGetter']} 参数的返回值打印出来 可用于一些提示类功能 (env)
   *
   * @returns
   *
   */
  addLogEnvPlugin(opt?: logEnvPluginOptions) {
    this.injectPlugin(new LogEnvPlugin(), opt);
    return this;
  }

  /**
   *
   * 新增 自动带入组件插件
   *
   * @remarks
   * - 可自动带入element plus配置组件 填充 [`elementPlusResolverOptions`](https://element-plus.org/zh-CN/guide/quickstart.html#%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5) 属性
   *
   * @see https://github.com/unplugin/unplugin-vue-components
   *
   * @public
   *
   */
  addUnPluginVueComponents(opt?: UnPluginVueComponentsOptions): this {
    this.injectPlugin(new UnPluginVueComponents(), opt);
    return this;
  }

  // /**
  //  * @description inspect the intermediate state of Vite plugins. Useful for debugging and authoring plugins.
  //  * @see https://www.npmjs.com/package/vite-plugin-inspect
  //  */
  // addInspect(opt?: Partial<inspectOptions>) {
  //   this.injectPlugin(new Inspect(), opt)
  //   return this
  // }

  /**
   * auto import APIs on-demand for Vite, Webpack, Rollup and esbuild. With TypeScript support. Powered by unplugin.
   *
   *
   * @param { AutoHooksFinalConfiguration } opt {@link AutoHooksFinalConfiguration}
   * @remarks
   *
   * @see https://www.npmjs.com/package/unplugin-auto-import
   */
  addAutoHooks(opt?: AutoHooksFinalConfiguration): this {
    this.injectPlugin(new AutoHooks(), opt);
    return this;
  }

  /**
   * @description add alias
   * @returns
   */
  addAlias(opt?: AliasOpt): this {
    this.injectPlugin(new Alias(), opt);
    return this;
  }

  /**
   * @description add BrowserSync in your Vite project.
   * @see https://browsersync.io/
   */
  addBrowserSync(opt?: BrowserSyncOpt) {
    this.injectPlugin(new BrowserSync(), opt);
    return this;
  }

  /**
   * @description zero-config PWA Framework-agnostic Plugin for Vite
   * @see https://www.npmjs.com/package/vite-plugin-pwa
   * @returns
   */
  addPwa(opt?: PwaOpt): Omit<PlugInContainer, "getPlugInContainerList"> {
    this.injectPlugin(new Pwa(), opt);
    return this;
  }

  /**
   * @description visuallize your bundle
   * @see https://github.com/btd/rollup-plugin-visualizer
   */
  addRollupPluginVisualizer(opt?: Partial<PluginVisualizerOptions>) {
    this.injectPlugin(new Visualizer(), opt);
    return this;
  }

  /**
   * @description a plugin that automatically creates a type file when using the CSS module type-safely.
   * @see https://www.npmjs.com/package/vite-plugin-sass-dts
   * @returns
   */
  addSassDts(opt?: sassDtsOpt): Omit<PlugInContainer, "getPlugInContainerList"> {
    this.injectPlugin(new SassDts(), opt);
    return this;
  }

  protected injectPlugin(pluginModule: PluginTypes, res: any) {
    pluginModule.readConfiguration(res);
    this.plugInContainerList.push(pluginModule.getPlugin());
  }

  getPlugInContainerList() {
    return this.plugInContainerList;
  }
}
