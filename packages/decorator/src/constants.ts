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