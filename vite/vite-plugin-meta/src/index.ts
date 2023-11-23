/*
 * @Author: 邱狮杰
 * @Date: 2023-02-03 15:36:24
 * @LastEditTime: 2023-10-12 17:48:33
 * @Description:
 * @FilePath: /memo/packages/vite-plugin-meta/src/index.ts
 */

// @ts-ignore
import { versionLog } from "@memo28/logs";
// @ts-ignore
import pack from "../package.json";

versionLog({
  name: "@memo28/vite-plugin-meta",
  version: pack.version
});

/**
 * 通过配置的方式生成 `meta` 标签
 *
 * @packageDocumentation
 */
import { IndexHtmlTransformContext, PluginOption } from "vite";
import { appleMetaOpt } from "./appleMeta";
import { Core } from "./core";
import { tencentQqOpt } from "./tencentQqMeta";

/**
 *
 *
 * @public
 */
export interface vitePluginMetaOpt {
  /**
   * 腾讯`qq`相关
   * @see https://juejin.cn/post/6844903750239272973#heading-3
   *
   * @public
   */
  tencentQq: tencentQqOpt;

  /**
   * `apple.inc` 相关
   *
   * @public
   */
  apple: appleMetaOpt;

  /**
   * 刷新跳转
   * @see https://juejin.cn/post/7089271039842058253
   *
   * @public
   */
  refreshJump: {
    /**
     * 间隔多少秒之后跳转
     *
     * @public
     */
    timeout: number
    /**
     * 跳转目标
     *
     * @public
     */
    url: string
  };
  /**
   * 一般来说，HTML页面中的a标签会自动启用DNS提前解析来提升网站性能，但是在使用https协议的网站中失效了，我们可以设置：来打开dns对a标签的提前解析
   * @see https://juejin.cn/post/7089271039842058253
   *
   * @public
   */
  xDnsPrefetchControl: boolean;
  /**
   * 用来表示网页的作者的名字，例如某个组织或者机构。
   *
   * @public
   */
  author: string;

  /**
   * 与页面内容相关的关键词，使用逗号分隔。某些搜索引擎在遇到这些关键字时，会用这些关键字对文档进行分类。 还是以头条和taobao为例
   *
   * @public
   */
  keywords: string;
}

/**
 *
 *
 * 写配置生成 `meta` 标签
 *
 * @param {Partial<vitePluginMetaOpt>} opt - 生成`meta`标签的规则类型
 *
 * @returns
 */
export default function vitePluginMete(opt?: Partial<vitePluginMetaOpt>): PluginOption {
  const parase = new Core(opt);
  return {
    // @ts-ignore
    name: "@memo28/vite-plugin-mete",
    transformIndexHtml(html: string, ctx: IndexHtmlTransformContext) {
      const [parseSuc, _] = parase.parseMetaInHead(html);
      if (!parseSuc) return;
      const matchComments = /<!--\s+@memo28\/vite-plugin-met(a|e)\s+-->/g;
      parase.merge();
      const newHtml = html.replace(matchComments, parase.getMeteString());
      return newHtml;
    }
  };
}
