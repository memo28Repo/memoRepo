/*
 * @Author: @memo28.repo
 * @Date: 2023-12-19 19:45:15
 * @LastEditTime: 2023-12-19 19:49:33
 * @Description: 增强 console 能力
 * @FilePath: /memo/vite/viteBuild/src/plugin/turboConsole.ts
 */

import TurboConsolePlug from 'unplugin-turbo-console/vite';
import { PluginOption } from 'vite';
import { PluginTypes } from '../core/plugInContainer';


export type TurboConsoleOptions = NonNullable<Parameters<typeof TurboConsolePlug>[0]>

export class TurboConsole implements PluginTypes<TurboConsoleOptions> {
    config: TurboConsoleOptions | undefined = undefined;

    readConfiguration(res?: TurboConsoleOptions): this {
        this.config = res
        return this
    }

    getPlugin(): PluginOption {
        return TurboConsolePlug(this.config)
    }


}

