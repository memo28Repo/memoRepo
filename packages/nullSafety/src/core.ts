/*
 * @Author: @memo28.repo
 * @Date: 2024-02-04 13:18:53
 * @LastEditTime: 2024-02-06 19:38:45
 * @Description: 
 * @FilePath: /memo/packages/nullSafety/src/core.ts
 */

import { getDefaultValueByType, getValueType } from "./type"

export interface nullSafetyOptions {
    /**
     * 
     * 倒退回初始值
     * 
     * @public
     */
    regressInitialValue?: boolean


    /**
     * 
     * 倒退回初始值回调函数
     * 
     * @public
     */

    regressInitialValueCallback?(msg: string): void

}

export interface nullSafetyMeta {
    type: 'number' | 'string' | 'function' | 'undefined' | 'symbol' | 'object' | 'map' | 'set' | 'null' | 'date',
    default: any
}


/**
 * 
 * @param value 初始化值
 * @param opt - 配置项
 * 
 * @public
 */
export function nullSafety<T = any>(value?: T, opt?: nullSafetyOptions) {
    const type = getValueType(value)

    const mete: nullSafetyMeta = {
        type,
        default: getDefaultValueByType(type)
    }

    const target = {
        value
    }


    return new Proxy(target, {
        set(target, p, newValue, receiver) {
            const newValueType = getValueType(newValue)
            if (newValueType !== mete.type) {
                const message = `类型不符合预期,预期类型:${mete.type} 但收到的实际类型为 ${newValueType}`
                opt?.regressInitialValueCallback ? opt?.regressInitialValueCallback?.(message) : console.warn(message)
                if (opt?.regressInitialValue) target.value = mete.default
                return true
            }

            target.value = newValue
            return true
        },
    })
}