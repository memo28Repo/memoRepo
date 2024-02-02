/*
 * @Author: 邱狮杰
 * @Date: 2023-01-10 15:46:52
 * @LastEditTime: 2023-04-14 22:38:31
 * @Description:
 * @FilePath: /memo/packages/types/src/func.ts
 */
/**
 *  定义一个普通函数
 *
 * @example
 * ```ts
 * type f = fn<[number,string],void> // (number,string) => void
 * ```
 * @typeParam P - 参数类型 示例`[number, string]`
 *
 * @typeParam R -  返回值类型
 *
 * @public
 */
export declare type fn<P extends any[] = any, R = unknown> = (...args: P) => R

/**
 * 定义一个`promise`函数
 *
 *
 * @example
 * ```ts
 * type f = promiseFn<[number,string],void> // (number,string) => Promise<void>
 * ```
 * @typeParam P - 参数类型 示例`[number, string]`
 *
 * @typeParam R -  返回值类型
 *
 * @public
 */
export declare type promiseFn<P extends any[] = any, R = unknown> = (...args: P) => Promise<R>

/**
 *
 * 兼容普通函数和`promise`函数类型
 *
 * @example
 * ```ts
 * type f = mergeFnWithPromiseFn<void, [string, number]> // fn<[string, number], void> | promiseFn<[string, number], void>
 *
 * type f = mergeFnWithPromiseFn<void, [string, number],false> // fn<[string, number], void>
 *
 * type f = mergeFnWithPromiseFn<void, [string, number],true> // promiseFn<[string, number], void>
 * ```
 *
 * @typeParam T - 函数返回值
 * @typeParam P - 函数参数 `[number,number]` = `(number,number) => void`
 * @typeParam isP - 是否是一个`promise`
 *
 * @public
 */
export declare type mergeFnWithPromiseFn<T = unknown, P extends any[] = any, isP extends boolean | undefined = undefined> = isP extends undefined
  ? fn<P, T> | promiseFn<P, T>
  : isP extends true
  ? promiseFn<P, T>
  : fn<P, T>
