/*
 * @Author: 邱狮杰
 * @Date: 2023-06-04 08:48:08
 * @LastEditTime: 2023-06-04 08:50:44
 * @Description:
 * @FilePath: /memo/packages/valuePolyfill/src/index.ts
 */

// @ts-ignore
import pack from '../package.json'
import {versionLog} from '@memo28/logs'

versionLog({
  name: '@memo28/valuePolyfill',
  version: pack.version
})

export { ValuePolyFill } from "./core";

export { valuePolyFillToArray, valuePolyFillToObj, arrayToValuePolyFill, objToValuePolyFill } from "./utils";

export type { DeepObjectToValuePolyFillTypes } from "./core";
