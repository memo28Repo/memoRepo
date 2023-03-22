/*
 * @Author: 邱狮杰
 * @Date: 2023-01-06 14:32:00
 * @LastEditTime: 2023-03-22 09:13:49
 * @Description:
 * @FilePath: /memo/packages/service/src/index.ts
 */

import 'reflect-metadata'

export { RetData } from './plugin/RetData'

export { MultiVersionSwitching, multiVersionSwitchingRequest } from './plugin/multiVersionSwitching'

export { Cache, CacheTrigger, CachePrerequisites } from './plugin/cache'

export * from './core/config'
export * from './core/engine'
export * from './core/instantiation'
export * from './core/modules'
export * from './core/terminationResult'
export * from './types/engine'
export * from './types/interceptor'
export * from './core/serviceUtils'
