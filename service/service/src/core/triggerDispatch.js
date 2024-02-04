var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/*
 * @Author: 邱狮杰
 * @Date: 2023-01-14 13:52:08
 * @LastEditTime: 2023-04-28 23:03:02
 * @Description:
 * @FilePath: /memo/packages/service/src/core/triggerDispatch.ts
 */
import { TriggerInterceptor } from '@memo28/serviceimpl';
import { HttpLog, colors } from '../plugin/logs/utils';
export class TriggerDispatch extends TriggerInterceptor {
    constructor(list) {
        super(list);
    }
    logs(opt) {
        var _a;
        if (!opt.config.debugger)
            return;
        const logs = new HttpLog(opt.config);
        const getTime = logs.getTime();
        const url = logs.getURL();
        console.group(`%c triggerInterceptorImpl:${opt.type}${opt.name ? `:${opt.name}` : ''} %c ${getTime.time} %c ${url.url}`, `color: ${opt.directReturnValue ? colors.afterCurrentInterceptorIsForciblyReturnedColor : colors.triggerFrontAndRearTnterceptors};
       ${opt.directReturnValue ? `background: ${colors.afterCurrentInterceptorIsForciblyReturnedBackground}; border-radius: 3px; padding: 3px;` : ``}`, `${getTime.color}`, '');
        (_a = opt.callback) === null || _a === void 0 ? void 0 : _a.call(opt);
        console.groupEnd();
    }
    dispatchBefore(config) {
        const _super = Object.create(null, {
            dispatchBefore: { get: () => super.dispatchBefore }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return _super.dispatchBefore.call(this, config, (item, result) => {
                const name = item.displayName;
                this.logs({
                    name,
                    type: (result === null || result === void 0 ? void 0 : result.directReturnValue) ? 'beforeTrigger:directReturnValue' : 'beforeTrigger',
                    directReturnValue: result === null || result === void 0 ? void 0 : result.directReturnValue,
                    config,
                    callback() {
                        var _a;
                        (_a = item.logsCallback) === null || _a === void 0 ? void 0 : _a.call(item, 'beforeTrigger', result);
                    },
                });
            });
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
        });
    }
    dispatchAfter(config, res) {
        const _super = Object.create(null, {
            dispatchAfter: { get: () => super.dispatchAfter }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return _super.dispatchAfter.call(this, config, res, (item, result) => {
                const name = item === null || item === void 0 ? void 0 : item.displayName;
                this.logs({
                    name,
                    type: 'afterTrigger',
                    directReturnValue: false,
                    config,
                    callback() {
                        var _a;
                        (_a = item.logsCallback) === null || _a === void 0 ? void 0 : _a.call(item, 'afterTrigger', config, result);
                    },
                });
            });
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
        });
    }
}
