/*
 * @Author: 邱狮杰
 * @Date: 2023-03-17 23:08:13
 * @LastEditTime: 2025-01-17 22:05:04
 * @Description: verify
 * @FilePath: /memoRepo/packages/utils/src/verify/verify.ts
 */
import { str } from "@memo28/types";
import { Errors } from "../errors/core";
import { Panic } from "../errors/types";
import { VerificationFlow } from "./errorCollection";

/**
 * String Number includes的简称
 * 
 * 不处理特殊字符串
 * 
 * @example
 *  const a = 1;
 *
 *  SNI(2, a) => [2,'2'].includes(a)
 *  SNI([1,2,3], a) => [1,2,3,'1','2','3'].includes(a)
 *
 * @public
 */
export function SNI(n: number | string | (number | string)[], value: any) {
  const smp = ['number', 'string'].includes(typeof n)

  if (!smp && !Array.isArray(n)) return false;

  if (Number.isNaN(n) || Number.isNaN(value)) {
    console?.error?.('NaN 不可比较')
    return false
  }
  function reverseTypeFn(s: string | number) {
    return typeof s === "string" ? parseFloat(s) : `${s}`;
  }

  if (Array.isArray(n)) {
    const catchList = n.map(i => {
      return [i, reverseTypeFn(i)];
    }).flat(1);
    return catchList.includes(value);
  }
  return [n, reverseTypeFn(n)].includes(value);
}

/**
 * 验证手机号 验证不通过时 get 不会返回错误值
 * @example new Phone('asdfa').set('asdfa').get()
 *
 * @public
 */
export class Phone extends VerificationFlow<str> {
  constructor(phone?: str, private msg?: string) {
    super(phone?.trim() || "");
  }

  verification(args?: string): Panic<string> {
    const value = args || this.value;
    if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(value)) {
      this.setErrors(Errors.New(this.msg || "验证失败"));
      this.continuousReporting("phone", {
        msg: this.msg || "验证失败",
        val: value
      });
      return [Errors.New(this.msg || "验证失败"), value];
    }
    return [null, args || this.value];
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
  constructor(mail?: str, private msg?: string) {
    super(mail?.trim() || "");
  }

  verification(args?: string): Panic<string> {
    const value = args || this.value;
    if (!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
      this.setErrors(Errors.New(this.msg || "验证失败"));
      this.continuousReporting("mail", {
        msg: this.msg || "验证失败",
        val: value
      });
      return [Errors.New(this.msg || "验证失败"), value];
    }
    return [null, args || this.value];
  }
}


/**
 *
 * 验证emoji，不通过时 get 不会返回错值
 *
 * @public
 */
export class Emoji extends VerificationFlow<str> {
  constructor(emoji?: str, private msg?: string) {
    super(emoji?.trim() || "");
  }

  verification(args?: string): Panic<string> {
    const value = args || this.value;
    const rxg = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    if (!rxg.test(value)) {
      this.setErrors(Errors.New(this.msg || "验证失败"));
      this.continuousReporting("emoji", {
        msg: this.msg || "验证失败",
        val: value
      });
      return [Errors.New(this.msg || "验证失败"), value];
    }
    return [null, value];
  }
}


/**
 *
 * 验证输入是否为中文
 *
 * @public
 *
 */
export class Chinese extends VerificationFlow<str> {
  constructor(s: str, private msg?: string) {
    super(s?.trim());
  }

  verification(args?: str): Panic<str> {
    const value = args || this.value.trim();
    const chineseRxg = /[\u4E00-\u9FA5\uF900-\uFA2D]/g;
    if (!chineseRxg.test(value)) {
      this.setErrors(Errors.New(this.msg || "验证失败"));
      this.continuousReporting("emoji", {
        msg: this.msg || "验证失败",
        val: value
      });
      return [Errors.New(this.msg || "验证失败"), value];
    }
    return [null, value];
  }
}

/**
 *
 * 数组是否为空
 *
 * @param val - 数组
 */
export function isArrayEmpty(val: unknown[]) {
  if (!Array.isArray(val)) throw new Error(`isArrayEmpty An array is required, but what is passed is a ${typeof val}`);
  return SNI(0, val.length);
}


/**
 *
 * 对象是否为空
 *
 * @public
 */
export function isObjectEmpty(val: object) {
  if (Array.isArray(val)) return isArrayEmpty(val);
  return SNI(0, Object.keys(val || {}).length);
}


/**
 *
 * 判断传入的参数是否为空
 *
 * @public
 *
 */
export function isEmpty(val: any) {
  if (val instanceof Map) return val.size === 0
  if (val instanceof Set) return val.size === 0
  if (typeof val === 'object') return null === val || undefined === val || isObjectEmpty(val) || val === "";
  return null === val || undefined === val || val === "";
}