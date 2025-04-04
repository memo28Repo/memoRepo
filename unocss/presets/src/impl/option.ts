import type { Option } from "../interface/option";

export class OptionHelper {
  private option: Option = {
    useRpx: false
  };

  constructor(opt: Option) {
    this.option = {
      ...this.option,
      ...opt
    };
  }

  getOptions() {
    return this.option;
  }

  /**
   *
   * 获取单位
   *
   * @public
   */
  getUint() {
    if (this.getOptions().useRpx) return "rpx";
    return "px";
  }

}