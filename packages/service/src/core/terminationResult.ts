/*
 * @Author: 邱狮杰
 * @Date: 2023-01-13 10:11:14
 * @LastEditTime: 2023-03-27 09:08:44
 * @Description:
 * @FilePath: /memo/packages/service/src/core/terminationResult.ts
 */
import axios from 'axios'
import { initializeConfigurationTypes } from '../types/engine'
import { debug } from './serviceUtils'
import { HttpLog } from '../plugin/logs/utils'

export class TerminationResult<T> {
  ConfigurationParameters(config: initializeConfigurationTypes & T) {
    const cancel = axios.CancelToken.source()

    const c: initializeConfigurationTypes = { ...config, cancelToken: cancel.token }

    return {
      getConfiguration() {
        return c
      },
      terminateTrigger() {
        cancel.cancel()
        if (debug) {
          const logs = new HttpLog(c)
          const time = logs.getTime()
          const url = logs.getURL()
          console.group(`%c Cancel request succeeded! %c ${time.time} %c ${url.url}`, 'color: red', time.color, url.color)
          console.groupCollapsed(`%c params`, 'color: green')
          console.log(c)
          console.groupEnd()
          console.groupEnd()
        }
      },
    }
  }
}
