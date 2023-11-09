/*
 * @Author: 邱狮杰&qwm
 * @Date: 2023-11-04 16:06:55
 * @LastEditTime: 2023-11-04 16:49:25
 * @Description:
 * @FilePath: /memo/redux/helper/src/types/enhanceReduxImpl.ts
 */
import { Action, AnyAction, ConfigureStoreOptions, EnhancedStore, Middleware, StoreEnhancer } from "@reduxjs/toolkit";
import { ThunkMiddlewareFor } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { defaultMiddlewareImpl } from "../middleware/defaultMiddlewareImpl";

export declare type Enhancers = ReadonlyArray<StoreEnhancer>;
export declare type Middlewares<S> = ReadonlyArray<Middleware<{}, S>>;
export type { ThunkMiddlewareFor };

export interface injectionAllocationConfig<S = any, M extends Middlewares<S> = [ThunkMiddlewareFor<S>]> {
  defaultMiddleware: defaultMiddlewareImpl<S, M>;
}

export interface enhanceReduxImpl<S = any, A extends Action = AnyAction, M extends Middlewares<S> = [ThunkMiddlewareFor<S>], E extends Enhancers = [StoreEnhancer]> {

  getStore(config?: ConfigureStoreOptions<S, A, M, E>): EnhancedStore<S, A, M, E>;


  /**
   * 注入配置
   *
   * @public
   */
  injectionAllocation(config?: injectionAllocationConfig<S, M>): this;
}


