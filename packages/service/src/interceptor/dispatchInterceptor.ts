/*
 * @Author: 邱狮杰
 * @Date: 2023-01-07 12:49:45
 * @LastEditTime: 2023-01-08 13:08:31
 * @Description:
 * @FilePath: /memo/packages/service/src/interceptor/dispatchInterceptor.ts
 */
import { AxiosInstance } from 'axios'
import { modulesImpl } from '../types/engine'
import { interceptorImpl, interceptorToolboxImpl } from '../types/interceptor'
import { InterceptorToolbox } from './interceptorToolbox'

/**
 * @description 调度拦截器
 */
export class DispatchInterceptor {
  private interceptorToolbox: interceptorToolboxImpl = new InterceptorToolbox()
  private interceptorModuleList: interceptorImpl[] = []
  private instance: AxiosInstance | null = null

  /**
   * @description 获取拦截器 和 axios实例
   */
  getAllInterceptorPlugIns(instace: AxiosInstance, list?: modulesImpl['interceptorModule']): this {
    this.interceptorModuleList = this.interceptorToolbox.loopInstancedInterceptor(list)
    this.instance = instace
    return this
  }

  /**
   * @description 将拦截器绑定到实例上
   */
  bindInterceptorToInstance(): this {
    this.bindingInterceptors('req')
    this.bindingInterceptors('res')
    return this
  }

  private bindingInterceptors(type: 'req' | 'res') {
    const interceptorsType = type === 'req' ? 'request' : 'response'
    const req = type === 'req' ? 'requestSuc' : 'responseSuc'
    const resT = type === 'req' ? 'responseSuc' : 'responseFail'

    this.instance?.interceptors[interceptorsType].use(
      // @ts-ignore
      async res => {
        let c = res
        for (let index = 0; index < this.interceptorModuleList.length; index++) {
          const element = this.interceptorModuleList[index]
          // @ts-ignore
          c = (await element?.[req]?.(c)) || c
        }
        return c
      },
      async err => {
        let c = err
        for (let index = 0; index < this.interceptorModuleList.length; index++) {
          const element = this.interceptorModuleList[index]
          c = (await element?.[resT]?.(c)) || c
        }
        return c
      }
    )
  }
}
