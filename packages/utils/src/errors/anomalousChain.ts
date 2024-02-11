/*
 * @Author: 邱狮杰
 * @Date: 2023-03-06 22:35:05
 * @LastEditTime: 2024-02-11 13:49:59
 * @Description: 异常链
 * @FilePath: /memo/packages/utils/src/errors/anomalousChain.ts
 */
import { ErrorsNewResult } from './types'

/**
 * @description
 *
 * @public
 */
export interface AnomalousChainImpl {
  skip(errors: ErrorsNewResult | null): this
  setErrors(err: ErrorsNewResult): void
  errors: ErrorsNewResult | null
}

/**
 *
 * 处理错误class, 将错误封装到该类中，从类中获取操作错误的方法
 *
 * @remarks
 *
 * @example class A extends  AnomalousChain {}
 *
 * @public
 */
export class AnomalousChain {
  private errors: ErrorsNewResult | null = null

  /**
   * @description 当发生错误时 被 panicProcessing 装饰器包裹的方法会停止执行并且 调用该 skip 函数
   * @param { ErrorsNewResult } errors
   * @returns { this }
   */
  protected skip(errors: ErrorsNewResult | null): this {
    this.errors = errors
    return this
  }

  /**
   * @description 设置错误值
   * @param { ErrorsNewResult } err
   */
  protected setErrors(err: ErrorsNewResult) {
    this.errors = err
  }

  /**
   * @description 将错误置空
   */
  protected recover() {
    this.errors = null
  }

  /**
   * @description 获取错误
   * @returns { null | ErrorsNewResult }
   */
  protected getErrors() {
    return this.errors
  }
}

/**
 * @public
 */
export interface panicProcessingOpt {
  onError: (error: ErrorsNewResult) => void
  onRecover: (error: ErrorsNewResult) => boolean
}

/**
 *
 * 方法装饰器, 该装饰器会检查 AnomalousChain 中的错误对象是否为空， 如果不为空 则停止执行被装饰的函数
 *
 * @remarks
 * 必须搭配 {@link AnomalousChain}
 *
 * @param { Partial<panicProcessingOpt> } opt
 *
 * @public
 */
export function panicProcessing(opt?: Partial<panicProcessingOpt>) {
  return (target: any, key: string, desc: TypedPropertyDescriptor<any>) => {
    const fn = desc.value
    let res = null
    desc.value = function (...args: any[]) {
      // @ts-ignore
      const err = target.errors || this.errors
      if (err && opt?.onRecover?.(err)) {
        target.recover()
      }
      res = fn.call(this, ...args)

      if (err) {
        opt?.onError?.(err)
        target.skip.call(this, err)
        return res
      }
      return res
    }
  }
}
