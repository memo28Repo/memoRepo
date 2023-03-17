/*
 * @Author: 邱狮杰
 * @Date: 2023-02-23 09:27:39
 * @LastEditTime: 2023-03-17 12:25:36
 * @Description:
 * @FilePath: /memo/packages/utils/src/errors/types.ts
 */

export interface ErrorsNewResultInfo extends Pick<NewOpt, 'classify'> {
  /**
   * @description 错误信息
   */
  msg: string
}

export interface NewOpt {
  /**
   * @description 错误id
   */
  classify?: number | string
}

export interface ErrorsNewResult {
  /**
   * @description 获取报错信息
   */
  unWrap(): string
  /**
   * @description 打印调用栈
   */
  trace(): this
  /**
   * @description 报错详细信息
   */
  info(): ErrorsNewResultInfo
}

/**
 * @description 错误处理返回类型
 */
export type Panic<T = unknown> = [ErrorsNewResult | undefined | false | null | true, T]
