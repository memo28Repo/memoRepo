/*
 * @Author: 邱狮杰
 * @Date: 2023-02-01 13:54:02
 * @LastEditTime: 2023-02-12 09:29:45
 * @Description: 
 * @FilePath: /memo/packages/rollup/src/core/helper.ts
 */

import { InputPluginOption } from "rollup"



export interface PluginType<T> {

}

export class Helper {

    private pluginsList: InputPluginOption = []

    getPluginsList() {
        return this.pluginsList
    }

    /**
     * @description 自动装配
     */
    automaticAssembly() { }
}
