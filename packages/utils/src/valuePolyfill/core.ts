/*
 * @Author: 邱狮杰
 * @Date: 2023-03-17 09:43:03
 * @LastEditTime: 2023-03-17 17:29:56
 * @Description:
 * @FilePath: /memo/packages/utils/src/valuePolyfill/core.ts
 */
import { str } from '@memo28/types'
import { ConversionType } from './conversionType'
import { TypePolyfill } from './typePolyfill'

export class ValuePolyFill<T extends unknown> {
  private value: T
  private typePolyfill: TypePolyfill<T> = new TypePolyfill()
  private conversionType: ConversionType<T> = new ConversionType()
  constructor(value: T) {
    this.value = value
    this.typePolyfill.setType(this.value).inspectionType()
  }

  get() {
    return this.value
  }

  set(value: T | any): this {
    // 当一个值默认为null或者undefined时 将该值的类型 锁定为第一个传入的不为null和undefined的值类型
    if ([null, undefined].includes(this.value as null) && ![null, undefined].includes(value as null)) {
      this.typePolyfill.setType(value)
    }
    // 不是已有兼容类型，缺少对应的类型兼容,提示联系管理员添加
    if (!this.typePolyfill.inspectionType()) {
      this.value = value
      this.promptForMissingTypeCompatibility()
      return this
    }

    // 当值为 null 和 undefined 时
    if ([null, undefined].includes(value as null)) {
      const polyfillValue = this.typePolyfill.returnCompatibleValues()
      this.errorReportingInformation(this.typePolyfill.getType(), Object.prototype.toString.call(value), polyfillValue)
      this.value = polyfillValue
    }

    const fromType = this.typePolyfill.getValueType(value)
    const toType = this.typePolyfill.getType()

    //  set value 类型 和 原 value 类型不匹配
    if (fromType !== toType) {
      const [_, transformValue] = this.conversionType.transform(fromType, toType, value, this.value)
      this.value = transformValue
    } else {
      this.value = value
    }

    return this
  }

  // 类型不兼容时 null undefined时的提示
  protected errorReportingInformation(type: str, errorType: str, polyfillValue: T) {
    console.trace(`type modification error detected!! value requires a ${type} type, but given a ${errorType} type, has been automatically modified to ${polyfillValue}(${type}) for you`)
  }

  // 缺少类型兼容时的提示
  protected promptForMissingTypeCompatibility() {
    console.log(`there is currently no type compatibility, please click https://github.com/erqiu-sj/memoRepo/issues Bring up an issue`)
  }

  getType(): str {
    return this.typePolyfill.getType()
  }

  isEmpty() {
    return this.conversionType.empty(this.value, this.typePolyfill.getValueType(this.value))
  }
}

export type DeepObjectToValuePolyFillTypes<T extends object> = T extends object
  ? T extends any[]
    ? ValuePolyFill<T[number]>[]
    : T extends (...args: any[]) => any
    ? ValuePolyFill<T>
    : {
        // @ts-ignore
        [key in keyof T]: T[key] extends object ? DeepObjectToValuePolyFillTypes<T[key]> : ValuePolyFill<T[key]>
      }
  : never
