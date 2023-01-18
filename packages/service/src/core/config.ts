/*
 * @Author: 邱狮杰
 * @Date: 2023-01-06 18:11:53
 * @LastEditTime: 2023-01-09 17:00:56
 * @Description:
 * @FilePath: /memo/packages/service/src/core/config.ts
 */
import { Injection } from '../core/injection'
import { getObjValues, initializeConfigurationTypes } from '../types/engine'

export const initializeConfigurationKeys = {
  initializeConfiguration: 'initializeConfiguration',
} as const

export type getInitializeConfigurationValues = getObjValues<typeof initializeConfigurationKeys>

export function initializeConfiguration<v = object>(conf?: initializeConfigurationTypes & Partial<v>) {
  return (target: object) => {
    const injection = new Injection<getInitializeConfigurationValues>(target)
    injection.setValue('initializeConfiguration', conf)
  }
}
