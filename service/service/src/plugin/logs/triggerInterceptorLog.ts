/*
 * @Author: 邱狮杰
 * @Date: 2023-03-26 09:26:45
 * @LastEditTime: 2023-03-26 09:28:52
 * @Description:
 * @FilePath: /memo/packages/service/src/plugin/logs/triggerInterceptorLog.ts
 */
import { initializeConfigurationTypes } from '../../types/engine'
import { beforeTriggerResultTypes, triggerInterceptorImpl } from '../../types/interceptor'

export class TriggerInterceptorLog implements triggerInterceptorImpl {
  async beforeTrigger<T = unknown>(config: initializeConfigurationTypes): Promise<void | beforeTriggerResultTypes<T>> {
    return
  }

  async afterTrigger<T = unknown>(res: unknown, req: initializeConfigurationTypes): Promise<void | T> {
    return
  }
}
