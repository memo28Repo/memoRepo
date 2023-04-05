/*
 * @Author: 邱狮杰
 * @Date: 2023-03-17 23:08:13
 * @LastEditTime: 2023-04-05 08:15:18
 * @Description: verify
 * @FilePath: /memo/packages/utils/src/verify.ts
 */

/**
 * @description String Number includes的简称
 * @use
 *  const a = 1;
 *
 *  SNI(2, a) => [2,'2'].includes(a)
 *  SNI([1,2,3], a) => [1,2,3].includes(a)
 */
export function SNI(n: number | string | unknown[], value: any) {
  const reverseType = typeof n === 'string' ? parseFloat(n) : `${n}`
  if (Array.isArray(n)) return n.includes(value)
  return [n, reverseType].includes(value)
}
