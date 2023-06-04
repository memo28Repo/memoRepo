/*
 * @Author: 邱狮杰
 * @Date: 2023-03-17 09:46:29
 * @LastEditTime: 2023-03-17 22:45:26
 * @Description:
 * @FilePath: /memo/packages/utils/src/valuePolyfill/type.ts
 */

import { bool, str } from '@memo28/types'

export type compatibleTypeMappingValuesType = '[object String]' | '[object Number]' | '[object Array]' | '[object Object]' | '[object Function]' | '[object Null]' | '[object Undefined]' | '[object Boolean]'

export abstract class PolyFillBase<T extends unknown> {
  // 当前值类型
  protected abstract type: str
  // 兼容类型映射值
  protected abstract compatibleTypeMappingValues: {
    [key in compatibleTypeMappingValuesType]: any
  }
  // 检查类型 是否是可以polyfill的类型
  abstract inspectionType(): bool

  abstract setType(value: T): this

  // 返回兼容值
  abstract returnCompatibleValues(): T

  // 返回类型
  abstract getType(): str
}
