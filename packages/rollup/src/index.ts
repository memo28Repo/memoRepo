/*
 * @Author: 邱狮杰
 * @Date: 2023-01-31 10:29:53
 * @LastEditTime: 2023-02-15 10:11:01
 * @Description:
 * @FilePath: /memo/packages/rollup/src/index.ts
 */

import { InputPluginOption, RollupOptions } from 'rollup'
import { Helper } from './core/helper'

export class RollupHelper {
  private pluginsList: InputPluginOption = []

  addPlugins(helper: (helper: Omit<Helper, 'getPluginsList'>) => void) {
    const h = new Helper()
    helper(h)
    if (Array.isArray(this.pluginsList)) this.pluginsList.push(h.getPluginsList())
    return this
  }
  getBuild(opt?: RollupOptions) {
    return {
      ...opt,
    }
  }
}
