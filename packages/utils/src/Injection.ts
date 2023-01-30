/*
 * @Author: 邱狮杰
 * @Date: 2023-01-30 10:39:22
 * @LastEditTime: 2023-01-30 10:39:23
 * @Description: 
 * @FilePath: /memo/packages/utils/src/Injection.ts
 */
import 'reflect-metadata'

export class Injection<K = string> {
  private isExtensible: boolean = false
  private target: null | object = null

  constructor(target: object) {
    this.isExtensible = Reflect.isExtensible(target)
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