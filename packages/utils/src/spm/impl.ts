/*
 * @Author: @memo28.repo
 * @Date: 2024-08-30 17:18:48
 * @LastEditTime: 2024-09-02 09:07:21
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
        const ar = spm.split(".")
        const h: {
            [key: string]: string
        } = {}
        ar.forEach((item: string, index: number) => {
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
        this.itemList.push({
            key,
            value: defaultValue,
        })
        return this
    }

}