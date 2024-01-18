import { RetryImpl, onRetrySuc, retryOpt as retryOptImpl } from "@memo28/serviceimpl";
import { AxiosInstance } from "axios";
import { initializeConfigurationTypes } from "../../index";
/**
 *
 * 重试拦截器参数类型
 *
 * @public
 *
 */
type retryOpt = {
    /**
     *
     *
     */
    retry: Partial<retryOptImpl>;
    /**
     *
     * 重试回调函数
     *
     * @remarks
     * 重试回调成功时会触发
     *
     * @public
     *
     */
    onRetrySuc: onRetrySuc;
};
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
export declare class Retry extends RetryImpl {
    /**
     *
     * 请求成功 拦截器
     *
     * @param { initializeConfigurationTypes } config - 请求配置
     *
     * @public
     */
    requestSuc(config: initializeConfigurationTypes): initializeConfigurationTypes | Promise<initializeConfigurationTypes>;
    /**
     *
     * 响应错误回调
     *
     * @param { any } error - 错误
     * @param { AxiosInstance } instance - 请求实例
     *
     * @public
     */
    responseFail(error: any, instance: AxiosInstance): Promise<void>;
}
