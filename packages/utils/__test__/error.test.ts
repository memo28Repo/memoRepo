/*
 * @Author: @memo28.repo
 * @Date: 2024-02-11 11:06:08
 * @LastEditTime: 2024-02-11 13:51:08
 * @Description: 
 * @FilePath: /memo/packages/utils/__test__/error.test.ts
 */

import { describe, expect, it } from "vitest";
// @ts-ignore
import { AnomalousChain, Errors, ErrorsNewResult, assets, panicProcessing } from '../src/index';


describe('assets', () => {
    it("assets return Error", () => {
        expect(() => assets(false, new Error("不符合预期"))).toThrowError("不符合预期")
    })

    it("none", () => {
        expect(assets(true, new Error("不符合预期"))).toBeUndefined()
    })
})



describe('error', () => {

    it("error have same classify", () => {
        const one = Errors.New("error one", { classify: 1 })
        const two = Errors.New("error two", { classify: 1 })
        expect(Errors.As(one, two)).toBeTruthy()
    })

    it("error have different classify", () => {
        const one = Errors.New("error one", { classify: 1 })
        const two = Errors.New("error two", { classify: 2 })
        expect(Errors.As(one, two)).toBeFalsy()
    })

    it('is a error object', () => {
        expect(Errors.Is({})).toBeFalsy()

        expect(Errors.Is(Errors.New("as"))).toBeTruthy()
    })
})


describe('anomalousChain', () => {
    class Test extends AnomalousChain {
        oneResult = 0
        twoResult = 0
        threeResult = 0

        protected skip(errors: ErrorsNewResult | null): this {
            this.oneResult = 2
            return super.skip(errors);
        }

        @panicProcessing({})
        one() {
            if (this.getErrors()) return this
            this.oneResult = 1
            return this
        }

        @panicProcessing({})
        two() {
            if (this.getErrors()) return this
            this.twoResult = 1
            return this
        }

        @panicProcessing({})
        throwError() {
            this.setErrors(Errors.New("has error"))
            return this
        }


        @panicProcessing({})
        three() {
            if (this.getErrors()) return this
            this.threeResult = 1
            return this
        }
    }

    it("add three result", () => {
        expect(new Test().one().two().three().threeResult).toBe(1)
    })

    it("add three result but have error", () => {
        expect(new Test().one().throwError().two().three().threeResult).toBe(0)
    })

    it("get oneResult but have error", () => {
        expect(new Test().one().throwError().two().three().oneResult).toBe(2)
    })
})