/*
 * @Author: 邱狮杰
 * @Date: 2023-01-28 15:28:56
 * @LastEditTime: 2023-01-29 09:12:21
 * @Description: 
 * @FilePath: /memo/packages/viteBuild/src/plugin/alias.ts
 */

import { PluginTypes } from "../core/plugInContainer"
import { PluginOption } from 'vite'
import { resolve } from 'path'


export type AliasOpt = { [key: string]: string }

export class Alias implements PluginTypes<AliasOpt> {
    config: AliasOpt = {}

    // plugin: PluginOption = null

    private pwd(path: string) {
        return resolve(process.cwd(), '.', path) + '/'
    }


    readConfiguration(obj?: { [key: string]: string }): this {
        const h: { [key: string]: string } = {}
        for (const key in obj) {
            h[key] = this.pwd(obj[key])
        }
        this.config = h
        return this
    }

    getPlugin(): PluginOption {
        const that = this
        return {
            name: '@memo28/alias',
            config() {
                return {
                    resolve: {
                        alias: { '~/': that.pwd('src'), ...that.config },
                    },
                }

            },
        }
    }

}