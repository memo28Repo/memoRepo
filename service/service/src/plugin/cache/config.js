/**
 *
 * 默认缓存规则一般根据路由判断 作为缓存的 `key` 存储
 *
 * @param { AxiosRequestConfig } config  - 请求配置
 *
 */
export function defaultCacheRule(config) {
    return `${(config === null || config === void 0 ? void 0 : config.url) || (config === null || config === void 0 ? void 0 : config.baseURL)}`;
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
export const expirationMap = new Map();
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
export function hasCacheConfig(config) {
    const r = Reflect.has(config || {}, 'useCache') || Reflect.has(config || {}, 'cacheExpirationTime');
    return r;
}
