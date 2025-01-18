/*
 * @Author: 邱狮杰
 * @Date: 2023-03-17 23:13:39
 * @LastEditTime: 2025-01-17 22:06:17
 * @Description:
 * @FilePath: /memoRepo/packages/utils/__test__/verify.test.ts
 */
import { describe, expect, it } from 'vitest'
import { Errors, Mail, Phone, SNI, isEmpty } from '../src'

describe('SNI', () => {

  it('number, string, array', () => {
    expect(SNI(2, 2)).toBeTruthy()
    expect(SNI(2, 1)).toBeFalsy()
    expect(SNI([2, '1'], 1)).toBeTruthy()

  })

  it('应当处理数组中的多个字符串并返回 true', () => {
    expect(SNI([1, 2, 3], '2')).toBe(true);  // 字符串'2' 在数组中
  });

  it('应当处理 undefined 的情况并返回 false', () => {
    expect(SNI([1, 2, 3], undefined)).toBe(false);  // undefined 不在数组中
  });

  // 极端数字情况
  it('应当处理极大的数字并返回 true', () => {
    const bigNumber = Number.MAX_SAFE_INTEGER;
    expect(SNI(bigNumber, bigNumber)).toBe(true);
  });

  it('应当处理无穷大和负无穷大并返回 true', () => {
    expect(SNI(Infinity, Infinity)).toBe(true);
    expect(SNI(-Infinity, -Infinity)).toBe(true);
  });

  it('应当处理包含特殊字符的字符串并返回 true', () => {
    const specialCharStr = '😀🚀';
    expect(SNI(specialCharStr, specialCharStr)).toBe(true);
  });

  // 测试边界情况
  it('应当处理 NaN 并返回 throw', () => {
    expect(SNI(NaN, NaN)).toBeFalsy();  // NaN != NaN
  });

  it('应当处理超大数字字符串，并返回 true', () => {
    const largeNumberString = `${Number.MAX_SAFE_INTEGER + 1}`;
    expect(SNI(largeNumberString, largeNumberString)).toBe(true);  // 字符串匹配
  });

   // 各种意想不到的值
   it('应当处理布尔值并返回 false', () => {
    // @ts-ignore
    expect(SNI(true, true)).toBe(false);  // 布尔值 true 匹配 true
    // @ts-ignore
    expect(SNI(false, true)).toBe(false);  // 布尔值 false 不匹配 true
  });


  it('应当处理无效类型并返回 false', () => {
    // @ts-ignore
    expect(SNI({}, '2')).toBe(false);  // 对象不匹配任何类型
  });

  it('应当处理函数并返回 false', () => {
    // @ts-ignore
    const fn = () => { };
    // @ts-ignore
    expect(SNI(fn, fn)).toBe(false);  // 函数不匹配
  });



})



describe("verify", () => {


  describe('phone', () => {

    it("fail phone number", () => {
      const phone = new Phone("1398391242013123123214")
      const [err, phoneValue] = phone.verification()

      expect(Errors.Is(err)).toBeTruthy()
      expect(phoneValue).toBe("1398391242013123123214")
    })

    it("suc phone number", () => {
      const phone = new Phone("  13983912420       ")
      const [err, phoneValue] = phone.verification()

      expect(Errors.Is(err)).toBeFalsy()
      expect(phoneValue).toBe("13983912420")
    })
  })


  describe("mail", () => {
    it('fail mail', () => {
      const mail = new Mail("")
      const [err, mailValue] = mail.verification()
      expect(Errors.Is(err)).toBeTruthy()
      expect(mailValue).toBe("")
    })
    it('suc mail', () => {
      const mail = new Mail("1695415918@qq.com")
      const [err, mailValue] = mail.verification()
      expect(Errors.Is(err)).toBeFalsy()
      expect(mailValue).toBe("1695415918@qq.com")
    })
  })
})




describe('empty', () => {

  it('应当对非空字符串返回 false', () => {
    expect(isEmpty('Hello')).toBe(false);
  });
  it('应当对非空对象返回 false', () => {
    expect(isEmpty({ key: 'value' })).toBe(false);
  });

  it('应当对非空对象返回 false', () => {
    expect(isEmpty({ key: 'value' })).toBe(false);
  });

  it('应当对非空 Map 返回 false', () => {
    const map = new Map();
    map.set('key', 'value');
    expect(isEmpty(map)).toBe(false);
  });


  it('array is empty', () => {
    expect(isEmpty([])).toBeTruthy()
  })

  it('map is empty', () => {
    expect(isEmpty(new Map())).toBeTruthy()
  })

  it('set is empty', () => {
    expect(isEmpty(new Set())).toBeTruthy()
  })


  it('object is empty', () => {
    expect(isEmpty({})).toBeTruthy()
  })
  it('string is empty', () => {
    expect(isEmpty("")).toBeTruthy()
  })
  it('null is empty', () => {
    expect(isEmpty(null)).toBeTruthy()
  })
  it('undefined is empty', () => {
    expect(isEmpty(undefined)).toBeTruthy()
  })
})
