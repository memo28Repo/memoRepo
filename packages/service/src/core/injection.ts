/*
 * @Author: 邱狮杰
 * @Date: 2023-01-06 17:21:31
 * @LastEditTime: 2023-01-13 17:09:33
 * @Description:
 * @FilePath: /memo/packages/service/src/core/injection.ts
 */

import 'reflect-metadata'

export class Injection<K = string> {
  private isExtensible: boolean = false
  private target: null | object = null

  constructor(target: object) {
    this.isExtensible = Reflect.isExtensible(target)
    this.target = target
  }

  setValue<V = unknown>(key: K, value: V): this {
    Reflect.defineMetadata(key, value, this.target as object)
    return this
  }

  getValue<V = unknown>(key: K): V {
    return Reflect.getMetadata(key, this.target as object) as V
  }
}
