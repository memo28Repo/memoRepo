/*
 * @Author: 邱狮杰
 * @Date: 2023-01-27 13:41:44
 * @LastEditTime: 2023-04-14 22:53:51
 * @Description:
 * @FilePath: /memo/packages/viteBuild/src/index.ts
 */

import { versionLog } from '@memo28/logs'
// @ts-ignore
import pack from '../package.json'

versionLog({
  name: '@memo28/viteBuild',
  version: pack.version
})

/**
 * 常用`vite`插件
 *
 * @packageDocumentation
 */

export { Engine } from './core/engine'
