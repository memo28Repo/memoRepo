/*
 * @Author: 邱狮杰
 * @Date: 2023-02-04 12:26:22
 * @LastEditTime: 2023-02-06 16:22:27
 * @Description: vite-plugin-meta
 * @FilePath: /memo/packages/viteBuild/src/plugin/meta.ts
 */

import { PluginTypes } from '../core/plugInContainer'
import { PluginOption } from 'vite'
import vitePluginMetes, { vitePluginMetaOpt } from '@memo28/vite-plugin-mete'

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
