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
 * @Date: 2023-03-22 09:13:31
 * @LastEditTime: 2023-12-29 10:11:58
 * @Description:
 * @FilePath: /memo/service/service/src/core/serviceUtils.ts
 */
import { Injection } from '@memo28/utils';
import axios from 'axios';
import { Interceptor } from '../interceptor/core';
import { Logs } from '../plugin/logs';
import { PocketValue } from '../plugin/pocketBottom';
import { GenerateSchedulingAxios } from './instantiation';
export let debug = false;
/**
 *
 * 请求工具
 *
 * @remarks
 * 如项目不支持装饰器 则降级为该方案
 *
 * @public
 */
export class ServiceUtils {
    constructor() {
        this.injection = new Injection(this);
        this.axios = null;
    }
    /**
     *
     * - 配置拦截器
     * - 配置前后置拦截器
     *
     * @param { Partial<modulesImpl> } opt  - 模块配置
     *
     * @public
     */
    modules(opt) {
        this.injection.setValue('interceptorModule', [Logs, ...(opt.interceptorModule || [])]);
        this.injection.setValue('triggerInterceptor', [...(opt.triggerInterceptor || []), PocketValue]);
        return this;
    }
    /**
     *
     * 初始化 `axios` 参数
     *
     * @public
     */
    initializeConfiguration(opt) {
        this.injection.setValue('initializeConfiguration', opt);
        debug = opt.debugger || false;
        return this;
    }
    /**
     *
     * 配置初始化 `axios` 参数 并且创建 `axios` & 绑定拦截器
     *
     * @public
     */
    instantiation() {
        this.axios = axios.create(this.injection.getValue('initializeConfiguration'));
        new Interceptor(this.injection, this.axios);
        return this;
    }
    /**
     *
     * 获取实例化后的  `axios`
     *
     * @public
     */
    getAxios() {
        return (req) => __awaiter(this, void 0, void 0, function* () {
            const generateSchedulingAxios = new GenerateSchedulingAxios(this.injection, Object.assign(Object.assign({}, req), this.injection.getValue('initializeConfiguration')), this.axios);
            const beforeTriggeringInterceptionResponse = yield generateSchedulingAxios.beforeTriggeringInterception();
            // 如果 value 不是 GenerateSchedulingAxios的实例 表示存在中途推出的情况, 直接返回
            if (!(beforeTriggeringInterceptionResponse instanceof GenerateSchedulingAxios)) {
                return beforeTriggeringInterceptionResponse;
            }
            return (yield beforeTriggeringInterceptionResponse.triggerRequest()).afterTriggeringInterception();
        });
    }
}
