/*
 * @Author: 邱狮杰
 * @Date: 2023-01-28 14:26:19
 * @LastEditTime: 2023-01-28 14:27:21
 * @Description: 
 * @FilePath: /memo/packages/viteBuild/src/plugin/browserSync.ts
 */

import { PluginOption } from 'vite'

import Plugins, { Options } from 'vite-plugin-browser-sync'

import { PluginTypes } from "../core/plugInContainer"
export type BrowserSyncOpt = Parameters<typeof Plugins>[0]

export class BrowserSync implements PluginTypes<BrowserSyncOpt> {
    config: Options | undefined;
    readConfiguration(res?: Options | undefined): this {
        return this
    }

    getPlugin(): PluginOption {
        return Plugins(this.config)
    }

}


