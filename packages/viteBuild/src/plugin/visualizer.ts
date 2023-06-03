/*
 * @Author: 邱狮杰
 * @Date: 2023-04-04 10:44:52
 * @LastEditTime: 2023-04-04 10:50:09
 * @Description:
 * @FilePath: /memo/packages/viteBuild/src/plugin/visualizer.ts
 */
import { Plugin, PluginOption } from 'vite'
import { PluginTypes } from '../core/plugInContainer'
import visualizer, { PluginVisualizerOptions } from 'rollup-plugin-visualizer'

export { PluginVisualizerOptions }

export class Visualizer implements PluginTypes<PluginVisualizerOptions> {
  config: PluginVisualizerOptions | undefined

  readConfiguration(res?: PluginVisualizerOptions | undefined): this {
    this.config = res
    return this
  }

  getPlugin(): PluginOption {
    return visualizer(this.config) as Plugin
  }
}
