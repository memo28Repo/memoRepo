/*
 * @Author: 邱狮杰
 * @Date: 2023-03-23 17:33:24
 * @LastEditTime: 2023-09-21 15:28:59
 * @Description:
 * @FilePath: /memo/packages/service/src/plugin/loading/index.ts
 */
import { AxiosResponse } from 'axios'
import { initializeConfigurationTypes, interceptorImpl } from '../../index'


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
  onStartLoading(): void

  /**
   * 
   * 隐藏 `loading` 回调
   * 
   * @public
   */
  onHideLoading(): void


  /**
   * 
   * 开始`loading`回调 触发延迟
   * 
   * 
   * @defaultValue 600
   * 
   * @public
   */
  loadingDelay: number
}
let timer: NodeJS.Timeout | number = 0


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
