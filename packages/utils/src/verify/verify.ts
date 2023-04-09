/*
 * @Author: 邱狮杰
 * @Date: 2023-03-17 23:08:13
 * @LastEditTime: 2023-04-09 08:10:46
 * @Description: verify
 * @FilePath: /memo/packages/utils/src/verify/verify.ts
 */
import { VerificationFlow } from './errorCollection'
import { str } from '@memo28/types'
import { Panic } from '../errors/types'
import { Errors } from '../errors/core'

/**
 * @description String Number includes的简称
 * @example
 *  const a = 1;
 *
 *  SNI(2, a) => [2,'2'].includes(a)
 *  SNI([1,2,3], a) => [1,2,3].includes(a)
 */
export function SNI(n: number | string | unknown[], value: any) {
  const reverseType = typeof n === 'string' ? parseFloat(n) : `${n}`
  if (Array.isArray(n)) return n.includes(value)
  return [n, reverseType].includes(value)
}

/**
 * @description 验证手机号 验证不通过时 get 不会返回错误值
 * @example new Phone('asdfa').set('asdfa').get()
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
 * @description 验证邮箱, 不通过时 get 不会返回错值
 * @example new Mail('asasd').set('asdfaf').get()
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
