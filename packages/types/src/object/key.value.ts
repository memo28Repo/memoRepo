/*
 * @Author: 邱狮杰
 * @Date: 2023-04-09 10:52:58
 * @LastEditTime: 2023-04-14 23:05:16
 * @Description:
 * @FilePath: /memo/packages/types/src/object/key.value.ts
 */
import { obj } from '../baseType'
import { Equal } from '../verify'

/**
 * 获取 对象 的 所有 key type
 *
 * @example
 * ```ts
 * type f = getKeys<{ name: string; age: number }> // name | age
 * ```
 */
export type getKeys<T extends obj> = Equal<T, any[]> extends true ? never : keyof T

/**
 * 获取 对象 的 所有 `value` type
 *
 * @example
 * ```ts
 * type f = getObjValues<{ name: string; age: number }> // string | number
 * ```
 *
 * @typeParam T - 默认需要一个`object`
 *
 * @public
 */
export type getValues<T extends obj> = Equal<T, any[]> extends true ? never : T[keyof T]

/**
 *
 * 对象类型的集合方法 可直接获取到`keys and values`
 * 未来将会有更多方法被安装到 `SuperObject` 类型上
 *
 * @example
 * ```ts
 * type S = SuperObject<{ name: string; age: number }> // 等价于下方类型
 * type S = {
 *     allKeys: "name" | "age";
 *     allValues: string | number;
 * }
 * ```
 *
 * @typeParam T - 默认需要一个 `object`
 *
 * @public
 */
export type SuperObject<T extends obj> =
  // 如果是数组直接返回never
  T extends any[]
    ? never
    : T extends object
    ? {
        // 如果是对象 返回一系列类型方法
        allKeys: getKeys<T>
        allValues: getValues<T>
      }
    : never

/**
 *  指定 `obj` 的 `value`类型
 *
 * @example
 * ```ts
 * type S = objWithValue<string | number> // string | number
 * ```
 *
 * @typeParam T - `value` 类型
 *
 * @public
 */

export type objWithValue<T> = { [key: string]: T }
