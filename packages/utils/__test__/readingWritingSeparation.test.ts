/*
 * @Author: 邱狮杰&qwm
 * @Date: 2023-09-01 13:59:46
 * @LastEditTime: 2023-09-21 14:48:31
 * @Description: 
 * @FilePath: /memo/packages/utils/__test__/readingWritingSeparation.test.ts
 */
import { describe, expect, it } from "vitest";
import { readingWritingSeparationDetor, readingWritingSeparationUtilsType } from "../src/index";

class Nber {
  // @ts-ignore
  @readingWritingSeparationDetor
  age?: number;

  // @ts-ignore
  @readingWritingSeparationDetor
  height?: number;

  // @ts-ignore
  @readingWritingSeparationDetor
  width?: number;
}

describe("computational problems", () => {


  it("+ n", () => {
    const n = new Nber() as readingWritingSeparationUtilsType<Nber>

    n.setWidth(10)
    n.setHeight(10)
    n.setAge(21)

    expect(n.getAge() + n.getAge() + n.getWidth()).toBe(31)
  });
});
