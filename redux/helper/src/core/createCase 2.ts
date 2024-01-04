/*
 * @Author: 邱狮杰&qwm
 * @Date: 2023-11-07 20:47:36
 * @LastEditTime: 2023-11-07 22:06:00
 * @Description:
 * @FilePath: /memo/redux/helper/src/core/createCase.ts
 */
import { fn } from "@memo28/types";
import { Draft } from "@reduxjs/toolkit";
import { createActionImpl, createActionMapperType } from "./createActionImpl";
import { caseCollection, createCaseImpl, createCaseImplAction } from "./createCaseImpl";


/**
 *
 *
 * 详情见 {@link createCaseImpl}
 *
 * @public
 *
 */
export class CreateCase<A extends createActionImpl<createActionMapperType<"", {}>>, S extends object = object> implements createCaseImpl<S, A> {


  private caseCollection: Partial<caseCollection<S, A>> = {};


  /**
   *
   *
   * 详情见 {@link createCaseImpl.addCase}
   *
   * @public
   *
   */
  addCase<Type extends keyof ReturnType<A["getAllActions"]>>(type: Type, handler: fn<[state: Draft<S>, action: createCaseImplAction<A, Type>], void>): this {
    Reflect.set(this.caseCollection, type, handler);
    return this;
  }


  /**
   *
   *
   * 详情见 {@link createCaseImpl.getCaseItem}
   *
   * @public
   *
   */
  getCaseItem<Type extends keyof ReturnType<A["getAllActions"]>>(type: Type): fn<[Draft<S>, createCaseImplAction<A, Type>], void> {
    return Reflect.get(this.caseCollection, type);
  }


  /**
   *
   *
   * 详情见 {@link createCaseImpl.getCaseCollection}
   *
   * @public
   */
  getCaseCollection(): Partial<caseCollection<S, A>> {
    return this.caseCollection;
  }

}

