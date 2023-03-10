/*
 * @Author: 邱狮杰
 * @Date: 2023-01-30 10:39:18
 * @LastEditTime: 2023-03-10 17:17:15
 * @Description:
 * @FilePath: /memo/packages/utils/src/index.ts
 */
import { enableLogAttribute } from './log'

enableLogAttribute()

export { Injection } from './Injection'
export { Errors } from './errors/core'
export { AnomalousChain, panicProcessing } from './errors/anomalousChain'
export type { ErrorsNewResult, ErrorsNewResultInfo, Panic, NewOpt } from './errors/types'
