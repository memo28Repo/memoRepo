/*
 * @Author: 邱狮杰
 * @Date: 2023-02-01 13:54:02
 * @LastEditTime: 2023-03-09 10:42:17
 * @Description:
 * @FilePath: /memo/packages/rollup/src/core/helper.ts
 */

import { AutomaticAssembly } from "@memo28/types";
import { InputPluginOption, Plugin } from "rollup";
import { ContentUrl, URLOpt } from "../plugin/contentUrl";
import { NodeResolve, nrOpt } from "../plugin/nodeResolve";
import { ErrorNotify } from "../plugin/notify";
import { TsOpt, Typescript } from "../plugin/typescript";

/**
 *
 * 自动装配类型
 *
 * @public
 */
export interface PluginTypes<R = object> extends AutomaticAssembly<R, Plugin> {
}


/**
 *
 * 插件帮助助手 用于快速集成插件
 * `reference` {@link RollupHelper}
 *
 * @remarks
 * 用法
 * ```ts
 * // 添加插件并且 到处 插件列表
 * new Helper().addErrorNotify().getPluginsList()
 * ```
 *
 * @public
 */
export class Helper {
  private pluginsList: InputPluginOption = [];

  /**
   * 集成ts
   *
   * @remarks
   * {@link Typescript}
   *
   * @see https://github.com/rollup/plugins/tree/master/packages/typescript
   *
   * @public
   */
  addTs(opt?: TsOpt) {
    this.automaticAssemblyPlugin(new Typescript(), opt);
    return this;
  }

  /**
   * 汇总捆绑的简单分析，帮助您发现使捆绑包膨胀的库。
   *
   * @remarks
   * {@link }
   *
   * @see https://github.com/tivac/rollup-plugin-sizes
   *
   * @public
   */
  addBand() {
    return this;
  }

  /**
   * 将文件导入为数据 `URI` 或 `ES` 模块的 `Rollup` 插件
   *
   * @remarks
   * {@link ContentUrl}
   *
   * @param {URLOpt} opt - 配置项
   *
   * @see https://github.com/rollup/plugins/tree/master/packages/url
   *
   * @public
   */
  addContentUrl(opt?: URLOpt) {
    this.automaticAssemblyPlugin(new ContentUrl(), opt);
    return this;
  }

  /**
   *
   *
   * @remarks
   * {@link NodeResolve}
   *
   * @param {nrOpt} opt - 配置项
   *
   * @see https://github.com/rollup/plugins/tree/master/packages/node-resolve
   *
   * @public
   */
  addNodeResolve(opt?: nrOpt) {
    this.automaticAssemblyPlugin(new NodeResolve(), opt);
    return this;
  }

  /**
   * 系统级别的错误通知
   *
   * @remarks
   * {@link ErrorNotify}
   *
   * @see https://github.com/MikeKovarik/rollup-plugin-notify
   *
   * @public
   */
  addErrorNotify() {
    this.automaticAssemblyPlugin(new ErrorNotify(), {});
    return this;
  }

  getPluginsList() {
    return this.pluginsList;
  }

  /**
   *  自动装配,初始化插件
   *
   *  @remarks
   *  {@link AutomaticAssembly}
   *
   *  @param {PluginTypes<unknown>} p - 插件
   *
   *  @public
   *
   */
  protected automaticAssemblyPlugin(p: PluginTypes<unknown>, res: unknown) {
    if (Array.isArray(this.pluginsList)) {
      this.pluginsList.push(p.readConfiguration(res).getAssemblyCompleted());
    }
  }
}
