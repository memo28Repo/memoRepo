import { OptionHelper } from "./option";
import { Rule } from "unocss";

export class Padding {
  constructor(private helper: OptionHelper) {
  }


  getRule(): Rule[] {
    return [
      [/^pl-(\d+)$/, ([, d]) => ({ "padding-left": `${d}${this.helper.getUint()}` })],
      [/^pr-(\d+)$/, ([, d]) => ({ "padding-right": `${d}${this.helper.getUint()}` })],
      [/^pt-(\d+)$/, ([, d]) => ({ "padding-top": `${d}${this.helper.getUint()}` })],
      [/^pb-(\d+)$/, ([, d]) => ({ "padding-bottom": `${d}${this.helper.getUint()}` })],
    ];
  }
}