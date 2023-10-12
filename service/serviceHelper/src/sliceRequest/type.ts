/**
 *
 *
 * 向用户抛出的配置
 *
 * @typeParams R - response 响应值
 *
 * @public
 *
 */

export interface ConfigurationThrownToUser<R extends any> {
  /**
   *
   * 响应
   *
   */
  response: R;

  /**
   *
   * 设置请求头
   *
   */
  setHeaders?: (headers: any) => void;
}

