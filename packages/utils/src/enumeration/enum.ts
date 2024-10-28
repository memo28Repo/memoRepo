/*
 * @Author: @memo28.repo
 * @Date: 2024-09-30 17:08:26
 * @LastEditTime: 2024-09-30 17:34:50
 * @Description: 
 * @FilePath: /memoRepo/packages/utils/src/enumeration/enum.ts
 */


export interface enumOptions {
    trans?: boolean
}

/**
 * 
 * 枚举类 内部由Map实现
 * 
 */
export class Enum<T = string | number, V = any> {


    private enum = new Map<T, V>()

    /**
     * 反序 map
     */
    private transMap: Map<V, T> | null = null

    constructor(private opt?: enumOptions) {
        if (opt?.trans) this.transMap = new Map<V, T>()
    }

    add(key: T, val: V) {
        this.enum.set(key, val);
        if (this.opt?.trans) {
            this.transMap?.set(val, key);
        }
        return this
    }

    getTrans(key: V): T | undefined {
        return this.transMap?.get(key)
    }

    get(key: T): V | undefined {
        return this.enum.get(key)
    }

    getValues() {
        return [...this.enum.values()]
    }

    getEnum(): Map<T, V> {
        return this.enum
    }
}