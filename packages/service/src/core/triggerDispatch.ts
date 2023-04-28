/*
 * @Author: 邱狮杰
 * @Date: 2023-01-14 13:52:08
 * @LastEditTime: 2023-04-28 23:03:02
 * @Description:
 * @FilePath: /memo/packages/service/src/core/triggerDispatch.ts
 */
import { HttpLog, colors } from '../plugin/logs/utils'
import { initializeConfigurationTypes, modulesImpl } from '../types/engine'
import { beforeTriggerResultTypes, triggerInterceptorImpl } from '../types/interceptor'
import { TriggerInterceptor } from '@memo28/serviceimpl'

export class TriggerDispatch extends TriggerInterceptor<initializeConfigurationTypes, any> {
  constructor(list: modulesImpl['triggerInterceptor']) {
    super(list as any)
  }

  logs(opt: { config: initializeConfigurationTypes; type: string; name?: string; directReturnValue?: boolean; callback?: () => void }) {
    if (!opt.config.debugger) return
    const logs = new HttpLog(opt.config)
    const getTime = logs.getTime()
    const url = logs.getURL()
    console.group(
      `%c triggerInterceptorImpl:${opt.type}${opt.name ? `:${opt.name}` : ''} %c ${getTime.time} %c ${url.url}`,
      `color: ${opt.directReturnValue ? colors.afterCurrentInterceptorIsForciblyReturnedColor : colors.triggerFrontAndRearTnterceptors};
       ${opt.directReturnValue ? `background: ${colors.afterCurrentInterceptorIsForciblyReturnedBackground}; border-radius: 3px; padding: 3px;` : ``}`,
      `${getTime.color}`,
      ''
    )
    opt.callback?.()
    console.groupEnd()
  }

  async dispatchBefore(config: initializeConfigurationTypes): Promise<initializeConfigurationTypes | unknown> {
    return super.dispatchBefore(config, (item, result) => {
      const name = item.displayName
      this.logs({
        name,
        type: result?.directReturnValue ? 'beforeTrigger:directReturnValue' : 'beforeTrigger',
        directReturnValue: result?.directReturnValue,
        config,
        callback() {
          item.logsCallback?.('beforeTrigger', result)
        },
      })
    })
    // let c: initializeConfigurationTypes | unknown = config

    // for (let i = 0; i < this.triggerInterceptorList.length; i++) {
    //   const name = this.triggerInterceptorList[i].displayName
    //   const item = this.triggerInterceptorList[i]

    //   let result = (await item?.beforeTrigger?.(c || {})) as { directReturnValue?: unknown }
    //   // 返回的值(directReturnValue)如果直接跳过就不再往下执行
    //   if (result?.directReturnValue) {
    //     c = result as unknown
    //     this.logs({
    //       name,
    //       type: 'beforeTrigger:directReturnValue',
    //       directReturnValue: true,
    //       config,
    //       callback() {
    //         item.logsCallback?.('beforeTrigger', result)
    //       },
    //     })
    //     break
    //   }
    //   c = result ?? (c as beforeTriggerResultTypes<any>)
    //   this.logs({
    //     config,
    //     name,
    //     type: 'beforeTrigger',
    //     callback() {
    //       item.logsCallback?.('beforeTrigger', c as initializeConfigurationTypes)
    //     },
    //   })
    // }

    // return c
  }

  async dispatchAfter(config: initializeConfigurationTypes, res: any) {
    return super.dispatchAfter(config, res, (item, result) => {
      const name = item?.displayName
      this.logs({
        name,
        type: 'afterTrigger',
        directReturnValue: false,
        config,
        callback() {
          item.logsCallback?.('afterTrigger', config, result)
        },
      })
    })
    // let c = res

    // for (let i = 0; i < this.triggerInterceptorList.length; i++) {
    //   const item = this.triggerInterceptorList[i]
    //   const name = item.displayName
    //   c = (await item?.afterTrigger?.(c, config)) || c
    //   this.logs({
    //     name,
    //     type: 'afterTrigger',
    //     directReturnValue: false,
    //     config,
    //     callback() {
    //       item.logsCallback?.('afterTrigger', config, c)
    //     },
    //   })
    // }

    // return c
  }
}
