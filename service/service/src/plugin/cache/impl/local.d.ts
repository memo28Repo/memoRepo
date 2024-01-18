import { CacheImpl } from "./cacheImpl";
import { expirationMapType } from "../config";
export declare const cacheTable: {
    cacheTable: string;
};
export declare class LocalCache implements CacheImpl {
    deleteCache(key: string): void;
    getCache<V = unknown>(key: string): V;
    setCache<V = string>(key: string, value: V): void;
    getMetaCache(): Partial<expirationMapType>[];
    getMetaCacheItem(key: string): Partial<expirationMapType>;
    hasCache(key: string): boolean;
    setMetaCache(meta: Partial<expirationMapType>): void;
}
