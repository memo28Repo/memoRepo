/*
 * @Author: @memo28.repo
 * @Date: 2024-04-22 10:34:27
 * @LastEditTime: 2025-05-04 22:55:07
 * @Description: 
 * @FilePath: /memoRepo/packages/utils/src/derived/number.ts
 */
import Decimal from 'decimal.js';
import random from "lodash.random";
import { SNI } from "../index";




export function NumberDerived() {
  Number.prototype.equal = function (this: number, val: string | number): boolean {
    if (Number.isNaN(this)) return false;
    return SNI(this, val);
  };

  Number.prototype.eq = function (this: number, val: string | number): boolean {
    if (Number.isNaN(this)) return false;
    return SNI(this, val);
  };

  Number.prototype.log = function (this: number, mark?: string): string | number {
    const content = mark ? `${mark}: ${this}` : this;
    console.log(content);
    return content;
  };

  Number.prototype.random = function (this: number, min: number, max: number): number {
    return random(min, max);
  };

  Number.prototype.toDecimal = function (this: number): Decimal {
    if (Number.isNaN(this)) return new Decimal(0);
    return new Decimal(this);
  };
}
