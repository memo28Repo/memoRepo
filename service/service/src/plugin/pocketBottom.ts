/*
 * @Author: 邱狮杰
 * @Date: 2023-01-14 21:17:31
 * @LastEditTime: 2023-04-28 21:08:34
 * @Description:
 * @FilePath: /memo/packages/service/src/plugin/pocketBottom.ts
 */
import { AxiosResponse, AxiosError } from "axios";
import { initializeConfigurationTypes } from "../types/engine";
import { beforeTriggerResultTypes, triggerInterceptorImpl } from "../types/interceptor";


/**
 *
 * 请求兜底参数类型
 *
 * @public
 *
 */
export interface pocketValueTypes extends initializeConfigurationTypes {
  pocketValue: any;
}

/**
 *
 * 请求兜底响应 拦截器前后置触发器
 *
 * @remarks
 * 当请求报错时会返回兜底值
 *
 * @public
 */
export class PocketValue implements triggerInterceptorImpl<pocketValueTypes, AxiosResponse> {
  displayName?: string | undefined = "pocketValue";

  usePocketValue = false;


  /**
   *
   * 根据返回值判断 接口响应是否存在报错
   *
   * @param { AxiosResponse } result - 请求响应
   * @param { pocketValueTypes } req - 用户请求配置，用于读取兜底值
   *
   * @public
   */
  isUnexpectedSituation(result: AxiosResponse | Error, req: pocketValueTypes) {
    if (result instanceof Error || result instanceof AxiosError) return true;
    return typeof result === "object" && (Reflect.has(result, "syscall") || Reflect.has(result, "code")) && req?.pocketValue;
  }


  /**
   *
   * 判断响应是否返回兜底值逻辑
   *
   * @remarks
   * 请求后置拦截器钩子
   *
   * @param { AxiosResponse } result - 响应
   *
   * @param { pocketValueTypes } req - 请求配置
   *
   * @public
   */
  afterTrigger(result: AxiosResponse, req: pocketValueTypes) {
    if (this.isUnexpectedSituation(result, req)) {
      this.usePocketValue = true;
      return req?.pocketValue;
    }
  }


  /**
   *
   * `log` 日志
   *
   * @param { "afterTrigger" | "beforeTrigger" } type - 根据 `type` 判断 拦截器触发类型
   * @param { void | beforeTriggerResultTypes<unknown> } data - 前置请求拦截器
   * @param { AxiosResponse } res - 响应
   *
   * @public
   */
  // @ts-ignore
  logsCallback(type: "afterTrigger" | "beforeTrigger", data: void | beforeTriggerResultTypes<unknown>, res: AxiosResponse): void {
    if (type !== "afterTrigger") return;
    if (this.usePocketValue) {
      console.groupCollapsed(`%c successfully used the pocketValue`, "color: green");
      console.log(res);
      console.groupEnd();
    }
  }
}
