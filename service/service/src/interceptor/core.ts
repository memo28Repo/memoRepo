/*
 * @Author: 邱狮杰
 * @Date: 2023-01-06 15:09:36
 * @LastEditTime: 2023-03-22 09:27:17
 * @Description:
 * @FilePath: /memo/packages/service/src/interceptor/core.ts
 */

import { getInitializeConfigurationValues } from '../core/config'
import { Injection } from '@memo28/utils'
import { getModulesValues } from '../core/modules'
import { modulesImpl } from '../types/engine'
import { interceptorImpl } from '../types/interceptor'
import { DispatchInterceptor } from './dispatchInterceptor'
import { AxiosInstance } from 'axios'

export class Cannel implements interceptorImpl {
  displayName?: string | undefined = 'as'
}

export class Interceptor {
  protected dispatchInterceptor: DispatchInterceptor = new DispatchInterceptor()

  constructor(target: Injection<getInitializeConfigurationValues | getModulesValues>, instance: AxiosInstance) {
    this.dispatchInterceptor.getAllInterceptorPlugIns(instance, target.getValue<modulesImpl['interceptorModule']>('interceptorModule')).bindInterceptorToInstance()
  }
}
