/*
 * @Author: 邱狮杰
 * @Date: 2023-02-12 09:30:45
 * @LastEditTime: 2023-04-14 22:28:59
 * @Description:
 * @FilePath: /memo/packages/types/src/plugin.ts
 */

/**
 * 自动装配,通常使用在读写配置场景中 在写插件时总结出来的配置类型
 *
 * @example
 * ```ts
 * class A implements AutomaticAssembly {}
 * ```
 *
 * @typeParam T - 配置类型
 *
 * @typeParam R - 返回的配置类型
 *
 * @public
 */
export interface AutomaticAssembly<T = object, R = unknown> {
  config: T | undefined
  readConfiguration(res?: T): this
  getAssemblyCompleted(): R
}
