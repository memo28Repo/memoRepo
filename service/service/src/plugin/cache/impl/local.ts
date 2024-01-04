import { CacheImpl } from "./cacheImpl";
import { expirationMapType } from "../config";


export const cacheTable = {
  cacheTable: "cacheTable"
};


export class LocalCache implements CacheImpl {
  deleteCache(key: string): void {
    localStorage.removeItem(key);
  }

  getCache<V = unknown>(key: string): V {
    return JSON.parse(localStorage.getItem(key) || "") as V;
  }

  setCache<V = string>(key: string, value: V): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getMetaCache(): Partial<expirationMapType>[] {
    return JSON.parse(localStorage.getItem(cacheTable.cacheTable) || "[]");
  }

  getMetaCacheItem(key: string): Partial<expirationMapType> {
    return this.getMetaCache().find(i => i.rule === key) || {};
  }

  hasCache(key: string): boolean {
    const result = this.getMetaCache().find(i => i.rule === key);
    return Object.keys(result || {}).length != 0;
  }

  setMetaCache(meta: Partial<expirationMapType>): void {
    const getList = localStorage.getItem(cacheTable.cacheTable);

    if (!getList) {
      const insert =  JSON.stringify([meta])
      localStorage.setItem(cacheTable.cacheTable, insert);
      return;
    }

    const insertAll =  JSON.stringify([meta, ...this.getMetaCache()])
    localStorage.setItem(cacheTable.cacheTable, insertAll);

  }
}
