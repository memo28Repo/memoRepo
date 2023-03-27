/*
 * @Author: 邱狮杰
 * @Date: 2023-01-06 14:32:00
 * @LastEditTime: 2023-03-26 08:50:51
 * @Description:
 * @FilePath: /memo/packages/service/src/index.ts
 */

import 'reflect-metadata'
import { versionLog } from './core/version'

versionLog()

export { RetData } from './plugin/RetData'

export { MultiVersionSwitching, multiVersionSwitchingRequest } from './plugin/multiVersionSwitching'

export { Cache, CachePrerequisites, CacheTrigger, ExpirationTime, requestConfig } from './plugin/cache'

export { Logs } from './plugin/logs/index'

export { Loading, LoadingOpt } from './plugin/loading/index'

export * from './core/config'
export * from './core/engine'
export * from './core/instantiation'
export * from './core/modules'
export * from './core/serviceUtils'
export * from './core/terminationResult'
export * from './types/engine'
export * from './types/interceptor'
