import { interceptorImpl } from "../../core/interceptor";
/**
 *
 *
 * 请求重试拦截器核心类
 *
 * @remarks
 * - 实现接口 {@link interceptorImpl}
 *
 * @public
 *
 */
export declare class RetryImpl<R extends object = object, RS = unknown, Ins extends object = object> implements interceptorImpl<R, RS, Ins> {
    /**
     *
     * 重试核心类
     *
     *
     * @defaultValue
     * 请求重试封装核心逻辑
     * {@link CheckRetry}
     *
     * @private
     *
     * @public
     */
    private checkRetry;
    /**
     *
     * 请求拦截器
     *
     * @param { R } config - 请求参数类型
     *
     * @public
     */
    requestSuc(config: R): R | Promise<R>;
    /**
     *
     * 响应成功拦截器
     *
     * @param { RS } response - 响应类型
     *
     * @public
     */
    responseSuc(response: RS): unknown;
    /**
     * 响应错误拦截器
     *
     *
     * @param { any } error - 错误信息
     * @param { Ins }  instance - 请求实例
     *
     * @public
     */
    responseFail(error: any, instance: Ins): Promise<unknown>;
}
