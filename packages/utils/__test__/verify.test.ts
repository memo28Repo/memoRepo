/*
 * @Author: 邱狮杰
 * @Date: 2023-03-17 23:13:39
 * @LastEditTime: 2023-03-17 23:14:59
 * @Description:
 * @FilePath: /memo/packages/utils/__test__/verify.test.ts
 */
import { it, expect } from 'vitest'
import { SNI } from '../src/entry'

it('SNI', () => {
  expect(SNI(2, 2)).toBeTruthy()
  expect(SNI(2, 1)).toBeFalsy()
})
