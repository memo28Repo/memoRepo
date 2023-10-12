/*
 * @Author: 邱狮杰
 * @Date: 2023-03-23 09:39:21
 * @LastEditTime: 2023-03-27 08:54:22
 * @Description:
 * @FilePath: /memo/packages/service/src/plugin/logs/error.ts
 */

import { AnomalousChain, Errors, ErrorsNewResult, panicProcessing } from '@memo28/utils'
import { AxiosError } from 'axios'
import { initializeConfigurationTypes } from '../../types/engine'

export class ErrorWithAxios extends AnomalousChain {
  private notAxiosError: boolean = false

  constructor(protected obj: object) {
    super()

    if (typeof obj !== 'object' || (!Reflect.get(obj, 'name') && !Reflect.get(obj, 'code'))) {
      this.setErrors(Errors.New('not a Axios Errors!'))
    }
  }

  protected skip(errors: ErrorsNewResult | null): this {
    this.notAxiosError = true
    return this
  }

  @panicProcessing()
  AxiosError() {
    if (typeof this.obj !== 'object') return this
    if (!(this.obj instanceof AxiosError)) return this
    if (this.obj?.code === 'ERR_CANCELED') return this
    const err = this.obj as AxiosError
    console.groupCollapsed(
      `%c RESPONSE ERROR %c code:${err.code} %c message:${err.message} %c ${err.config?.baseURL ? err.config.baseURL + err.config?.url : err.config?.url} %c 展开查看接口兜底值:👇`,
      'color:red;',
      'color: black',
      'color: black',
      '',
      ''
    )
    console.log(err)
    console.log('兜底值 =>', (err.config as initializeConfigurationTypes)?.pocketValue)
    console.groupEnd()
    return this
  }

  getNotAxiosError() {
    return this.notAxiosError
  }
}
