/*
 * @Author: 邱狮杰&qwm
 * @Date: 2023-11-07 20:25:39
 * @LastEditTime: 2023-11-08 16:23:53
 * @Description:
 * @FilePath: /memo/redux/helper/src/core/createSlice.ts
 */

import { createSlice, Slice } from "@reduxjs/toolkit";
import { createActionImpl, createActionMapperType } from "./createActionImpl";
import { createCaseImpl } from "./createCaseImpl";
import { createSliceImpl } from "./createSliceImpl";
import { SliceCaseReducers } from "@reduxjs/toolkit/src/createSlice";


/**
 *
 *
 * 详情见 {@link createSliceImpl}
 *
 * @public
 *
 */
export class CreateSlice<S extends object, A extends createActionMapperType = createActionMapperType> implements createSliceImpl<S> {
  constructor(private name: string, private state: S, private actions: createActionImpl<A>, private cases?: createCaseImpl<S, createActionImpl<A>>) {
  }


  getSliceName(): string {
    return this.name;
  }

  /**
   *
   * 详情见 {@link createSliceImpl.done}
   *
   * @public
   *
   */
  done(): Slice<S, SliceCaseReducers<S>, string> {
    return createSlice<S, SliceCaseReducers<S>, string>({
      name: this.name,
      // @ts-ignore
      reducers: {},
      initialState: this.state,
      extraReducers: (builder) => {
        this.actions.actionIterator((actionType) => {
          builder.addCase(actionType, (state, action) => {
            // @ts-ignore
            this.cases?.getCaseItem(action.type)?.(state, action);
          });
        });
      }
    });
  }
}


