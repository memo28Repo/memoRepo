import { interceptorImpl as serviceimplWithInterceptorImpl, triggerInterceptorImpl as serviceimplWithTriggerInterceptorImpl } from '@memo28/serviceimpl';
import { AxiosInstance, AxiosResponse } from 'axios';
import { initializeConfigurationTypes, modulesImpl } from './engine';
/**
 * 拦截器需要实现的字段
 *
 * @public
 */
export type interceptorImpl<R = unknown, RS = unknown> = serviceimplWithInterceptorImpl<initializeConfigurationTypes & R, AxiosResponse & RS, AxiosInstance>;
/**
 *
 * 前置拦截器返回类型
 *
 *
 * @paramType  T - 携带参数类型
 *
 * @public
 *
 */
export interface beforeTriggerResultTypes<T> {
    /**
     *
     * 前置拦截器携带的参数
     *
     * @paramType  T - 携带参数类型
     *
     * @public
     */
    data: T;
    /**
     * 是否直接返回值
     *
     * @remarks
     * - 如果返回 `true` 则该请求的响应直接返回携带参数
     *
     * @public
     */
    directReturnValue?: boolean;
}
/**
 * 触发拦截器需要实现的字段
 *
 * @public
 */
export type triggerInterceptorImpl<Req extends initializeConfigurationTypes = initializeConfigurationTypes, Res = unknown> = serviceimplWithTriggerInterceptorImpl<Req, Res>;
/**
 *
 *
 * 抽象类
 * 拦截模块工具类
 *
 * @public
 */
export declare abstract class interceptorToolboxImpl {
    /**
     *
     * 抽象方法
     * 循环解析拦截器列表
     *
     * @param { modulesImpl['interceptorModule'] } list - 拦截模块列表
     *
     * @public
     */
    abstract loopInstancedInterceptor(list?: modulesImpl['interceptorModule']): interceptorImpl[];
}
