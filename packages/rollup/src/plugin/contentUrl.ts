/*
 * @Author: 邱狮杰
 * @Date: 2023-02-12 10:10:42
 * @LastEditTime: 2023-02-12 10:21:31
 * @Description: 
 * @FilePath: /memo/packages/rollup/src/plugin/contentUrl.ts
 */
import URLPlugin, { RollupUrlOptions } from "@rollup/plugin-url"
import { Plugin } from 'rollup'
import { PluginTypes } from "../core/helper"

export type URLOpt = RollupUrlOptions

export class ContentUrl implements PluginTypes<URLOpt> {
    config: RollupUrlOptions | undefined;

    readConfiguration(res?: RollupUrlOptions | undefined): this {
        this.config = res
        return this
    }

    getAssemblyCompleted(): Plugin {
        return URLPlugin(this.config)
    }

}


