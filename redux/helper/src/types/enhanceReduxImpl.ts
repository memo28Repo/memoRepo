/*
 * @Author: 邱狮杰&qwm
 * @Date: 2023-11-04 16:06:55
 * @LastEditTime: 2023-11-04 16:49:25
 * @Description:
 * @FilePath: /memo/redux/helper/src/types/enhanceReduxImpl.ts
 */
import {
  Action,
  AnyAction,
  ConfigureStoreOptions,
  EnhancedStore,
  Middleware,
  StoreEnhancer,
  configureStore
} from "@reduxjs/toolkit";
import { ThunkMiddlewareFor } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { defaultMiddlewareImpl } from "../middleware/defaultMiddlewareImpl";
import { createSliceImpl } from "../core/createSliceImpl";

export declare type Enhancers = ReadonlyArray<StoreEnhancer>;
export declare type Middlewares<S> = ReadonlyArray<Middleware<{}, S>>;
export type { ThunkMiddlewareFor };


/**
 *
 * 注入默认配置类型实现
 *
 * @public
 *
 */
export interface injectionAllocationConfig<S = any, M extends Middlewares<S> = [ThunkMiddlewareFor<S>]> {
  /**
   *
   *
   * 默认中间件实例 {@link defaultMiddlewareImpl}
   *
   * @public
   *
   */
  defaultMiddleware: defaultMiddlewareImpl<S, M>;
}

export interface enhanceReduxImpl<S = any, A extends Action = AnyAction, M extends Middlewares<S> = [ThunkMiddlewareFor<S>], E extends Enhancers = [StoreEnhancer]> {


  /**
   *
   * 返回 `store` 实例
   *
   * @param config -  参数为 `@reduxjs/toolkit.configureStore` 入参
   *
   *
   * @public
   *
   */
  getStore(config?: ConfigureStoreOptions<S, A, M, E>): EnhancedStore<S, A, M, E>;

  /**
   *
   *
   * add Slice
   *
   * @param slice - 参数需要实现自 {@link createSliceImpl}
   *
   *
   * @public
   */
  addSlice<State extends object>(slice: createSliceImpl<State>): this;

  /**
   * 注入配置
   *
   * @param config - 参数详见 {@link injectionAllocationConfig}
   *
   * @public
   */
  injectionAllocation(config?: injectionAllocationConfig<S, M>): this;
}

