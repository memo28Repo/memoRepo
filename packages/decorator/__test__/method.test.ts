/*
 * @Author: @memo28.repo
 * @Date: 2025-05-04 22:57:57
 * @LastEditTime: 2025-05-04 22:58:59
 * @Description: 
 * @FilePath: /memoRepo/packages/decorator/__test__/method.test.ts
 */

import { describe, expect, it } from "vitest";

import { targetType, DecoratorImpl, Retention, Target, retentionPolicy, DecoratorOptions } from "../src";


describe("methods", () => {

  describe("执行流程", () => {

    it("非Promise 方法 最简单的执行流程 ", () => {
      const list = [];


      @Target([
        targetType.method
      ])
      @Retention(retentionPolicy.runtime)
      class Test extends DecoratorImpl<{ save: boolean }> {
        onBefore?(options: { save: boolean; } & DecoratorOptions): void {
          list.push(1);
        }

        onAfter?(result: unknown, options: { save: boolean; } & DecoratorOptions): void {
          list.push(2);
        }

        onThrow?(error: Error, options: { save: boolean; } & DecoratorOptions): void {
          list.push(3);
        }

        onSource?(): void {
          throw new Error("Method not implemented.");
        }
      }

      const test = new Test();


      class TestClass {

        // @ts-ignore
        @(test.asMethodDecorator({ save: false }))
        save() {

        }
      }

      const testClass = new TestClass();
      testClass.save();
      expect(list).toEqual([1, 2]);
    });


    it("Promise 方法 + 报错 最简单的执行流程 ", () => {
      const list = [];

      let throwFlag = false;


      @Target([
        targetType.method
      ])
      @Retention(retentionPolicy.runtime)
      class Test extends DecoratorImpl<{ save: boolean }> {
        onBefore?(options: { save: boolean; } & DecoratorOptions): void {
          list.push(1);
        }

        onAfter?(result: unknown, options: { save: boolean; } & DecoratorOptions): void {
          list.push(2);
        }

        onThrow?(error: Error, options: { save: boolean; } & DecoratorOptions): void {
          throwFlag = true;
        }

        onSource?(): void {
          throw new Error("Method not implemented.");
        }
      }

      const test = new Test();


      class TestClass {

        // @ts-ignore
        @(test.asMethodDecorator({ save: false }))
        async promiseSave() {

        }


        // @ts-ignore
        @(test.asMethodDecorator({ save: false }))
        async throwFn() {
          throw new Error("error");
        }
      }

      const testClass = new TestClass();
      const res = testClass.promiseSave();
      expect(list).toEqual([1]);

      (async () => {
        await res;
        expect(list).toEqual([1, 2]);
      })();


      // expect(testClass.throwFn).rejects.toThrow();

      // console.log(throwFlag,'throwFlag')


    });

  });

});




