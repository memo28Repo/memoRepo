/*
 * @Author: 邱狮杰
 * @Date: 2023-01-31 10:29:53
 * @LastEditTime: 2023-02-12 09:26:54
 * @Description: 
 * @FilePath: /memo/packages/rollup/src/index.ts
 */

import { RollupOptions, InputPluginOption } from "rollup"
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
            ...opt
        }
    }
}


const config = new RollupHelper().addPlugins((pluginHepler) => {
    pluginHepler
}).getBuild()

console.log(config)