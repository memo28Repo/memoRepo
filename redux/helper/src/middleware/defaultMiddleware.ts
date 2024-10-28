/*
 * @Author: @memo28.repo
 * @Date: 2024-04-22 10:34:27
 * @LastEditTime: 2024-06-09 09:12:54
 * @Description: 
 * @FilePath: /memoRepo/redux/helper/src/middleware/defaultMiddleware.ts
 */
import { BindingConfiguration, EnableConfiguration } from "@memo28/open-source-tool";
import { Errors, readingWritingSeparationUtilsType } from "@memo28/utils";
import { ThunkMiddlewareFor } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { Middlewares } from "../types/enhanceReduxImpl";
import { defaultMiddlewareImpl, defaultMiddlewareImplConfig } from "./defaultMiddlewareImpl";

/**
 *
 * 默认中间件
 *
 * @public
 *
 */
export class DefaultMiddleware<S = any, M extends Middlewares<S> = [ThunkMiddlewareFor<S>]> implements defaultMiddlewareImpl<S, M> {

  private middlewareList: M[] = [];

  private reduxLoggerEnableConfiguration = new EnableConfiguration() as readingWritingSeparationUtilsType<EnableConfiguration>;

  private thunkEnableConfiguration = new EnableConfiguration() as readingWritingSeparationUtilsType<EnableConfiguration>;

  constructor(config?: defaultMiddlewareImplConfig) {
    Promise.all([
      this.reduxLogger(config),
      this.thunkMid(config)
    ]).then(r => {
    });
  }

  private reduxLogger(config?: defaultMiddlewareImplConfig) {
    this.reduxLoggerEnableConfiguration.setBindConfiguredFunc(createLogger);
    this.reduxLoggerEnableConfiguration.setDefaultConfig({});
    const [err, result] = new BindingConfiguration(this.reduxLoggerEnableConfiguration, config?.reduxLogger).trigger();
    if (!Errors.Is(err)) this.middlewareList = this.middlewareList.concat(result);
    return this;
  }


  private thunkMid(config?: defaultMiddlewareImplConfig) {
    this.thunkEnableConfiguration.setBindConfiguredFunc(thunk);
    // @ts-ignore
    const [err, result] = new BindingConfiguration(this.thunkEnableConfiguration, config?.thunk)?.returnItSelf?.();
    // @ts-ignore
    if (!Errors.Is(err) && result) this.middlewareList = this.middlewareList.concat(result);
    return this;
  }

  getDefaultMiddleware(): M[] {
    return this.middlewareList as M[];
  }

}
