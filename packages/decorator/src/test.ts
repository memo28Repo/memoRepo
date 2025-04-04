/*
 * @Author: @memo28.repo
 * @Date: 2025-04-04 11:42:40
 * @LastEditTime: 2025-04-04 12:11:02
 * @Description: 
 * @FilePath: /memoRepo/packages/decorator/src/test.ts
 */

import { DecoratorImpl, DecoratorOptions, Retention, retentionPolicy, Target, targetType } from './index';




@Target([targetType.method])
@Retention(retentionPolicy.runtime)
class Test extends DecoratorImpl<{ save: boolean }> {
    onBefore?(options: { save: boolean; } & DecoratorOptions): void {
        console.log('before', options.save)
    }
    onAfter?(result: any, options: { save: boolean; } & DecoratorOptions): void {
        console.log('after', result)
    }
    onThrow?(error: Error, options: { save: boolean; } & DecoratorOptions): void {
        console.log('onThrow', error)
    }
}

class Featrues {

    @(new Test().asMethodDecorator({ save: true }))
    testMethods() {
        console.log('runing...')
        throw new Error('error')
    }
}


new Featrues().testMethods()
