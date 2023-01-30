/*
 * @Author: 邱狮杰
 * @Date: 2023-01-27 13:07:08
 * @LastEditTime: 2023-01-27 13:15:32
 * @Description:
 * @FilePath: /memo/packages/viteBuild/src/core/injection.ts
 */

import { Injection } from '@memo28/utils'
import { injectDefaultTechnologyStackConfigurationMapperTypes } from './configureTechnologyStack'

export class InjectionHelper<K = string> {
  private injection = new Injection<K>({})

  setValue<V = unknown>(target: object, key: K, value: V): this {
    this.injection.setTarget(target).setValue(key, value)
    return this
  }

  getValue<V = unknown>(target: object, key: K): V {
    return Reflect.getMetadata(key, target as object) as V
  }
}

export default new InjectionHelper<injectDefaultTechnologyStackConfigurationMapperTypes>()
