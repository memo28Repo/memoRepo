/*
 * @Author: @memo28.repo
 * @Date: 2025-04-04 11:19:18
 * @LastEditTime: 2025-04-04 11:26:58
 * @Description: 
 * @FilePath: /memoRepo/packages/decorator/src/interface.ts
 */


export interface DecoratorImpl<T> {
    /**
     * 执行前
     * 
     * @public
     */
    onBefore?(opt: T): void
    /**
     * 执行后
     * 
     * @public
     */
    onAfter?(opt: T): void
    /**
     * 发生错误
     * 
     * @public
     */
    onThrow?(opt: T): void
}