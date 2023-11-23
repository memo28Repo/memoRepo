/*
 * @Author: 邱狮杰
 * @Date: 2023-02-06 17:28:14
 * @LastEditTime: 2023-04-14 23:00:03
 * @Description:
 * @FilePath: /memo/packages/vite-plugin-meta/src/appleMeta.ts
 */
import { vitePluginMetaOpt } from './index'

export interface appleMetaOpt {
  /**
   * 在网页上方显示一个app banner，提供app store下载
   *
   * @example
   * ```html
   * <meta name="apple-itunes-app" content="app-id=APP_ID,affiliate-data=AFFILIATE_ID,app-argument=SOME_TEXT">
   * ```
   *
   * @public
   */
  appleItunesApp: {
    appId: string
    affiliateId: string
    someText: string
  }
  /**
   * 添加到主屏后的标题
   *
   * @example
   * ```html
   * <meta name="apple-mobile-web-app-title" content="App Title">
   * ```
   * @public
   */
  appleTitle: string
}

/**
 *
 * 配置苹果标签的示例类
 *
 * @public
 */

export class AppleMeta {
  private config?: Partial<vitePluginMetaOpt> = {}

  /**
   *
   *
   * @public
   */
  generateTitle() {
    if (!this.config?.apple?.appleTitle) return
    return `<meta name="apple-mobile-web-app-title" content="${this.config.apple.appleTitle}">`
  }

  /**
   *
   *
   * @public
   */
  generateAppleItunesApp() {
    if (!this.config?.apple?.appleItunesApp) return
    if (!this.config?.apple?.appleItunesApp.affiliateId) return
    if (!this.config?.apple?.appleItunesApp.appId) return
    if (!this.config?.apple?.appleItunesApp.someText) return
    return `<meta name="apple-itunes-app" content="app-id=${this.config.apple.appleItunesApp.appId},affiliate-data=${this.config.apple.appleItunesApp.affiliateId},app-argument=${this.config.apple.appleItunesApp.someText}">`
  }

  /**
   *
   * @public
   */
  setConfig(opt?: vitePluginMetaOpt) {
    this.config = opt
  }
}
