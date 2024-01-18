import { AxiosResponse } from 'axios';
import { initializeConfigurationTypes, interceptorImpl } from '../../index';
/**
 *
 * `loading` 参数配置
 *
 * @public
 *
 */
export interface LoadingOpt {
    /**
     *
     * 开始 `loaindg` 回调
     *
     * @public
     */
    onStartLoading(): void;
    /**
     *
     * 隐藏 `loading` 回调
     *
     * @public
     */
    onHideLoading(): void;
    /**
     *
     * 开始`loading`回调 触发延迟
     *
     *
     * @defaultValue 600
     *
     * @public
     */
    loadingDelay: number;
}
/**
 *
 *
 * `loading` 模块拦截器
 *
 * @remarks
 * 当你的请求频繁触发 则不建议 配置该模块 因为视图会频繁 `loading`
 *
 * @public
 *
 */
export declare class Loading implements interceptorImpl {
    requestSuc(config: initializeConfigurationTypes & Partial<LoadingOpt>): initializeConfigurationTypes | Promise<initializeConfigurationTypes>;
    requestFail(error: any): any;
    responseSuc(response: AxiosResponse<unknown, any>): unknown;
    responseFail(error: any): void;
}
