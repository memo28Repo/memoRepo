/*
 * @Author: 邱狮杰
 * @Date: 2023-01-30 10:39:22
 * @LastEditTime: 2023-10-05 00:08:19
 * @Description:
 * @FilePath: /memo/packages/utils/src/Injection.ts
 */
import 'reflect-metadata'

export class Injection<K = string> {
  private target: null | object = null

  constructor(target?: object) {
    target && this.setTarget(target)
  }

  setTarget(target: object) {
    this.target = target
    return this
  }

  setValue<V = unknown>(key: K, value: V): this {
    Reflect.defineMetadata(key, value, this.target as object)
    return this
  }

  getValue<V = unknown>(key: K): V {
    return Reflect.getMetadata(key, this.target as object) as V
  }

  getKeys() {
    return Reflect.getMetadataKeys(this.target as object)
  }
}
