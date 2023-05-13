/*
 * @Author: 邱狮杰
 * @Date: 2023-01-06 15:09:42
 * @LastEditTime: 2023-05-13 09:02:07
 * @Description:
 * @FilePath: /memo/packages/service/src/types/interceptor.ts
 */

import { AxiosInstance, AxiosResponse } from 'axios'
import { modulesImpl, initializeConfigurationTypes } from './engine'
import { interceptorImpl as serviceimplWithInterceptorImpl, triggerInterceptorImpl as serviceimplWithTriggerInterceptorImpl } from '@memo28/serviceimpl'

/**
 * 拦截器需要实现的字段
 *
 * @public
 */
export type interceptorImpl<R = unknown, RS = unknown> = serviceimplWithInterceptorImpl<initializeConfigurationTypes & R, AxiosResponse & RS, AxiosInstance>

export interface beforeTriggerResultTypes<T> {
  data: T
  directReturnValue?: boolean // 是否直接返回值
}

/**
 * 触发拦截器需要实现的字段
 *
 * @public
 */
export type triggerInterceptorImpl<Req extends initializeConfigurationTypes = initializeConfigurationTypes, Res = unknown> = serviceimplWithTriggerInterceptorImpl<Req, Res>

export abstract class interceptorToolboxImpl {
  abstract loopInstancedInterceptor(list?: modulesImpl['interceptorModule']): interceptorImpl[]
}
