/*
 * @Author: 邱狮杰
 * @Date: 2023-02-01 13:54:02
 * @LastEditTime: 2023-02-03 15:34:01
 * @Description: 
 * @FilePath: /memo/packages/rollup/src/core/helper.ts
 */

import { InputPluginOption } from "rollup"

export class Helper {

    private pluginsList: InputPluginOption = []

    getPluginsList() {
        return this.pluginsList
    }

}
