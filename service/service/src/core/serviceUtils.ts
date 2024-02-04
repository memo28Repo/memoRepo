/*
 * @Author: 邱狮杰
 * @Date: 2023-03-22 09:13:31
 * @LastEditTime: 2023-12-29 10:11:58
 * @Description:
 * @FilePath: /memo/service/service/src/core/serviceUtils.ts
 */
import { Injection } from "@memo28/utils";
import axios, { AxiosDefaults, AxiosHeaderValue, AxiosInstance, HeadersDefaults } from "axios";
import { Interceptor } from "../interceptor/core";
import { Logs } from "../plugin/logs";
import { PocketValue } from "../plugin/pocketBottom";
import { initializeConfigurationTypes, modulesImpl } from "../types/engine";
import { getInitializeConfigurationValues } from "./config";
import { GenerateSchedulingAxios } from "./instantiation";
import { getModulesValues } from "./modules";

export let debug = false;


/**
 *
 * 请求工具
 *
 * @remarks
 * 如项目不支持装饰器 则降级为该方案
 *
 * @public
 */
export class ServiceUtils<T extends object> {
  private injection = new Injection<getModulesValues | getInitializeConfigurationValues>(this);
  private axios: null | AxiosInstance = null;


  /**
   *
   * - 配置拦截器
   * - 配置前后置拦截器
   *
   * @param { Partial<modulesImpl> } opt  - 模块配置
   *
   * @public
   */
  modules(opt: Partial<modulesImpl>) {
    this.injection.setValue("interceptorModule", [Logs, ...(opt.interceptorModule || [])]);
    this.injection.setValue("triggerInterceptor", [...(opt.triggerInterceptor || []), PocketValue]);
    return this;
  }


  /**
   *
   * 初始化 `axios` 参数
   *
   * @public
   */
  initializeConfiguration(opt: initializeConfigurationTypes & T) {
    this.injection.setValue("initializeConfiguration", opt);
    debug = opt.debugger || false;
    return this;
  }


  /**
   *
   * 配置初始化 `axios` 参数 并且创建 `axios` & 绑定拦截器
   *
   * @public
   */
  instantiation() {
    this.axios = axios.create(this.injection.getValue("initializeConfiguration"));
    new Interceptor(this.injection, this.axios);
    return this;
  }


  setDefaultConfig(config: Partial<Omit<AxiosDefaults, "headers"> & {
    headers: HeadersDefaults & {
      [key: string]: AxiosHeaderValue
    }
  }>) {
    this.injection.setValue("initializeConfiguration", {
      ...this.injection.getValue("initializeConfiguration") || {},
      ...config
    });

    this.instantiation();
    return this;
  }


  /**
   *
   * 获取实例化后的  `axios`
   *
   * @public
   */
  getAxios() {
    return async <R>(req: initializeConfigurationTypes & T): Promise<R> => {
      const generateSchedulingAxios = new GenerateSchedulingAxios(
        this.injection,
        {
          ...req,
          ...this.injection.getValue("initializeConfiguration")
        },
        this.axios as AxiosInstance
      );
      const beforeTriggeringInterceptionResponse = await generateSchedulingAxios.beforeTriggeringInterception();
      // 如果 value 不是 GenerateSchedulingAxios的实例 表示存在中途推出的情况, 直接返回
      if (!(beforeTriggeringInterceptionResponse instanceof GenerateSchedulingAxios)) {
        return beforeTriggeringInterceptionResponse;
      }
      return (await beforeTriggeringInterceptionResponse.triggerRequest()).afterTriggeringInterception();
    };
  }
}
