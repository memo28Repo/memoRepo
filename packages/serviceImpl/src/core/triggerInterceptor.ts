/*
 * @Author: 邱狮杰
 * @Date: 2023-04-22 10:49:27
 * @LastEditTime: 2023-04-28 22:39:43
 * @Description:
 * @FilePath: /memo/packages/serviceImpl/src/core/triggerInterceptor.ts
 */

/**
 *
 * 拦截器前后置触发器  在请求前后 拦截器前后触发
 *
 *
 * @public
 *
 */
export type triggerInterceptorImpl<Req = unknown, Res = unknown> = {
  displayName?: string
  beforeTrigger?(config: Req): Promise<Res | void>
  afterTrigger?<T = unknown>(res: Res, req: Req): Promise<T | void>
  logsCallback?(type: 'afterTrigger' | 'beforeTrigger', data: void | Res | Req, res?: unknown): void
}

/**
 *
 *
 * 前置拦截器返回类型
 *
 * @public
 *
 */
export interface beforeTriggerResultTypes<T> {
  data: T
  directReturnValue?: boolean // 是否直接返回值
}

export class TriggerInterceptor<Req = unknown, Res = unknown> {
  protected triggerInterceptorList: triggerInterceptorImpl<Req, Res>[] = []

  constructor(list: (new (...args: unknown[]) => triggerInterceptorImpl<Req, Res>)[]) {
    this.triggerInterceptorList = this.loopInstantiation(list)
  }

  protected loopInstantiation(list: (new (...args: unknown[]) => triggerInterceptorImpl<Req, Res>)[]): triggerInterceptorImpl<Req, Res>[] {
    return (
      list?.map(item => {
        return Reflect.construct(item, [])
      }) || []
    )
  }

  async dispatchBefore(config: Req, callback?: (item: triggerInterceptorImpl<Req, Res>, result: beforeTriggerResultTypes<unknown>) => void): Promise<Req | unknown> {
    let c: Req | unknown = config
    for (let i = 0; i < this.triggerInterceptorList.length; i++) {
      const item = this.triggerInterceptorList[i]
      let result = (await item?.beforeTrigger?.((c || {}) as Req)) as beforeTriggerResultTypes<unknown>
      callback?.(item, result)
      if (result?.directReturnValue) {
        c = result
        break
      }
      c = result ?? c
    }
    return c
  }

  async dispatchAfter(config: Req, res: any, callback?: (item: triggerInterceptorImpl<Req, Res>, result: Req) => void) {
    let c = res
    for (let i = 0; i < this.triggerInterceptorList.length; i++) {
      const item = this.triggerInterceptorList[i]
      c = (await item?.afterTrigger?.(c, config)) || c
      callback?.(item, c)
    }
    return c
  }
}
