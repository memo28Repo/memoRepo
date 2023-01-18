/*
 * @Author: 邱狮杰
 * @Date: 2023-01-08 13:31:07
 * @LastEditTime: 2023-01-15 11:14:14
 * @Description: 切换版本号
 * @FilePath: /memo/packages/service/src/plugin/multiVersionSwitching.ts
 */
import { AxiosRequestConfig } from 'axios'
import { interceptorImpl } from '../types/interceptor'

export interface multiVersionSwitchingRequest {
  version: string
  versionPlaceholder: string
}

export class MultiVersionSwitching implements interceptorImpl {
  displayName?: string | undefined = 'multiVersionSwitching'

  private versionPlaceholder: string = ''

  //  private baseURL: string = ''
  //
  private originalBaseURL: string = ''

  // 修改版本号占位符
  private setVersionPlaceholder(pl: string) {
    this.versionPlaceholder = pl
    return this
  }

  private setBaseURL(URL: string) {
    // this.baseURL = URL
    this.originalBaseURL = URL
  }
  /**
   * @description 根据占位符 替换为 版本号
   */
  private replaceVersionPlaceholder(baseURL: string, repl: string) {
    return baseURL.replace(new RegExp(this.versionPlaceholder, 'g'), repl)
  }

  private getOriginalBaseURL() {
    return this.originalBaseURL
  }

  // /**
  //  * @description 切换版本号
  //  */
  // private switchVersion(item: string): string {
  //   this.baseURL = this.replaceVersionPlaceholder(this.baseURL, item)
  //   return this.baseURL
  // }

  requestSuc(value: AxiosRequestConfig<any> & multiVersionSwitchingRequest): AxiosRequestConfig<any> | Promise<AxiosRequestConfig<any>> {
    this.setVersionPlaceholder(value.versionPlaceholder)
    this.setBaseURL(value.baseURL as string)
    const baseURL = value.version ? this.replaceVersionPlaceholder(this.getOriginalBaseURL(), value.version) : value.baseURL
    return { ...value, baseURL }
  }
}
