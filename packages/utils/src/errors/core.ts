/*
 * @Author: 邱狮杰
 * @Date: 2023-02-23 09:18:30
 * @LastEditTime: 2023-03-07 17:23:23
 * @Description: 该包封装了操作错误的函数
 * @FilePath: /memo/packages/utils/src/errors/core.ts
 */

import { ErrorsNewResult, NewOpt } from './types'

export class Errors {
  /**
   * @description 生成一个错误
   */
  static New(msg: string, opt?: NewOpt): ErrorsNewResult {
    return {
      /**
       * @description 返回错误字符串信息
       */
      unWrap() {
        return msg
      },
      /**
       * @description console.trace()
       */
      trace() {
        console.trace()
        return this
      },
      /**
       * @description 返回错误信息和错误分类
       */
      info() {
        return {
          msg,
          classify: opt?.classify,
        }
      },
    }
  }
  /**
   * @description 对比多个错误是否为同一种类型
   */
  static As(...errors: ErrorsNewResult[]) {
    const classify = errors[0].info().classify
    // @ts-ignore
    if ([null, undefined].includes(classify)) return false
    return errors.every(errorItem => errorItem.info().classify === classify)
  }
}
