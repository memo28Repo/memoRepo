/*
 * @Author: 邱狮杰
 * @Date: 2023-01-07 13:00:08
 * @LastEditTime: 2023-01-07 13:14:03
 * @Description:
 * @FilePath: /memo/packages/service/src/interceptor/interceptorToolbox.ts
 */
import { modulesImpl } from '../types/engine'

import { interceptorImpl, interceptorToolboxImpl } from '../types/interceptor'

export class InterceptorToolbox implements interceptorToolboxImpl {
  /**
   * @description 初始化拦截器
   * @param list
   * @returns
   */
  loopInstancedInterceptor(list?: modulesImpl['interceptorModule']): interceptorImpl[] {
    if (!list) return []
    return list.map(item => {
      return Reflect.construct(item, [])
    })
  }
}
