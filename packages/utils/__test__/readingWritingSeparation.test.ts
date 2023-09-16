import { readingWritingSeparationUtilsType, readingWritingSeparationDecor } from "../src/index";
import { it, describe, expect } from "vitest";

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

    expect(n.getAge() + n.getAge() + n.getWidth()).toBe(31)
  });
});
