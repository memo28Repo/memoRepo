/*
 * @Author: 邱狮杰
 * @Date: 2023-01-07 12:40:29
 * @LastEditTime: 2023-03-27 08:56:05
 * @Description:
 * @FilePath: /memo/packages/service/src/core/instantiation.ts
 */

import { Injection } from '@memo28/utils'
import axios, { AxiosInstance } from 'axios'
import { Interceptor } from '../interceptor/core'
import { initializeConfigurationTypes } from '../types/engine'
import { getInitializeConfigurationValues } from './config'
import { ServiceCore } from './engine'
import { getModulesValues } from './modules'
import { TriggerDispatch } from './triggerDispatch'

export class GenerateSchedulingAxios {
  private injection: Injection<getInitializeConfigurationValues | getModulesValues> | null = null
  private triggerDispatch: TriggerDispatch | null = null
  private req: Partial<initializeConfigurationTypes> = {}
  private triggerDispatchReq: unknown
  private axios: AxiosInstance | null = null
  private response: unknown
  constructor(injection: Injection<getInitializeConfigurationValues | getModulesValues>, req: initializeConfigurationTypes, axios: AxiosInstance) {
    this.injection = injection
    this.triggerDispatch = new TriggerDispatch(this.injection.getValue('triggerInterceptor'))
    this.req = req
    this.axios = axios
  }

  async beforeTriggeringInterception(): Promise<this | any> {
    this.triggerDispatchReq = await this.triggerDispatch?.dispatchBefore(this.req)
    if (typeof this.triggerDispatchReq === 'object' && Reflect.get(this.triggerDispatchReq as object, 'directReturnValue')) return Reflect.get(this.triggerDispatchReq as object, 'data')
    return this
  }

  async triggerRequest() {
    const c = this.triggerDispatchReq || this.req
    const response = await this.axios?.(c)
    this.response = response
    return this
  }

  async afterTriggeringInterception() {
    const triggerDispatchRes = await this.triggerDispatch?.dispatchAfter(this.triggerDispatchReq || this.req, this.response)
    if (triggerDispatchRes) return triggerDispatchRes
    return this.response
  }
}

export function instantiation() {
  return (target: any) => {
    const injection = new Injection<getInitializeConfigurationValues | getModulesValues>(target)
    const axi = axios.create(injection.getValue('initializeConfiguration'))
    new Interceptor(injection, axi)
    const proto: ServiceCore = target.prototype
    // @ts-ignore
    proto.getAxios = function () {
      return async <T>(req: initializeConfigurationTypes): Promise<T> => {
        const generateSchedulingAxios = new GenerateSchedulingAxios(
          injection,
          {
            ...req,
            ...injection.getValue('initializeConfiguration'),
          },
          axi
        )
        const beforeTriggeringInterceptionResponse = await generateSchedulingAxios.beforeTriggeringInterception()
        // 如果 value 不是 GenerateSchedulingAxios的实例 表示存在中途推出的情况, 直接返回
        if (!(beforeTriggeringInterceptionResponse instanceof GenerateSchedulingAxios)) {
          return beforeTriggeringInterceptionResponse
        }
        return (await beforeTriggeringInterceptionResponse.triggerRequest()).afterTriggeringInterception()
      }
    }
  }
}
