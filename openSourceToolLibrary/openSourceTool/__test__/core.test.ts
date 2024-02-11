/*
 * @Author: @memo28.repo
 * @Date: 2024-02-11 14:30:37
 * @LastEditTime: 2024-02-11 14:43:20
 * @Description: 
 * @FilePath: /memo/openSourceToolLibrary/openSourceTool/__test__/core.test.ts
 */
import { describe, expect, it } from 'vitest';
import { BindingConfiguration, EnableConfiguration, readingWritingSeparationUtilsType } from '../src/index';


describe("openSourceTool", () => {
    const enableConfiguration = new EnableConfiguration<boolean>() as readingWritingSeparationUtilsType<EnableConfiguration>

    enableConfiguration.setBindConfiguredFunc((config) => {
        console.log(config)
        return 1
    })

    enableConfiguration.setDefaultConfig({ a: 1 })

    new BindingConfiguration(enableConfiguration, { b: 1 }).trigger()
})

