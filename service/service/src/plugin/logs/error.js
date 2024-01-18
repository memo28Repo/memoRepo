/*
 * @Author: 邱狮杰
 * @Date: 2023-03-23 09:39:21
 * @LastEditTime: 2023-03-27 08:54:22
 * @Description:
 * @FilePath: /memo/packages/service/src/plugin/logs/error.ts
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AnomalousChain, Errors, panicProcessing } from '@memo28/utils';
import { AxiosError } from 'axios';
export class ErrorWithAxios extends AnomalousChain {
    constructor(obj) {
        super();
        this.obj = obj;
        this.notAxiosError = false;
        if (typeof obj !== 'object' || (!Reflect.get(obj, 'name') && !Reflect.get(obj, 'code'))) {
            this.setErrors(Errors.New('not a Axios Errors!'));
        }
    }
    skip(errors) {
        this.notAxiosError = true;
        return this;
    }
    AxiosError() {
        var _a, _b, _c, _d, _e;
        if (typeof this.obj !== 'object')
            return this;
        if (!(this.obj instanceof AxiosError))
            return this;
        if (((_a = this.obj) === null || _a === void 0 ? void 0 : _a.code) === 'ERR_CANCELED')
            return this;
        const err = this.obj;
        console.groupCollapsed(`%c RESPONSE ERROR %c code:${err.code} %c message:${err.message} %c ${((_b = err.config) === null || _b === void 0 ? void 0 : _b.baseURL) ? err.config.baseURL + ((_c = err.config) === null || _c === void 0 ? void 0 : _c.url) : (_d = err.config) === null || _d === void 0 ? void 0 : _d.url} %c 展开查看接口兜底值:👇`, 'color:red;', 'color: black', 'color: black', '', '');
        console.log(err);
        console.log('兜底值 =>', (_e = err.config) === null || _e === void 0 ? void 0 : _e.pocketValue);
        console.groupEnd();
        return this;
    }
    getNotAxiosError() {
        return this.notAxiosError;
    }
}
__decorate([
    panicProcessing()
], ErrorWithAxios.prototype, "AxiosError", null);
