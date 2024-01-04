import { PluginTypes } from "../core/plugInContainer";
import { PluginOption } from "vite";

import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export type  viteImageOptimizerOption = Parameters<typeof ViteImageOptimizer>[0]

export class ImageOptimizer implements PluginTypes<viteImageOptimizerOption> {
  config: viteImageOptimizerOption = {};

  readConfiguration(res: viteImageOptimizerOption): this {
    this.config = res;
    return this;
  }

  getPlugin(): PluginOption {
    return ViteImageOptimizer(this.config as viteImageOptimizerOption);
  }

}
