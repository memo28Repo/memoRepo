/*
 * @Author: 邱狮杰
 * @Date: 2023-04-05 12:18:06
 * @LastEditTime: 2023-04-09 08:11:13
 * @Description: 验证接口
 * @FilePath: /memo/packages/utils/src/verify/errorCollection.ts
 */

import { bool, str, Equal } from '@memo28/types'

import Mitt, { Handler } from 'mitt'

import { AnomalousChain, panicProcessing } from '../errors/anomalousChain'

import { Errors } from '../errors/core'

import { ErrorsNewResult, Panic } from '../errors/types'

abstract class Verify<T = unknown> {
  abstract value: T
  /**
   * @description 获取值  获取前验证
   * @param args
   */
  abstract get(): T
  /**
   * @description 设置值  设置前验证
   * @param args
   */
  abstract set(args: T): this

  /**
   * @description 上报验证错误
   * @param type 错误类型
   * @param value 错误信息
   */
  abstract continuousReporting(type: keyof storeEmit, value: storeEmit[keysForStoreEmit]): this

  /**
   * @description 验证值函数
   * @param args
   */
  abstract verification(args?: T): Panic<T>
}

type storeEmit = Record<'phone', reportType<str>> & Record<'mail', reportType<str>>

type keysForStoreEmit = keyof storeEmit

const store = Mitt<storeEmit>()

export interface reportType<T = unknown> {
  msg: str
  val: T
}

/**
 * @description 验证核心
 */
export class VerificationFlow<T = unknown> extends AnomalousChain implements Verify<T> {
  value: T

  protected skip(errors: ErrorsNewResult | null): this {
    return this
  }

  constructor(args: T) {
    super()
    this.value = args
  }

  @panicProcessing()
  verification(args?: T): Panic<T> {
    return [null, args || this.value]
  }

  continuousReporting(type: keysForStoreEmit, value: storeEmit[keysForStoreEmit]) {
    store.emit(type, value)
    return this
  }

  private inspectionAndVerification(args?: T): bool {
    const [setError, _] = this.verification(args)
    if (Errors.Is(setError)) {
      this.setErrors(setError as ErrorsNewResult)
      return false
    }
    return true
  }

  @panicProcessing()
  set(args: T): this {
    if (this.inspectionAndVerification(args)) {
      this.value = args
    }
    return this
  }

  @panicProcessing()
  get(): T {
    this.verification()
    return this.value
  }
}

/**
 * @description 错误集合
 */
export class ValidationErrorCollection<T extends object> {
  // @ts-ignore
  registrationListeningError<K extends keysForStoreEmit | keyof T>(type: K, cb: Handler<Equal<T[K], unknown> extends true ? storeEmit[K] : reportType<T[K]>>) {
    // @ts-ignore
    store.on(type, cb)
    return this
  }
}
