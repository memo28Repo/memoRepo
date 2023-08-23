/*
 * @Author: 邱狮杰
 * @Date: 2023-04-22 10:14:33
 * @LastEditTime: 2023-05-13 20:53:01
 * @Description:
 * @FilePath: /memo/packages/serviceImpl/src/index.ts
 */

import {versionLog} from '@memo28/logs'
// @ts-ignore
import pack from '../package.json'


versionLog({
  name: '@memo28/serviceImpl',
  version: pack.version
})




export { DispatchInterceptor } from './core/interceptor'
export type { interceptorImpl } from './core/interceptor'
export type { triggerInterceptorImpl } from './core/triggerInterceptor'
export { TriggerInterceptor } from './core/triggerInterceptor'
export { CheckRetry, namespace, exponentialDelay, } from './plugin/retry/check'
export type { onRetrySuc, getRequestOptionsResponse as retryOpt } from './plugin/retry/check'
export { RetryImpl } from './plugin/retry/index'
