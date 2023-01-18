/*
 * @Author: 邱狮杰
 * @Date: 2023-01-14 13:52:08
 * @LastEditTime: 2023-01-15 14:17:14
 * @Description:
 * @FilePath: /memo/packages/service/src/core/triggerDispatch.ts
 */
import { initializeConfigurationTypes, modulesImpl } from '../types/engine'
import { beforeTriggerResultTypes, triggerInterceptorImpl } from '../types/interceptor'

export class TriggerDispatch {
  private triggerInterceptorList: triggerInterceptorImpl[] = []

  constructor(list: modulesImpl['triggerInterceptor']) {
    this.triggerInterceptorList = this.loopInstantiation(list)
  }

  protected loopInstantiation(list: modulesImpl['triggerInterceptor']): triggerInterceptorImpl[] {
    return (
      list?.map(item => {
        return Reflect.construct(item, [])
      }) || []
    )
  }

  async dispatchBefore(config: initializeConfigurationTypes): Promise<initializeConfigurationTypes | unknown> {
    let c: initializeConfigurationTypes | unknown = config

    for (let i = 0; i < this.triggerInterceptorList.length; i++) {
      let result = await this.triggerInterceptorList[i]?.beforeTrigger?.(c || {})
      // 返回的值(directReturnValue)如果直接跳过就不再往下执行
      if (result?.directReturnValue) {
        c = result as unknown
        break
      }
      c = result ?? (c as beforeTriggerResultTypes<any>)
    }

    return c
  }

  async dispatchAfter(config: initializeConfigurationTypes, res: any) {
    let c = res

    for (let i = 0; i < this.triggerInterceptorList.length; i++) {
      c = (await this.triggerInterceptorList[i]?.afterTrigger?.(c, config)) || c
    }

    return c
  }
}
