/**
 * 拦截器需要实现的字段
 *
 * @typeParam {unknown} R - 请求参数类型
 *
 * @typeParam {unknown} RS - 响应参数类型
 *
 * @typeParam {unknown} Ins - 请求实例类型
 *
 * @example
 * ```ts
 * type impl = interceptorImpl<{ url: string }, { data: unknown }, Instance>
 * ```
 *
 * @public
 */
export interface interceptorImpl<R = unknown, RS = unknown, Ins = unknown> {
    /**
     * 调试使用 插件名
     *
     * @public
     */
    displayName?: string;
    /**
     *
     * 请求成功拦截器
     *
     * @param {R} config - 请求配置
     * @param {Ins} instance - 请求实例
     */
    requestSuc?(config: R, instance: Ins): Promise<R> | R;
    /**
     *
     * 请求失败拦截器
     *
     * @param {any} error - 请求失败
     * @param {Ins} instance - 请求实例
     */
    requestFail?(error: any, instance: Ins): any;
    /**
     *
     * 响应成功拦截器
     *
     * @param {RS} response - 响应成功
     * @param {Ins} instance - 请求实例
     */
    responseSuc?(response: RS, instance: Ins): Promise<RS> | RS | unknown;
    /**
     *
     * 响应失败拦截器
     *
     * @param {any} error - 响应错误
     * @param {Ins} instance - 请求实例
     */
    responseFail?(error: any, instance: Ins): any;
}
type requestType = 'requestSuc' | 'requestFail' | 'responseFail' | 'responseSuc';
/**
 *
 * 调度拦截器
 *
 * @public
 */
export declare class DispatchInterceptor<T extends object = object> {
    private interceptorToolbox;
    private interceptorModuleList;
    private instance;
    /**
     *
     * 保存实例
     *
     * @public
     *
     */
    setInstance(instance: T): void;
    /**
     * 获取拦截器列表
     *
     * @public
     */
    getAllInterceptorPlugIns(list?: (new (...args: unknown[]) => interceptorImpl)[]): this;
    RequestSuc(payload: unknown): unknown;
    RequestFail(payload: unknown): unknown;
    ResponseSuc(payload: unknown): unknown;
    ResponseFail(payload: unknown): unknown;
    /**
     *
     * 设置响应必须返回的参数 后续可在最后一个拦截器中清楚掉这个参数
     *
     */
    setRequestParametersWithResponse(type: requestType, response: any): void;
    private loopCall;
    getInterceptorModuleList(): interceptorImpl<unknown, unknown, unknown>[];
}
export {};
