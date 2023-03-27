/*
 * @Author: 邱狮杰
 * @Date: 2023-01-14 12:06:48
 * @LastEditTime: 2023-03-26 08:57:54
 * @Description:
 * @FilePath: /memo/packages/service/src/plugin/cache/config.ts
 */
import { AxiosRequestConfig } from 'axios'

export type requestConfig = Partial<CacheConfig>

export interface CacheConfig {
  useCache?: boolean
  cacheExpirationTime?: number
  cacheRules?: (config?: AxiosRequestConfig) => string
}

export interface expirationMapType extends CacheConfig {
  cacheDate?: unknown // 缓存数据
  // 预新增完毕?
  // 新增时为false
  // 但请求回来时该字段将一直为true
  preAdded?: boolean
}

export function defaultCacheRule(config: AxiosRequestConfig) {
  return `${config?.url || config?.baseURL}`
}

// 超时 map
export const expirationMap = new Map<string, Partial<expirationMapType>>()

/**
 *
 * @description 是否存在缓存参数
 */
export function hasCacheConfig(config: requestConfig): boolean {
  const r: boolean = Reflect.has(config || {}, 'useCache') || Reflect.has(config || {}, 'cacheExpirationTime')
  return r
}
