/*
 * @Author: @memo28.repo
 * @Date: 2025-04-04 11:02:52
 * @LastEditTime: 2025-04-04 12:06:46
 * @Description: 
 * @FilePath: /memoRepo/packages/decorator/src/create.ts
 */
import { metadata, retentionPolicy, targetType } from "./index";
import { DecoratorImpl } from './interface';

export interface retentionOptions {
  retention: keyof typeof retentionPolicy;
}

export interface targetOptions {
  target: (keyof typeof targetType)[];
}

/**
 * 装饰器执行阶段
 *
 * @param option
 */
export function Retention(option: retentionOptions["retention"]) {
  return (target: any) => {
    Reflect.defineMetadata(metadata.retention, option, target)
  };
}

/**
 * 装饰器可以装饰的类型
 *
 * @public
 */
export function Target(option: targetOptions["target"]) {
  return (target: any) => {
    Reflect.defineMetadata(metadata.target, option, target)
  };
}