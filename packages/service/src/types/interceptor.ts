/*
 * @Author: 邱狮杰
 * @Date: 2023-01-06 15:09:42
 * @LastEditTime: 2023-04-22 13:37:09
 * @Description:
 * @FilePath: /memo/packages/service/src/types/interceptor.ts
 */

import { AxiosResponse } from 'axios'
import { modulesImpl, initializeConfigurationTypes } from './engine'
import { interceptorImpl as serviceimplWithInterceptorImpl, triggerInterceptorImpl as serviceimplWithTriggerInterceptorImpl } from '@memo28/serviceimpl'

/**
 * 拦截器需要实现的字段
 *
 * @public
 */
export type interceptorImpl<R = unknown, RS = unknown> = serviceimplWithInterceptorImpl<initializeConfigurationTypes & R, AxiosResponse & RS>

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
