/*
 * @Author: @memo28.repo
 * @Date: 2024-08-30 17:18:48
 * @LastEditTime: 2025-01-17 22:18:29
 * @Description: 
 * @FilePath: /memoRepo/packages/utils/src/spm/impl.ts
 */
import { SpmImpl, SpmItem } from './interface';

export class Spm<T extends object> implements SpmImpl<T> {
    private itemList: SpmItem[] = []


    getSpm(): string {
        return this.itemList.map(i => i.value).join(".")
    }

    parseSpm(spm: string): T {
        if (!spm.trim().length) return {} as T
        const ar = spm?.trim().split(".")
        const h: {
            [key: string]: string
        } = {}
        ar.forEach((item: string, index: number) => {
            const ele = this.itemList[index]
            if (!ele?.key) {
                console.log(`${item} 缺失对应的 key!`)
                return
            }
            h[this.itemList[index].key] = item
        })
        return h as T
    }
    updateSpm(key: string, newValue: string) {
        this.itemList = this.itemList.map(i => {
            if (i.key === key) return { key, value: newValue }
            return i
        })
        return this
    }


    addSpm(key: string, defaultValue: string): this {
        if (!key.trim().length) return this;
        const has = this.itemList.filter(n => n.key === key)
        if (has.length) {
            console.log('检查到新增重复key,已自动调用 updateSpm 方法')
            this.updateSpm(key, defaultValue);
            return this
        }

        this.itemList.push({
            key,
            value: defaultValue,
        })
        return this
    }

}