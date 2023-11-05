import { Middlewares } from "../types/enhanceReduxImpl";
import { ThunkMiddlewareFor } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { defaultMiddlewareImpl, defaultMiddlewareImplConfig } from "./defaultMiddlewareImpl";
import { createLogger } from "redux-logger";
import { EnableConfiguration, BindingConfiguration } from "@memo28/open-source-tool";
import { readingWritingSeparationUtilsType, Errors } from "@memo28/utils";

/**
 *
 * 默认中间件
 *
 * @public
 *
 */
export class DefaultMiddleware<S = any, M extends Middlewares<S> = [ThunkMiddlewareFor<S>]> implements defaultMiddlewareImpl<S, M> {

  // @ts-ignore
  private middlewareList: M = [];

  private reduxLoggerEnableConfiguration = new EnableConfiguration() as readingWritingSeparationUtilsType<EnableConfiguration>;

  constructor(config?: defaultMiddlewareImplConfig) {
    Promise.all([
      this.reduxLogger(config)
    ]);
  }

  private reduxLogger(config?: defaultMiddlewareImplConfig) {
    this.reduxLoggerEnableConfiguration.setBindConfiguredFunc(createLogger);
    this.reduxLoggerEnableConfiguration.setDefaultConfig({});
    const [err, result] = new BindingConfiguration(this.reduxLoggerEnableConfiguration, config?.reduxLogger).trigger();
    if (!Errors.Is(err)) {
      this.middlewareList.concat(result);
    }
    return this;
  }


  getDefaultMiddleware(): M {
    return this.middlewareList as M;
  }

}
