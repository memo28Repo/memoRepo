/*
 * @Author: @memo28.repo
 * @Date: 2024-02-11 14:10:14
 * @LastEditTime: 2024-02-11 14:10:15
 * @Description: 
 * @FilePath: /memo/packages/utils/src/derived/array.ts
 */
import { isEmpty } from '../index'

export function ArrayDerived() {
    Array.prototype.isEmpty = function (this: any[]) {
        return isEmpty(this)
    }
}