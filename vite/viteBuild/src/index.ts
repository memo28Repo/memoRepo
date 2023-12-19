/*
 * @Author: 邱狮杰
 * @Date: 2023-01-27 13:41:44
 * @LastEditTime: 2023-12-19 16:46:47
 * @Description:
 * @FilePath: /memo/vite/viteBuild/src/index.ts
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

import { Engine } from './core/engine'


export { Engine }

