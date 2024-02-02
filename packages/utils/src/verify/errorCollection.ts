/*
 * @Author: 邱狮杰
 * @Date: 2023-04-05 12:18:06
 * @LastEditTime: 2023-04-09 09:10:12
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
   * 获取值  获取前验证
   * @param args
   */
  abstract get(): T
  /**
   * 设置值  设置前验证
   * @param args
   */
  abstract set(args: T): this

  /**
   * 上报验证错误
   * @param type 错误类型
   * @param value 错误信息
   */
  abstract continuousReporting(type: keyof storeEmit, value: storeEmit[keysForStoreEmit]): this

  /**
   * 验证值函数
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
 * 验证核心
 *
 * @remarks
 *
 * @public
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


  /**
   *
   * 通常继承 {@link VerificationFlow} 后该方法都必须重写为您的验证逻辑 用于判断验证值是否正确
   *
   * @param args - 验证值
   *
   * @public
   */
  @panicProcessing()
  verification(args?: T): Panic<T> {
    return [null, args || this.value]
  }

  continuousReporting(type: keysForStoreEmit, value: storeEmit[keysForStoreEmit]) {
    store.emit(type, value)
    return this
  }

  /**
   *
   * 检查和验证值
   *
   * 调用 `verification` 判断是否返回一个带有错误的 {@link Panic} 类型的值
   *
   * 如果存在错误则返回 `false` 反之
   *
   * @param args - 验证的值
   *
   * @return boolean
   *
   * @private
   *
   *
   */
  private inspectionAndVerification(args?: T): bool {
    const [setError, _] = this.verification(args)
    if (Errors.Is(setError)) {
      this.setErrors(setError as ErrorsNewResult)
      return false
    }
    return true
  }


  /**
   *
   * 重新赋值时需校验 无误后赋值
   *
   * @param args - 新值
   *
   * @public
   */
  @panicProcessing()
  set(args: T): this {
    if (this.inspectionAndVerification(args)) {
      this.value = args
    }
    return this
  }

  /**
   *
   * 获取值
   *
   * 获取值前会先验证 取决于您的验证逻辑
   *
   * 通常在一些验证不通过的情况下 建议直接 throw 抛出 强制停止程序继续执行
   *
   * @public
   */
  @panicProcessing()
  get(): T {
    this.verification()
    return this.value
  }
}

/**
 * 错误集合
 *
 * @public
 */
export class ValidationErrorCollection<T extends object> {
  // @ts-ignore
  registrationListeningError<K extends keysForStoreEmit | keyof T>(type: K, cb: Handler<Equal<T[K], unknown> extends true ? storeEmit[K] : reportType<T[K]>>) {
    // @ts-ignore
    store.on(type, cb)
    return this
  }
}
