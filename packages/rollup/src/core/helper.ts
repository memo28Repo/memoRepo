/*
 * @Author: 邱狮杰
 * @Date: 2023-02-01 13:54:02
 * @LastEditTime: 2023-02-15 10:11:09
 * @Description:
 * @FilePath: /memo/packages/rollup/src/core/helper.ts
 */

import { AutomaticAssembly } from '@memo28/types'
import { InputPluginOption, Plugin } from 'rollup'
import { ContentUrl, URLOpt } from '../plugin/contentUrl'
import { NodeResolve, nrOpt } from '../plugin/nodeResolve'
import { ErrorNotify } from '../plugin/notify'
import { TsOpt, Typescript } from '../plugin/typescript'

export interface PluginTypes<R = object> extends AutomaticAssembly<R, Plugin> {}

export class Helper {
  private pluginsList: InputPluginOption = []

  /**
   * @description 集成ts
   * @see https://github.com/rollup/plugins/tree/master/packages/typescript
   */
  addTs(opt?: TsOpt) {
    this.automaticAssemblyPlugin(new Typescript(), opt)
    return this
  }

  /**
   * @description 汇总捆绑的简单分析，帮助您发现使捆绑包膨胀的库。
   * @see https://github.com/tivac/rollup-plugin-sizes
   */
  addBand() {
    return this
  }

  /**
   * @description 将文件导入为数据 URI 或 ES 模块的 Rollup 插件
   * @see https://github.com/rollup/plugins/tree/master/packages/url
   */
  addContentUrl(opt?: URLOpt) {
    this.automaticAssemblyPlugin(new ContentUrl(), opt)
    return this
  }
  /**
   * @description
   * @see https://github.com/rollup/plugins/tree/master/packages/node-resolve
   */
  addNodeResolve(opt?: nrOpt) {
    this.automaticAssemblyPlugin(new NodeResolve(), opt)
    return this
  }

  /**
   * @description 系统级别的错误通知
   * @see https://github.com/MikeKovarik/rollup-plugin-notify
   */
  addErrorNotify() {
    this.automaticAssemblyPlugin(new ErrorNotify(), {})
    return
  }

  // https://github.com/MikeKovarik/rollup-plugin-notify
  getPluginsList() {
    return this.pluginsList
  }

  /**
   * @description 自动装配
   */
  protected automaticAssemblyPlugin(p: PluginTypes<unknown>, res: unknown) {
    if (Array.isArray(this.pluginsList)) {
      this.pluginsList.push(p.readConfiguration(res).getAssemblyCompleted())
    }
  }
}
