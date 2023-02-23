/*
 * @Author: 邱狮杰
 * @Date: 2023-02-12 09:43:41
 * @LastEditTime: 2023-02-12 11:06:42
 * @Description: 
 * @FilePath: /memo/packages/rollup/src/plugin/typescript.ts
 */

import { PluginTypes } from '../core/helper'
import { Plugin } from 'rollup'
import TsPlugin, { RollupTypescriptOptions } from '@rollup/plugin-typescript'

export type TsOpt = Parameters<typeof TsPlugin>[0]

export class Typescript implements PluginTypes<TsOpt> {
    config: RollupTypescriptOptions | undefined;

    readConfiguration(res?: RollupTypescriptOptions | undefined): this {
        this.config = res
        return this
    }

    getAssemblyCompleted(): Plugin {
        return TsPlugin(this.config)
    }
}