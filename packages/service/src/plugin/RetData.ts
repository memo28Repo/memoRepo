/*
 * @Author: 邱狮杰
 * @Date: 2023-01-08 13:01:06
 * @LastEditTime: 2023-01-13 14:34:34
 * @Description:
 * @FilePath: /memo/packages/service/src/plugin/RetData.ts
 */
import { AxiosResponse } from 'axios'
import { interceptorImpl } from '../types/interceptor'


/**
 * 响应直接返回 `response.data`
 *
 * @public
 */
export class RetData implements interceptorImpl {
  displayName?: string | undefined = 'Ret'

  responseSuc(value: AxiosResponse<unknown, any>): AxiosResponse<unknown, any> | Promise<AxiosResponse<unknown, any>> | unknown {
    return value.data
  }
}
