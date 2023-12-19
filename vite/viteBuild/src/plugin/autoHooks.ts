/*
 * @Author: 邱狮杰
 * @Date: 2023-01-31 10:53:07
 * @LastEditTime: 2023-12-19 16:03:32
 * @Description:
 * @FilePath: /memo/vite/viteBuild/src/plugin/autoHooks.ts
 */
import vitePlugins from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { PluginOption } from "vite";
import { PluginTypes } from "../core/plugInContainer";
import { UnPluginVueComponentsOptions } from "./unpluginVueComponents";


export type AutoHooksOpt = Parameters<typeof vitePlugins>[0]


/**
 * 
 * 自动导入 `api` 最终配置类型
 * 
 * @public
 */
export type AutoHooksFinalConfiguration = {
  /**
   * 
   * 如 `elementPlusResolverOptions` 不为空 则自动配置 [`ElementPlusResolver`](https://element-plus.org/zh-CN/guide/quickstart.html#%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5) 插件
   * 
   * @public
   */
  elementPlusResolverOptions?: UnPluginVueComponentsOptions['elementPlusResolverOptions']
} & AutoHooksOpt


export class AutoHooks implements PluginTypes<AutoHooksFinalConfiguration> {

  config: AutoHooksFinalConfiguration | undefined;

  readConfiguration(res?: AutoHooksFinalConfiguration | undefined): this {
    this.config = res;
    return this;
  }

  getPlugin(): PluginOption {
    const config: AutoHooksFinalConfiguration = {
      ...this.config,
      // @ts-ignore
      resolvers: [...(this.config?.resolvers || []), this.config?.elementPlusResolverOptions ? ElementPlusResolver(this.config.elementPlusResolverOptions) : undefined]
    }
    return vitePlugins(config);
  }

}
