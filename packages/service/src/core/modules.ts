/*
 * @Author: 邱狮杰
 * @Date: 2023-01-06 17:00:20
 * @LastEditTime: 2023-09-22 10:52:32
 * @Description:
 * @FilePath: /memo/packages/service/src/core/modules.ts
 */
import { Injection } from '@memo28/utils'
import { Logs } from '../plugin/logs/index'
import { PocketValue } from '../plugin/pocketBottom'
import { getObjValues, modulesImpl } from '../types/engine'

const modulesKeys = {
  interceptorModule: 'interceptorModule',
  triggerInterceptor: 'triggerInterceptor',
} as const

/**
 * 
 * 获取 {@link modules} 配置的 `key`
 * 
 * @public
 * 
 */
export type getModulesValues = getObjValues<typeof modulesKeys>

/**
 * 
 * 配置模块
 * 
 * @param { modulesImpl } conf - 配置拦截器，前后置拦截器
 * 
 * @defaultValue
 * - 拦截器 默认配置 {@link Logs}
 * - 前后置拦截器 默认配置 {@link PocketValue}
 * 
 * @public
 */
export function modules(conf?: modulesImpl) {
  return (target: any) => {
    const injection = new Injection<getModulesValues>(target)
    injection.setValue<modulesImpl['interceptorModule']>('interceptorModule', [Logs, ...(conf?.interceptorModule || [])])
    injection.setValue<modulesImpl['triggerInterceptor']>('triggerInterceptor', [...(conf?.triggerInterceptor || []), PocketValue])
  }
}
