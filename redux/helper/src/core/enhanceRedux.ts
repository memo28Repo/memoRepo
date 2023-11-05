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
  configureStore
} from "@reduxjs/toolkit";
import {
  Enhancers,
  Middlewares,
  ThunkMiddlewareFor,
  enhanceReduxImpl,
  injectionAllocationConfig
} from "../types/enhanceReduxImpl";


/**
 *
 *
 * 增强redux 皆指减少 redux 的样板式代码
 * 让更新更加简单
 *
 *
 * @public
 */
export class EnhanceRedux<S = any, A extends Action = AnyAction, M extends Middlewares<S> = [ThunkMiddlewareFor<S>], E extends Enhancers = [StoreEnhancer]> implements enhanceReduxImpl<S, A, M, E> {

  private middleware: M | undefined;

  injectionAllocation(config?: injectionAllocationConfig<S, M>): this {
    this.middleware = config?.defaultMiddleware.getDefaultMiddleware() || this.middleware;
    return this;
  }

  /**
   *
   * 获取 store 实例
   *
   * @public
   */
  getStore(config?: ConfigureStoreOptions<S, A, M, E>): EnhancedStore<S, A, M, E> {
    // @ts-ignore
    return configureStore<S, A, M, E>({
      ...config,
      // @ts-ignore
      middleware: this.middleware?.concat(config?.middleware)
      // reducer: {
      //     // userSlice: userSlice.reducer,
      //     // addApp: addApp.reducer
      // },
      // middleware: new MiddlewareArray().concat(thunkMiddleware, logger)
    });
  }
}
