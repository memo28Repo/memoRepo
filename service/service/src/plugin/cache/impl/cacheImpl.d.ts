import { expirationMapType } from "../config";
export declare abstract class CacheImpl {
    abstract getCache<V = unknown>(key: string): V;
    /**
     *
     * 设置缓存
     *
     * @param key  路由
     * @param value 缓存值
     *
     * @public
     */
    abstract setCache<V = unknown>(key: string, value: V): void;
    /**
     *
     * 删除缓存
     *
     * @param key  路由
     *
     * @public
     */
    abstract deleteCache(key: string): void;
    /**
     *
     * 是否存在缓存
     *
     * @param key 路由
     *
     * @public
     *
     */
    abstract hasCache(key: string): boolean;
    /**
     *
     * 设置 mete 数据
     *
     * 建议将meta数据保存为数组
     *
     * @public
     */
    abstract setMetaCache(meta: Partial<expirationMapType>): void;
    /**
     *
     * 获取 mete 数据
     *
     * @public
     */
    abstract getMetaCacheItem(key: string): Partial<expirationMapType>;
    /**
     *
     * 获取 mete 数据列表
     *
     * @public
     */
    abstract getMetaCache(): Partial<expirationMapType>[];
}
