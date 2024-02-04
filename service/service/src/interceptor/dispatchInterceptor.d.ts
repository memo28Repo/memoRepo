import { AxiosInstance } from 'axios';
import { modulesImpl } from '../types/engine';
/**
*
 * 调度拦截器
*
*  @public
*
 */
export declare class DispatchInterceptor {
    private instance;
    private serviceimplDispatchInterceptor;
    /**
     * @description 获取拦截器 和 axios实例
     */
    getAllInterceptorPlugIns(instace: AxiosInstance, list?: modulesImpl['interceptorModule']): this;
    /**
     * @description 将拦截器绑定到实例上
     */
    bindInterceptorToInstance(): this;
}
