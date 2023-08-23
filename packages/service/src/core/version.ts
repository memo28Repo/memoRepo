/*
 * @Author: 邱狮杰
 * @Date: 2023-03-23 17:59:22
 * @LastEditTime: 2023-03-24 13:46:36
 * @Description:
 * @FilePath: /memo/packages/service/src/core/version.ts
 */
// @ts-ignore
import pack from "../../package.json";
import { versionLog as versionLogHelper } from "@memo28/logs";

export function versionLog() {
  versionLogHelper({
    name: "@memo28/service",
    version: pack.version as string
  });
}
