/*
 * @Author: 邱狮杰
 * @Date: 2023-04-09 10:52:58
 * @LastEditTime: 2023-04-09 11:17:41
 * @Description: 
 * @FilePath: /memo/packages/types/src/object/key.value.ts
 */
import { obj } from "../baseType"
import { Equal } from '../verify'

/**
 * @description 获取对象的所有value
 */
export type getObjValues<V = object> = V[keyof V]

/**
 * 获取 对象 的 所有 key type
 */
type getKeys<T extends obj> = Equal<T, any[]> extends true ? never : keyof T

/**
 * 获取 对象 的 所有 value type
 */
type getValues<T extends obj> = Equal<T, any[]> extends true ? never : getObjValues<T>




// type getValue<T extends obj, K extends ObjectKeyPaths<T> = ObjectKeyPaths<T>> =
//     // 如果 value 是一个数组 直接 never
//     Equal<T, any[]> extends true ? never : false

export type SuperObject<T extends obj> =
    // 如果是数组直接返回never
    T extends any[] ? never :
    T extends object ? {
        // 如果是对象 返回一系列类型方法
        allKeys: getKeys<T>,
        allValues: getValues<T>
    } :
    never


