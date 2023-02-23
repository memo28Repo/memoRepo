/*
 * @Author: 邱狮杰
 * @Date: 2023-02-12 09:55:54
 * @LastEditTime: 2023-02-12 10:02:58
 * @Description: 
 * @FilePath: /memo/packages/rollup/src/plugin/notify.ts
 */

// @ts-ignore
import notify from 'rollup-plugin-notify'
import { PluginTypes } from '../core/helper'
import { Plugin } from 'rollup'

export class ErrorNotify implements PluginTypes<unknown> {
    config: unknown;

    readConfiguration(res?: unknown): this {
        return this
    }

    getAssemblyCompleted(): Plugin {
        return notify()
    }

}

