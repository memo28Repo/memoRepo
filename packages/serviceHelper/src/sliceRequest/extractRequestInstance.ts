/*
 * @Author: 邱狮杰&qwm
 * @Date: 2023-08-03 18:16:44
 * @LastEditTime: 2023-08-11 19:42:36
 * @Description: 提取请求实例装饰器
 * @FilePath: /memo/packages/serviceHelper/src/sliceRequest/extractRequestInstance.ts
 */
/**
 *
 *
 * 接口实例 获取
 *
 * @public
 */
class HttpInstance {
  private instance: any;

  setInstance(instance: any) {
    this.instance = instance;
  }

  getInstance() {
    if (!this.instance) {
      throw new Error("请求实例不存在 请联系开发者");
    }
    return this.instance;
  }
}

export const httpInstance = new HttpInstance();

export function extractRequestInstance() {
  return (target: any) => {
    httpInstance.setInstance(target.prototype.getAxios);
  };
}

