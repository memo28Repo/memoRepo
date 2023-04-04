/*
 * @Author: 邱狮杰
 * @Date: 2023-04-04 13:51:50
 * @LastEditTime: 2023-04-04 13:58:35
 * @Description:
 * @FilePath: /memo/packages/viteBuild/src/plugin/inspect.ts
 */
import { PluginOption } from 'vite'
import { PluginTypes } from '../core/plugInContainer'
import inspect, { Options } from 'vite-plugin-inspect'
export type inspectOptions = Options

export class Inspect implements PluginTypes<inspectOptions> {
  config: Options | undefined
  readConfiguration(res?: Options | undefined): this {
    this.config = res
    return this
  }
  getPlugin(): PluginOption {
    return inspect(this.config)
  }
}
