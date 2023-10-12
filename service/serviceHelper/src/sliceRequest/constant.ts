/*
 * @Author: 邱狮杰&qwm
 * @Date: 2023-08-04 08:45:12
 * @LastEditTime: 2023-10-03 14:40:18
 * @Description:
 * @FilePath: /memo/packages/serviceHelper/src/sliceRequest/constant.ts
 */
import { Injection } from "@memo28/utils";

export const CONSTANT = {
  /**
   *
   * 方法类型
   *
   * @public
   */
  METHOD: "method",

  /**
   *
   *
   * 控制器_url
   *
   * @public
   *
   */
  CONTROLLER_URL: "controller_url",

  /**
   *
   *
   * 路由
   *
   * @public
   *
   */
  URL: "url",


  /**
   *
   *
   * 请求头配置
   *
   * @public
   */
  HEADERS: "headers",

  /**
   *
   *
   * 参数装饰器
   *
   * @public
   */
  PARAMS: "params",

  /**
   *
   * 配置装饰器参数
   *
   * @public
   */
  CONFIG: "config"
};


/**
 *
 * 注入字符串类型
 *
 * @public
 *
 */
export type injectionType = typeof CONSTANT[keyof typeof CONSTANT]


/**
 *
 * 通用注入器
 *
 * @public
 */
export const injection = new Injection<injectionType>();
