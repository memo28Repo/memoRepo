import { Middlewares } from "../types/enhanceReduxImpl";
import { ThunkMiddlewareFor } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { ReduxLoggerOptions } from "redux-logger";
import { enableConfigurationTypes } from "@memo28/open-source-tool";

export interface defaultMiddlewareImplConfig {
  reduxLogger?: enableConfigurationTypes<ReduxLoggerOptions>;
  thunk?: enableConfigurationTypes<boolean>;
}

export abstract class defaultMiddlewareImpl<S = any, M extends Middlewares<S> = [ThunkMiddlewareFor<S>]> {


  /**
   *
   * 获取配置好的默认中间件
   *
   * @public
   */
  abstract getDefaultMiddleware(): M[];
}
