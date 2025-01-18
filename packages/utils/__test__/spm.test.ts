/*
 * @Author: @memo28.repo
 * @Date: 2024-08-30 17:42:47
 * @LastEditTime: 2025-01-17 22:19:15
 * @Description: 
 * @FilePath: /memoRepo/packages/utils/__test__/spm.test.ts
 */
import { describe, expect, it } from "vitest";
import { Spm } from '../src/index';


describe('spm', () => {



    // 测试空值的情况
    it('当没有添加项时，应返回空字符串', () => {
        const s = new Spm()
        expect(s.getSpm()).toBe("")
        expect(s.parseSpm(s.getSpm())).toEqual({})
    })

    // 测试无效键的情况
    it('应该处理缺失的键', () => {
        const s = new Spm()
        s.addSpm("from", 'PC').addSpm("key", 'APPIDS')
        const spmStr = "PC.APPIDS.missingKey"
        expect(s.parseSpm(spmStr)).toEqual({
            from: 'PC',
            key: 'APPIDS'
        })
    })

    // 测试更新不存在的键
    it('updateSpm: 如果键不存在，不应该修改 spm', () => {
        const s = new Spm()
        s.addSpm("from", 'PC').addSpm("key", 'APPIDS')
        s.updateSpm("nonExistingKey", "value")
        expect(s.getSpm()).toBe("PC.APPIDS")
    })

    // 测试重复添加相同的键
    it('应该通过更新值来处理重复的键', () => {
        const s = new Spm()
        s.addSpm("from", 'PC').addSpm("key", 'APPIDS')
        s.addSpm("key", "NEWVALUE")
        expect(s.getSpm()).toBe("PC.NEWVALUE")
        expect(s.parseSpm(s.getSpm())).toEqual({
            from: 'PC',
            key: 'NEWVALUE'
        })
    })

    // 测试边界情况：键值为特殊字符
    it('应该正确处理包含特殊字符的键', () => {
        const s = new Spm()
        s.addSpm("from@home", 'PC').addSpm("key-123", 'APPIDS')
        expect(s.getSpm()).toBe("PC.APPIDS")
        expect(s.parseSpm(s.getSpm())).toEqual({
            "from@home": 'PC',
            "key-123": 'APPIDS'
        })
    })

    // 测试空值的键
    it('应该正确处理空字符串作为键', () => {
        const s = new Spm()
        s.addSpm("", 'emptyKey')
        expect(s.getSpm()).toBe("")
        expect(s.parseSpm(s.getSpm())).toEqual({
        })
    })

    // 测试 parseSpm 的逆操作
    it('parseSpm: 应该在 updateSpm 后正确解析', () => {
        const s = new Spm()
        s.addSpm("from", 'PC').addSpm("key", 'APPIDS')
        s.updateSpm("from", "IOS")
        const parsed = s.parseSpm(s.getSpm())
        expect(parsed).toEqual({
            from: 'IOS',
            key: 'APPIDS'
        })
    })

    // 测试处理极端值
    it('应该正确处理极长的键和值', () => {
        const longKey = 'a'.repeat(1000); // 极长的 key
        const longValue = 'b'.repeat(1000); // 极长的 value
        const s = new Spm()
        s.addSpm(longKey, longValue)
        expect(s.getSpm()).toBe(`${longValue}`)
        expect(s.parseSpm(s.getSpm())).toEqual({
            [longKey]: longValue
        })
    })


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
