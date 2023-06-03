/*
 * @Author: 邱狮杰
 * @Date: 2023-03-23 06:23:19
 * @LastEditTime: 2023-05-13 09:44:19
 * @Description:
 * @FilePath: /memo/packages/service/src/plugin/logs/index.ts
 */

import { AxiosResponse } from 'axios'
import { initializeConfigurationTypes } from '../../types/engine'
import { interceptorImpl } from '../../types/interceptor'
import { ErrorWithAxios } from './error'
import { HttpLog, colors } from './utils'
const requestTimestamp = Symbol.for('requestTimestamp')

export class Logs implements interceptorImpl {
  requestSuc(config: initializeConfigurationTypes): initializeConfigurationTypes | Promise<initializeConfigurationTypes> {
    if (!config.debugger) return config
    const generateLogInformation = new HttpLog(config)
    const getTime = generateLogInformation.getTime()
    const getMethod = generateLogInformation.getMethods()
    const getURL = generateLogInformation.getURL()
    console.groupCollapsed(`%c Request %c ${getTime.time}%c ${getMethod.method}%c ${getURL.url}`, `color: ${colors.requestResponseSucceeded};`, getTime.color, getMethod.color, generateLogInformation.getParams())
    const getParams = generateLogInformation.getParams()
    if (getParams) {
      console.groupCollapsed('%c params', 'color: green')
      console.log(getParams)
      console.groupEnd()
    }
    console.groupCollapsed('%c headers', 'color: green')
    console.log(config.headers)
    console.groupEnd()
    console.groupEnd()
    Reflect.set(config, requestTimestamp, new Date().getTime())
    return config
  }

  requestFail(error: any) {
    console.groupCollapsed(`%c Request Error!`, 'color:red;')
    console.log(error)
    console.groupEnd()
  }

  responseSuc(response: AxiosResponse<unknown, any>): unknown {
    if (!Reflect.get(response.config, 'debugger')) return response
    const executionTime = new Date().getTime() - Reflect.get(response.config, requestTimestamp)
    const generateLogInformation = new HttpLog(response.config)
    const getTime = generateLogInformation.getTime()
    const getMethod = generateLogInformation.getMethods()
    const getURL = generateLogInformation.getURL()
    console.groupCollapsed(
      `%c Response %c ${getTime.time}%c ${getMethod.method}%c ${response.status + ':' + response.statusText} %c ${getURL.url} %c 执行耗时:${executionTime}ms`,
      `color: ${colors.requestResponseSucceeded};`,
      getTime.color,
      getMethod.color,
      'color: black;',
      generateLogInformation.getParams(),
      'color: #58a6ff'
    )
    console.groupCollapsed(`%c response 👇`, 'color: green')
    console.log(response)
    console.groupEnd()
    console.groupEnd()
    return response
  }

  responseFail(error: any) {
    if (new ErrorWithAxios(error).AxiosError().getNotAxiosError()) {
      console.groupCollapsed(`%c Response Error!`, 'color:red;')
      console.log(error)
      console.groupEnd()
    }
    return error
  }
}

export { TriggerInterceptorLog } from './triggerInterceptorLog'
