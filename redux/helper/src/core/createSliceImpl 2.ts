import { Reducer, Slice } from "@reduxjs/toolkit";
import { createActionImpl, createActionMapperType } from "./createActionImpl";


/**
 *
 *
 * 创建 `slice` 抽象类
 *
 * @public
 */
export abstract class createSliceImpl<S extends object = any, N extends string = any, A extends createActionImpl<createActionMapperType> = createActionImpl<createActionMapperType>> {

  /**
   *
   *  获取 slice name
   *
   * @public
   *
   */
  abstract getSliceName(): N


  /**
   *
   * 获取 actions 的所有信息
   *
   * @public
   *
   */
  abstract getActions(): A


  /**
   *
   * 获取 state
   *
   * @public
   *
   */
  abstract getState(): S

  /**
   *
   * 根据传入的 {@link createActionImpl} {@link createCaseImpl} `name` `state` 处理返回  {@link Slice}
   *
   * @public
   *
   */
  // @ts-ignore
  abstract done(): Slice<S, Reducer<S>, N>
}
