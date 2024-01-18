import { AxiosResponse } from "axios";
import { initializeConfigurationTypes } from "../types/engine";
import { beforeTriggerResultTypes, triggerInterceptorImpl } from "../types/interceptor";
/**
 *
 * 请求兜底参数类型
 *
 * @public
 *
 */
export interface pocketValueTypes extends initializeConfigurationTypes {
    pocketValue: any;
}
/**
 *
 * 请求兜底响应 拦截器前后置触发器
 *
 * @remarks
 * 当请求报错时会返回兜底值
 *
 * @public
 */
export declare class PocketValue implements triggerInterceptorImpl<pocketValueTypes, AxiosResponse> {
    displayName?: string | undefined;
    usePocketValue: boolean;
    /**
     *
     * 根据返回值判断 接口响应是否存在报错
     *
     * @param { AxiosResponse } result - 请求响应
     * @param { pocketValueTypes } req - 用户请求配置，用于读取兜底值
     *
     * @public
     */
    isUnexpectedSituation(result: AxiosResponse | Error, req: pocketValueTypes): any;
    /**
     *
     * 判断响应是否返回兜底值逻辑
     *
     * @remarks
     * 请求后置拦截器钩子
     *
     * @param { AxiosResponse } result - 响应
     *
     * @param { pocketValueTypes } req - 请求配置
     *
     * @public
     */
    afterTrigger(result: AxiosResponse, req: pocketValueTypes): any;
    /**
     *
     * `log` 日志
     *
     * @param { "afterTrigger" | "beforeTrigger" } type - 根据 `type` 判断 拦截器触发类型
     * @param { void | beforeTriggerResultTypes<unknown> } data - 前置请求拦截器
     * @param { AxiosResponse } res - 响应
     *
     * @public
     */
    logsCallback(type: "afterTrigger" | "beforeTrigger", data: void | beforeTriggerResultTypes<unknown>, res: AxiosResponse): void;
}
