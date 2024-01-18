import { AxiosResponse } from 'axios';
import { interceptorImpl } from '../types/interceptor';
/**
 * 响应直接返回 `response.data`
 *
 * @public
 */
export declare class RetData implements interceptorImpl {
    displayName?: string | undefined;
    responseSuc(value: AxiosResponse<unknown, any>): AxiosResponse<unknown, any> | Promise<AxiosResponse<unknown, any>> | unknown;
}
