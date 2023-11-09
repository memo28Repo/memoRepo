import { Reducer, Slice } from "@reduxjs/toolkit";
import { createActionImpl, createActionMapperType } from "./createActionImpl";


/**
 *
 *
 * 创建 `slice` 抽象类
 *
 * @public
 */
export abstract class createSliceImpl<S extends object> {

  /**
   *
   *  获取 slice name
   *
   * @public
   *
   */
  abstract getSliceName(): string

  /**
   *
   * 根据传入的 {@link createActionImpl} {@link createCaseImpl} `name` `state` 处理返回  {@link Slice}
   *
   * @public
   *
   */
  // @ts-ignore
  abstract done(): Slice<S, Reducer<S>, string>
}
