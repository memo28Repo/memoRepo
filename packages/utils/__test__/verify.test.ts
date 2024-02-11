/*
 * @Author: 邱狮杰
 * @Date: 2023-03-17 23:13:39
 * @LastEditTime: 2024-02-11 14:09:32
 * @Description:
 * @FilePath: /memo/packages/utils/__test__/verify.test.ts
 */
import { describe, expect, it } from 'vitest'
import { Errors, Mail, Phone, SNI, isEmpty } from '../src'

describe('SNI', () => {

  it('number, string, array', () => {
    expect(SNI(2, 2)).toBeTruthy()
    expect(SNI(2, 1)).toBeFalsy()
    expect(SNI([2, '1'], 1)).toBeTruthy()
  })

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
  it('array is empty', () => {
    expect(isEmpty([])).toBeTruthy()
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
