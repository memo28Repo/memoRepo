/*
 * @Author: @memo28.repo
 * @Date: 2024-02-02 13:35:31
 * @LastEditTime: 2024-02-11 14:12:27
 * @Description: 
 * @FilePath: /memo/packages/utils/src/index.d.ts
 */
interface String {
  /**
   *
   * 对比字符串 或者 数字 是否相等
   *
   * @param val - 对比的值
   *
   * @public
   */
  equal(val: string | number): boolean;


  /**
   *
   * 快速打印log
   *
   * @param mark
   *
   * @public
   */
  log(mark?: string): string;

  /**
   *
   * 首字母大写
   *
   * @public
   */
  capitalize(): string;

  /**
   *
   * 是否包含 containerValue 字符串
   *
   * @public
   */
  container(containerValue?: string): boolean;


  /**
   *
   * 转义 RegExp 字符串中特殊的字符 "^", "$", "", ".", "*", "+", "?", "(", ")", "[", "]", ", ", 和 "|" in .
   *
   * '[lodash](https://lodash.com/)'.escapeRegExp();
   * // '\[lodash\]\(https://lodash\.com/\)'
   *
   * @see https://www.lodashjs.com/docs/lodash.escapeRegExp
   *
   * @public
   *
   */
  escapeRegexp(): string;
}


interface Number {
  /**
   *
   * 对比字符串 或者 数字 是否相等
   *
   * @param val - 对比的值
   *
   * @public
   */
  equal(val: string | number): boolean;


  /**
   *
   *
   * 打印日志
   *
   * @param mark -  打印标识
   *
   * @public
   */
  log(mark?: string): string | number;


  /**
   *
   * 返回自动生成随机数 不会修改原来数字
   *
   * @param min - 最小数字
   *
   * @param max - 最大数字
   *
   * @public
   */
  random(min: number, max: number): number;
}


interface Array {
  isEmpty(): boolean
}

interface Object {
  isEmpty(): boolean
}