export interface ErrInstance {
    code: string;
    response: any;
    config: any;
}
export declare const namespace = "retry";
export interface getCurrentStateResponse {
    retryCount: number;
    lastRequestTime: number;
    startRetry: boolean;
}
export interface getRequestOptionsResponse<Err = ErrInstance, Config = object> {
    retries: number;
    retryCondition: (error: Err) => boolean;
    retryDelay: number;
    shouldResetTimeout: boolean;
    onRetry: (count: number, error: Err, config: Config) => void;
}
export type onRetrySuc = (response: any) => void;
export declare class CheckRetry<Err extends ErrInstance = ErrInstance, Instance extends object = object, Config extends object = object> {
    /**
     *
     * 判断是否是请求错误
     *
     * @param  {AxiosError}  error
     *
     * @public
     *
     */
    isNetworkError(error: Err): boolean;
    /**
     *
     * 是否是链接失败请求
     *
     * @param  {AxiosError}  error
     *
     * @public
     *
     */
    isRetryableError(error: Err): boolean;
    /**
     *
     * 是否满足等幂重试请求
     *
     * @param  {Error}  error
     *
     * @public
     */
    isIdempotentRequestError(error: Err): boolean;
    /**
     *
     * 是否满足普通重试请求
     *
     * @param  {AxiosError}  error
     *
     */
    isSafeRequestError(error: Err): boolean;
    /**
     *
     * 是否满足请求重试条件
     *
     * @param  {AxiosError}  error
     *
     * @public
     */
    isNetworkOrIdempotentRequestError(error: Err): boolean;
    /**
     * @param  {Axios} axios
     * @param  {AxiosRequestConfig} config
     */
    fixConfig(axios: Instance, config: Config): void;
    /**
     * 如果可以重试请求，则检查重试条件。处理它的重新调整值或Promise
     *
     * @param  {number} retries
     * @param  {Function} retryCondition
     * @param  {Object} currentState
     * @param  {Error} error
     *
     */
    shouldRetry(retries: number, retryCondition: Function, currentState: getCurrentStateResponse, error: Err): Promise<any>;
    /**
     *
     * 获取重试次数
     *
     * @param  { Config } config - 请求配置
     *
     * @returns {number}
     *
     * @public
     *
     */
    getCurrentState(config: Config): getCurrentStateResponse;
    /**
     * 获取请求参数
     *
     * @param { Config } config - 请求配置
     * @param { object } defaultOptions - 请求原配置
     *
     * @public
     */
    getRequestOptions(config: Config, defaultOptions: object): getRequestOptionsResponse;
}
/**
 *
 * 延迟重试时间
 *
 * @param  {number} [retryNumber=0]
 *
 * @return {number} - delay in milliseconds
 *
 * @public
 */
export declare function exponentialDelay(retryNumber?: number): number;
