/*
 * @Author: 邱狮杰
 * @Date: 2023-01-08 13:31:07
 * @LastEditTime: 2023-04-28 21:46:08
 * @Description: 切换版本号
 * @FilePath: /memo/packages/service/src/plugin/multiVersionSwitching.ts
 */
import { AxiosRequestConfig } from "axios";
import { interceptorImpl } from "../types/interceptor";


/**
 * 多版本切换拦截器 参数类型 {@link MultiVersionSwitching}
 *
 * @public
 */
export interface multiVersionSwitchingRequest {
  /**
   *
   * 版本号
   *
   * @public
   */
  version: string;

  /**
   *
   * `baseURL` 字段上 定义需要替换的字符串
   *
   * @remarks
   * ```ts
   * @instantiation()
   * @modules({
   *   interceptorModule: [RetData, MultiVersionSwitching], // MultiVersionSwitching Plug-in is used to quickly switch version number
   * })
   * @initializeConfiguration({
   *   baseURL: 'http://localhost:3011/baseVersion',
   *   debugger: false,
   *   versionPlaceholder: 'baseVersion', // used to replace the version placeholder on the baseURL
   *   version: 'v1', // replace the version placeholder with v1
   * })
   * class Service extends ServiceCore { }
   *
   * const http = new Service().getAxios()
   *
   * @public
   *
   */
  versionPlaceholder: string;
}

/**
 * 多版本拦截器
 *
 *
 * @remarks
 * ```ts
 * @instantiation()
 * @modules({
 *   interceptorModule: [RetData, MultiVersionSwitching], // MultiVersionSwitching Plug-in is used to quickly switch version number
 * })
 * @initializeConfiguration({
 *   baseURL: 'http://localhost:3011/baseVersion',
 *   debugger: false,
 *   versionPlaceholder: 'baseVersion', // used to replace the version placeholder on the baseURL
 *   version: 'v1', // replace the version placeholder with v1
 * })
 * class Service extends ServiceCore { }
 *
 * const http = new Service().getAxios()
 *
 *
 * http({
 *  version: 'v2' // used v1 version http
 * })
 * ```
 *
 *
 * @public
 */
export class MultiVersionSwitching implements interceptorImpl {
  displayName?: string | undefined = "multiVersionSwitching";

  private versionPlaceholder: string = "";

  //  private baseURL: string = ''
  //
  private originalBaseURL: string = "";

  /**
   * 修改版本号占位符
   *
   * @param { string } pl -  占位符
   *
   * @private
   *
   * @public
   */
  private setVersionPlaceholder(pl: string) {
    this.versionPlaceholder = pl;
    return this;
  }


  /**
   *
   *
   * 设置基础路由
   *
   * @param { string } URL -  基础路由
   *
   * @private
   *
   * @public
   */
  private setBaseURL(URL: string) {
    this.originalBaseURL = URL;
  }

  /**
   * 根据占位符 替换为 版本号
   *
   *
   * @param { string }  baseURL - 路哟
   *
   * @param { string } repl - 根据占位符替换
   *
   *
   * @private
   *
   * @public
   */
  private replaceVersionPlaceholder(baseURL: string, repl: string) {
    return baseURL.replace(new RegExp(this.versionPlaceholder, "g"), repl);
  }


  /**
   *
   *
   * 获取原基础路由
   *
   * @private
   *
   * @public
   */
  private getOriginalBaseURL() {
    return this.originalBaseURL;
  }

  /**
   * 请求成功
   *
   * @public
   *
   */
  requestSuc(value: AxiosRequestConfig<any> & multiVersionSwitchingRequest): AxiosRequestConfig<any> | Promise<AxiosRequestConfig<any>> {
    this.setVersionPlaceholder(value.versionPlaceholder);
    this.setBaseURL(value.baseURL as string);
    const baseURL = value.version ? this.replaceVersionPlaceholder(this.getOriginalBaseURL(), value.version) : value.baseURL;
    return { ...value, baseURL };
  }
}
