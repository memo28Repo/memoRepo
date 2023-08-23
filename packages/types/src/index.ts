/*
 * @Author: 邱狮杰
 * @Date: 2023-01-10 15:48:00
 * @LastEditTime: 2023-04-14 23:10:58
 * @Description:
 * @FilePath: /memo/packages/types/src/index.ts
 */
import {versionLog} from '@memo28/logs'
// @ts-ignore
import pack from '../package.json'

versionLog({
  name: '@memo28/types',
  version: pack.version
})

/**
 * 常用工具类型，判断类型, 测试类型
 *
 * @packageDocumentation
 */

export * from './func'
export * from './object/key.value'
export * from './verify'
export * from './plugin'
export * from './baseType'
