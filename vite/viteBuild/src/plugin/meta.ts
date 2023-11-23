/*
 * @Author: 邱狮杰
 * @Date: 2023-02-04 12:26:22
 * @LastEditTime: 2023-02-08 16:52:52
 * @Description: vite-plugin-meta
 * @FilePath: /memo/packages/viteBuild/src/plugin/meta.ts
 */

import { PluginTypes } from '../core/plugInContainer'
import { PluginOption } from 'vite'
// @ts-ignore
import vitePluginMetes, { vitePluginMetaOpt } from '@memo28/vite-plugin-meta'

export type { vitePluginMetaOpt }

export class vitePluginMete implements PluginTypes<vitePluginMetaOpt> {

    config: vitePluginMetaOpt | undefined;

    readConfiguration(res?: vitePluginMetaOpt | undefined): this {
        this.config = res
        return this
    }

    getPlugin(): PluginOption {
        return vitePluginMetes(this.config) as PluginOption
    }

}
