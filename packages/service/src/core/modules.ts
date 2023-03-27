/*
 * @Author: 邱狮杰
 * @Date: 2023-01-06 17:00:20
 * @LastEditTime: 2023-03-23 11:31:41
 * @Description:
 * @FilePath: /memo/packages/service/src/core/modules.ts
 */
import { getObjValues, modulesImpl } from '../types/engine'
import { Injection } from '@memo28/utils'
import { PocketValue } from '../plugin/pocketBottom'
import { Logs } from '../plugin/logs/index'

const modulesKeys = {
  interceptorModule: 'interceptorModule',
  triggerInterceptor: 'triggerInterceptor',
} as const

export type getModulesValues = getObjValues<typeof modulesKeys>

export function modules(conf?: modulesImpl) {
  return (target: any) => {
    const injection = new Injection<getModulesValues>(target)
    injection.setValue<modulesImpl['interceptorModule']>('interceptorModule', [Logs, ...(conf?.interceptorModule || [])])
    injection.setValue<modulesImpl['triggerInterceptor']>('triggerInterceptor', [...(conf?.triggerInterceptor || []), PocketValue])
  }
}
