/*
 * @Author: 邱狮杰
 * @Date: 2023-04-22 10:14:33
 * @LastEditTime: 2023-10-12 17:46:48
 * @Description:
 * @FilePath: /memo/service/serviceImpl/src/index.ts
 */
import { versionLog } from '@memo28/logs';
// @ts-ignore
import pack from '../package.json';
versionLog({
    name: '@memo28/serviceImpl',
    version: pack.version
});
export { DispatchInterceptor } from './core/interceptor';
export { TriggerInterceptor } from './core/triggerInterceptor';
export { CheckRetry, exponentialDelay, namespace } from './plugin/retry/check';
export { RetryImpl } from './plugin/retry/index';
