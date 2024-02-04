/*
 * @Author: 邱狮杰
 * @Date: 2023-04-22 10:49:27
 * @LastEditTime: 2024-01-04 17:55:02
 * @Description:
 * @FilePath: /memo/service/serviceImpl/src/core/triggerInterceptor.ts
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class TriggerInterceptor {
    constructor(list) {
        this.triggerInterceptorList = [];
        this.triggerInterceptorList = this.loopInstantiation(list);
    }
    loopInstantiation(list) {
        return ((list === null || list === void 0 ? void 0 : list.map(item => {
            return Reflect.construct(item, []);
        })) || []);
    }
    dispatchBefore(config, callback) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let c = config;
            for (let i = 0; i < this.triggerInterceptorList.length; i++) {
                const item = this.triggerInterceptorList[i];
                let result = (yield ((_a = item === null || item === void 0 ? void 0 : item.beforeTrigger) === null || _a === void 0 ? void 0 : _a.call(item, (c || {}))));
                callback === null || callback === void 0 ? void 0 : callback(item, result);
                if (result === null || result === void 0 ? void 0 : result.directReturnValue) {
                    c = result;
                    break;
                }
                c = result !== null && result !== void 0 ? result : c;
            }
            return c;
        });
    }
    dispatchAfter(config, res, callback) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let c = res;
            for (let i = 0; i < this.triggerInterceptorList.length; i++) {
                const item = this.triggerInterceptorList[i];
                c = (yield ((_a = item === null || item === void 0 ? void 0 : item.afterTrigger) === null || _a === void 0 ? void 0 : _a.call(item, c, config))) || c;
                callback === null || callback === void 0 ? void 0 : callback(item, c);
            }
            return c;
        });
    }
}
