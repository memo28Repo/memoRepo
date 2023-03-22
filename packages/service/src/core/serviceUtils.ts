/*
 * @Author: 邱狮杰
 * @Date: 2023-03-22 09:13:31
 * @LastEditTime: 2023-03-22 10:51:49
 * @Description:
 * @FilePath: /memo/packages/service/src/core/serviceUtils.ts
 */
import { modulesImpl, initializeConfigurationTypes } from '../types/engine'
import { getModulesValues } from './modules'
import { getInitializeConfigurationValues } from './config'
import { Injection } from '@memo28/utils'
import axios, { AxiosInstance } from 'axios'
import { GenerateSchedulingAxios } from './instantiation'
import { Interceptor } from '../interceptor/core'
import { PocketValue } from '../plugin/pocketBottom'

export class ServiceUtils {
  private injection = new Injection<getModulesValues | getInitializeConfigurationValues>(this)
  private axios: null | AxiosInstance = null

  modules(opt: Partial<modulesImpl>) {
    this.injection.setValue('interceptorModule', opt.interceptorModule)
    this.injection.setValue('triggerInterceptor', [...(opt.triggerInterceptor || []), PocketValue])
    return this
  }

  initializeConfiguration(opt: initializeConfigurationTypes) {
    this.injection.setValue('initializeConfiguration', opt)
    return this
  }

  instantiation() {
    this.axios = axios.create(this.injection.getValue('initializeConfiguration'))
    new Interceptor(this.injection, this.axios)
    return this
  }

  getAxios() {
    return async <T>(req: initializeConfigurationTypes): Promise<T> => {
      const generateSchedulingAxios = new GenerateSchedulingAxios(this.injection, req, this.axios as AxiosInstance)
      const beforeTriggeringInterceptionResponse = await generateSchedulingAxios.beforeTriggeringInterception()
      // 如果 value 不是 GenerateSchedulingAxios的实例 表示存在中途推出的情况, 直接返回
      if (!(beforeTriggeringInterceptionResponse instanceof GenerateSchedulingAxios)) {
        return beforeTriggeringInterceptionResponse
      }
      return (await beforeTriggeringInterceptionResponse.triggerRequest()).afterTriggeringInterception()
    }
  }
}
