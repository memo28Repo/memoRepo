/*
 * @Author: 邱狮杰
 * @Date: 2023-03-17 23:08:13
 * @LastEditTime: 2023-06-04 09:53:27
 * @Description: verify
 * @FilePath: /memo/packages/utils/src/verify/verify.ts
 */
import { VerificationFlow } from './errorCollection'
import { str } from '@memo28/types'
import { Panic } from '../errors/types'
import { Errors } from '../errors/core'

/**
 * String Number includes的简称
 * @example
 *  const a = 1;
 *
 *  SNI(2, a) => [2,'2'].includes(a)
 *  SNI([1,2,3], a) => [1,2,3,'1','2','3'].includes(a)
 *
 * @public
 */
export function SNI(n: number | string | (number | string)[], value: any) {
  function reverseTypeFn(s: string | number) {
    return typeof s === 'string' ? parseFloat(s) : `${s}`
  }
  if (Array.isArray(n)) {
    const catchList = n.map(i => {
      return [i, reverseTypeFn(i)]
    }).flat(1)
    return catchList.includes(value)
  }
  return [n, reverseTypeFn(n)].includes(value)
}

/**
 * 验证手机号 验证不通过时 get 不会返回错误值
 * @example new Phone('asdfa').set('asdfa').get()
 *
 * @public
 */
export class Phone extends VerificationFlow<str> {
  constructor(phone?: str, private msg?: string) {
    super(phone || '')
  }

  verification(args?: string): Panic<string> {
    const value = args || this.value
    if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(value)) {
      this.setErrors(Errors.New(this.msg || '验证失败'))
      this.continuousReporting('phone', {
        msg: this.msg || '验证失败',
        val: value,
      })
      return [Errors.New(this.msg || '验证失败'), value]
    }
    return [null, args || this.value]
  }
}

/**
 * 验证邮箱, 不通过时 get 不会返回错值
 *
 * @example new Mail('asasd').set('asdfaf').get()
 *
 * @public
 */
export class Mail extends VerificationFlow<str> {
  constructor(phone?: str, private msg?: string) {
    super(phone || '')
  }

  verification(args?: string): Panic<string> {
    const value = args || this.value
    if (!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
      this.setErrors(Errors.New(this.msg || '验证失败'))
      this.continuousReporting('mail', {
        msg: this.msg || '验证失败',
        val: value,
      })
      return [Errors.New(this.msg || '验证失败'), value]
    }
    return [null, args || this.value]
  }
}
