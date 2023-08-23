/*
 * @Author: 邱狮杰&qwm
 * @Date: 2023-08-03 18:43:33
 * @LastEditTime: 2023-08-05 10:51:30
 * @Description:
 * @FilePath: /memo/packages/serviceHelper/src/sliceRequest/controller.ts
 */
import { CONSTANT, injection } from "./constant";

/**
 *
 * 控制器 配置路由
 *
 * @public
 *
 */

export function controller(url: string) {
  return (target: any) => {
    injection.setTarget(target).setValue(CONSTANT.CONTROLLER_URL, url);
  };
}



