/*
 * @Author: 邱狮杰
 * @Date: 2023-01-06 14:32:28
 * @LastEditTime: 2023-03-23 18:01:36
 * @Description:
 * @FilePath: /memo/packages/service/src/core/engine.ts
 */
import { AxiosResponse } from 'axios'
import 'reflect-metadata'
import { initializeConfigurationTypes } from '../types/engine'

type Res = Promise<AxiosResponse<any, any>> | AxiosResponse<any, any>

type Req<R> = Partial<R> & initializeConfigurationTypes

export class ServiceCore<R = unknown> {
  // @ts-ignore
  getAxios(): <T = Res>(req?: Req<R>) => T | Promise<T> {}
}
