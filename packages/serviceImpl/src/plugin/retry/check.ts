/*
 * @Author: 邱狮杰
 * @Date: 2023-05-13 09:15:44
 * @LastEditTime: 2023-05-13 21:12:09
 * @Description: 
 * @FilePath: /memo/packages/serviceImpl/src/plugin/retry/check.ts
 */

import isRetryAllowed from './isRetryAllowed'

// 请求方法
const SAFE_HTTP_METHODS = ['get', 'head', 'options'];
// 等密请求方法
const IDEMPOTENT_HTTP_METHODS = SAFE_HTTP_METHODS.concat(['put', 'delete']);

export interface ErrInstance {
    code: string
    response: any
    config: any
}

export const namespace = "retry"

export interface getCurrentStateResponse {
    retryCount: number
    lastRequestTime: number
    startRetry: boolean // 是否开始重试
}

export interface getRequestOptionsResponse<Err = ErrInstance, Config = object> {
    retries: number
    retryCondition: (error: Err) => boolean,
    retryDelay: number,
    shouldResetTimeout: false
    onRetry: (count: number, error: Err, config: Config) => void
}

export type onRetrySuc = (response: any) => void

export class CheckRetry<Err extends ErrInstance = ErrInstance, Instance extends object = object, Config extends object = object> {
    /**
     * 
     * 判断是否是请求错误
     * 
     * @param  {AxiosError}  error
     * 
     * @public
     * 
     */
    isNetworkError(error: Err): boolean {
        return (
            !Reflect.has(error, 'response') &&
            Reflect.has(error, 'code') && // Prevents retrying cancelled requests
            Reflect.get(error, 'code') !== 'ECONNABORTED' && // Prevents retrying timed out requests
            isRetryAllowed(error as any)
        ); // Prevents retrying unsafe errors
    }



    /**
     * 
     * 是否是链接失败请求
     * 
     * @param  {AxiosError}  error
     * 
     * @public
     * 
     */
    isRetryableError(error: Err): boolean {
        return (
            error?.code !== 'ECONNABORTED' &&
            (!error?.response || (error.response?.status >= 500 && error?.response?.status <= 599))
        );
    }


    /**
     * 
     * 是否满足等幂重试请求
     * 
     * @param  {Error}  error
     * 
     * @public
     */
    isIdempotentRequestError(error: Err) {
        if (!error.config) {
            return false;
        }

        return this.isRetryableError(error) && IDEMPOTENT_HTTP_METHODS.indexOf(error.config.method as string) !== -1;
    }

    /**
     * 
     * 是否满足普通重试请求
     * 
     * @param  {AxiosError}  error
     * 
     */
    isSafeRequestError(error: Err): boolean {
        if (!error.config) {
            return false;
        }

        return this.isRetryableError(error) && SAFE_HTTP_METHODS.indexOf(error?.config?.method as string) !== -1;
    }

    /**
     * 
     * 是否满足请求重试条件
     * 
     * @param  {AxiosError}  error
     * 
     * @public
     */
    isNetworkOrIdempotentRequestError(error: Err): boolean {
        return this.isNetworkError(error) || this.isIdempotentRequestError(error);
    }


    /**
     * @param  {Axios} axios
     * @param  {AxiosRequestConfig} config
     */
    fixConfig(axios: Instance, config: Config) {
        // @ts-ignore
        if (axios.defaults?.agent === config?.agent) {
            // @ts-ignore
            delete config?.agent;
        }
        // @ts-ignore
        if (axios?.defaults?.httpAgent === config?.httpAgent) {
            // @ts-ignore
            delete config?.httpAgent;
        }
        // @ts-ignore
        if (axios?.defaults?.httpsAgent === config?.httpsAgent) {
            // @ts-ignore
            delete config.httpsAgent;
        }
    }


    /**
     * 如果可以重试请求，则检查重试条件。处理它的重新调整值或Promise
     * 
     * @param  {number} retries
     * @param  {Function} retryCondition
     * @param  {Object} currentState
     * @param  {Error} error
     * 
     */
    async shouldRetry(retries: number, retryCondition: Function, currentState: getCurrentStateResponse, error: Err) {
        const shouldRetryOrPromise = currentState.retryCount < retries && retryCondition(error);

        if (typeof shouldRetryOrPromise === 'object') {
            try {
                const shouldRetryPromiseResult = await shouldRetryOrPromise;
                return shouldRetryPromiseResult !== false;
            } catch (_err) {
                return false;
            }
        }
        return shouldRetryOrPromise;
    }
    /**
     * 
     * 获取重试次数
     * 
     * @param  {initializeConfigurationTypes} config
     * 
     * @return {number}
     * 
     */
    getCurrentState(config: Config): getCurrentStateResponse {
        const currentState = config?.[namespace as keyof Config] as getCurrentStateResponse || { retryCount: 0, lastRequestTime: 0, startRetry: false } as getCurrentStateResponse;
        currentState.retryCount = currentState.retryCount || 0;
        // @ts-ignore
        Reflect.set(config, namespace, currentState)
        return currentState;
    }

    getRequestOptions(config: Config, defaultOptions: object): getRequestOptionsResponse {
        // @ts-ignore
        return { ...defaultOptions, ...config[namespace] };
    }
}







/**
 * 
 * 延迟重试时间
 * 
 * @param  {number} [retryNumber=0]
 * @return {number} - delay in milliseconds
 */
export function exponentialDelay(retryNumber: number = 0): number {
    const delay = Math.pow(2, retryNumber) * 100;
    const randomSum = delay * 0.2 * Math.random(); // 0-20% of the delay
    return delay + randomSum;
}


