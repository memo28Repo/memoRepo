/*
 * @Author: 邱狮杰
 * @Date: 2023-01-28 11:45:50
 * @LastEditTime: 2023-01-28 15:44:27
 * @Description: 插件容器
 * @FilePath: /memo/packages/viteBuild/src/core/plugInContainer.ts
 */
import { PluginOption } from 'vite'
import { SassDts, sassDtsOpt } from "../plugin/sassDts"
import { Pwa, PwaOpt } from '../plugin/pwa'
import { BrowserSync, BrowserSyncOpt } from "../plugin/browserSync"
import { AliasOpt, Alias } from "../plugin/alias"

export interface PluginTypes<T = object> {
    config: T | undefined
    readConfiguration(res?: T): this
    getPlugin(): PluginOption
}

export class PlugInContainer {
    private plugInContainerList: PluginOption[] = []

    addAlias(opt?: AliasOpt): this {
        this.injectPlugin(new Alias(), opt)
        return this
    }

    addBrowserSync(opt?: BrowserSyncOpt) {
        this.injectPlugin(new BrowserSync(), opt)
        return this
    }

    addPwa(opt?: PwaOpt): Omit<PlugInContainer, 'getPlugInContainerList'> {
        this.injectPlugin(new Pwa(), opt)
        return this
    }

    addSassDts(opt?: sassDtsOpt): Omit<PlugInContainer, 'getPlugInContainerList'> {
        this.injectPlugin(new SassDts(), opt)
        return this
    }

    protected injectPlugin(pluginModule: PluginTypes, res: any) {
        pluginModule.readConfiguration(res)
        this.plugInContainerList.push(pluginModule.getPlugin())
    }

    getPlugInContainerList() {
        return this.plugInContainerList
    }
}
