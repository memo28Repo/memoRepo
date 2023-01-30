/*
 * @Author: 邱狮杰
 * @Date: 2023-01-28 14:01:30
 * @LastEditTime: 2023-01-29 09:12:27
 * @Description: 
 * @FilePath: /memo/packages/viteBuild/src/plugin/pwa.ts
 */

import { PluginOption } from 'vite'

import Plugins from 'vite-plugin-pwa'

import { PluginTypes } from "../core/plugInContainer"

export type PwaOpt = Parameters<typeof Plugins.VitePWA>[0]

export class Pwa implements PluginTypes<PwaOpt> {
    config: Partial<Plugins.Options> | undefined;

    readConfiguration(res?: Partial<Plugins.Options> | undefined): this {
        this.config = res
        return this
    }

    getPlugin(): PluginOption {
        return Plugins.VitePWA(this.config)
    }

}
