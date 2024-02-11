import random from "lodash.random";
import { SNI } from "../index";


export function NumberDerived() {
  Number.prototype.equal = function(this: number, val: string | number) {
    return SNI(this, val);
  };

  Number.prototype.log = function(this: number, mark?: string) {
    const content = mark ? `${mark}: ${this}` : this;
    console.log(content);
    return content;
  };

  Number.prototype.random = function(this: number, min: number, max: number) {
    return random(min, max);
  };
}
