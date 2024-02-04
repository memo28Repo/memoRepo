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


/**
 *
 * 一个错误对象应该包含
 *
 * @public
 *
 */
export interface ErrorsNewResult {
  /**
   *  获取报错信息
   *
   *  @public
   */
  unWrap(): string
  /**
   *  返回调用栈
   *
   *  @public
   */
  trace(): string
  /**
   *  报错详细信息
   *  @public
   */
  info(): ErrorsNewResultInfo
}

/**
 *  错误处理返回类型
 *
 *  @public
 */
export type Panic<T = unknown> = [ErrorsNewResult | undefined | false | null | true, T]
