/*
 * @Author: 邱狮杰
 * @Date: 2023-01-14 12:06:48
 * @LastEditTime: 2023-09-21 15:58:02
 * @Description:
 * @FilePath: /memo/packages/service/src/plugin/cache/config.ts
 */
import { AxiosRequestConfig } from 'axios'
import {CacheImpl} from './impl/cacheImpl'


/**
 *
 * 缓存请求类型 与 `axios` 请求类型合并
 *
 * @public
 *
 */
export type requestConfig = Partial<CacheConfig>


/**
 *
 * 缓存请求配置类型
 *
 * @public
 */
export interface CacheConfig {
  useCache?: boolean
  cacheExpirationTime?: number
  cacheRules?: (config?: AxiosRequestConfig) => string
  cacheImpl?: CacheImpl
}

/**
 *
 * 缓存过期类型
 *
 * @public
 *
 */
export interface expirationMapType extends CacheConfig {
  /**
   *
   * 缓存数据存储
   *
   * @public
   */
  cacheDate?: unknown
  /**
   * 预新增完毕
   *
   * @remarks
   * - 新增时为`false`
   * - 但请求回来时该字段将一直为`true`
   *
   * @public
   */
  preAdded?: boolean

  rule?: string
}

/**
 *
 * 默认缓存规则一般根据路由判断 作为缓存的 `key` 存储
 *
 * @param { AxiosRequestConfig } config  - 请求配置
 *
 */
export function defaultCacheRule(config: AxiosRequestConfig): string {
  return `${config?.url || config?.baseURL}`
}

/**
 *
 * 超时 `map`
 *
 * @remarks
 * - `key` 默认记录为 路由
 * - `value` 存储为 {@link expirationMapType} 记录了缓存数据
 *
 * @public
 *
 */
export const expirationMap = new Map<string, Partial<expirationMapType>>()

/**
 *
 * 是否存在缓存参数
 *
 *
 * @remarks
 *
 * - 如不存在则跳过缓存逻辑
 *
 * @public
 */
export function hasCacheConfig(config: requestConfig): boolean {
  const r: boolean = Reflect.has(config || {}, 'useCache') || Reflect.has(config || {}, 'cacheExpirationTime')
  return r
}
