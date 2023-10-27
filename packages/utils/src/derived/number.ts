import { SNI } from "../index";



export function NumberDerived() {
  // @ts-ignore
  Number.prototype.Equal = function(this: number, val: string | number) {
    return SNI(this, val);
  };
}
