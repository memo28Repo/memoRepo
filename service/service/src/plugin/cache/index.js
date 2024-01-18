/*
 * @Author: 邱狮杰
 * @Date: 2023-01-14 12:05:06
 * @LastEditTime: 2023-09-21 16:06:35
 * @Description:
 * @FilePath: /memo/packages/service/src/plugin/cache/index.ts
 */
import { colors } from "../logs/utils";
import { defaultCacheRule, hasCacheConfig } from "./config";
import { CacheData, ExpirationTime } from "./utils";
const cacheHandler = new CacheData();
export { ExpirationTime };
/**
 *
 * 缓存先决条件判断类
 *
 * @public
 *
 */
export class CachePrerequisites {
    constructor(config) {
        this.config = {};
        this.config = config;
    }
    // 是否符合开启缓存的标准
    areThereCachePrerequisites() {
        return hasCacheConfig(this.config);
    }
    useCache() {
        var _a, _b, _c;
        const rule = ((_b = (_a = this.config).cacheRules) === null || _b === void 0 ? void 0 : _b.call(_a, this.config)) || defaultCacheRule(this.config);
        cacheHandler.setCacheConfig(this.config);
        if (this.config.useCache && cacheHandler.cachedAndAvailable(rule)) {
            return [true, (_c = cacheHandler.getCache(rule)) === null || _c === void 0 ? void 0 : _c.cacheDate];
        }
        return [false, null];
    }
}
/**
 *
 * 缓存拦截器
 *
 * @public
 */
export class Cache {
    constructor() {
        this.displayName = "cache";
    }
    /**
     * @description 当符合缓存标准时 把当前响应缓存起来
     */
    responseSuc(response) {
        var _a;
        const config = response.config;
        const rule = ((_a = config === null || config === void 0 ? void 0 : config.cacheRules) === null || _a === void 0 ? void 0 : _a.call(config, config)) || defaultCacheRule(config);
        // 填充缓存
        cacheHandler.fillTheCache(rule, response.data);
        return response;
    }
    /**
     * @description 开启缓存的情况下会 缓存一个 rule string 并且 给当前rule 一个过期的时间戳
     */
    requestSuc(req) {
        var _a;
        const rule = ((_a = req.cacheRules) === null || _a === void 0 ? void 0 : _a.call(req, req)) || defaultCacheRule(req);
        if ((req.useCache || !cacheHandler.hasCache(rule)) && req.cacheExpirationTime) {
            // ((启用缓存 || 没有缓存 if=== true) if=== true) && 缓存时间戳
            cacheHandler.preAddACache(rule, { cacheImpl: req.cacheImpl, cacheExpirationTime: req.cacheExpirationTime || 0 });
        }
        return req;
    }
}
/**
 *
 * 触发请求前后置 缓存 模块
 *
 * @remarks
 * - 触发请求前 会判断 当前路由缓存存在  存在并且未过期则 不触发请求 直接返回缓存结果
 *
 * @public
 */
export class CacheTrigger {
    constructor() {
        this.displayName = "CacheTrigger";
    }
    /**
     *
     * 发送请求前回调判断缓存是否存在 且可用
     *
     * @param { initializeConfigurationTypes } config  - 请求配置
     *
     * @public
     */
    beforeTrigger(config) {
        const cachePrerequisites = new CachePrerequisites(config || {});
        if (cachePrerequisites.areThereCachePrerequisites()) {
            // 满足缓存先决条件
            // 尝试使用缓存
            const [cacheExists, cache] = cachePrerequisites.useCache();
            console.log(cacheExists, 'cacheExists');
            if (cacheExists) {
                // const logs = new HttpLog(config);
                console.groupCollapsed(`%c triggerInterceptorImpl:CacheTrigger:beforeTrigger`, `color: ${colors.triggerFrontAndRearTnterceptors}`);
                console.log('use cache!', config);
                console.groupEnd();
                return { directReturnValue: true, data: cache };
            }
        }
    }
    /**
     *
     * 触发缓存前后置回调后的 `log` 回调
     *
     * @param { "afterTrigger" | "beforeTrigger" } type - 前后置触发拦截器类型
     * @param { void | initializeConfigurationTypes | beforeTriggerResultTypes<unknown>} data 传递的参数
     *
     * @public
     */
    logsCallback(type, data) {
        if (type !== "beforeTrigger")
            return;
        if (typeof data !== "object")
            return;
        if (!Reflect.get(data, "directReturnValue"))
            return;
        console.groupCollapsed(`%c successfully used cache!`, "color: green");
        console.log(Reflect.get(data, "data"));
        console.groupEnd();
    }
}
