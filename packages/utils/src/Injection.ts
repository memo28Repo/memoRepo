/*
 * @Author: 邱狮杰
 * @Date: 2023-01-30 10:39:22
 * @LastEditTime: 2023-02-15 10:10:44
 * @Description:
 * @FilePath: /memo/packages/utils/src/Injection.ts
 */
import 'reflect-metadata'

export class Injection<K = string> {
  private target: null | object = null

  constructor(target: object) {
    this.setTarget(target)
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
}
