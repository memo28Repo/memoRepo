/*
 * @Author: 邱狮杰
 * @Date: 2023-01-06 19:33:31
 * @LastEditTime: 2023-01-08 12:28:49
 * @Description:
 * @FilePath: /memo/packages/service/src/core/getAxios.ts
 */

import { Injection } from './injection'
import { getModulesValues } from './modules'
import { getInitializeConfigurationValues } from './config'

export function getAxios() {
  console.log(13)
  return (target: object, key: string) => {
    const injection = new Injection<getInitializeConfigurationValues | getModulesValues>(target)
    console.log('getAxios')
  }
}
