/*
 * @Author: @memo28.repo
 * @Date: 2023-12-19 16:09:57
 * @LastEditTime: 2023-12-19 16:57:32
 * @Description: 
 * @FilePath: /memo/vite/viteBuild/__test__/plugin.test.ts
 */

import { describe, expect, it } from 'vitest';
import { Engine } from '../src/index';


describe('没有指定技术栈', () => {
    it('应该报错因为指定', () => {
        const config = new Engine().addPlugins(() => {
        }).getBuildConfig()
        expect(config).toThrowError()
    })

})
