<!--
 * @Author: 邱狮杰
 * @Date: 2023-01-30 14:06:45
 * @LastEditTime: 2023-03-17 23:16:17
 * @Description:
 * @FilePath: /memo/packages/utils/README.md
-->

# `@memo28/utils`

## `Injection`

> 往对象中添加元数据

```ts
new Injection<'key'>().setTarget({}).setValue('key', 'value').getValue('key')
```

## `Errors`

[抛弃 trycatch，用 go 的思想去处理 js 异常](https://juejin.cn/post/7207707775774031930)

受到 `golang` 将错误定义为值来处理的启发

```ts
export declare class Errors {
  /**
   * @description 生成一个错误
   */
  static New(msg: string, opt?: NewOpt): ErrorsNewResult
  /**
   * @description 对比多个错误是否为同一种类型
   */
  static As(...errors: ErrorsNewResult[]): boolean
}

export interface ErrorsNewResultInfo extends Pick<NewOpt, 'classify'> {
  /**
   * @description 错误信息
   */
  msg: string
}
export interface NewOpt {
  /**
   * @description 错误id
   */
  classify?: number | string
}
export interface ErrorsNewResult {
  /**
   * @description 获取报错信息
   */
  unWrap(): string
  /**
   * @description 打印调用栈
   */
  trace(): this
  /**
   * @description 报错详细信息
   */
  info(): ErrorsNewResultInfo
}
/**
 * @description 错误处理返回类型
 */
export type Panic<T = unknown> = [ErrorsNewResult | undefined | false | null, T]
```

### 处理错误的最佳实践

```ts
import { AnomalousChain, panicProcessing } from '@memo28/utils'

class A extends AnomalousChain {
  // 定义错误处理函数,
  // 当每次执行的被 panicProcessing 装饰器包装过的函数都会检查 是否存在 this.errors 是否为 ErrorsNewResult 类型
  // 如果为 ErrorsNewResult 类型则 调用 panicProcessing的onError回调 和 skip函数
  skip(errors: ErrorsNewResult | null): this {
    console.log(errors?.info().msg)
    return this
  }

  @panicProcessing()
  addOne(): this {
    console.log('run one')
    super.setErrors(Errors.New('run one errors'))
    return this
  }

  @panicProcessing({
    // 在 skip 前执行
    onError(error) {
      console.log(error.unWrap())
    },
    // onRecover 从错误中恢复, 当返回的是true时 继续执行addTwo内逻辑，反之
    // onRecover(erros) {
    //   return true
    // },
  })
  addTwo(): this {
    console.log('run two')
    return this
  }
}
new A().addOne().addTwo()
```

```shell
# output
run one
run one errors # in onError
run one errors # in skip fn
```

## log

```ts
// string
const a = '1'
a.log() // output: '1'
a.log('mark') // output: 'mark ===> 1'

// number
const a = 1
a.log() // output: 1
a.log('mark') // output: 'mark ===> 1'

// object
const a = { a: 1 }
a.log() // output: { a: 1 }
a.log('mark') // output: 'mark ===> ' { a: 1}

// index.d.ts

interface String {
  log(mark?: string): void
}

interface Number {
  log(mark?: string): void
}

interface Object {
  log(mark?: string): void
}
```

### `valuePolyfill`

在项目中 当判断不严谨时 难免会出现在 `undefined` 的情况下 继续操作

就好似

```ts
// 当 b 是 undefined 时 c 也必然是 我们就会在 undefined的情况下继续操作 undefined.toFn 方法 导致报错
a?.b?.c.toFn()

// 你可能会说给c也添加一个可选链呢？
// 这样就导致需要获取toFn函数返回值的逻辑 将会的一个undefined 传递下去 循环往复 直到页面崩溃报错吗？
a?.b?.c?.toFn()
```

即使是再复杂的计算 追根结底也是基本数据类型的计算 当我们处理好 并且保证这些基本类型 在最开始的计算前为预期类型的值 问题也就解决了一大半

#### `valuePolyfill` 应运而生

```ts
import { ValuePolyfill } from '@memo28/utils'

const a = new ValuePolyfill(1)
a.get() // 1
a.set('1').get() // 1(number)

a.set('12aasdf').get() // 12(number)
```

- `objToValuePolyFill` 对象 `ValuePolyfill` 互转

```ts
import { objToValuePolyFill } from '@memo28/utils'
const got = objToValuePolyFill({
  a: 1,
})
got.a.get() // 1
got.a.set('1321231').get() // 1321231
valuePolyFillToObj(got) // { a : 1321231 }
```

- `arrayToValuePolyFill` 数组 `ValuePolyfill` 互转

```ts
import { arrayToValuePolyFill, valuePolyFillToArray } from '@memo28/utils'
const got = arrayToValuePolyFill([1, 2, 3, 1, 12, 12])
got[0].get() // 1
got[0].set('123213').get() // 123213
valuePolyFillToArray(got) // [123213, 2, 3, 1, 12, 12]
```

- `isEmpty` 判空

```ts
import { arrayToValuePolyFill } from '@memo28/utils'

const as = arrayToValuePolyFill([1, '', 3, 1, 12])

as[0].isEmpty() // false
as[0].set(0).isEmpty() // true

as[1].isEmpty() // true
as[1].set('asdfasdfa').isEmpty() // false
```

## `SNI`

```ts
/**
 * @description String Number includes的简称
 * @use
 *  const a = 1;
 *
 *  SNI(2, a) => [2,'2'].includes(a)
 */
export function SNI(n: number | string, value: any) {
  const reverseType = typeof n === 'string' ? parseFloat(n) : `${n}`
  return [n, reverseType].includes(value)
}
```
