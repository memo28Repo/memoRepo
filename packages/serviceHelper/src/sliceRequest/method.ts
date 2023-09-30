/*
 * @Author: 邱狮杰&qwm
 * @Date: 2023-08-03 18:46:48
 * @LastEditTime: 2023-09-30 17:40:24
 * @Description:
 * @FilePath: /memo/packages/serviceHelper/src/sliceRequest/method.ts
 */
import { obj } from "@memo28/types";
import { CONSTANT, injection } from "./constant";
import { httpInstance } from "./extractRequestInstance";
import {
  configTypes,
  parameterDecoratorParams,
  parameterParse,
  setConfigDecoratorValueKey,
  setParameterDecoratorValueKey
} from "./parameter";
import { ConfigurationThrownToUser } from "./type";


/**
 *
 *
 *
 * 配置到请求上的参数类型 {@link AssemblyParameters}
 *
 *
 * @public
 */
export type config = {
  methods?: string;
  header?: object;
  url?: string;
  params?: {};
  data?: any;
} & configTypes


/**
 *
 * 处理各种拦截器 保存的参数解析出来 配置到请求上 {@link config}
 *
 * @public
 *
 */
class AssemblyParameters {
  private config: config = {};
  private url: string | null = null;

  private paramsWithDecorator: null | object = null;

  private requestConfig?: methodsDescriptorOpt = {};

  setRequestConfig(opt?: methodsDescriptorOpt) {
    this.requestConfig = opt;
    return this;
  }

  setTarget(target: object) {
    injection.setTarget(target);
    return this;
  }

  setConfig(config: configTypes) {
    this.config = Object.assign({}, this.config, config);
    return this;
  }

  setMethods() {
    const methods = injection.getValue(CONSTANT.METHOD);
    if (methods) Reflect.set(this.config, "method", methods);
    return this;
  }

  setParamsWithDecorator(obj: null | obj) {
    this.paramsWithDecorator = obj;
    return this;
  }


  setHeader() {
    const header = injection.getValue(CONSTANT.HEADERS);
    if (header) Reflect.set(this.config, "header", header);
    return this;
  }

  setURL() {
    const URL = injection.getValue(CONSTANT.URL);
    if (URL) this.url = URL as string;
    return this;
  }

  setParameters(args: any[]) {

    const isQuery = (this.config["methods"] && this.config["methods"] === "GET") || this.requestConfig?.inQuery;
    if (isQuery) {
      Reflect.set(this.config, "params", {
        ...this.paramsWithDecorator,
        ...args
      });
    } else {
      Reflect.set(this.config, "data", {
        ...this.paramsWithDecorator,
        ...args
      });
    }
    return this;
  }


  setControllerURL() {
    const CURL = injection.getValue(CONSTANT.CONTROLLER_URL);
    if (CURL && this.url)
      Reflect.set(this.config, "url", `${CURL}${this.url}`);
    else if (CURL)
      Reflect.set(this.config, "url", `${CURL}`);
    else if (URL)
      Reflect.set(this.config, "url", `${this.url}`);
    return this;
  }

  getConfig() {
    return this.config;
  }
}


/**
 *
 * 组装请求
 *
 * @remarks
 * 每一个方法装饰器都应该可以组装成一个请求, 目的： 尽可能少的配置装饰器数量
 *
 * @public
 */
export function assemblyRequest(target: object, key: string, descriptor: PropertyDescriptor, opt?: methodsDescriptorOpt) {
  const assemblyParameters = new AssemblyParameters().setRequestConfig(opt);
  assemblyParameters.setTarget(target).setMethods().setHeader().setURL();
  const fn = descriptor.value;
  const params = injection.getValue(setParameterDecoratorValueKey(key));
  const requestConfig = injection.getValue(setConfigDecoratorValueKey(key)) as configTypes | undefined;
  // @ts-ignore
  if (params) assemblyParameters.setParamsWithDecorator(parameterParse(params));
  if (requestConfig) assemblyParameters.setConfig(requestConfig);
  descriptor.value = async function() {
    const args = Array.from(arguments);
    // @ts-ignore
    const config = assemblyParameters.setControllerURL().setParameters(...args).getConfig();
    const result = await httpInstance.getInstance()()(config);

    const returnUserProfile: ConfigurationThrownToUser<any> = {
      response: result
    };
    return await fn(...args, returnUserProfile);
  };
}


/**
 *
 *
 *
 * 方法拦截器 参数类型 {@link Post} {@link Get} {@link Put} {@link Del}
 *
 * @public
 *
 */
export interface methodsDescriptorOpt {
  /**
   * 放置在query上
   *
   * @public
   */
  inQuery?: boolean;

  params?: parameterDecoratorParams;
}


/**
 *
 * 方法拦截器通用逻辑
 *
 * @param method 方法类型
 * @param url 路由
 * @param opt 方法拦截器 参数类型 {@link methodsDescriptorOpt}
 *
 * @public
 */
function methodsDescriptor(method: string, url?: string, opt?: methodsDescriptorOpt) {
  return (target: object, key: string, descriptor: PropertyDescriptor) => {
    injection
      .setTarget(target)
      .setValue(CONSTANT.METHOD, method.toUpperCase())
      .setValue(CONSTANT.URL, url);
    if (opt?.params) injection.setValue(setParameterDecoratorValueKey(key), opt.params);
    return assemblyRequest(target, key, descriptor, opt);
  };
}

/**
 *
 *
 * `Delete` 方法装饰器
 *
 * @param url 路由 将凭借在 `control` 装饰器 后
 * @param opt 配置
 * ```
 * `opt.params` 参数将配置 请求的 `params` 或 `data` 参数
 *
 * `opt.inQuery` 参数将配置 请求的 `params` 或 `data` 参数 全部添加到 ·params· 上
 * ```
 *
 * @public
 */
export const Del = (url?: string, opt?: methodsDescriptorOpt) => methodsDescriptor("DELETE", url, opt);

/**
 *
 *
 * `Post` 方法装饰器
 *
 * @param url 路由 将凭借在 `control` 装饰器 后
 * @param opt 配置
 * ```
 * `opt.params`  参数将配置 请求的 `params` 或 `data` 参数(自动匹配根据方法类型)
 *
 * `opt.inQuery` 参数将配置 请求的 `params` 或 `data` 参数 全部添加到 ·params· 上
 * ```
 *
 * @public
 */
export const Post = (url?: string, opt?: methodsDescriptorOpt) => methodsDescriptor("POST", url, opt);


/**
 *
 *
 * `Get` 方法装饰器
 *
 * @param url 路由 将凭借在 `control` 装饰器 后
 * @param opt 配置
 * ```
 * `opt.params` 参数将配置 请求的 `params` 或 `data` 参数(自动匹配根据方法类型)
 *
 * `opt.inQuery` 参数将配置 请求的 `params` 或 `data` 参数 全部添加到 ·params· 上
 * ```
 *
 * @public
 */
export const Get = (url?: string, opt?: methodsDescriptorOpt) => methodsDescriptor("GET", url, opt);


/**
 *
 *
 * `Put` 方法装饰器
 *
 * @param url 路由 将凭借在 `control` 装饰器 后
 * @param opt 配置
 * ```
 * `opt.params` 参数将配置 请求的 `params` 或 `data` 参数(自动匹配根据方法类型)
 *
 * `opt.inQuery` 参数将配置 请求的 `params` 或 `data` 参数 全部添加到 ·params· 上
 * ```
 *
 * @public
 */
export const Put = (url?: string, opt?: methodsDescriptorOpt) => methodsDescriptor("PUT", url, opt);


