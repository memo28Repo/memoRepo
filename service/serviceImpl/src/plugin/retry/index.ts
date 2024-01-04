/*
 * @Author: 邱狮杰
 * @Date: 2023-05-13 09:29:04
 * @LastEditTime: 2023-05-13 21:12:25
 * @Description: 重试实现
 * @FilePath: /memo/packages/serviceImpl/src/plugin/retry/index.ts
 */
import { interceptorImpl } from "../../core/interceptor";
import { CheckRetry, getCurrentStateResponse, getRequestOptionsResponse, onRetrySuc } from "./check";


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
export class RetryImpl<R extends object = object, RS = unknown, Ins extends object = object> implements interceptorImpl<R, RS, Ins> {


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
  private checkRetry = new CheckRetry<any, Ins, R>();


  /**
   *
   * 请求拦截器
   *
   * @param { R } config - 请求参数类型
   *
   * @public
   */
  requestSuc(config: R): R | Promise<R> {
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
  responseSuc(response: RS): unknown {
    const state = this.checkRetry.getCurrentState(Reflect.get(response as object, "config")) as getCurrentStateResponse & getRequestOptionsResponse;
    const config = Reflect.get(response as {}, "config") as {
      onRetrySuc: onRetrySuc
    };
    if (state.startRetry) {
      // 重试成功之后
      state.startRetry = false;
      // 触发重试成功回调
      config?.onRetrySuc?.(response);
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
  async responseFail(error: any, instance: Ins) {
    const { config } = error;
    if (!config) return;

    const {
      retries = 0,
      retryCondition = this.checkRetry.isNetworkOrIdempotentRequestError.bind(this.checkRetry),
      retryDelay = 0,
      shouldResetTimeout = false,
      onRetry = () => {
      }
    } = this.checkRetry.getRequestOptions(config, {});

    const currentState = this.checkRetry.getCurrentState(config);

    if (await this.checkRetry.shouldRetry(retries, retryCondition, currentState, error)) {
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
  }

}
