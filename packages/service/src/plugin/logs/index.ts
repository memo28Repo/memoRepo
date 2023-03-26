/*
 * @Author: 邱狮杰
 * @Date: 2023-03-23 06:23:19
 * @LastEditTime: 2023-03-26 08:36:33
 * @Description:
 * @FilePath: /memo/packages/service/src/plugin/logs/index.ts
 */

import { AxiosResponse } from 'axios'
import { initializeConfigurationTypes } from '../../types/engine'
import { interceptorImpl } from '../../types/interceptor'
import { ErrorWithAxios } from './error'

export class GenerateLogInformation {
  constructor(private opt: initializeConfigurationTypes) {}
  getTime() {
    const time = new Date()
    return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
  }
  getTimeColor() {
    return `background:#35495e ; border-radius: 3px;  color: #fff;padding: 0 3px;`
  }
  getMethod() {
    const h = {
      GET: 'green',
      POST: 'orange',
      PUT: 'skyblue',
      PATCH: 'gray',
      DELETE: 'red',
    }
    return {
      method: this.opt.method?.toUpperCase(),
      color: `color: ${h[(this.opt?.method?.toUpperCase() as keyof typeof h) || 'gray']}; font-width: bold`,
    }
  }
  getURL() {
    return {
      url: this.opt.baseURL ? this.opt.baseURL + this.opt.url : this.opt.url,
      color: `color: #58a6ff`,
    }
  }

  getParams() {
    if (this.opt.method?.toUpperCase() === 'GET') {
      return this.opt.params
    }
    return this.opt.data
  }
}

const requestTimestamp = Symbol.for('requestTimestamp')

export class Logs implements interceptorImpl {
  requestSuc(config: initializeConfigurationTypes): initializeConfigurationTypes | Promise<initializeConfigurationTypes> {
    if (!config.debugger) return config
    const generateLogInformation = new GenerateLogInformation(config)
    const getMethod = generateLogInformation.getMethod()
    const getURL = generateLogInformation.getURL()
    console.groupCollapsed(
      `%c Request %c ${generateLogInformation.getTime()}%c ${getMethod.method}%c ${getURL.url}`,
      'color: #8b972f;',
      generateLogInformation.getTimeColor(),
      getMethod.color,
      generateLogInformation.getParams()
    )
    console.log(generateLogInformation.getParams())
    console.log(config.headers)
    console.groupEnd()
    Reflect.set(config, requestTimestamp, new Date().getTime())
    return config
  }

  responseSuc(response: AxiosResponse<unknown, any>): unknown {
    if (!Reflect.get(response.config, 'debugger')) return response
    const executionTime = new Date().getTime() - Reflect.get(response.config, requestTimestamp)
    const generateLogInformation = new GenerateLogInformation(response.config)
    const getMethod = generateLogInformation.getMethod()
    const getURL = generateLogInformation.getURL()
    console.groupCollapsed(
      `%c Response %c ${generateLogInformation.getTime()}%c ${getMethod.method}%c ${response.status + ':' + response.statusText} %c ${getURL.url} %c 执行耗时:${executionTime}ms`,
      'color: #8b972f;',
      generateLogInformation.getTimeColor(),
      getMethod.color,
      'color: black;',
      generateLogInformation.getParams(),
      'color: #58a6ff'
    )
    console.log(`%c response ${response}`, 'color:green')
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
