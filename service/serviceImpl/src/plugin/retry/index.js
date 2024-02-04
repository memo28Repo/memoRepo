var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CheckRetry } from "./check";
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
export class RetryImpl {
    constructor() {
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
        this.checkRetry = new CheckRetry();
    }
    /**
     *
     * 请求拦截器
     *
     * @param { R } config - 请求参数类型
     *
     * @public
     */
    requestSuc(config) {
        const cur = this.checkRetry.getCurrentState(config);
        cur.lastRequestTime = Date.now();
        return config;
    }
    /**
     *
     * 响应成功拦截器
     *
     * @param { RS } response - 响应类型
     *
     * @public
     */
    responseSuc(response) {
        var _a;
        const state = this.checkRetry.getCurrentState(Reflect.get(response, "config"));
        const config = Reflect.get(response, "config");
        if (state.startRetry) {
            // 重试成功之后
            state.startRetry = false;
            // 触发重试成功回调
            (_a = config === null || config === void 0 ? void 0 : config.onRetrySuc) === null || _a === void 0 ? void 0 : _a.call(config, response);
        }
        return response;
    }
    /**
     * 响应错误拦截器
     *
     *
     * @param { any } error - 错误信息
     * @param { Ins }  instance - 请求实例
     *
     * @public
     */
    responseFail(error, instance) {
        return __awaiter(this, void 0, void 0, function* () {
            const { config } = error;
            if (!config)
                return;
            const { retries = 0, retryCondition = this.checkRetry.isNetworkOrIdempotentRequestError.bind(this.checkRetry), retryDelay = 0, shouldResetTimeout = false, onRetry = () => {
            } } = this.checkRetry.getRequestOptions(config, {});
            const currentState = this.checkRetry.getCurrentState(config);
            if (yield this.checkRetry.shouldRetry(retries, retryCondition, currentState, error)) {
                currentState.retryCount += 1;
                currentState.startRetry = true;
                const delay = retryDelay;
                this.checkRetry.fixConfig(instance, config);
                if (!shouldResetTimeout && config.timeout && currentState.lastRequestTime) {
                    const lastRequestDuration = Date.now() - currentState.lastRequestTime;
                    const timeout = config.timeout - lastRequestDuration - delay;
                    if (timeout <= 0) {
                        return Promise.reject(error);
                    }
                    config.timeout = timeout;
                }
                onRetry(currentState.retryCount, error, config);
                // @ts-ignore
                return new Promise((resolve) => setTimeout(() => resolve(instance(config)), delay));
            }
        });
    }
}
