/*
 * @Author: 邱狮杰&qwm
 * @Date: 2023-11-04 16:06:49
 * @LastEditTime: 2023-11-04 16:49:32
 * @Description:
 * @FilePath: /memo/redux/helper/src/core/enhanceRedux.ts
 */
import {
  Action,
  AnyAction,
  ConfigureStoreOptions,
  EnhancedStore,
  StoreEnhancer,
  configureStore, Slice, Reducer
} from "@reduxjs/toolkit";
import {
  Enhancers,
  Middlewares,
  ThunkMiddlewareFor,
  enhanceReduxImpl,
  injectionAllocationConfig
} from "../types/enhanceReduxImpl";
import { createSliceImpl } from "./createSliceImpl";
import { SliceCaseReducers } from "@reduxjs/toolkit/src/createSlice";


/**
 *
 *
 * 帮助配置 `store Class`
 *
 * @public
 */
export class EnhanceRedux<S = any, A extends Action = AnyAction, M extends Middlewares<S> = [ThunkMiddlewareFor<S>], E extends Enhancers = [StoreEnhancer]> implements enhanceReduxImpl<S, A, M, E> {


  /**
   *
   *
   * 内部中间件配置
   *
   *
   * @public
   *
   * @private
   */
  private middleware: M[] = [];


  /**
   *
   *
   *
   *
   * @public
   */
  private sliceReducers: {
    [key: string]: Slice<S, SliceCaseReducers<S>, string>
  } = {};

  /**
   * 注入配置
   *
   * @param config - 参数详见 {@link injectionAllocationConfig}
   *
   * @public
   */
  injectionAllocation(config?: injectionAllocationConfig<S, M>): this {
    this.middleware = config?.defaultMiddleware.getDefaultMiddleware() || this.middleware;
    return this;
  }


  /**
   *
   *
   * 新增 `slice` 自动组装 `reducer`
   *
   * @param slice - 参数需要实现自 {@link createSliceImpl}
   *
   * @public
   *
   */
  addSlice<State extends object>(slice: createSliceImpl<State>): EnhancedStore<S & State, A, M, E> {
    Reflect.set(this.sliceReducers, slice.getSliceName(), slice.done().reducer);
    return this as EnhancedStore<S & State, A, M, E>;
  }


  /**
   *
   * 获取 `store` 实例
   *
   *
   * @param config -  配置为 `@reduxjs/toolkit.configureStore` 入参
   *
   * @public
   */
  getStore(config?: ConfigureStoreOptions<S, A, M, E>): EnhancedStore<S, A, M, E> {
    // @ts-ignore
    return configureStore<S, A, M, E>({
      ...config,
      // @ts-ignore
      reducer: {
        ...this.sliceReducers,
        ...config?.reducer
      },
      // @ts-ignore
      middleware: (getDefaultMiddleware) => {
        // @ts-ignore
        const result = this.middleware?.concat(config?.middleware).filter(Boolean);
        // @ts-ignore
        return getDefaultMiddleware().concat(...result);
      }
      // reducer: {
      //     // userSlice: userSlice.reducer,
      //     // addApp: addApp.reducer
      // },
      // middleware: new MiddlewareArray().concat(thunkMiddleware, logger)
    });
  }
}
