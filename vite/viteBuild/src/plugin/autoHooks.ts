/*
 * @Author: 邱狮杰
 * @Date: 2023-01-31 10:53:07
 * @LastEditTime: 2023-02-12 10:58:55
 * @Description: 
 * @FilePath: /memo/packages/viteBuild/src/plugin/autoHooks.ts
 */
import { Options } from 'unplugin-auto-import/types';
import vitePlugins from 'unplugin-auto-import/vite';
import { PluginOption } from 'vite';
import { PluginTypes } from '../core/plugInContainer';

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