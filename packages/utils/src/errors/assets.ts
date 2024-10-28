/*
 * @Author: @memo28.repo
 * @Date: 2024-02-09 17:09:11
 * @LastEditTime: 2024-06-09 09:06:15
 * @Description: 
 * @FilePath: /memoRepo/packages/utils/src/errors/assets.ts
 */

import { fn } from "@memo28/types";

export function assets(result: boolean, error: unknown | fn) {
    console.log(error)
    if (result) {
        if (typeof error === 'function') {
            throw error()
        } else throw error
    }
}
