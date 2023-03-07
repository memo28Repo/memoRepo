/*
 * @Author: 邱狮杰
 * @Date: 2023-03-06 22:35:05
 * @LastEditTime: 2023-03-07 17:05:22
 * @Description: 异常链
 * @FilePath: /memo/packages/utils/src/errors/anomalousChain.ts
 */
import { ErrorsNewResult } from './types'

export interface AnomalousChainImpl {
  skip(errors: ErrorsNewResult | null): this
  setErrors(err: ErrorsNewResult): void
  errors: ErrorsNewResult | null
}

export class AnomalousChain {
  protected errors: ErrorsNewResult | null = null

  protected skip(errors: ErrorsNewResult | null): this {
    return this
  }

  protected setErrors(err: ErrorsNewResult) {
    this.errors = err
  }
  protected recover() {
    this.errors = null
  }
}

export interface panicProcessingOpt {
  onError: (error: ErrorsNewResult) => void
  onRecover: (error: ErrorsNewResult) => boolean
}

export function panicProcessing(opt?: Partial<panicProcessingOpt>) {
  return (target: any, key: string, desc: TypedPropertyDescriptor<any>) => {
    const fn = desc.value
    let res = null
    desc.value = function (...args: any[]) {
      if (target.errors && opt?.onRecover?.(target.errors)) {
        target.recover()
      }
      if (target.errors) {
        opt?.onError?.(target.errors)
        res = target.skip(target.errors)
        return res
      }
      res = fn.call(target, ...args)
      return res
    }
  }
}
