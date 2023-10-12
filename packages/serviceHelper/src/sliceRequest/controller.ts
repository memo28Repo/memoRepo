/*
 * @Author: 邱狮杰&qwm
 * @Date: 2023-08-03 18:43:33
 * @LastEditTime: 2023-10-05 01:42:49
 * @Description:
 * @FilePath: /memo/packages/serviceHelper/src/sliceRequest/controller.ts
 */
import { CONSTANT, injection } from "./constant";

export interface controllerOptTypes {
  apply: string[]
}

/**
 *
 * 控制器 配置路由
 *
 * @public
 *
 */

export function controller(url: string, controllerOpt?: controllerOptTypes) {
  return <T extends { new(...args: any[]): {} }>(constructor: T) => {
    // @ts-ignore
    class controller extends constructor {
      constructor() {
        super()
        injection.setTarget(constructor).setValue(CONSTANT.CONTROLLER_URL, url);
        controllerOpt?.apply.forEach(fn => {
          injection.setTarget(
            Reflect.get(this, fn) as object
          ).setValue(CONSTANT.CONTROLLER_URL, url)
        })
        injection.setTarget(constructor)
      }
    }
    return controller
  };
}



