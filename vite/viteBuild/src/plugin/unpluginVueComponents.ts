/*
 * @Author: @memo28.repo
 * @Date: 2023-12-19 15:24:07
 * @LastEditTime: 2023-12-19 16:48:28
 * @Description: 
 * @FilePath: /memo/vite/viteBuild/src/plugin/unpluginVueComponents.ts
 */
import { ElementPlusResolver, ElementPlusResolverOptions } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { Plugin } from "vite";
import { PluginTypes } from "../core/plugInContainer";


/**
 * 
 * 原 `unplug components`配置类型
 * 
 * @public
 */
type ComponentsOptions = Parameters<typeof Components>[0]


/**
 * 
 * 
 *  重写unplu component 配置类型
 * 
 *  @remarks
 * 
 *  - `elementPlusResolverOptions` {@link ElementPlusResolverOptions} 配置 {@link ElementPlusResolver} 参数
 * 
 *  @public
 */
export type UnPluginVueComponentsOptions = {
  elementPlusResolverOptions?: ElementPlusResolverOptions;
} & ComponentsOptions

export class UnPluginVueComponents implements PluginTypes<UnPluginVueComponentsOptions> {
  config: UnPluginVueComponentsOptions | undefined = undefined;

  readConfiguration(res?: UnPluginVueComponentsOptions): this {
    this.config = res;
    return this;
  }

  getPlugin(): Plugin {
    if (this.config?.elementPlusResolverOptions) {
      return Components({
        resolvers: [ElementPlusResolver(this.config.elementPlusResolverOptions)]
      }) as Plugin;
    }
    return Components({}) as Plugin;
  }
}

