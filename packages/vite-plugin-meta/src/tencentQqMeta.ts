/*
 * @Author: 邱狮杰
 * @Date: 2023-02-06 17:00:35
 * @LastEditTime: 2023-02-07 09:34:46
 * @Description: 
 * @FilePath: /memo/packages/vite-plugin-mete/src/tencentQqMeta.ts
 */
import { vitePluginMetaOpt } from './index'

export interface tencentQqOpt {
    /**
     * @description 强制竖屏
     */
    forcedVerticalScreen: boolean
    /**
     * @description 强制全屏
     */
    fullscreen: boolean
    /**
     * @description QQ应用模式
     */
    appMode: boolean
}



export class TencentQqMeta {
    private config?: Partial<vitePluginMetaOpt> = {}

    /**
     * @description 强制全屏
     */
    generateFullscreen() {
        if (!this.config?.tencentQq?.fullscreen) return
        return `<meta name="x5-fullscreen" content="true">`
    }
    /**
     * @description 强制竖屏
     */
    generateForcedVerticalScreen() {
        if (!this.config?.tencentQq?.forcedVerticalScreen) return
        return `<meta name="x5-orientation" content="portrait">`
    }

    /**
     * @description QQ应用模式
     */
    generateAppMode() {
        if (!this.config?.tencentQq?.appMode) return
        return `<meta name="x5-page-mode" content="app">`
    }

    setConfig(opt?: Partial<vitePluginMetaOpt>) {
        this.config = opt
    }
}