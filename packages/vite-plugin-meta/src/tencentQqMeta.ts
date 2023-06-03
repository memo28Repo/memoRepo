/*
 * @Author: 邱狮杰
 * @Date: 2023-02-06 17:00:35
 * @LastEditTime: 2023-04-14 22:58:10
 * @Description:
 * @FilePath: /memo/packages/vite-plugin-meta/src/tencentQqMeta.ts
 */
import { vitePluginMetaOpt } from './index'

/**
 *
 * 腾讯`qq`的配置
 *
 * @public
 */
export interface tencentQqOpt {
  /**
   * 强制竖屏
   *
   * @public
   */
  forcedVerticalScreen: boolean
  /**
   * 强制全屏
   *
   * @public
   */
  fullscreen: boolean
  /**
   * QQ应用模式
   *
   * @public
   */
  appMode: boolean
}

/**
 *
 *
 * 腾讯`qq`的配置实现类
 *
 *
 * @public
 */
export class TencentQqMeta {
  private config?: Partial<vitePluginMetaOpt> = {}

  /**
   * 强制全屏
   *
   * @public
   */
  generateFullscreen() {
    if (!this.config?.tencentQq?.fullscreen) return
    return `<meta name="x5-fullscreen" content="true">`
  }
  /**
   * 强制竖屏
   *
   * @public
   */
  generateForcedVerticalScreen() {
    if (!this.config?.tencentQq?.forcedVerticalScreen) return
    return `<meta name="x5-orientation" content="portrait">`
  }

  /**
   * QQ应用模式
   *
   * @public
   */
  generateAppMode() {
    if (!this.config?.tencentQq?.appMode) return
    return `<meta name="x5-page-mode" content="app">`
  }

  setConfig(opt?: Partial<vitePluginMetaOpt>) {
    this.config = opt
  }
}
