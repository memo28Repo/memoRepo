import { AxiosResponse } from 'axios';
import { initializeConfigurationTypes } from '../../types/engine';
import { interceptorImpl } from '../../types/interceptor';
/**
 *
 * 请求 `log` 拦截器
 *
 * @remarks
 * - 根据配置中的 `debugger` 字段判断开启
 *
 * @public
 */
export declare class Logs implements interceptorImpl {
    requestSuc(config: initializeConfigurationTypes): initializeConfigurationTypes | Promise<initializeConfigurationTypes>;
    requestFail(error: any): void;
    responseSuc(response: AxiosResponse<unknown, any>): unknown;
    responseFail(error: any): any;
}
export { TriggerInterceptorLog } from './triggerInterceptorLog';
