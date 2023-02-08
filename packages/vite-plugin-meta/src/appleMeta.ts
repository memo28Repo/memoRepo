/*
 * @Author: 邱狮杰
 * @Date: 2023-02-06 17:28:14
 * @LastEditTime: 2023-02-07 09:32:37
 * @Description: 
 * @FilePath: /memo/packages/vite-plugin-mete/src/appleMeta.ts
 */
import { vitePluginMetaOpt } from './index'

export interface appleMetaOpt {
    /**
     * @description 在网页上方显示一个app banner，提供app store下载
     */
    appleItunesApp: {
        appId: string
        affiliateId: string
        someText: string
    }
    // <meta name="apple-itunes-app" content="app-id=APP_ID,affiliate-data=AFFILIATE_ID,app-argument=SOME_TEXT">
    /**
     * @description 添加到主屏后的标题
     */
    appleTitle: string
    // <meta name="apple-mobile-web-app-title" content="App Title">
}

export class AppleMeta {
    private config?: Partial<vitePluginMetaOpt> = {}

    generateTitle() {
        if (!this.config?.apple?.appleTitle) return
        return `<meta name="apple-mobile-web-app-title" content="${this.config.apple.appleTitle}">`
    }

    generateAppleItunesApp() {
        if (!this.config?.apple?.appleItunesApp) return
        if (!this.config?.apple?.appleItunesApp.affiliateId) return
        if (!this.config?.apple?.appleItunesApp.appId) return
        if (!this.config?.apple?.appleItunesApp.someText) return
        return `<meta name="apple-itunes-app" content="app-id=${this.config.apple.appleItunesApp.appId},affiliate-data=${this.config.apple.appleItunesApp.affiliateId},app-argument=${this.config.apple.appleItunesApp.someText}">`
    }

    setConfig(opt?: vitePluginMetaOpt) {
        this.config = opt
    }
}


