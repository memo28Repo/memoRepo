/*
 * @Author: @memo28.repo
 * @Date: 2024-02-11 14:11:41
 * @LastEditTime: 2024-02-11 14:11:42
 * @Description: 
 * @FilePath: /memo/packages/utils/src/derived/object.ts
 */

import { isEmpty } from '../index'

export function ObjectDerived() {
    Object.prototype.isEmpty = function (this: any[]) {
        return isEmpty(this)
    }
}
