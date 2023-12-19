/*
 * @Author: 邱狮杰
 * @Date: 2023-01-27 11:17:08
 * @LastEditTime: 2023-12-19 20:14:15
 * @Description: 配置场景
 * @FilePath: /memo/vite/viteBuild/src/core/configureTechnologyStack.ts
 */

import { getValues } from "@memo28/types";
import legacy from "@vitejs/plugin-legacy";
import reactSwcPlugin from "@vitejs/plugin-react-swc";
import vuePlugin from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { transformShortVmodel } from "@vue-macros/short-vmodel";
import vueMacros from "unplugin-vue-macros/vite";
import { PluginOption } from "vite";
import printURL from "vite-plugin-print-urls";
import { TurboConsole } from "../plugin/turboConsole";
import injection from "./injection";

export abstract class configureTechnologyStackTypes<T extends string = string> {
  abstract configureTechnologyStack: string | T; //  配置技术栈
  /**
   * 
   * 初始化默认插件
   * 
   * @public
   */
  abstract initDefaultPlugin(): PluginOption | Promise<PluginOption>
  static getName: string
}

export type ConfigureTechnologyStack = "vue" | "react" | "uniapp" | ""

/**
 * @description 配置vue
 */
export class ConfigureVueTechnologyStack implements configureTechnologyStackTypes<"vue"> {
  initDefaultPlugin(): PluginOption {
    const turboConsole = new TurboConsole().readConfiguration({
      port: 8902,
      prefix: 'memo.repo'
    })
    return [
      turboConsole.getPlugin(),
      legacy(),
      vueMacros({
        plugins: {
          vue: vuePlugin({
            include: [/\.vue$/, /setup\.[cm]?[jt]sx?$/],
            template: {
              compilerOptions: {
                nodeTransforms: [
                  transformShortVmodel({
                    prefix: "$"
                  })
                ]
              }
            }
          }),
          vueJsx: vueJsx()
        }
      }) as PluginOption,
      printURL() as PluginOption
    ]
  }
  configureTechnologyStack = "vue";
  static getName: string = 'vue';
}

/**
 * 配置react场景
 */
export class ConfigureReactTechnologyStack implements configureTechnologyStackTypes<"react"> {
  initDefaultPlugin(): PluginOption {
    const turboConsole = new TurboConsole().readConfiguration({
      port: 8902,
      prefix: 'memo.repo'
    })
    return [
      turboConsole.getPlugin(),
      legacy(),
      reactSwcPlugin({ tsDecorators: true }),
      printURL() as PluginOption
    ]
  }
  configureTechnologyStack = "react";
  static getName: string = 'react';
}

export interface injectDefaultTechnologyStackConfigurationOpt {
  defaultModule: (typeof configureTechnologyStackTypes)[];
}

const injectDefaultTechnologyStackConfigurationMapper = {
  defaultModule: "defaultModule"
} as const;

/**
 *  defaultModule 注入类型
 */
export type technologyStackTypes = Map<string, typeof configureTechnologyStackTypes>

export type injectDefaultTechnologyStackConfigurationMapperTypes = getValues<typeof injectDefaultTechnologyStackConfigurationMapper>

/**
 *  注入默认技术栈配置
 */
export function injectDefaultTechnologyStackConfiguration(ops: injectDefaultTechnologyStackConfigurationOpt) {
  return (target: object) => {
    const technologyStack: technologyStackTypes = new Map<string, typeof configureTechnologyStackTypes>();
    ops.defaultModule.forEach(modules => {
      technologyStack.set(modules.getName, modules);
    });
    // @ts-ignore
    injection.setValue(target, "defaultModule", technologyStack);
  };
}


export class ConfigureTechnologyStackUniApp implements configureTechnologyStackTypes<"uniapp"> {
  async initDefaultPlugin(): Promise<PluginOption> {
    // @ts-ignore
    const uniPlugin = await import('@dcloudio/vite-plugin-uni')
    const turboConsole = new TurboConsole().readConfiguration({
      port: 8902,
      prefix: 'memo.repo'
    })
    return [
      turboConsole.getPlugin(),
      uniPlugin()
    ]
  }
  configureTechnologyStack: ConfigureTechnologyStack = "uniapp";
  static getName: string = 'uniapp';
}
