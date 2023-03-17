/*
 * @Author: 邱狮杰
 * @Date: 2023-03-17 09:45:41
 * @LastEditTime: 2023-03-17 22:52:13
 * @Description: 基本类型检查 兼容
 * @FilePath: /memo/packages/utils/src/valuePolyfill/typePolyfill.ts
 */
import { bool } from '@memo28/types'
import { str } from '@memo28/types'
import { PolyFillBase, compatibleTypeMappingValuesType } from './type'

export class TypePolyfill<T extends unknown> extends PolyFillBase<T> {
  protected type: str = ''

  protected compatibleTypeMappingValues: { [key in compatibleTypeMappingValuesType]: any } = {
    '[object String]': '',
    '[object Number]': 0,
    '[object Array]': [],
    '[object Object]': {},
    '[object Function]': () => {},
    '[object Null]': null,
    '[object Undefined]': undefined,
    '[object Boolean]': true,
  }

  setType(value: T): this {
    this.type = this.getValueType(value)
    return this
  }

  getValueType(value: T): compatibleTypeMappingValuesType {
    return Object.prototype.toString.call(value) as compatibleTypeMappingValuesType
  }

  inspectionType(): bool {
    return Object.keys(this.compatibleTypeMappingValues).includes(this.type)
  }

  returnCompatibleValues(): T {
    return this.compatibleTypeMappingValues[this.type as compatibleTypeMappingValuesType]
  }

  getType(): compatibleTypeMappingValuesType {
    return this.type as compatibleTypeMappingValuesType
  }
}
