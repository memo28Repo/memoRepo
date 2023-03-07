/*
 * @Author: 邱狮杰
 * @Date: 2023-01-10 15:46:52
 * @LastEditTime: 2023-03-05 11:02:02
 * @Description:
 * @FilePath: /memo/packages/types/src/verify.ts
 */
export declare type Expect<T extends true> = T

export declare type IsFalse<T extends false> = T

/**
 * @description 0 extends 1 永远返回false, (0 不可分配给 1), 因此0 extends (1 & T) 也不会满足,因为 ( 1 & T) 比 1 的类型范围 更窄 .
 * 但是当T 是 any 时 , 由于 any 是故意不健全的类型(顶级类型), 并且充当了几乎所有其他类型的超类型和子类型, 因此比较any时其他类型会被忽略 就变成了 0 extends any , 自然返回 true.
 * 需要注意的时这仅仅适用 strictNullChecks 启用 (默认启用)
 * @see https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
 */
export declare type IsAny<T> = 0 extends 1 & T ? true : false

/**
 * @description 这是一个创造性的使用条件类型的可分配行规则的解决方案. 它依赖于在未知时被延迟推导的条件类型T ，延迟类型条件的可分配依赖于内部 isTypeIdenticalTo 检查,这仅是用于 1. 两种条件类型具有相同的约束 2. 两个条件的真假分支是同一类型
 * @see https://github.com/Microsoft/TypeScript/issues/27024
 */
export declare type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false

export declare type Extends<E, V> = E extends V ? true : false
