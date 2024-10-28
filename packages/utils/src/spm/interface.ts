/*
 * @Author: @memo28.repo
 * @Date: 2024-08-30 17:18:58
 * @LastEditTime: 2024-09-02 09:05:45
 * @Description: 
 * @FilePath: /memoRepo/packages/utils/src/spm/interface.ts
 */

export abstract class SpmImpl<T extends object> {
    /**
     * 获取spm 通常用于分享 
     * 
     * 12.231.2.31.23.12.12.31
     */
    abstract getSpm(): string

    /**
     * 
     * 解析传入spm参数
     * 
     * @param { T } spm 
     */
    abstract parseSpm(spm: string): T

    /**
     * 
     * 修改spm中数组的值
     * 
     * @param key 
     * @param newValue 
     */
    abstract updateSpm(key: string, newValue: string): this

    /**
     * 
     * 新增spm参数
     * 
     * @param key key 
     * @param defaultValue  默认值
     */
    abstract addSpm(key: string, defaultValue: string): this
}


export interface SpmItem {
    key: string
    value: string
}