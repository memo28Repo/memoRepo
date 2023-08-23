/*
 * @Author: 邱狮杰
 * @Date: 2023-01-31 10:29:53
 * @LastEditTime: 2023-02-15 10:11:01
 * @Description:
 * @FilePath: /memo/packages/rollup/src/index.ts
 */

import { InputPluginOption, RollupOptions } from "rollup";
import { Helper } from "./core/helper";




/**
 * 该库用于配置`rollup` 插件
 *
 * @remarks
 * 该库的目的是为了让`rollup`插件配置更加简单, 更加直观
 *
 * @packageDocumentation
 */



/**
 *
 * 配置插件帮助助手
 *
 * @public
 *
 */
export class RollupHelper {
  private pluginsList: InputPluginOption = [];


  /**
   *
   *
   * @param { Function } helper - 帮助函数 {@link Helper} 帮助配置插件
   *
   * @public
   *
   */
  addPlugins(helper: (helper: Omit<Helper, "getPluginsList">) => void) {
    const h = new Helper();
    helper(h);
    if (Array.isArray(this.pluginsList)) this.pluginsList.push(h.getPluginsList());
    return this;
  }

  getBuild(opt?: RollupOptions) {
    return {
      ...opt
    };
  }
}

