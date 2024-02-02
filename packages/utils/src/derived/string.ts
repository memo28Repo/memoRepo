import { SNI } from "../index";
import escapeRegexp from "lodash.escaperegexp";

export function StringDerived() {
  String.prototype.equal = function(this: string, val: string | number) {
    return SNI(val, this);
  };

  String.prototype.capitalize = function(this: string): string {
    return this.substring(0, 1).toUpperCase() + this.substring(1);
  };

  String.prototype.escapeRegexp = function(this: string) {
    return escapeRegexp(this);
  };

  String.prototype.log = function(this: string, mark?: string) {
    const content = mark ? `${mark} ${this}` : this;
    console.log(content);
    return content;
  };
}
