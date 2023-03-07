/*
 * @Author: 邱狮杰
 * @Date: 2023-01-10 15:46:52
 * @LastEditTime: 2023-03-05 11:01:48
 * @Description:
 * @FilePath: /memo/packages/types/src/func.ts
 */
/**
 * @description define normal function type
 */
export declare type fn<P extends any[] = any, R = unknown> = (...args: P) => R

/**
 * @description define promise function type
 */
export declare type promiseFn<P extends any[] = any, R = unknown> = (...args: P) => Promise<R>

/**
 * @description merge define normal function and define promise function type
 */
export declare type mergeFnWithPromiseFn<T = unknown, P extends any[] = any, isP extends boolean | undefined = undefined> = isP extends undefined
  ? fn<P, T> | promiseFn<P, T>
  : isP extends true
  ? promiseFn<P, T>
  : fn<P, T>
