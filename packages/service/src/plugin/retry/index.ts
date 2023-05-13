/*
 * @Author: 邱狮杰
 * @Date: 2023-05-13 07:45:18
 * @LastEditTime: 2023-05-13 11:05:39
 * @Description: 
 * @FilePath: /memo/packages/service/src/plugin/retry/index.ts
 */

import { RetryImpl, retryOpt as retryOptImpl, onRetrySuc } from '@memo28/serviceimpl';
import { AxiosInstance } from 'axios';
import { initializeConfigurationTypes, } from '../../index';

type retryOpt = {
    retry: Partial<retryOptImpl>
    onRetrySuc: onRetrySuc
}

export { retryOpt };


/**
 * 
 * 
 * @public
 */
export class Retry extends RetryImpl {
    requestSuc(config: initializeConfigurationTypes): initializeConfigurationTypes | Promise<initializeConfigurationTypes> {
        super.requestSuc(config)
        return config
    }

    async responseFail(error: any, instance: AxiosInstance) {
        super.responseFail(error, instance)
    }
}
// http({
//     retry: {
//         retries: 8
//     }
// })