/*
 * @Author: 邱狮杰
 * @Date: 2023-01-07 12:49:45
 * @LastEditTime: 2023-05-13 09:13:55
 * @Description:
 * @FilePath: /memo/packages/service/src/interceptor/dispatchInterceptor.ts
 */
import { DispatchInterceptor as ServiceimplDispatchInterceptor } from '@memo28/serviceimpl';
/**
*
 * 调度拦截器
*
*  @public
*
 */
export class DispatchInterceptor {
    constructor() {
        this.instance = null;
        this.serviceimplDispatchInterceptor = new ServiceimplDispatchInterceptor();
    }
    /**
     * @description 获取拦截器 和 axios实例
     */
    getAllInterceptorPlugIns(instace, list) {
        this.serviceimplDispatchInterceptor.getAllInterceptorPlugIns(list);
        this.instance = instace;
        this.serviceimplDispatchInterceptor.setInstance(instace);
        return this;
    }
    /**
     * @description 将拦截器绑定到实例上
     */
    bindInterceptorToInstance() {
        var _a, _b;
        (_a = this.instance) === null || _a === void 0 ? void 0 : _a.interceptors.request.use(config => {
            return this.serviceimplDispatchInterceptor.RequestSuc(config);
        }, err => {
            return this.serviceimplDispatchInterceptor.RequestFail(err);
        });
        (_b = this.instance) === null || _b === void 0 ? void 0 : _b.interceptors.response.use(response => {
            return this.serviceimplDispatchInterceptor.ResponseSuc(response);
        }, responseError => {
            return this.serviceimplDispatchInterceptor.ResponseFail(responseError);
        });
        return this;
    }
}
