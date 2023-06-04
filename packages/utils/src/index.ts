/*
 * @Author: 邱狮杰
 * @Date: 2023-01-30 10:39:18
 * @LastEditTime: 2023-06-04 08:50:30
 * @Description:
 * @FilePath: /memo/packages/utils/src/index.ts
 */

/**
 * 常用工具函数，提高开发者体验函数
 *
 * @packageDocumentation
 */

export { enableLogAttribute } from './log'
export { Injection } from './Injection'
export { Errors } from './errors/core'
export { AnomalousChain, panicProcessing, panicProcessingOpt } from './errors/anomalousChain'
export { SNI, Phone, Mail } from './verify/verify'
export { ValidationErrorCollection, VerificationFlow } from './verify/errorCollection'

export type { ErrorsNewResult, ErrorsNewResultInfo, Panic, NewOpt } from './errors/types'
