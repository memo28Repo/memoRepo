/*
 * @Author: 邱狮杰
 * @Date: 2023-01-06 14:34:02
 * @LastEditTime: 2023-01-09 17:47:30
 * @Description:
 * @FilePath: /memo/packages/service/src/types/engine.ts
 */
import { AxiosRequestConfig } from 'axios'
import { interceptorImpl, triggerInterceptorImpl } from './interceptor'
import { multiVersionSwitchingRequest } from '../plugin/multiVersionSwitching'

export interface serviceImpl<T = unknown> {
  getAxios?(): T
}

export interface modulesImpl {
  /**
  * @description 拦截器列表
  *
  */
  interceptorModule?: (new (...args: unknown[]) => interceptorImpl)[]

  /**
  * @description 触发拦截器列表, 它定义了 请求触发前后的特定逻辑
  */
  triggerInterceptor?: (new (...args: unknown[]) => triggerInterceptorImpl)[]
}

export interface initializeConfigurationTypes extends AxiosRequestConfig, Partial<multiVersionSwitchingRequest> {
  debugger?: boolean
  pocketValue?: unknown // 兜底值
}

export type getObjValues<V = object> = V[keyof V]
