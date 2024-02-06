/*
 * @Author: @memo28.repo
 * @Date: 2024-02-04 13:29:44
 * @LastEditTime: 2024-02-04 13:51:49
 * @Description: 
 * @FilePath: /memo/packages/nullSafety/src/type.ts
 */
import { nullSafetyMeta } from './core'

/**
 * 
 * 根据值返回类型
 * 
 * @param value 
 * @returns 
 * 
 * @public
 */
export function getValueType(value?: any): nullSafetyMeta['type'] {
    const h = ['number', 'string', 'function', 'symbol', 'undefined']
    const typeofValue = typeof value
    if (h.includes(typeofValue)) return typeofValue as nullSafetyMeta['type']
    if (value === null) return 'null'
    if (value instanceof Date) return 'date'
    if (value instanceof Map) return 'map'
    if (value instanceof Set) return 'set'
    if (value instanceof Object) return 'object'
    return 'undefined'
}


/**
 * 
 * 根据类型返回默认值
 * 
 * @public
 */
export function getDefaultValueByType(type: nullSafetyMeta['type']) {
    const h: {
        [Key in nullSafetyMeta['type']]: any
    } = {
        'date': new Date(),
        'function': () => { },
        'map': new Map(),
        "set": new Set(),
        "null": null,
        "number": 0,
        "string": "",
        "undefined": undefined,
        "symbol": Symbol,
        'object': {}
    }
    return h[type]
}