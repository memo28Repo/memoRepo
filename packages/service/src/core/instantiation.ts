/*
 * @Author: 邱狮杰
 * @Date: 2023-01-07 12:40:29
 * @LastEditTime: 2023-01-15 14:13:00
 * @Description:
 * @FilePath: /memo/packages/service/src/core/instantiation.ts
 */
import axios from 'axios'
import { Interceptor } from '../interceptor/core'
import { initializeConfigurationTypes } from '../types/engine'
import { getInitializeConfigurationValues } from './config'
import { ServiceCore } from './engine'
import { Injection } from './injection'
import { getModulesValues } from './modules'
import { TriggerDispatch } from './triggerDispatch'

export function instantiation() {
  return (target: any) => {
    const injection = new Injection<getInitializeConfigurationValues | getModulesValues>(target)
    const axi = axios.create(injection.getValue('initializeConfiguration'))
    new Interceptor(injection, axi)
    const triggerDispatch = new TriggerDispatch(injection.getValue('triggerInterceptor'))
    const proto: ServiceCore = target.prototype
    // @ts-ignore
    proto.getAxios = function () {
      return async <T>(req: initializeConfigurationTypes): Promise<T> => {
        const triggerDispatchReq = await triggerDispatch.dispatchBefore(req)
        if (typeof triggerDispatchReq === 'object' && Reflect.get(triggerDispatchReq as object, 'directReturnValue')) {
          return Reflect.get(triggerDispatchReq as object, 'data')
        }
        const c = triggerDispatchReq ?? req
        const result = await axi?.(c)
        const triggerDispatchRes = await triggerDispatch.dispatchAfter(req, result)
        if (triggerDispatchRes) {
          return triggerDispatchRes
        }

        return result as T
      }
    }
  }
}
