/*
 * @Author: 邱狮杰
 * @Date: 2023-01-14 11:55:43
 * @LastEditTime: 2023-01-18 17:29:40
 * @Description:
 * @FilePath: /memo/packages/service/src/plugin/cache/utils.ts
 */
import { CacheConfig, expirationMap, expirationMapType } from './config'

type generateExpirationTimeType = 'min' | 'hour' | 'second'

/**
 * @description 过期时间
 */
export class ExpirationTime {
  private type?: generateExpirationTimeType
  private timer?: number
  constructor(type: generateExpirationTimeType, timer: number) {
    this.verify(type, timer)
  }

  verify(type: generateExpirationTimeType, timer: number) {
    this.type = type
    this.timer = timer
  }

  /**
   * @description 生成时间
   * @returns
   */
  generateExpirationTime(): number {
    const date = new Date()
    if (this.type === 'hour') return date.setHours(date.getHours() + (this?.timer || 0))
    if (this.type === 'min') return date.setMinutes(date.getMinutes() + (this?.timer || 0))
    if (this.type === 'second') return date.setSeconds(date.getSeconds() + (this?.timer || 0))
    return 0
  }

  /**
   * @description 是否过期
   * @param compareTime  对比时间
   * @param curTime  当前时间
   * @returns  { boolean }
   */
  static isItExpired(compareTime: number, curTime?: number): boolean {
    const cur = curTime ?? new Date().getTime()
    if (compareTime >= cur) {
      return false
    }
    return true
  }
}

export class CacheData {
  // 预新增缓存
  preAddACache(rule: string, payload: CacheConfig) {
    if (this.hasCache(rule)) return
    expirationMap.set(rule, { preAdded: false, cacheExpirationTime: payload.cacheExpirationTime || 0 })
  }

  // 填充缓存
  fillTheCache(rule: string, data: unknown) {
    if (!this.hasCache(rule)) return
    const cur = expirationMap.get(rule)
    if (!cur) return
    expirationMap.set(rule, { cacheDate: data, ...cur, preAdded: true })
  }

  // 删除缓存
  removeCache(rule: string) {
    if (!this.hasCache(rule)) return
    expirationMap.delete(rule)
  }

  // 是否缓存
  hasCache(rule: string): boolean {
    return expirationMap.has(rule)
  }

  // 有缓存并且可用
  cachedAndAvailable(rule: string): boolean {
    const cur = expirationMap.get(rule)

    if (this.hasCache(rule) && cur && cur.preAdded && cur.cacheExpirationTime && !ExpirationTime.isItExpired(cur.cacheExpirationTime)) {
      return true
    }

    if (this.hasCache(rule) && cur && cur.preAdded && cur.cacheExpirationTime && ExpirationTime.isItExpired(cur.cacheExpirationTime)) {
      this.removeCache(rule)
      // expirationMap.delete(rule)
    }
    return false
  }

  getCache(rule: string): Partial<expirationMapType> | undefined {
    return expirationMap.get(rule)
  }
}
