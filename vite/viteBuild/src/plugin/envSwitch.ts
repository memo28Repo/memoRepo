import { PluginConfig, envSwitchPlugin } from "vite-plugin-env-switch";
import { PluginTypes } from "../core/plugInContainer";
import { PluginOption } from "vite";

export type  envSwitchPluginPluginConfig = Partial<PluginConfig>

export class EnvSwitch implements PluginTypes<envSwitchPluginPluginConfig> {
  config: envSwitchPluginPluginConfig = {};

  readConfiguration(res: envSwitchPluginPluginConfig): this {
    this.config = res;
    return this;
  }

  getPlugin(): PluginOption {
    return envSwitchPlugin(this.config as PluginConfig);
  }

}
