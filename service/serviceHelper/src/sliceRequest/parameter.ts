/*
 * @Author: 邱狮杰&qwm
 * @Date: 2023-08-11 19:59:29
 * @LastEditTime: 2023-08-12 17:32:00
 * @Description:
 * @FilePath: /memo/packages/serviceHelper/src/sliceRequest/parameter.ts
 */
import { fn } from "@memo28/types";
import { CONSTANT, injection } from "./constant";
import { assemblyRequest } from "./method";
import { retryOpt, CacheConfig, multiVersionSwitchingRequest } from "@memo28/service";


export type parameterDecoratorParams = object | fn<any, object>


export function setParameterDecoratorValueKey(key: string) {
  return `${CONSTANT.PARAMS}:${key}`;
}

/**
 *
 * 参数装饰器
 *
 * @public
 *
 */
export function parameter(opt?: parameterDecoratorParams) {
  return (target: object, key: string, descriptor: any) => {
    injection.setTarget(target).setValue(setParameterDecoratorValueKey(key), opt);
    return assemblyRequest(target, key, descriptor);
  };
}


/**
 *
 * 参数解析
 *
 * @public
 */
export function parameterParse(opt?: parameterDecoratorParams): object | null {
  if (!opt) return null;
  if (typeof opt === "function") return opt?.();
  return opt;
}


export type configTypes = object

export function setConfigDecoratorValueKey(key: string) {
  return `${CONSTANT.CONFIG}:${key}`;
}

/**
 *
 *
 * 配置参数 配置在请求同级参数
 *
 * @param { configTypes } config
 *
 * @public
 *
 */
export function config(config?: configTypes) {
  return (target: object, key: string, descriptor: any) => {
    config && injection.setTarget(target).setValue(setConfigDecoratorValueKey(key), config);
    return assemblyRequest(target, key, descriptor);
  };
}


/**
 *
 *
 * 请求重试装饰器
 *
 * @param { retryOpt } conf - 重试参数
 *
 * @public
 *
 */
export const retryOptDecor = (conf: retryOpt) => config(conf);


/**
 *
 * 缓存装饰器
 *
 * @param { CacheConfig } conf - 配置 缓存
 *
 *
 * @public
 */
export const cacheDecor = (conf: CacheConfig) => config(conf);


/**
 *
 *
 * 多版本切换装饰器
 *
 * @param { Omit<multiVersionSwitchingRequest, "versionPlaceholder"> } conf  - `version` 配置切换至版本
 *
 * @public
 */
export const multiVersionSwitchingRequestDecor = (conf: Omit<multiVersionSwitchingRequest, "versionPlaceholder">) => config(conf);


/**
 *
 * 响应兜底值
 *
 * @param  { unknown } pocketValue - 兜底值,可以是任意类型
 *
 * @public
 */
export const pocketValueDecor = (pocketValue: unknown) => config({ pocketValue: pocketValue });
