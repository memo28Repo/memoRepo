/*
 * @Author: @memo28.repo
 * @Date: 2023-12-19 20:14:32
 * @LastEditTime: 2023-12-19 20:17:12
 * @Description: 
 * @FilePath: /memo/vite/viteBuild/src/plugin/viteMsg.ts
 */
import { PluginOption } from 'vite';
import { PluginConfig, logEnvPlugin } from 'vite-plugin-msg-log';
import { PluginTypes } from '../core/plugInContainer';

export type logEnvPluginOptions = NonNullable<Parameters<typeof logEnvPlugin>[0]>

export class LogEnvPlugin implements PluginTypes<logEnvPluginOptions> {
    config: PluginConfig | undefined;
    readConfiguration(res?: PluginConfig | undefined): this {
        this.config = res
        return this
    }
    getPlugin(): PluginOption {
        return logEnvPlugin(this.config)
    }
}

