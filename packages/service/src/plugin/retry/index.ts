/*
 * @Author: 邱狮杰
 * @Date: 2023-05-13 07:45:18
 * @LastEditTime: 2023-05-13 11:05:39
 * @Description:
 * @FilePath: /memo/packages/service/src/plugin/retry/index.ts
 */

import { RetryImpl, retryOpt as retryOptImpl, onRetrySuc } from "@memo28/serviceimpl";
import { AxiosInstance } from "axios";
import { initializeConfigurationTypes } from "../../index";

type retryOpt = {
  retry: Partial<retryOptImpl>
  onRetrySuc: onRetrySuc
}

export { retryOpt };


/**
 *
 *
 * 请求重试 拦截器
 *
 * @remarks
 * - 核心逻辑依赖 `@memo28/serviceimpl.RetryImpl` 类
 *
 *
 * @public
 */
export class Retry extends RetryImpl {

  /**
   *
   * 请求成功 拦截器
   *
   * @param { initializeConfigurationTypes } config - 请求配置
   *
   * @public
   */
  requestSuc(config: initializeConfigurationTypes): initializeConfigurationTypes | Promise<initializeConfigurationTypes> {
    super.requestSuc(config);
    return config;
  }


  /**
   *
   * 响应错误回调
   *
   * @param { any } error - 错误
   * @param { AxiosInstance } instance - 请求实例
   *
   * @public
   */
  async responseFail(error: any, instance: AxiosInstance) {
    super.responseFail(error, instance);
  }
}
