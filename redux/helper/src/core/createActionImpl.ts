import { fn } from "@memo28/types";

import { CaseReducer } from '@reduxjs/toolkit';
import { PayloadActionCreator } from "@reduxjs/toolkit/src/createAction";


export type enhanceCreateActionPayload = {
  actionId: string, actionCreateAt: number
}

/**
 *
 * 增强action 类型 payload 自动新增 `actionId` 随机数字 `actionIdCreateAt` 触发时间
 *
 * @public
 *
 */
export type enhanceCreateAction<T extends string, O extends object> = PayloadActionCreator<ReturnType<(params: O) => {
  payload: enhanceCreateActionPayload & O
}>["payload"], T, (params: O) => {
  payload: enhanceCreateActionPayload & O
}>


/**
 *
 *
 * `actions` 集合类型
 *
 * @public
 *
 */

export type createActionMapperType<T extends string = '', O extends object = {}> = {
  [key in T]?: enhanceCreateAction<T, O>
}

/**
 *
 *
 *
 *
 * @paramType O - `actions` 集合类型
 *
 *
 * @public
 *
 */
export abstract class createActionImpl<O extends createActionMapperType<"", {}>> {

  /**
   *
   * 新增 action 链式调用
   *
   *
   * @paramType  Obj - `payload` 对象
   *
   * @paramType  Type - `action.type`
   *
   * @public
   */
  abstract addAction<Obj extends object, Type extends string>(type: Type): createActionImpl<O & createActionMapperType<Type, Obj>>


  /**
   *
   *
   *
   * 获取某一个 `action` 函数
   *
   * @param type
   */
  abstract getAction<K extends keyof O>(type: K): Partial<O>[K]


  /**
   *
   * 获取所有 `actions` 集合
   *
   * @public
   *
   */
  abstract getAllActions(): O


  /**
   *
   *
   * `actions` 迭代器
   *
   * @param callback - 遍历集合 传入 `action.type`
   *
   * @public
   */
  abstract actionIterator(callback?: fn<[string], void>): void

}
