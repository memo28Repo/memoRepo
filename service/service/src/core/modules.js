/*
 * @Author: 邱狮杰
 * @Date: 2023-01-06 17:00:20
 * @LastEditTime: 2023-09-22 10:52:32
 * @Description:
 * @FilePath: /memo/packages/service/src/core/modules.ts
 */
import { Injection } from '@memo28/utils';
import { Logs } from '../plugin/logs/index';
import { PocketValue } from '../plugin/pocketBottom';
const modulesKeys = {
    interceptorModule: 'interceptorModule',
    triggerInterceptor: 'triggerInterceptor',
};
/**
 *
 * 配置模块
 *
 * @param { modulesImpl } conf - 配置拦截器，前后置拦截器
 *
 * @defaultValue
 * - 拦截器 默认配置 {@link Logs}
 * - 前后置拦截器 默认配置 {@link PocketValue}
 *
 * @public
 */
export function modules(conf) {
    return (target) => {
        const injection = new Injection(target);
        injection.setValue('interceptorModule', [Logs, ...((conf === null || conf === void 0 ? void 0 : conf.interceptorModule) || [])]);
        injection.setValue('triggerInterceptor', [...((conf === null || conf === void 0 ? void 0 : conf.triggerInterceptor) || []), PocketValue]);
    };
}
