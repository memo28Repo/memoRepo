/*
 * @Author: 邱狮杰
 * @Date: 2023-03-10 16:45:57
 * @LastEditTime: 2023-10-12 16:13:01
 * @Description:
 * @FilePath: /memo/packages/utils/src/log.ts
 */

import { str } from '@memo28/types'

const Pointer = ' ===> '

export function enableLogAttribute() {
  // @ts-ignore
  String.prototype.log = function (this: String, mark?: str): string {
    if (mark) console.log(`${mark}${Pointer}`, this)
    else console.log(this)
    return this as string
  }

  // @ts-ignore
  Number.prototype.log = function (this: Number, mark?: str): number {
    if (mark) console.log(`${mark}${Pointer}`, this)
    else console.log(this)
    return this as number
  }

  // @ts-ignore
  Object.prototype.log = function (this: Object, mark?: str): object {
    if (mark) console.log(`${mark}${Pointer}`, this)
    else console.log(this)
    return this as object
  }
}

