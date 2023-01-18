/*
 * @Author: 邱狮杰
 * @Date: 2023-01-06 15:09:42
 * @LastEditTime: 2023-01-15 11:27:39
 * @Description:
 * @FilePath: /memo/packages/service/src/types/interceptor.ts
 */

import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { modulesImpl, initializeConfigurationTypes } from './engine'

/**
 * @description 拦截器需要实现的字段
 */
export interface interceptorImpl<R = unknown, RS = unknown> {
  /**
   * @description 调试使用 插件名
   */
  displayName?: string

  requestSuc?(value: AxiosRequestConfig & R): Promise<AxiosRequestConfig & R> | (R & AxiosRequestConfig)

  requestFail?(error: any): any

  responseSuc?(value: AxiosResponse<RS>): Promise<AxiosResponse<RS>> | AxiosResponse<RS> | unknown

  responseFail?(error: any): any
}

export interface beforeTriggerResultTypes<T> {
  data: T
  directReturnValue?: boolean // 是否直接返回值
}

/**
 * @description 触发拦截器需要实现的字段
 */
export interface triggerInterceptorImpl<Req extends initializeConfigurationTypes = initializeConfigurationTypes, Res = unknown> {
  beforeTrigger?<T = unknown>(config: Req): Promise<beforeTriggerResultTypes<T> | void>

  afterTrigger?<T = unknown>(res: Res, req: Req): Promise<T | void>
}

export abstract class interceptorToolboxImpl {
  abstract loopInstancedInterceptor(list?: modulesImpl['interceptorModule']): interceptorImpl[]
}
