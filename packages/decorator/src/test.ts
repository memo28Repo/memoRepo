/*
 * @Author: @memo28.repo
 * @Date: 2025-04-04 11:42:40
 * @LastEditTime: 2025-04-05 13:21:55
 * @Description: 
 * @FilePath: /memoRepo/packages/decorator/src/test.ts
 */

import { DecoratorImpl, DecoratorOptions, Retention, retentionPolicy, Target, targetType } from './index';




@Target([
    targetType.method,
    targetType.property,
    targetType.parameter,
    targetType.class
])
@Retention(retentionPolicy.runtime)
class Test extends DecoratorImpl<{ save: boolean }> {
    onAfter?(result: unknown, options: { save: boolean; } & DecoratorOptions): void {
    }
    onBefore?(options: { save: boolean; } & DecoratorOptions): void {
        console.log(options.propertyKey, 'test', options.parameterIndex)
    }

    onThrow?(error: Error, options: { save: boolean; } & DecoratorOptions): void {
    }
    onSource(): void {
        console.log('srouce')
    }
}

const instanceTest = new Test()

@(instanceTest.asClassDecorator({ save: false }))
class Featrues {

    @(instanceTest.asPropertyDecorator({ save: false }))
    format!: string

    @(instanceTest.asMethodDecorator({ save: true }))
    testMethods(@(instanceTest.asParameterDecorator({ save: true })) params: string) {
        console.log('runing...')
    }
}

new Featrues().testMethods("2")
