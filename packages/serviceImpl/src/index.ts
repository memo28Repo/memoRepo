/*
 * @Author: 邱狮杰
 * @Date: 2023-04-22 10:14:33
 * @LastEditTime: 2023-05-13 09:43:27
 * @Description:
 * @FilePath: /memo/packages/serviceImpl/src/index.ts
 */

export { interceptorImpl, DispatchInterceptor } from './core/interceptor'
export { triggerInterceptorImpl, TriggerInterceptor } from './core/triggerInterceptor'
export { onRetrySuc, CheckRetry, namespace, exponentialDelay, getRequestOptionsResponse as retryOpt } from './plugin/retry/check'
export { RetryImpl } from './plugin/retry/index'
