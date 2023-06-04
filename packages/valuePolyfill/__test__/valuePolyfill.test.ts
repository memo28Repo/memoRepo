/*
 * @Author: 邱狮杰
 * @Date: 2023-06-04 08:51:51
 * @LastEditTime: 2023-06-04 08:51:53
 * @Description: 
 * @FilePath: /memo/packages/valuePolyfill/__test__/valuePolyfill.test.ts
 */
/*
 * @Author: 邱狮杰
 * @Date: 2023-03-17 16:16:43
 * @LastEditTime: 2023-04-03 17:53:14
 * @Description:
 * @FilePath: /memo/packages/utils/__test__/valuePolyfill.test.ts
 */

import { describe, expect, it } from 'vitest'
import { ValuePolyFill, objToValuePolyFill } from '../src'

describe('valuePolyfill', () => {
  it('object has null value', () => {
    const a = objToValuePolyFill({
      a: null,
      b: 1,
      c: {
        d: 12,
        c: (): number => {
          return 1
        },
      },
    })

    expect(a.b.get()).toBe(1)

    expect(a.a.get()).toBe(null)

    expect(a.a.set('12').get()).toBe('12')

    expect(a.a.getType()).toBe('[object String]')

    expect(a.a.getType()).toBe('[object String]')

    expect(a.c.c.get()()).toBe(1)

    expect(
      a.c.c
        .set(() => {
          return 2
        })
        .get()()
    ).toBe(2)
  })

  it('init null', () => {
    const nullValue = new ValuePolyFill(null)

    expect(nullValue.get()).toBe(null)

    expect(nullValue.set(1).get()).toBe(1)

    expect(nullValue.getType()).toBe('[object Number]')
  })

  it('objToValuePolyFill', () => {
    const obj = {
      a: 1,
      as: [],
    }

    const got = objToValuePolyFill(obj)

    expect(got.a.get()).toBe(1)
    expect(got.a.set('12').get()).toBe(12)
    expect(got.a.set('1231123sasfd').get()).toBe(1231123)
    expect(got.a.set(123).get()).toBe(123)

    expect(got.a.reset()).toBe(1)

    expect(got.as).toStrictEqual([])
  })

  it('is Empty', () => {
    const string = new ValuePolyFill('')

    expect(string.isEmpty()).toBeTruthy()

    expect(string.set('asfas').isEmpty()).toBeFalsy()

    const got = objToValuePolyFill({
      a: null,
      b: undefined,
    })

    expect(got.a.isEmpty()).toBeTruthy()

    expect(got.b.isEmpty()).toBeTruthy()
  })

  it('is bool', () => {
    const a = new ValuePolyFill(false)
    expect(a.set('12').get()).toBeTruthy()
    expect(a.set('').get()).toBeFalsy()
  })
})
