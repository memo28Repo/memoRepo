import { AxiosResponse } from "axios";
import { beforeTriggerResultTypes, initializeConfigurationTypes, interceptorImpl, triggerInterceptorImpl } from "../../index";
import { CacheConfig, requestConfig } from "./config";
import { ExpirationTime } from "./utils";
export { CacheConfig, ExpirationTime, requestConfig };
/**
 *
 * 缓存先决条件判断类
 *
 * @public
 *
 */
export declare class CachePrerequisites {
    private config;
    constructor(config: requestConfig);
    areThereCachePrerequisites(): boolean;
    useCache(): unknown[];
}
/**
 *
 * 缓存拦截器
 *
 * @public
 */
export declare class Cache implements interceptorImpl {
    displayName: string;
    /**
     * @description 当符合缓存标准时 把当前响应缓存起来
     */
    responseSuc(response: AxiosResponse): AxiosResponse<any, any>;
    /**
     * @description 开启缓存的情况下会 缓存一个 rule string 并且 给当前rule 一个过期的时间戳
     */
    requestSuc(req: initializeConfigurationTypes): initializeConfigurationTypes;
}
/**
 *
 * 触发请求前后置 缓存 模块
 *
 * @remarks
 * - 触发请求前 会判断 当前路由缓存存在  存在并且未过期则 不触发请求 直接返回缓存结果
 *
 * @public
 */
export declare class CacheTrigger implements triggerInterceptorImpl {
    displayName: string;
    /**
     *
     * 发送请求前回调判断缓存是否存在 且可用
     *
     * @param { initializeConfigurationTypes } config  - 请求配置
     *
     * @public
     */
    beforeTrigger(config: initializeConfigurationTypes): any | beforeTriggerResultTypes<any>;
    /**
     *
     * 触发缓存前后置回调后的 `log` 回调
     *
     * @param { "afterTrigger" | "beforeTrigger" } type - 前后置触发拦截器类型
     * @param { void | initializeConfigurationTypes | beforeTriggerResultTypes<unknown>} data 传递的参数
     *
     * @public
     */
    logsCallback(type: "afterTrigger" | "beforeTrigger", data: void | initializeConfigurationTypes | beforeTriggerResultTypes<unknown>): void;
}
