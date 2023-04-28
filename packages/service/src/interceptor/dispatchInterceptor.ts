/*
 * @Author: 邱狮杰
 * @Date: 2023-01-07 12:49:45
 * @LastEditTime: 2023-04-28 21:56:10
 * @Description:
 * @FilePath: /memo/packages/service/src/interceptor/dispatchInterceptor.ts
 */
import { DispatchInterceptor as ServiceimplDispatchInterceptor } from '@memo28/serviceimpl'
import { AxiosInstance } from 'axios'
import { modulesImpl } from '../types/engine'

/**
 * @description 调度拦截器
 */
export class DispatchInterceptor {
  private instance: AxiosInstance | null = null

  private serviceimplDispatchInterceptor: ServiceimplDispatchInterceptor = new ServiceimplDispatchInterceptor()

  /**
   * @description 获取拦截器 和 axios实例
   */
  getAllInterceptorPlugIns(instace: AxiosInstance, list?: modulesImpl['interceptorModule']): this {
    this.serviceimplDispatchInterceptor.getAllInterceptorPlugIns(list)
    this.instance = instace
    return this
  }

  /**
   * @description 将拦截器绑定到实例上
   */
  bindInterceptorToInstance(): this {
    this.instance?.interceptors.request.use(
      config => {
        return this.serviceimplDispatchInterceptor.RequestSuc(config) as any
      },
      err => {
        return this.serviceimplDispatchInterceptor.RequestFail(err)
      }
    )

    this.instance?.interceptors.response.use(
      response => {
        return this.serviceimplDispatchInterceptor.ResponseSuc(response) as any
      },
      responseError => {
        return this.serviceimplDispatchInterceptor.ResponseFail(responseError)
      }
    )
    return this
  }
}
