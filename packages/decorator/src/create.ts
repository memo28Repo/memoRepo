import { retentionPolicy, targetType } from "./index";

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
export function retention(option: retentionOptions["retention"]) {
  if (option === retentionPolicy.source) {
    console.log("source");
  }
  return (target: any) => {
    if (option === retentionPolicy.runtime) {
      console.log("runTime");
    }
  };
}

/**
 * 装饰器可以装饰的类型
 *
 * @public
 */
export function target(option: targetOptions["target"]) {
  return (target: any) => {

  };
}


@target([targetType.method, targetType.field])
@retention(retentionPolicy.runtime)
class Test {

}