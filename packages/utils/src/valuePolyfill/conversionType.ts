/*
 * @Author: 邱狮杰
 * @Date: 2023-03-17 11:40:54
 * @LastEditTime: 2023-03-17 22:54:30
 * @Description: 转换类型 and 类型判断
 * @FilePath: /memo/packages/utils/src/valuePolyfill/conversionType.ts
 */

import { compatibleTypeMappingValuesType } from './type'
import { Panic } from '../errors/types'
import { Errors } from '..'
import { bool, obj } from '@memo28/types'

type conversionListType<T> = {
  [key in compatibleTypeMappingValuesType]?: {
    to?: {
      // val：set value
      // originValue: origin value
      [key in compatibleTypeMappingValuesType]?: ((val: any, originValue: T) => T) | null
    }
    empty?: (val: any) => bool
  }
}

export class ConversionType<T extends any> {
  protected conversionList: conversionListType<T> = {
    '[object Number]': {
      to: {
        '[object String]': (value: unknown): T => {
          return `${value}` as T
        },
      },
      empty(val: number) {
        return val === 0
      },
    },
    '[object String]': {
      to: {
        '[object Number]': (value: string, originValue): T => {
          const v = parseFloat(value)
          if (Number.isNaN(v)) {
            console.trace(`During the process of converting string to number, string was converted to nan! I made a compatibility for you and will return 0 for you. Please check your value!`)
            return originValue
          }
          return v as T
        },
        '[object Boolean]'(val): T {
          return Boolean(val) as T
        },
      },
      empty(val: string) {
        return val.length === 0
      },
    },
    '[object Array]': {
      empty(val: any[]) {
        return val.length === 0
      },
    },
    '[object Object]': {
      empty(val: obj) {
        return Object.keys(val).length === 0
      },
    },
    '[object Null]': {
      empty(val: null) {
        return val === null
      },
    },
    '[object Undefined]': {
      empty(val: undefined) {
        return val === undefined
      },
    },
    '[object Boolean]': {},
  }

  /**
   * @description 转换
   * @param formType 传入的value类型
   * @param toType 需要转换的value类型
   * @param value value
   */
  transform(formType: compatibleTypeMappingValuesType, toType: compatibleTypeMappingValuesType, value: T, originValue: T): Panic<T> {
    // 查询转换方法
    const fn = this.conversionList[formType]?.to?.[toType]
    if (!fn) {
      const msg = `cannot find corresponding conversion method(${formType} => ${toType}), please click here https://github.com/erqiu-sj/memoRepo/issues Bring up an issue`
      console.trace(msg)
      return [Errors.New(msg), originValue]
    }
    return [true, fn(value, originValue)]
  }

  empty(originValue: T, type: compatibleTypeMappingValuesType) {
    const fn = this.conversionList[type]?.empty
    if (undefined === fn) {
      console.trace(`the type ${type} is not assigned a null method. Please click https://github.com/erqiu-sj/memoRepo/issues Mention an issuse, the default return for you is null`)
      return true
    }
    return fn(originValue)
  }
}
