/*
 * @Author: @memo28.repo
 * @Date: 2024-08-30 17:42:47
 * @LastEditTime: 2024-09-02 09:08:58
 * @Description: 
 * @FilePath: /memoRepo/packages/utils/__test__/spm.test.ts
 */
import { describe, expect, it } from "vitest";
import { Spm } from '../src/index';


describe('spm', () => {

    it('getSpm', () => {
        const s = new Spm()
        s.addSpm("from", 'PC').addSpm("key", 'APPIDS').addSpm("as", 'as')
        s.parseSpm(s.getSpm())
        expect(s.getSpm()).toBe("PC.APPIDS.as")
    })

    it('parseSpm', () => {
        const s = new Spm()
        s.addSpm("from", 'PC').addSpm("key", 'APPIDS').addSpm("as", 'as')
        expect(s.parseSpm(s.getSpm())).toEqual({
            from: 'PC',
            key: 'APPIDS',
            as: 'as'
        })
    })

    it('updateSpm', () => {
        const s = new Spm()
        s.addSpm("from", 'PC').addSpm("key", 'APPIDS').addSpm("as", 'as')
        s.updateSpm("from", "IOS")
        expect(s.getSpm()).toBe("IOS.APPIDS.as")
        expect(s.parseSpm(s.getSpm())).toEqual({
            from: 'IOS',
            key: 'APPIDS',
            as: 'as'
        })
    })

})
