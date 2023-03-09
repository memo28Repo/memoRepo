/*
 * @Author: 邱狮杰
 * @Date: 2023-02-12 09:52:46
 * @LastEditTime: 2023-03-09 10:39:09
 * @Description:
 * @FilePath: /memo/packages/rollup/src/plugin/nodeResolve.ts
 */

import nodeResolve, { RollupNodeResolveOptions } from '@rollup/plugin-node-resolve'
import { Plugin } from 'rollup'
import { PluginTypes } from '../core/helper'

export type nrOpt = Parameters<typeof nodeResolve>[0]

export class NodeResolve implements PluginTypes<nrOpt> {
  config: RollupNodeResolveOptions | undefined

  readConfiguration(res?: RollupNodeResolveOptions | undefined): this {
    this.config = res
    return this
  }

  getAssemblyCompleted(): Plugin {
    return nodeResolve(this.config)
  }
}
