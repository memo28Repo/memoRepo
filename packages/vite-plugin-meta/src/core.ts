/*
 * @Author: 邱狮杰
 * @Date: 2023-02-04 12:44:51
 * @LastEditTime: 2023-02-06 17:25:26
 * @Description: core
 * @FilePath: /memo/packages/vite-plugin-mete/src/core.ts
 */

import { parse } from 'parse5';
import { vitePluginMetaOpt } from './index'
import { TencentQqMeta } from './tencentQqMeta'

export class Core {
    private config?: Partial<vitePluginMetaOpt> = {}
    private meteString: string = ''
    private tencentQqMeta = new TencentQqMeta()

    constructor(opt?: Partial<vitePluginMetaOpt>) {
        this.config = opt
        this.tencentQqMeta.setConfig(this.config)
    }

    getMeteString() {
        return this.meteString
    }

    parseMetaInHead(html: string): [boolean, null] {
        const parseContext = parse(html)
        const head =
            Reflect.get(
                parseContext.childNodes.at(-1) as object
                , 'childNodes').filter((item: Document) => item.nodeName === 'head')[0]
        const headNodes = Reflect.get(head, 'childNodes').filter((n: Document) => n.nodeName === 'meta')
        if (headNodes.length) {
            return [true, headNodes]
        }
        return [false, null]
    }

    generateRefreshJump(): string | undefined {
        console.log(this.config)
        if (!this.config?.refreshJump) return
        if (typeof this.config?.refreshJump?.timeout !== 'number') throw new Error('timeout parameter must be a number')
        if (typeof this.config?.refreshJump?.url !== 'string') throw new Error('url parameter must be a string')
        return `<meta http-equiv="refresh" content="${this.config.refreshJump.timeout};url='${this.config.refreshJump.url}'">`
    }

    generateXDnsPrefetchControl() {
        if (!this.config?.xDnsPrefetchControl) return
        return `<meta http-equiv='x-dns-prefetch-control' content='on'>`
    }

    generateAuthor() {
        if (!this.config?.author) return
        return `<meta name="author" content="${this.config.author}">`
    }

    generateKeywords() {
        if (!this.config?.keywords) return
        return `<meta name="keywords" content="${this.config.keywords}">`
    }

    private combinationMeta(metaArr: (string | undefined)[]): string {
        console.log(metaArr, 'metaArr')
        return metaArr.filter(item => {
            return typeof item === 'string'
        }).join('\n')
    }

    merge() {

        this.meteString = this.combinationMeta(
            [
                this.generateRefreshJump(),
                this.generateXDnsPrefetchControl(),
                this.generateAuthor(),
                this.generateKeywords(),
                this.tencentQqMeta.generateForcedVerticalScreen(),
                this.tencentQqMeta.generateFullscreen(),
                this.tencentQqMeta.generateAppMode()
            ]
        )

        console.log(this.meteString, 'metaString')
    }

}
