import { fn } from "@memo28/types";
import { Draft } from "@reduxjs/toolkit";
import { createActionImpl, createActionMapperType, enhanceCreateActionPayload } from "./createActionImpl";


/**
 *
 *
 * 增强后的 `action` 所需类型
 *
 * @paramType A -  实现了 {@link createActionImpl} 抽象类的 `createAction` 类型
 *
 * @paramType Type -  根据具体的 `Type` 泛型去查询 `A` 泛型中对应的 `action` 类型
 *
 * @public
 *
 */
export type createCaseImplAction<A extends createActionImpl<createActionMapperType<"", {}>>, Type extends keyof ReturnType<A["getAllActions"]>> = {
  type: Type,
  // @ts-ignore
  payload: Parameters<ReturnType<A["getAllActions"]>[Type]>[0] & enhanceCreateActionPayload
}


/**
 *
 * `case reducer` 的集合类型
 *
 * @paramType S - `reducer` 的 `state` 类型
 *
 * @paramType A - 期望一个 实现了 {@link createActionImpl} 抽象类的 `createAction` 实现
 *
 * @public
 *
 */
export type caseCollection<S extends object, A extends createActionImpl<createActionMapperType<"", {}>>, Type extends "" = ""> = {
  [key in string]: fn<[Draft<S>, createCaseImplAction<A, Type>], void>
}


/**
 *
 * 通过链式调用 创建 `reducer` 不同 `action` 的 抽象类
 *
 * @public
 *
 */
export abstract class createCaseImpl<S extends object, A extends createActionImpl<createActionMapperType<"", {}>>> {


  /**
   *
   *  新增 一个 `reducer action handler`
   *
   *
   * @remarks
   * ```
   * addCase("actionType",function(state, action) { })
   * ```
   *
   * @param type - 根据传入的 {@link createActionImpl} 验证 `type` 传入 参数
   *
   * @param handler - 将传入 `builder.addCase` 的第二个参数 用于对应 `action` 的 `reducer`
   *
   *
   * @public
   *
   */
  abstract addCase<Type extends keyof ReturnType<A["getAllActions"]>>(type: Type, handler: fn<[Draft<S>, createCaseImplAction<A, Type>], void>): this


  /**
   *
   * 获取某个 `action` 具体的 `handler`
   *
   * @param type - `action.type`
   *
   * @public
   */
  abstract getCaseItem<Type extends keyof ReturnType<A["getAllActions"]>>(type: Type): fn<[Draft<S>, createCaseImplAction<A, Type>], void>


  /**
   *
   * 获取所有 `case` 相关 `reducer` 的集合
   *
   * @public
   *
   */
  abstract getCaseCollection(): Partial<caseCollection<S, A>>

}
