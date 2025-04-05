/*
 * @Author: @memo28.repo
 * @Date: 2025-04-04 11:02:52
 * @LastEditTime: 2025-04-05 12:29:21
 * @Description: 
 * @FilePath: /memoRepo/packages/decorator/src/create.ts
 */
import { metadata, retentionPolicy, targetType } from "./index";
import { DecoratorImpl } from "./interface";

export interface retentionOptions {
  retention: keyof typeof retentionPolicy;
}

export interface targetOptions {
  target: (keyof typeof targetType)[];
}

// 循环注入元数据
function circularInjectionMetadata(key: string, meta: unknown, target: object) {
  Reflect.defineMetadata(key, meta, target);
  let prototype = Object.getPrototypeOf(target);

  while (prototype !== null) {
    // 检查当前原型层级的元数据
    Reflect.defineMetadata(key, meta, prototype);
    // 继续向下一级原型查找
    prototype = Object.getPrototypeOf(prototype);
  }
}

/**
 * 装饰器执行阶段
 *
 * @param option
 */
export function Retention(option: retentionOptions["retention"]) {
  return (target: any) => {
    circularInjectionMetadata(metadata.retention, option, target)
  };
}

/**
 * 装饰器可以装饰的类型
 *
 * @public
 */
export function Target(option: targetOptions["target"]) {
  return (target: any) => {
    circularInjectionMetadata(metadata.target, option, target)
  };
}