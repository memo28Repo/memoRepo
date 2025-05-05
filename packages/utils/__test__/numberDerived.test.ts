/*
 * @Author: @memo28.repo
 * @Date: 2025-05-04 22:27:40
 * @LastEditTime: 2025-05-04 22:53:06
 * @Description: 
 * @FilePath: /memoRepo/packages/utils/__test__/NumberDerived.test.ts
 */

/// <reference types="../src/index.d.ts" />

import { describe, expect, it } from 'vitest';
import { NumberDerived } from "../src";

NumberDerived()

describe('NumberDerived', () => {

    it('equal', () => {
        const number: number = 1

        expect(number.equal(1)).toBeTruthy()
        expect(number.equal('1')).toBeTruthy()
        expect(number.equal('3')).toBeFalsy()

        const n2 = NaN
        expect(n2.eq(1)).toBeFalsy()

        const n3 = 1.23
        expect(n3.eq(1.23)).toBeTruthy()
    })


    it('random', () => {
        const random = Number.prototype.random(1, 10)
        expect(random).toBeGreaterThanOrEqual(1)
        expect(random).toBeLessThanOrEqual(10)
    })


    it('toDecimal', () => {
        const number = -1.23
        const newNumber = number.toDecimal().abs().toNumber()
        expect(newNumber).toBe(1.23)

        const zero = 0
        expect(zero.toDecimal().abs().add(1).sub(2).toNumber()).toBe(-1)
    })

})