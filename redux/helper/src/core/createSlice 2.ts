/*
 * @Author: 邱狮杰&qwm
 * @Date: 2023-11-07 20:25:39
 * @LastEditTime: 2023-11-08 16:23:53
 * @Description:
 * @FilePath: /memo/redux/helper/src/core/createSlice.ts
 */

import { createSlice, Slice } from "@reduxjs/toolkit";
import { SliceCaseReducers } from "@reduxjs/toolkit/src/createSlice";
import { createActionImpl, createActionMapperType } from "./createActionImpl";
import { createCaseImpl } from "./createCaseImpl";
import { createSliceImpl } from "./createSliceImpl";


/**
 *
 *
 * 详情见 {@link createSliceImpl}
 *
 * @public
 *
 */
export class CreateSlice<S extends object, N extends string, A extends createActionImpl<createActionMapperType> = createActionImpl<createActionMapperType>> implements createSliceImpl<S, N, A> {
  constructor(private name: N, private state: S, private actions: A, private cases?: createCaseImpl<S, A>) {
  }


  getActions(): A {
    return this.actions;
  }


  getState(): S {
    return this.state;

  }

  getSliceName(): N {
    return this.name;
  }

  /**
   *
   * 详情见 {@link createSliceImpl.done}
   *
   * @public
   *
   */
  done(): Slice<S, SliceCaseReducers<S>, N> {
    return createSlice<S, SliceCaseReducers<S>, N>({
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

