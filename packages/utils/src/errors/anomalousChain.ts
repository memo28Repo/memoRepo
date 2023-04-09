/*
 * @Author: 邱狮杰
 * @Date: 2023-03-06 22:35:05
 * @LastEditTime: 2023-04-05 12:31:30
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
  private errors: ErrorsNewResult | null = null

  protected skip(errors: ErrorsNewResult | null): this {
    return this
  }

  protected setErrors(err: ErrorsNewResult) {
    this.errors = err
  }

  protected recover() {
    this.errors = null
  }
  protected getErrors() {
    return this.errors
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
      // @ts-ignore
      const err = target.errors || this.errors
      if (err && opt?.onRecover?.(err)) {
        target.recover()
      }
      if (err) {
        opt?.onError?.(err)
        res = target.skip(err)
        return res
      }
      res = fn.call(this, ...args)
      return res
    }
  }
}
