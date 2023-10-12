/*
 * @Author: 邱狮杰
 * @Date: 2023-04-22 10:15:41
 * @LastEditTime: 2023-05-13 10:51:27
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
 * @typeParam {unknown} Ins - 请求实例类型
 *
 * @example
 * ```ts
 * type impl = interceptorImpl<{ url: string }, { data: unknown }, Instance>
 * ```
 *
 * @public
 */
export interface interceptorImpl<R = unknown, RS = unknown, Ins = unknown> {
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
   * @param {Ins} instance - 请求实例
   */
  requestSuc?(config: R, instance: Ins): Promise<R> | R

  /**
   *
   * 请求失败拦截器
   *
   * @param {any} error - 请求失败
   * @param {Ins} instance - 请求实例
   */
  requestFail?(error: any, instance: Ins): any

  /**
   *
   * 响应成功拦截器
   *
   * @param {RS} response - 响应成功
   * @param {Ins} instance - 请求实例
   */
  responseSuc?(response: RS, instance: Ins): Promise<RS> | RS | unknown

  /**
   *
   * 响应失败拦截器
   *
   * @param {any} error - 响应错误
   * @param {Ins} instance - 请求实例
   */
  responseFail?(error: any, instance: Ins): any
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

type requestType = 'requestSuc' | 'requestFail' | 'responseFail' | 'responseSuc'

// 响应必须携带请求参数, 后续拦截器可能都需要用得到，此处不强制用户携带，所以默认携带 不可修改，在最后一个拦截器中可以删除掉该字段，这样用户得到的响应就是干净的
const RESPONSE_MUST_CARRY_REQUEST_PARAMETERS = '@memo28/serviceImpl/responseWithReqeust'

/**
 *
 * 调度拦截器
 *
 * @public
 */
export class DispatchInterceptor<T extends object = object> {
  private interceptorToolbox: InterceptorToolbox = new InterceptorToolbox()
  private interceptorModuleList: interceptorImpl[] = []
  private instance: T | null = null

  /**
   *
   * 保存实例
   *
   * @public
   *
   */
  setInstance(instance: T) {
    this.instance = instance
  }

  /**
   * 获取拦截器列表
   *
   * @public
   */
  getAllInterceptorPlugIns(list?: (new (...args: unknown[]) => interceptorImpl)[]): this {
    this.interceptorModuleList = this.interceptorToolbox.loopInstancedInterceptor(list)
    return this
  }

  RequestSuc(payload: unknown) {
    return this.loopCall(
      this.interceptorModuleList.map(i => i.requestSuc?.bind(i)),
      payload,
      'requestSuc'
    )
  }

  RequestFail(payload: unknown) {
    return this.loopCall(
      this.interceptorModuleList.map(i => i.requestFail?.bind(i)),
      payload,
      'requestFail'
    )
  }

  ResponseSuc(payload: unknown) {
    return this.loopCall(
      this.interceptorModuleList.map(i => i.responseSuc?.bind(i)),
      payload,
      'responseSuc'
    )
  }

  ResponseFail(payload: unknown) {
    return this.loopCall(
      this.interceptorModuleList.map(i => i.responseFail?.bind(i)),
      payload,
      'responseFail'
    )
  }

  /**
   *
   * 设置响应必须返回的参数 后续可在最后一个拦截器中清楚掉这个参数
   *
   */
  setRequestParametersWithResponse(type: requestType, response: any) {
    if (type === 'requestSuc') {
      Reflect.set(response, RESPONSE_MUST_CARRY_REQUEST_PARAMETERS, response)
    }
  }

  private loopCall(fn: (((pyload: unknown, instance: T | null) => void) | undefined)[], payload: unknown, type: requestType) {
    let newDate = payload
    for (let index = 0; index < fn.length; index++) {
      const element = fn[index]
      newDate = element?.(newDate, this.instance) || newDate
      // this.setRequestParametersWithResponse(type, newDate)
    }
    return newDate
  }

  getInterceptorModuleList() {
    return this.interceptorModuleList
  }
}
