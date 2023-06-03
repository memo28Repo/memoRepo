/*
 * @Author: 邱狮杰
 * @Date: 2023-01-14 21:17:31
 * @LastEditTime: 2023-04-28 21:08:34
 * @Description:
 * @FilePath: /memo/packages/service/src/plugin/pocketBottom.ts
 */
import { AxiosResponse } from 'axios'
import { initializeConfigurationTypes } from '../types/engine'
import { beforeTriggerResultTypes, triggerInterceptorImpl } from '../types/interceptor'

export interface pocketValueTypes extends initializeConfigurationTypes {
  pocketValue: any
}

export class PocketValue implements triggerInterceptorImpl<pocketValueTypes, AxiosResponse> {
  displayName?: string | undefined = 'pocketValue'

  usePocketValue = false

  isUnexpectedSituation(result: AxiosResponse, req: pocketValueTypes) {
    return typeof result === 'object' && (Reflect.has(result, 'syscall') || Reflect.has(result, 'code')) && req?.pocketValue
  }

  afterTrigger(result: AxiosResponse, req: pocketValueTypes) {
    if (this.isUnexpectedSituation(result, req)) {
      this.usePocketValue = true
      return req?.pocketValue
    }
  }

  // @ts-ignore
  logsCallback(type: 'afterTrigger' | 'beforeTrigger', data: void | beforeTriggerResultTypes<unknown>, res: AxiosResponse): void {
    if (type !== 'afterTrigger') return
    if (this.usePocketValue) {
      console.groupCollapsed(`%c successfully used the pocketValue`, 'color: green')
      console.log(res)
      console.groupEnd()
    }
  }
}
