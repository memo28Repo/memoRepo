/*
 * @Author: 邱狮杰
 * @Date: 2023-01-14 11:55:43
 * @LastEditTime: 2024-01-04 19:43:20
 * @Description:
 * @FilePath: /playground/Users/devops/Desktop/monorepo/memo/service/service/src/plugin/cache/utils.ts
 */
import { expirationMap } from "./config";
/**
 * @description 过期时间
 */
export class ExpirationTime {
    constructor(type, timer) {
        this.verify(type, timer);
    }
    verify(type, timer) {
        this.type = type;
        this.timer = timer;
    }
    /**
     * @description 生成时间
     * @returns
     */
    generateExpirationTime() {
        const date = new Date();
        if (this.type === "hour")
            return date.setHours(date.getHours() + ((this === null || this === void 0 ? void 0 : this.timer) || 0));
        if (this.type === "min")
            return date.setMinutes(date.getMinutes() + ((this === null || this === void 0 ? void 0 : this.timer) || 0));
        if (this.type === "second")
            return date.setSeconds(date.getSeconds() + ((this === null || this === void 0 ? void 0 : this.timer) || 0));
        return 0;
    }
    /**
     * @description 是否过期
     * @param compareTime  对比时间
     * @param curTime  当前时间
     * @returns  { boolean }
     */
    static isItExpired(compareTime, curTime) {
        const cur = curTime !== null && curTime !== void 0 ? curTime : new Date().getTime();
        if (compareTime >= cur) {
            return false;
        }
        return true;
    }
}
export class CacheData {
    constructor() {
        this.cacheConfig = {};
    }
    setCacheConfig(opt) {
        this.cacheConfig = opt;
        return this;
    }
    // 预新增缓存
    preAddACache(rule, payload) {
        var _a;
        if (this.hasCache(rule))
            return;
        this.cacheConfig = payload;
        const h = {
            rule: rule, preAdded: false, cacheExpirationTime: payload.cacheExpirationTime || 0
        };
        (_a = this.cacheConfig.cacheImpl) === null || _a === void 0 ? void 0 : _a.setMetaCache(h);
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
    fillTheCache(rule, data) {
        var _a, _b;
        if (!this.hasCache(rule))
            return;
        const cur = expirationMap.get(rule);
        if (!cur)
            return;
        const h = Object.assign(Object.assign({ rule: rule, cacheDate: data }, cur), { preAdded: true });
        if (this.cacheConfig.cacheImpl)
            (_a = this.cacheConfig.cacheImpl) === null || _a === void 0 ? void 0 : _a.setCache(rule, data);
        (_b = this.cacheConfig.cacheImpl) === null || _b === void 0 ? void 0 : _b.setMetaCache(h);
        expirationMap.set(rule, h);
    }
    // 删除缓存
    removeCache(rule) {
        var _a;
        if (!this.hasCache(rule))
            return;
        if (this.cacheConfig.cacheImpl)
            (_a = this.cacheConfig.cacheImpl) === null || _a === void 0 ? void 0 : _a.deleteCache(rule);
        expirationMap.delete(rule);
    }
    // 是否缓存
    hasCache(rule) {
        if (this.cacheConfig.cacheImpl)
            return this.cacheConfig.cacheImpl.hasCache(rule);
        return expirationMap.has(rule);
    }
    // 有缓存并且可用
    cachedAndAvailable(rule) {
        if (this.cacheConfig.cacheImpl) {
            const curItem = this.cacheConfig.cacheImpl.getMetaCacheItem(rule);
            if (this.hasCache(rule) && curItem && curItem.preAdded && curItem.cacheExpirationTime && !ExpirationTime.isItExpired(curItem.cacheExpirationTime))
                return true;
            if (this.hasCache(rule) && curItem && curItem.preAdded && curItem.cacheExpirationTime && ExpirationTime.isItExpired(curItem.cacheExpirationTime))
                this.removeCache(rule);
            return false;
        }
        const cur = expirationMap.get(rule);
        if (this.hasCache(rule) && cur && cur.preAdded && cur.cacheExpirationTime && !ExpirationTime.isItExpired(cur.cacheExpirationTime))
            return true;
        if (this.hasCache(rule) && cur && cur.preAdded && cur.cacheExpirationTime && ExpirationTime.isItExpired(cur.cacheExpirationTime))
            this.removeCache(rule);
        return false;
    }
    getCache(rule) {
        var _a;
        if (this.cacheConfig.cacheImpl)
            return {
                cacheDate: (_a = this.cacheConfig.cacheImpl) === null || _a === void 0 ? void 0 : _a.getCache(rule)
            };
        return expirationMap.get(rule);
    }
}
