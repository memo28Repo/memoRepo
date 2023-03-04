/*
 * @Author: 邱狮杰
 * @Date: 2023-01-10 15:04:28
 * @LastEditTime: 2023-03-04 22:09:03
 * @Description: 
 * @FilePath: /memo/packages/types/src/baseType.ts
 */
export type int = number
export type bool = boolean
export type str = string
export type obj = object

/**
 * @description 指定obj的value类型
 */

export type objWithValue<T> = { [key: string]: T }