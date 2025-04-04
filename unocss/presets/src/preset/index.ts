import { definePreset } from "unocss";
import { Option } from "../interface/option";
import { OptionHelper } from "../impl/option";
import { Padding } from "../impl/padding";
import { Margin } from "../impl/margin";

export default definePreset((opt: Option) => {
  const optionHelper = new OptionHelper(opt);
  const padding = new Padding(optionHelper);
  const margin = new Margin(optionHelper);

  return {
    name: "@memo28/unocss-preset",
    rules: [
      ...padding.getRule(),
      ...margin.getRule()
    ]
  };
});