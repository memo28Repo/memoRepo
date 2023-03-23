/*
 * @Author: 邱狮杰
 * @Date: 2023-03-23 17:33:24
 * @LastEditTime: 2023-03-23 17:43:48
 * @Description:
 * @FilePath: /memo/packages/service/src/plugin/loading/index.ts
 */
import { AxiosResponse } from 'axios'
import { initializeConfigurationTypes, interceptorImpl } from '../../index'

export interface LoadingOpt {
  onStartLoading(): void
  onHideLoading(): void
  loadingDelay: number
}
let timer: NodeJS.Timeout | number = 0

export class Loading implements interceptorImpl {
  requestSuc(config: initializeConfigurationTypes & Partial<LoadingOpt>): initializeConfigurationTypes | Promise<initializeConfigurationTypes> {
    if (!config.onStartLoading && !config.onHideLoading) return config
    timer = setTimeout(() => {
      config.onStartLoading?.()
    }, config?.loadingDelay || 600)
    return config
  }
  requestFail(error: any) {
    clearTimeout(timer)
    return error
  }

  responseSuc(response: AxiosResponse<unknown, any>): unknown {
    Reflect.get(response.config, 'onHideLoading')?.()
    clearTimeout(timer)
    return response
  }

  responseFail(error: any) {
    clearTimeout(timer)
  }
}
