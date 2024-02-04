/*
 * @Author: 邱狮杰
 * @Date: 2023-05-13 07:45:18
 * @LastEditTime: 2023-09-21 15:37:46
 * @Description:
 * @FilePath: /memo/packages/service/src/plugin/retry/index.ts
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
import { RetryImpl } from "@memo28/serviceimpl";
/**
 *
 *
 * 请求重试 拦截器
 *
 * @remarks
 * - 核心逻辑依赖 `@memo28/serviceimpl.RetryImpl` 类
 *
 *
 * @public
 */
export class Retry extends RetryImpl {
    /**
     *
     * 请求成功 拦截器
     *
     * @param { initializeConfigurationTypes } config - 请求配置
     *
     * @public
     */
    requestSuc(config) {
        super.requestSuc(config);
        return config;
    }
    /**
     *
     * 响应错误回调
     *
     * @param { any } error - 错误
     * @param { AxiosInstance } instance - 请求实例
     *
     * @public
     */
    responseFail(error, instance) {
        const _super = Object.create(null, {
            responseFail: { get: () => super.responseFail }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.responseFail.call(this, error, instance);
        });
    }
}
