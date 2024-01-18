/*
 * @Author: 邱狮杰
 * @Date: 2023-01-07 12:40:29
 * @LastEditTime: 2023-03-27 08:56:05
 * @Description:
 * @FilePath: /memo/packages/service/src/core/instantiation.ts
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
import { Injection } from "@memo28/utils";
import axios from "axios";
import { Interceptor } from "../interceptor/core";
import { TriggerDispatch } from "./triggerDispatch";
export class GenerateSchedulingAxios {
    constructor(injection, req, axios) {
        this.injection = null;
        this.triggerDispatch = null;
        this.req = {};
        this.axios = null;
        this.injection = injection;
        this.triggerDispatch = new TriggerDispatch(this.injection.getValue("triggerInterceptor"));
        this.req = req;
        this.axios = axios;
    }
    beforeTriggeringInterception() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.triggerDispatchReq = yield ((_a = this.triggerDispatch) === null || _a === void 0 ? void 0 : _a.dispatchBefore(this.req));
            if (typeof this.triggerDispatchReq === "object" && Reflect.get(this.triggerDispatchReq, "directReturnValue"))
                return Reflect.get(this.triggerDispatchReq, "data");
            return this;
        });
    }
    triggerRequest() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const c = this.triggerDispatchReq || this.req;
            const response = yield ((_a = this.axios) === null || _a === void 0 ? void 0 : _a.call(this, c));
            this.response = response;
            return this;
        });
    }
    afterTriggeringInterception() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const triggerDispatchRes = yield ((_a = this.triggerDispatch) === null || _a === void 0 ? void 0 : _a.dispatchAfter(this.triggerDispatchReq || this.req, this.response));
            if (triggerDispatchRes)
                return triggerDispatchRes;
            return this.response;
        });
    }
}
export function instantiation() {
    return (target) => {
        const injection = new Injection(target);
        const axi = axios.create(injection.getValue("initializeConfiguration"));
        new Interceptor(injection, axi);
        const proto = target.prototype;
        // @ts-ignore
        proto.getAxios = function () {
            return (req) => __awaiter(this, void 0, void 0, function* () {
                console.log(123123123123);
                const generateSchedulingAxios = new GenerateSchedulingAxios(injection, Object.assign(Object.assign({}, req), injection.getValue("initializeConfiguration")), axi);
                const beforeTriggeringInterceptionResponse = yield generateSchedulingAxios.beforeTriggeringInterception();
                // 如果 value 不是 GenerateSchedulingAxios的实例 表示存在中途推出的情况, 直接返回
                if (!(beforeTriggeringInterceptionResponse instanceof GenerateSchedulingAxios)) {
                    return beforeTriggeringInterceptionResponse;
                }
                return (yield beforeTriggeringInterceptionResponse.triggerRequest()).afterTriggeringInterception();
            });
        };
    };
}
