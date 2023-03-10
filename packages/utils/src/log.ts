/*
 * @Author: 邱狮杰
 * @Date: 2023-03-10 16:45:57
 * @LastEditTime: 2023-03-10 17:16:17
 * @Description:
 * @FilePath: /memo/packages/utils/src/log.ts
 */

import { str } from '@memo28/types'

const Pointer = ' ===> '

export function enableLogAttribute() {
  String.prototype.log = function (this: String, mark?: str): void {
    if (mark) console.log(`${mark}${Pointer}`, this)
    else console.log(this)
  }

  Number.prototype.log = function (this: String, mark?: str): void {
    if (mark) console.log(`${mark}${Pointer}`, this)
    else console.log(this)
  }

  Object.prototype.log = function (this: String, mark?: str): void {
    if (mark) console.log(`${mark}${Pointer}`, this)
    else console.log(this)
  }
}
