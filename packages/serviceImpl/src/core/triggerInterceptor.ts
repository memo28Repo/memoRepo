/*
 * @Author: 邱狮杰
 * @Date: 2023-04-22 10:49:27
 * @LastEditTime: 2023-04-22 10:52:18
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
