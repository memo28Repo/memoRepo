/*
 * @Author: 邱狮杰&qwm
 * @Date: 2023-09-01 13:59:46
 * @LastEditTime: 2024-02-11 11:05:29
 * @Description: 
 * @FilePath: /memo/packages/utils/__test__/readingWritingSeparation.test.ts
 */
import { describe, expect, it } from "vitest";
import { readingWritingSeparationDecor, readingWritingSeparationUtilsType } from "../src/index";

class Nber {
  // @ts-ignore
  @readingWritingSeparationDecor
  age?: number;

  // @ts-ignore
  @readingWritingSeparationDecor
  height?: number;

  // @ts-ignore
  @readingWritingSeparationDecor
  width?: number;
}



describe("computational problems", () => {


  it("+ n", () => {
    const n = new Nber() as readingWritingSeparationUtilsType<Nber>

    n.setWidth(10)
    n.setHeight(10)
    n.setAge(21)

    expect(n.getHeight() + n.getAge() + n.getWidth()).toBe(41)
  });

  it("unknown this", () => {
    const n = new Nber() as readingWritingSeparationUtilsType<Nber>

    n.setWidth.call(undefined, 10)
    n.setHeight.call(undefined, 10)
    n.setAge.call(undefined, 21)

    expect(n.getHeight() + n.getAge() + n.getWidth()).toBe(41)
  });
});

