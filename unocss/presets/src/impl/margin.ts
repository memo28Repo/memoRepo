import { OptionHelper } from "./option";
import { Rule } from "unocss";

export class Margin {
  constructor(private helper: OptionHelper) {
  }


  getRule(): Rule[] {
    return [
      [/^ml-(\d+)$/, ([, d]) => ({ "margin-left": `${d}${this.helper.getUint()}` })],
      [/^mr-(\d+)$/, ([, d]) => ({ "margin-right": `${d}${this.helper.getUint()}` })],
      [/^mt-(\d+)$/, ([, d]) => ({ "margin-top": `${d}${this.helper.getUint()}` })],
      [/^mb-(\d+)$/, ([, d]) => ({ "margin-bottom": `${d}${this.helper.getUint()}` })],
    ];
  }
}