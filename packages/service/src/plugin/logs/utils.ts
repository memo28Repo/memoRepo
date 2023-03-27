/*
 * @Author: 邱狮杰
 * @Date: 2023-03-26 09:06:07
 * @LastEditTime: 2023-03-26 10:37:55
 * @Description:
 * @FilePath: /memo/packages/service/src/plugin/logs/utils.ts
 */

import { initializeConfigurationTypes } from '../../types/engine'

export class HttpLog {
  constructor(private requestConfig: initializeConfigurationTypes) {}
  getTime() {
    const time = new Date()
    const t = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`

    return {
      time: t,
      color: `background:#35495e ; border-radius: 3px;  color: #fff;padding: 0 3px;`,
    }
  }

  getMethods() {
    const h = {
      GET: 'green',
      POST: 'orange',
      PUT: 'skyblue',
      PATCH: 'gray',
      DELETE: 'red',
    }
    return {
      method: this.requestConfig.method?.toUpperCase(),
      color: `color: ${h[(this.requestConfig?.method?.toUpperCase() as keyof typeof h) || 'gray']}; font-width: bold`,
    }
  }

  getURL() {
    return {
      url: this.requestConfig.url,
      color: `color: #58a6ff`,
    }
  }

  getParams() {
    if (this.requestConfig.method?.toUpperCase() === 'GET') {
      return this.requestConfig.params
    }
    return this.requestConfig.data
  }
}

export const colors = {
  // 请求响应成功
  requestResponseSucceeded: '#8b972f',
  // 触发前后置拦截器
  triggerFrontAndRearTnterceptors: '#91defc',
  // 当前置拦截器被强制返回后
  afterCurrentInterceptorIsForciblyReturnedBackground: '#fefbe8',
  // 当前置拦截器被强制返回后 color
  afterCurrentInterceptorIsForciblyReturnedColor: 'gray',
}
