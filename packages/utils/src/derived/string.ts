import { SNI } from "../index";


export function StringDerived() {
  // @ts-ignore
  String.prototype.Equal = function(this: string, val: string | number) {
    return SNI(val, this);
  };
}
