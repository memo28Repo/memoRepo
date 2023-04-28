/*
 * @Author: 邱狮杰
 * @Date: 2023-04-22 10:15:41
 * @LastEditTime: 2023-04-28 21:55:07
 * @Description:
 * @FilePath: /memo/packages/serviceImpl/src/core/interceptor.ts
 */

/**
 * 拦截器需要实现的字段
 *
 * @typeParam {unknown} R - 请求参数类型
 *
 * @typeParam {unknown} RS - 响应参数类型
 *
 *
 * @example
 * ```ts
 * type impl = interceptorImpl<{ url: string }, { data: unknown }>
 * ```
 *
 * @public
 */
export interface interceptorImpl<R = unknown, RS = unknown> {
  /**
   * 调试使用 插件名
   *
   * @public
   */
  displayName?: string

  /**
   *
   * 请求成功拦截器
   *
   * @param {R} config - 请求配置
   */
  requestSuc?(config: R): Promise<R> | R

  /**
   *
   * 请求失败拦截器
   *
   * @param {any} error - 请求失败
   */
  requestFail?(error: any): any

  /**
   *
   * 响应成功拦截器
   *
   * @param {RS} response - 响应成功
   */
  responseSuc?(response: RS): Promise<RS> | RS | unknown

  /**
   *
   * 响应失败拦截器
   *
   * @param {any} error - 响应错误
   */
  responseFail?(error: any): any
}

/**
 *
 * 拦截器utils
 *
 * @public
 */
class InterceptorToolbox {
  /**
   * 初始化拦截器
   * @param {(new (...args: unknown[]) => interceptorImpl)[]} list 拦截器列表
   * @returns
   */
  loopInstancedInterceptor(list?: (new (...args: unknown[]) => interceptorImpl)[]): interceptorImpl[] {
    if (!list) return []
    return list.map(item => {
      return Reflect.construct(item, [])
    })
  }
}

/**
 *
 * 调度拦截器
 *
 * @public
 */
export class DispatchInterceptor {
  private interceptorToolbox: InterceptorToolbox = new InterceptorToolbox()
  private interceptorModuleList: interceptorImpl[] = []

  /**
   * 获取拦截器列表
   */
  getAllInterceptorPlugIns(list?: (new (...args: unknown[]) => interceptorImpl)[]): this {
    this.interceptorModuleList = this.interceptorToolbox.loopInstancedInterceptor(list)
    return this
  }

  RequestSuc(payload: unknown) {
    return this.loopCall(
      this.interceptorModuleList.map(i => i.requestSuc?.bind(i)),
      payload
    )
  }

  RequestFail(payload: unknown) {
    return this.loopCall(
      this.interceptorModuleList.map(i => i.requestFail?.bind(i)),
      payload
    )
  }

  ResponseSuc(payload: unknown) {
    return this.loopCall(
      this.interceptorModuleList.map(i => i.responseSuc?.bind(i)),
      payload
    )
  }

  ResponseFail(payload: unknown) {
    return this.loopCall(
      this.interceptorModuleList.map(i => i.responseFail?.bind(i)),
      payload
    )
  }

  private loopCall(fn: (((pyload: unknown) => void) | undefined)[], payload: unknown) {
    let newDate = payload
    for (let index = 0; index < fn.length; index++) {
      const element = fn[index]
      newDate = element?.(newDate) || newDate
    }
    return newDate
  }

  getInterceptorModuleList() {
    return this.interceptorModuleList
  }
}
