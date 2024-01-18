export const cacheTable = {
    cacheTable: "cacheTable"
};
export class LocalCache {
    deleteCache(key) {
        localStorage.removeItem(key);
    }
    getCache(key) {
        return JSON.parse(localStorage.getItem(key) || "");
    }
    setCache(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    getMetaCache() {
        return JSON.parse(localStorage.getItem(cacheTable.cacheTable) || "[]");
    }
    getMetaCacheItem(key) {
        return this.getMetaCache().find(i => i.rule === key) || {};
    }
    hasCache(key) {
        const result = this.getMetaCache().find(i => i.rule === key);
        return Object.keys(result || {}).length != 0;
    }
    setMetaCache(meta) {
        const getList = localStorage.getItem(cacheTable.cacheTable);
        if (!getList) {
            const insert = JSON.stringify([meta]);
            localStorage.setItem(cacheTable.cacheTable, insert);
            return;
        }
        const insertAll = JSON.stringify([meta, ...this.getMetaCache().filter(i => i.rule !== meta.rule)]);
        localStorage.setItem(cacheTable.cacheTable, insertAll);
    }
}
