import requireContext from "@originjs/vite-plugin-require-context";
import { PluginTypes } from "../core/plugInContainer";
import { PluginOption } from "vite";

export type requireContextOptions = Parameters<typeof requireContext>[0]

export class RequireContext implements PluginTypes<requireContextOptions> {
  config: requireContextOptions | undefined;

  readConfiguration(res?: requireContextOptions | undefined): this {
    this.config = res;
    return this;
  }

  getPlugin(): PluginOption {
    return requireContext(this.config) as PluginOption;
  }
}
