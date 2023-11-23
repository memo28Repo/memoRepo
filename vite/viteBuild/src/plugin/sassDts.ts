/*
 * @Author: 邱狮杰
 * @Date: 2023-01-28 11:56:08
 * @LastEditTime: 2023-01-28 13:52:47
 * @Description:
 * @FilePath: /memo/packages/viteBuild/src/plugin/sassDts.ts
 */
import { Plugin } from 'vite'
import Plugins from 'vite-plugin-sass-dts'
import { PluginTypes } from '../core/plugInContainer'

export type sassDtsOpt = Parameters<typeof Plugins>[0]

export class SassDts implements PluginTypes<sassDtsOpt> {
  config: sassDtsOpt | undefined = undefined

  readConfiguration(res?: sassDtsOpt): this {
    this.config = res
    return this
  }

  getPlugin(): Plugin {
    return Plugins(this.config)
  }
}
