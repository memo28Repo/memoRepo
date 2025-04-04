/*
 * @Author: @memo28.repo
 * @Date: 2025-04-04 10:54:38
 * @LastEditTime: 2025-04-04 11:59:36
 * @Description: 
 * @FilePath: /memoRepo/packages/decorator/src/constants.ts
 */
/**
 * 装饰器应该保留在什么阶段
 *
 * @public
 */
export const retentionPolicy = {
  runtime: "runtime",
  source: "source"
} as const;

export const targetType = {
  /**
   * 方法装饰器
   * @public
   */
  method: "method",
  /**
   * 字段装饰漆
   * @public
   */
  field: "field"
} as const;

export const metadata = {
  retention: 'retention',
  target: 'target',
  decorators: 'decorators',
  onBefore: 'onBefore',
  onAfter: 'onAfter',
  onThrow: 'onThrow',
}