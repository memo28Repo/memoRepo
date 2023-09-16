/*
 * @Author: 邱狮杰
 * @Date: 2023-03-17 16:23:56
 * @LastEditTime: 2023-03-17 16:25:03
 * @Description:
 * @FilePath: /memo/packages/utils/src/valuePolyfill/utils.ts
 */

import { DeepObjectToValuePolyFillTypes, ValuePolyFill } from './core'

/**
 * @description 数组元素 转 ValuePolyFill
 */
export function arrayToValuePolyFill<T extends any>(array: T[]): DeepObjectToValuePolyFillTypes<T[]> {
  return array.map(i => new ValuePolyFill(i))
}

/**
 * @description 对象属性 转 ValuePolyFill
 */
export function objToValuePolyFill<T extends { [key: string]: any }>(obj: T): DeepObjectToValuePolyFillTypes<T> {
  for (const key in obj) {
    const value: T[Extract<keyof T, string>] | ValuePolyFill<T[Extract<keyof T, string>]> | DeepObjectToValuePolyFillTypes<T[]>[] = obj[key]
    if (Array.isArray(value)) {
      // @ts-ignore
      obj[key] = arrayToValuePolyFill(value)
    } else if (Object.prototype.toString.call(value) === '[object Object]') {
      // @ts-ignore
      obj[key] = objToValuePolyFill(value)
    } else {
      // @ts-ignore
      obj[key] = new ValuePolyFill(value)
    }
  }
  return obj as unknown as DeepObjectToValuePolyFillTypes<T>
}

/**
 * @description valuePolyFill 转 obj
 */
export function valuePolyFillToObj<T extends object>(obj: DeepObjectToValuePolyFillTypes<T>) {
  let newObj = {}
  for (const key in obj) {
    // @ts-ignore
    const value: T[Extract<keyof T, string>] | ValuePolyFill<T[Extract<keyof T, string>]> | DeepObjectToValuePolyFillTypes<T[]>[] = obj[key]
    if (Array.isArray(value)) {
      // @ts-ignore
      newObj[key] = valuePolyFillToArray(value)
    } else if (Object.prototype.toString.call(value) === '[object Object]') {
      // 如果是对象
      // @ts-ignore
      newObj[key] = value.get ? value.get() : valuePolyFillToObj(value)
    } else {
      // @ts-ignore
      if (value.get) {
        // @ts-ignore
        newObj[key] = value.get()
      } else {
        // @ts-ignore
        newObj[key] = value
      }
    }
  }
  return newObj
}

/**
 * `valuePolyFill` 转 `array`
*
*  @public
 */
export function valuePolyFillToArray<T>(arry: ValuePolyFill<T>[]) {
  return arry.map(i => i.get())
}
