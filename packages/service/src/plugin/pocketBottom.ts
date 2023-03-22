/*
 * @Author: 邱狮杰
 * @Date: 2023-01-14 21:17:31
 * @LastEditTime: 2023-03-22 10:26:21
 * @Description:
 * @FilePath: /memo/packages/service/src/plugin/pocketBottom.ts
 */
import { AxiosResponse } from 'axios'
import { initializeConfigurationTypes } from '../types/engine'
import { triggerInterceptorImpl } from '../types/interceptor'

export interface pocketValueTypes extends initializeConfigurationTypes {
  pocketValue: any
}

export class PocketValue implements triggerInterceptorImpl<pocketValueTypes, AxiosResponse> {
  afterTrigger(result: AxiosResponse, req: pocketValueTypes) {
    if (typeof result === 'object' && (Reflect.has(result, 'syscall') || Reflect.has(result, 'code')) && req?.pocketValue) {
      return req?.pocketValue
    }
  }
}
