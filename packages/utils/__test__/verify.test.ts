/*
 * @Author: 邱狮杰
 * @Date: 2023-03-17 23:13:39
 * @LastEditTime: 2023-06-04 09:49:05
 * @Description:
 * @FilePath: /memo/packages/utils/__test__/verify.test.ts
 */
import { it, expect } from 'vitest'
import { SNI } from '../src'

it('SNI', () => {
  expect(SNI(2, 2)).toBeTruthy()
  expect(SNI(2, 1)).toBeFalsy()
  expect(SNI([2, '1'], 1)).toBeTruthy()
})
