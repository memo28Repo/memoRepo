/*
 * @Author: 邱狮杰
 * @Date: 2023-01-13 10:11:14
 * @LastEditTime: 2023-01-13 14:41:51
 * @Description:
 * @FilePath: /memo/packages/service/src/core/terminationResult.ts
 */
import axios from 'axios'
import { initializeConfigurationTypes } from '../types/engine'

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
      },
    }
  }
}
