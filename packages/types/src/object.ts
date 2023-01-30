/*
 * @Author: 邱狮杰
 * @Date: 2023-01-27 13:03:33
 * @LastEditTime: 2023-01-27 13:03:34
 * @Description:
 * @FilePath: /memo/packages/types/src/object.ts
 */
/**
 * @description 获取对象的所有key
 */
export type getObjValues<V = object> = V[keyof V]
