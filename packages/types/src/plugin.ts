/*
 * @Author: 邱狮杰
 * @Date: 2023-02-12 09:30:45
 * @LastEditTime: 2023-03-09 10:31:59
 * @Description:
 * @FilePath: /memo/packages/types/src/plugin.ts
 */

/**
 * @description 自动装配,通常使用在读写配置场景中
 */
export interface AutomaticAssembly<T = object, R = unknown> {
  config: T | undefined
  readConfiguration(res?: T): this
  getAssemblyCompleted(): R
}
