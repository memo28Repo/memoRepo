/*
 * @Author: 邱狮杰
 * @Date: 2023-03-10 16:43:05
 * @LastEditTime: 2023-03-11 21:40:48
 * @Description:
 * @FilePath: /memo/packages/utils/src/index.d.ts
 */

interface String {
  log(mark?: string): string;

  Equal(val: string | number): boolean;
}

interface Number {
  log(mark?: string): number;

  Equal(val: string | number): boolean;

}

interface Object {
  log(mark?: string): object;

  Equal(val: string | number): boolean;
}
