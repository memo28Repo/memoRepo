/*
 * @Author: 邱狮杰
 * @Date: 2023-05-12 23:04:04
 * @LastEditTime: 2023-05-12 23:04:05
 * @Description:
 * @FilePath: /memo/packages/vue/src/index.ts
 */
import { versionLog } from "@memo28/logs";
import { callComponentGlobally } from "./features/callComponentGlobally/callComponentGlobally";
// @ts-ignore
import pack from "../package.json";

versionLog({
  name: "@memo28/vue",
  version: pack.version
});

/**
 * 基于 vue3 的常用 hooks
 *
 * @packageDocumentation
 */


export { useEnhancedRef } from "./hooks/useEnhancedRef";
export { callComponentGlobally };
