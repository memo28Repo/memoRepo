/*
 * @Author: @memo28.repo
 * @Date: 2025-04-04 10:54:38
 * @LastEditTime: 2025-04-05 12:41:30
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
  // TODO: 后续将由babel 或者 打包工具处理source之后的代码
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
}