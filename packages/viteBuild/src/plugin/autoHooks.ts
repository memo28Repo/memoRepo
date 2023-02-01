/*
 * @Author: 邱狮杰
 * @Date: 2023-01-31 10:53:07
 * @LastEditTime: 2023-01-31 11:58:49
 * @Description: 
 * @FilePath: /memo/packages/viteBuild/src/plugin/autoHooks.ts
 */
import vitePlugins from 'unplugin-auto-import/vite';
import { PluginTypes } from '../core/plugInContainer'
import { Options } from 'unplugin-auto-import/types';
import { PluginOption } from 'vite';

export type AutoHooksOpt = Parameters<typeof vitePlugins>[0]

export class AutoHooks implements PluginTypes<AutoHooksOpt> {

    config: Options | undefined;

    readConfiguration(res?: Options | undefined): this {
        this.config = res
        return this
    }

    getPlugin(): PluginOption {
        return vitePlugins(this.config)
    }

}