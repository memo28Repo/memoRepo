/*
 * @Author: 邱狮杰
 * @Date: 2023-02-12 10:29:46
 * @LastEditTime: 2023-02-15 11:28:15
 * @Description:
 * @FilePath: /memo/packages/rollup/src/plugin/size.ts
 */

// @ts-ignore
import size from 'rollup-plugin-sizes'
import { PluginTypes } from '../core/helper'
import { Plugin } from 'rollup'

export class Sizes implements PluginTypes<unknown> {
  config: unknown

  readConfiguration(res?: unknown): this {
    this.config = res
    return this
  }

  getAssemblyCompleted(): Plugin {
    return size(this.config)
  }
}
