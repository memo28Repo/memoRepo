/*
 * @Author: 邱狮杰
 * @Date: 2023-01-30 10:39:18
 * @LastEditTime: 2023-09-21 14:47:25
 * @Description:
 * @FilePath: /memo/packages/utils/src/index.ts
 */

import { versionLog } from "@memo28/logs";
// @ts-ignore
import pack from "../package.json";


versionLog({
  name: "@memo28/utils",
  version: pack.version
});


/**
 * 常用工具函数，提高开发者体验函数
 *
 * @packageDocumentation
 */

export { Injection } from "./Injection";
export { AnomalousChain, panicProcessing, panicProcessingOpt } from "./errors/anomalousChain";
export { Errors } from "./errors/core";
export { StringDerived } from "./derived/string";
export { NumberDerived } from "./derived/number";
export { enableLogAttribute } from "./log";
export { readingWritingSeparationDetor } from "./readingWritingSeparation/index";
export type { readingWritingSeparationUtilsType } from "./readingWritingSeparation/index";
export { ValidationErrorCollection, VerificationFlow } from "./verify/errorCollection";
export { Mail, Phone, SNI } from "./verify/verify";

export type { ErrorsNewResult, ErrorsNewResultInfo, NewOpt, Panic } from "./errors/types";

