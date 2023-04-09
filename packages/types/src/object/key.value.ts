/*
 * @Author: 邱狮杰
 * @Date: 2023-04-09 10:52:58
 * @LastEditTime: 2023-04-09 11:07:38
 * @Description: 
 * @FilePath: /memo/packages/types/src/object/key.value.ts
 */
import { obj } from "../baseType"
import { Equal } from '../verify'

/**
 * @description 获取对象的所有value
 */
export type getObjValues<V = object> = V[keyof V]

/**
 * 获取 对象 的 所有 key type
 */
type getKeys<T extends obj> = Equal<T, any[]> extends true ? never : keyof T

/**
 * 获取 对象 的 所有 value type
 */
type getValues<T extends obj> = Equal<T, any[]> extends true ? never : getObjValues<T>



/**是否为readonly数组 */
export type IsReadonlyArray<T extends readonly any[]> = [T[`length`] & -1] extends [never] ? true : false;
/**固定将keyof输出成string */
export type ToKeyString<K extends PropertyKey> = K extends string | number ? `${K}` : ``;
/**取[index].type的字符串形式 */
export type ToIndexTypeString<S extends readonly any[]> = ToKeyString<keyof { [P in keyof S as
    IsReadonlyArray<S> extends true ?   //应付as const情景
    (P extends `${number}` ?
        `${(`${`` | `.`}${`[`}${ToKeyString<P>}${`]`}`) | `.${ToKeyString<P>}`}${S[P] extends object ? `.${ObjectKeyPaths<S[P]>}` : ``}` :    //[0] .[0] .0 (.type)
        ``)
    :
    (`${(`${`` | `.`}${`[`}${number}${`]`}`) | `.${number}`}${S[P] extends object ? `.${ObjectKeyPaths<S[P]>}` : ``}`)    //[${number}] .[${number}] .${number} (.type)
    ]: any }>;

//数组情况分两种：
//1. ref{} as const 时，数组为readonly，索引数可以确定，例：person.books[1]、person.pets.0.type
//2. ref{} 不 as const 时，数组不为readonly，索引数不可确定，因此转化为${number}，例：person.books[${number}]、person.pets.${number}.type
//此处题目为第二种情景
type ObjectKeyPaths<T extends object> = ToKeyString<
    keyof T | keyof { [P in keyof T as
        (P extends string | number ?
            T[P] extends readonly unknown[] ? `${P}${ToIndexTypeString<T[P]>}` :    //数组
            (T[P] extends object ? `${P}.${ObjectKeyPaths<T[P]>}` : P) :            //结构体
            P)]: T[P] }
>;



type getValue<T extends obj, K extends ObjectKeyPaths<T> = ObjectKeyPaths<T>> =
    // 如果 value 是一个数组 直接 never
    Equal<T, any[]> extends true ? never : false

export type SuperObject<T extends obj> =
    // 如果是数组直接返回never
    T extends any[] ? never :
    T extends object ? {
        // 如果是对象 返回一系列类型方法
        allKeys: getKeys<T>,
        allValues: getValues<T>
    } :
    never


