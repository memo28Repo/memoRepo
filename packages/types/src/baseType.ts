/*
 * @Author: 邱狮杰
 * @Date: 2023-01-10 15:04:28
 * @LastEditTime: 2023-03-05 11:01:44
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