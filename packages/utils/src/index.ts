/*
 * @Author: 邱狮杰
 * @Date: 2023-01-30 10:39:18
 * @LastEditTime: 2024-02-11 14:12:42
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
export {} from "./config/enableConfiguration";
export { LinkList } from "./linkList/linkList";
export { ListNode, ListNodeEscapePod } from "./linkList/listNode";
export { ArrayDerived } from "./derived/array";
export { NumberDerived } from "./derived/number";
export { ObjectDerived } from "./derived/object";
export { StringDerived } from "./derived/string";
export { AnomalousChain, panicProcessing, panicProcessingOpt } from "./errors/anomalousChain";
export { assets } from "./errors/assets";
export { Errors } from "./errors/core";
export { readingWritingSeparationDecor } from "./readingWritingSeparation/index";
export type { readingWritingSeparationUtilsType } from "./readingWritingSeparation/index";
export { ValidationErrorCollection, VerificationFlow } from "./verify/errorCollection";
export { Chinese, Emoji, Mail, Phone, SNI, isArrayEmpty, isEmpty, isObjectEmpty } from "./verify/verify";


export type { ErrorsNewResult, ErrorsNewResultInfo, NewOpt, Panic } from "./errors/types";

