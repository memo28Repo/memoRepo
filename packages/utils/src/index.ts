/*
 * @Author: 邱狮杰
 * @Date: 2023-01-30 10:39:18
 * @LastEditTime: 2023-04-09 08:11:22
 * @Description:
 * @FilePath: /memo/packages/utils/src/index.ts
 */
export { enableLogAttribute } from './log'
export { Injection } from './Injection'
export { Errors } from './errors/core'
export { AnomalousChain, panicProcessing } from './errors/anomalousChain'
export { ValuePolyFill } from './valuePolyfill/core'
export { valuePolyFillToArray, valuePolyFillToObj, arrayToValuePolyFill, objToValuePolyFill } from './valuePolyfill/utils'
export { SNI, Phone, Mail } from './verify/verify'
export { ValidationErrorCollection } from './verify/errorCollection'

export type { DeepObjectToValuePolyFillTypes } from './valuePolyfill/core'

export type { ErrorsNewResult, ErrorsNewResultInfo, Panic, NewOpt } from './errors/types'
