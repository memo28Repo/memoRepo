/*
 * @Author: 邱狮杰
 * @Date: 2023-05-13 09:15:44
 * @LastEditTime: 2024-01-04 21:43:49
 * @Description:
 * @FilePath: /playground/Users/devops/Desktop/monorepo/memo/service/serviceImpl/src/plugin/retry/check.ts
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import isRetryAllowed from "./isRetryAllowed";
// 请求方法
const SAFE_HTTP_METHODS = ["get", "head", "options"];
// 等密请求方法
const IDEMPOTENT_HTTP_METHODS = SAFE_HTTP_METHODS.concat(["put", "delete"]);
export const namespace = "retry";
export class CheckRetry {
    /**
     *
     * 判断是否是请求错误
     *
     * @param  {AxiosError}  error
     *
     * @public
     *
     */
    isNetworkError(error) {
        return (!Reflect.has(error, "response") &&
            Reflect.has(error, "code") && // Prevents retrying cancelled requests
            Reflect.get(error, "code") !== "ECONNABORTED" && // Prevents retrying timed out requests
            isRetryAllowed(error)); // Prevents retrying unsafe errors
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
    isRetryableError(error) {
        var _a, _b;
        return ((error === null || error === void 0 ? void 0 : error.code) !== "ECONNABORTED" &&
            (!(error === null || error === void 0 ? void 0 : error.response) || (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) >= 500 && ((_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.status) <= 599)));
    }
    /**
     *
     * 是否满足等幂重试请求
     *
     * @param  {Error}  error
     *
     * @public
     */
    isIdempotentRequestError(error) {
        if (!error.config) {
            return false;
        }
        return this.isRetryableError(error) && IDEMPOTENT_HTTP_METHODS.indexOf(error.config.method) !== -1;
    }
    /**
     *
     * 是否满足普通重试请求
     *
     * @param  {AxiosError}  error
     *
     */
    isSafeRequestError(error) {
        var _a;
        if (!error.config) {
            return false;
        }
        return this.isRetryableError(error) && SAFE_HTTP_METHODS.indexOf((_a = error === null || error === void 0 ? void 0 : error.config) === null || _a === void 0 ? void 0 : _a.method) !== -1;
    }
    /**
     *
     * 是否满足请求重试条件
     *
     * @param  {AxiosError}  error
     *
     * @public
     */
    isNetworkOrIdempotentRequestError(error) {
        return this.isNetworkError(error) || this.isIdempotentRequestError(error);
    }
    /**
     * @param  {Axios} axios
     * @param  {AxiosRequestConfig} config
     */
    fixConfig(axios, config) {
        var _a, _b, _c;
        // @ts-ignore
        if (((_a = axios.defaults) === null || _a === void 0 ? void 0 : _a.agent) === (config === null || config === void 0 ? void 0 : config.agent)) {
            // @ts-ignore
            config === null || config === void 0 ? true : delete config.agent;
        }
        // @ts-ignore
        if (((_b = axios === null || axios === void 0 ? void 0 : axios.defaults) === null || _b === void 0 ? void 0 : _b.httpAgent) === (config === null || config === void 0 ? void 0 : config.httpAgent)) {
            // @ts-ignore
            config === null || config === void 0 ? true : delete config.httpAgent;
        }
        // @ts-ignore
        if (((_c = axios === null || axios === void 0 ? void 0 : axios.defaults) === null || _c === void 0 ? void 0 : _c.httpsAgent) === (config === null || config === void 0 ? void 0 : config.httpsAgent)) {
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
    shouldRetry(retries, retryCondition, currentState, error) {
        return __awaiter(this, void 0, void 0, function* () {
            const shouldRetryOrPromise = currentState.retryCount < retries && retryCondition(error);
            console.log(shouldRetryOrPromise, 'shouldRetryOrPromise');
            if (typeof shouldRetryOrPromise === "object") {
                try {
                    const shouldRetryPromiseResult = yield shouldRetryOrPromise;
                    return shouldRetryPromiseResult !== false;
                }
                catch (_err) {
                    return false;
                }
            }
            return shouldRetryOrPromise;
        });
    }
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
    getCurrentState(config) {
        const currentState = (config === null || config === void 0 ? void 0 : config[namespace]) || {
            retryCount: 0,
            lastRequestTime: 0,
            startRetry: false
        };
        currentState.retryCount = currentState.retryCount || 0;
        // @ts-ignore
        Reflect.set(config, namespace, currentState);
        return currentState;
    }
    /**
     * 获取请求参数
     *
     * @param { Config } config - 请求配置
     * @param { object } defaultOptions - 请求原配置
     *
     * @public
     */
    getRequestOptions(config, defaultOptions) {
        // @ts-ignore
        return Object.assign(Object.assign({}, defaultOptions), config[namespace]);
    }
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
export function exponentialDelay(retryNumber = 0) {
    const delay = Math.pow(2, retryNumber) * 100;
    const randomSum = delay * 0.2 * Math.random(); // 0-20% of the delay
    return delay + randomSum;
}
