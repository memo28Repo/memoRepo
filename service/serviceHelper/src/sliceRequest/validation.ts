/*
 * @Author: 邱狮杰&qwm
 * @Date: 2023-08-09 19:22:03
 * @LastEditTime: 2023-08-10 09:07:01
 * @Description:
 * @FilePath: /memo/packages/serviceHelper/src/sliceRequest/validation.ts
 */

/**
 *
 *
 * 验证参数请求
 *
 * @public
 *
 */
export function validation() {
  return (target: object, key: string, desc: any) => {
    const fn = desc.value;
    desc.value = function(...args: any[]) {
      let requiredParameters: requiredParametersConfig[] = Reflect.getOwnMetadata(requiredParametersKey, target, key) || [];
      for (let i = 0; i < requiredParameters.length; i++) {
        const cur = requiredParameters[i];
        /**
         * 当前 下标 必需参数拦截器的值 存在 就说明要去验证 实际参数是否存在
         */
        if (cur && args[i] === undefined) throw new RequiredParametersConfigThrow(cur);
      }
      return fn.apply(this, args);
    };
  };

}

const requiredParametersKey = Symbol("requiredParametersKey");

export interface requiredParametersConfig {
  /**
   *
   *
   * 提示信息
   *
   * @public
   *
   */
  message: string;


  /**
   *
   *
   * 提示函数
   *
   * @public
   */
  alertFn: (message: string) => void;
}

/**
 *
 *
 * 必需参数 装饰器 保存到 `meta` 的值
 *
 *
 * @public
 *
 */
export type requiredParametersStoredValue = {
  index: number
} & requiredParametersConfig


/**
 *
 *
 * 必需参数装饰器 如遇空值则直接报错 调用该 `class`
 *
 *
 * @public
 *
 */
export class RequiredParametersConfigThrow extends Error {
  constructor(private requiredParametersConfig: requiredParametersConfig) {
    super(requiredParametersConfig.message);
    this.requiredParametersConfig?.alertFn?.(this.requiredParametersConfig.message);
  }
}

/**
 *
 * 必需参数
 *
 * @public
 *
 */
export function requiredParameters(opt: requiredParametersConfig) {
  return (target: object, key: string | symbol, index: number) => {
    const h: requiredParametersStoredValue = {
      ...opt,
      index
    };
    let requiredParameters: number[] = Reflect.getOwnMetadata(requiredParametersKey, target, key) || [];
    Reflect.defineMetadata(requiredParametersKey, [...requiredParameters, h], target, key);
  };
}

