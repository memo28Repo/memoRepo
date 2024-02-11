/*
 * @Author: @memo28.repo
 * @Date: 2024-02-11 14:14:47
 * @LastEditTime: 2024-02-11 14:21:54
 * @Description: 
 * @FilePath: /memo/packages/nullSafety/__test__/core.test.ts
 */

import { describe, expect, it } from 'vitest';
import { nullSafety } from '../src/index';

describe("nullSafety", () => {
    describe('number', () => {
        it('number', () => {
            const n = nullSafety(0)
            n.value = 1
            expect(n.value).toBe(1)
            // @ts-ignore
            n.value = "123"
            expect(n.value).toBe(1)
        })

        it('number opt.regressInitialValue = true', () => {
            const n = nullSafety(0, { regressInitialValue: true })
            n.value = 1
            expect(n.value).toBe(1)
            // @ts-ignore
            n.value = "123"
            expect(n.value).toBe(0)
        })

        it('number opt.regressInitialValue = true,opt.regressInitialValueCallback = throw Error', () => {
            const n = nullSafety(0, {
                regressInitialValue: true, regressInitialValueCallback(msg) {
                    throw new Error(`throw: ${msg}`)
                },
            })
            n.value = 1

            expect(n.value).toBe(1)

            expect(() => {
                // @ts-ignore
                n.value = "123"
            }).toThrowError()
        })
    })
})

