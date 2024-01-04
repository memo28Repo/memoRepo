/*
 * @Author: 邱狮杰
 * @Date: 2023-01-14 11:55:43
 * @LastEditTime: 2024-01-04 19:43:20
 * @Description:
 * @FilePath: /playground/Users/devops/Desktop/monorepo/memo/service/service/src/plugin/cache/utils.ts
 */
import { CacheConfig, expirationMap, expirationMapType } from "./config";

type generateExpirationTimeType = "min" | "hour" | "second"

/**
 * @description 过期时间
 */
export class ExpirationTime {
  private type?: generateExpirationTimeType;
  private timer?: number;

  constructor(type: generateExpirationTimeType, timer: number) {
    this.verify(type, timer);
  }

  verify(type: generateExpirationTimeType, timer: number) {
    this.type = type;
    this.timer = timer;
  }

  /**
   * @description 生成时间
   * @returns
   */
  generateExpirationTime(): number {
    const date = new Date();
    if (this.type === "hour") return date.setHours(date.getHours() + (this?.timer || 0));
    if (this.type === "min") return date.setMinutes(date.getMinutes() + (this?.timer || 0));
    if (this.type === "second") return date.setSeconds(date.getSeconds() + (this?.timer || 0));
    return 0;
  }

  /**
   * @description 是否过期
   * @param compareTime  对比时间
   * @param curTime  当前时间
   * @returns  { boolean }
   */
  static isItExpired(compareTime: number, curTime?: number): boolean {
    const cur = curTime ?? new Date().getTime();
    if (compareTime >= cur) {
      return false;
    }
    return true;
  }
}

export class CacheData {

  private cacheConfig: Partial<CacheConfig> = {};


  setCacheConfig(opt: CacheConfig) {
    this.cacheConfig = opt
    return this
  }

  // 预新增缓存
  preAddACache(rule: string, payload: CacheConfig) {
    if (this.hasCache(rule)) return;
    this.cacheConfig = payload;

    const h = {
      rule: rule, preAdded: false, cacheExpirationTime: payload.cacheExpirationTime || 0
    };
    this.cacheConfig.cacheImpl?.setMetaCache(h);

    expirationMap.set(rule, h);
  }


  /**
   *
   * 填充缓存
   *
   * @param rule 路由
   * @param data 缓存数据
   *
   * @public
   *
   */
  fillTheCache(rule: string, data: unknown) {
    if (!this.hasCache(rule)) return;
    const cur = expirationMap.get(rule);
    if (!cur) return;

    const h = { rule: rule, cacheDate: data, ...cur, preAdded: true };
    if (this.cacheConfig.cacheImpl) this.cacheConfig.cacheImpl?.setCache(rule, data);

    this.cacheConfig.cacheImpl?.setMetaCache(h);

    expirationMap.set(rule, h);
  }

  // 删除缓存
  removeCache(rule: string) {
    if (!this.hasCache(rule)) return;
    if (this.cacheConfig.cacheImpl) this.cacheConfig.cacheImpl?.deleteCache(rule);
    expirationMap.delete(rule);
  }

  // 是否缓存
  hasCache(rule: string): boolean {
    if (this.cacheConfig.cacheImpl) return this.cacheConfig.cacheImpl.hasCache(rule);
    return expirationMap.has(rule);
  }

  // 有缓存并且可用
  cachedAndAvailable(rule: string): boolean {
    if (this.cacheConfig.cacheImpl) {
      const curItem = this.cacheConfig.cacheImpl.getMetaCacheItem(rule);

      if (this.hasCache(rule) && curItem && curItem.preAdded && curItem.cacheExpirationTime && !ExpirationTime.isItExpired(curItem.cacheExpirationTime)) return true;

      if (this.hasCache(rule) && curItem && curItem.preAdded && curItem.cacheExpirationTime && ExpirationTime.isItExpired(curItem.cacheExpirationTime)) this.removeCache(rule);

      return false;
    }

    const cur = expirationMap.get(rule);
    if (this.hasCache(rule) && cur && cur.preAdded && cur.cacheExpirationTime && !ExpirationTime.isItExpired(cur.cacheExpirationTime)) return true;
    if (this.hasCache(rule) && cur && cur.preAdded && cur.cacheExpirationTime && ExpirationTime.isItExpired(cur.cacheExpirationTime)) this.removeCache(rule);
    return false;
  }

  getCache(rule: string): Partial<expirationMapType> | undefined {
    if (this.cacheConfig.cacheImpl) return {
      cacheDate: this.cacheConfig.cacheImpl?.getCache(rule)
    };

    return expirationMap.get(rule);
  }
}
