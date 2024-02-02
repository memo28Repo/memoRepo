import { SNI } from "../index";


export function NumberDerived() {
  Number.prototype.equal = function(this: number, val: string | number) {
    return SNI(this, val);
  };

  Number.prototype.log = function(this: number, mark?: string) {
    const content = mark ? `${mark}: ${this}` : this;
    console.log(content);
    return content
  };
}
