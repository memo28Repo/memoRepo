/*
 * @Author: 邱狮杰
 * @Date: 2023-03-17 23:08:13
 * @LastEditTime: 2023-03-17 23:12:46
 * @Description: verify
 * @FilePath: /memo/packages/utils/src/verify.ts
 */

/**
 * @description String Number includes的简称
 * @use
 *  const a = 1;
 *
 *  SNI(2, a) => [2,'2'].includes(a)
 */
export function SNI(n: number | string, value: any) {
  const reverseType = typeof n === 'string' ? parseFloat(n) : `${n}`
  return [n, reverseType].includes(value)
}
