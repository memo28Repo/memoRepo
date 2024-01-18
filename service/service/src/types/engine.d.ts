import { AxiosRequestConfig } from 'axios';
import { requestConfig } from '../plugin/cache';
import { multiVersionSwitchingRequest } from '../plugin/multiVersionSwitching';
import { retryOpt } from '../plugin/retry/index';
import { interceptorImpl, triggerInterceptorImpl } from './interceptor';
/**
 *
 * 请求实现类
 *
 * @remarks
 * 不实现 由 {@link instantiation} 装饰器 重写 `getAxios` 逻辑
 *
 * @public
 *
 */
export interface serviceImpl<T = unknown> {
    /**
     *
     * 默认返回 `axios` 实例
     *
     * @public
     */
    getAxios?(): T;
}
/**
 *
 *
 * 模块 实现接口
 *
 * @public
 *
 */
export interface modulesImpl {
    /**
     * @description 拦截器列表
     *
     */
    interceptorModule?: (new (...args: unknown[]) => interceptorImpl)[];
    /**
     * @description 触发拦截器列表, 它定义了 请求触发前后的特定逻辑
     */
    triggerInterceptor?: (new (...args: unknown[]) => triggerInterceptorImpl<initializeConfigurationTypes, any>)[];
}
/**
 *
 * 请求参数类型
 *
 * @public
 */
export interface initializeConfigurationTypes extends AxiosRequestConfig, Partial<multiVersionSwitchingRequest>, Partial<requestConfig>, Partial<retryOpt> {
    debugger?: boolean;
    pocketValue?: unknown;
}
/**
 *
 * 传入一个 对象类型 返回对象类型的所有 `value` 类型
 *
 * @public
 *
 */
export type getObjValues<V = object> = V[keyof V];
