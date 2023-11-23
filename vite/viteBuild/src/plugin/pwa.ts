/*
 * @Author: 邱狮杰
 * @Date: 2023-01-28 14:01:30
 * @LastEditTime: 2023-01-30 14:06:19
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
        this.config = res ?? {
            injectRegister: 'auto',
            registerType: 'autoUpdate',
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,ttf}']
            }
        }
        return this
    }

    getPlugin(): PluginOption {
        return Plugins.VitePWA(this.config)
    }

}
