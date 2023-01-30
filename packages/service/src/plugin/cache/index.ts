/*
 * @Author: 邱狮杰
 * @Date: 2023-01-14 12:05:06
 * @LastEditTime: 2023-01-30 13:47:21
 * @Description:
 * @FilePath: /memo/packages/service/src/plugin/cache/index.ts
 */
import { beforeTriggerResultTypes, initializeConfigurationTypes, interceptorImpl, triggerInterceptorImpl } from '../../index'
import { AxiosResponse } from 'axios'
import { defaultCacheRule, hasCacheConfig, requestConfig } from './config'
import { CacheData, ExpirationTime } from './utils'

const cacheHandler = new CacheData()

export { ExpirationTime, requestConfig }

export class CachePrerequisites {
  private config: requestConfig = {}

  constructor(config: requestConfig) {
    this.config = config
  }

  // 是否符合开启缓存的标准
  areThereCachePrerequisites(): boolean {
    return hasCacheConfig(this.config)
  }

  useCache() {
    const rule = this.config.cacheRules?.(this.config) || defaultCacheRule(this.config)
    if (this.config.useCache && cacheHandler.cachedAndAvailable(rule)) {
      return [true, cacheHandler.getCache(rule)?.cacheDate]
    }
    return [false, null]
  }
}

/**
 *  @description 缓存拦截器
 */
export class Cache implements interceptorImpl {
  displayName = 'cache'

  /**
   * @description 当符合缓存标准时 把当前响应缓存起来
   */
  responseSuc(response: AxiosResponse) {
    const config: requestConfig = response.config
    const rule = config?.cacheRules?.(config) || defaultCacheRule(config)
    // 填充缓存
    cacheHandler.fillTheCache(rule, response.data)
    return response
  }

  /**
   * @description 开启缓存的情况下会 缓存一个 rule string 并且 给当前rule 一个过期的时间戳
   */
  requestSuc(req: requestConfig) {
    const rule = req.cacheRules?.(req) || defaultCacheRule(req)

    if ((req.useCache || !cacheHandler.hasCache(rule)) && req.cacheExpirationTime) {
      // ((启用缓存 || 没有缓存 if=== true) if=== true) && 缓存时间戳
      cacheHandler.preAddACache(rule, { cacheExpirationTime: req.cacheExpirationTime || 0 })
    }

    return req
  }
}

export class CacheTrigger implements triggerInterceptorImpl {
  beforeTrigger(config: initializeConfigurationTypes): any | beforeTriggerResultTypes<any> {
    const cachePrerequisites = new CachePrerequisites(config || {})
    if (cachePrerequisites.areThereCachePrerequisites()) {
      // 满足缓存先决条件
      // 尝试使用缓存
      const [cacheExists, cache] = cachePrerequisites.useCache()
      if (cacheExists) {
        return { directReturnValue: true, data: cache }
      }
    }
  }
}
