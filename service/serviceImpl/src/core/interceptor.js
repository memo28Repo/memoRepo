/*
 * @Author: 邱狮杰
 * @Date: 2023-04-22 10:15:41
 * @LastEditTime: 2023-05-13 10:51:27
 * @Description:
 * @FilePath: /memo/packages/serviceImpl/src/core/interceptor.ts
 */
/**
 *
 * 拦截器utils
 *
 * @public
 */
class InterceptorToolbox {
    /**
     * 初始化拦截器
     * @param {(new (...args: unknown[]) => interceptorImpl)[]} list 拦截器列表
     * @returns
     */
    loopInstancedInterceptor(list) {
        if (!list)
            return [];
        return list.map(item => {
            return Reflect.construct(item, []);
        });
    }
}
// 响应必须携带请求参数, 后续拦截器可能都需要用得到，此处不强制用户携带，所以默认携带 不可修改，在最后一个拦截器中可以删除掉该字段，这样用户得到的响应就是干净的
const RESPONSE_MUST_CARRY_REQUEST_PARAMETERS = '@memo28/serviceImpl/responseWithReqeust';
/**
 *
 * 调度拦截器
 *
 * @public
 */
export class DispatchInterceptor {
    constructor() {
        this.interceptorToolbox = new InterceptorToolbox();
        this.interceptorModuleList = [];
        this.instance = null;
    }
    /**
     *
     * 保存实例
     *
     * @public
     *
     */
    setInstance(instance) {
        this.instance = instance;
    }
    /**
     * 获取拦截器列表
     *
     * @public
     */
    getAllInterceptorPlugIns(list) {
        this.interceptorModuleList = this.interceptorToolbox.loopInstancedInterceptor(list);
        return this;
    }
    RequestSuc(payload) {
        return this.loopCall(this.interceptorModuleList.map(i => { var _a; return (_a = i.requestSuc) === null || _a === void 0 ? void 0 : _a.bind(i); }), payload, 'requestSuc');
    }
    RequestFail(payload) {
        return this.loopCall(this.interceptorModuleList.map(i => { var _a; return (_a = i.requestFail) === null || _a === void 0 ? void 0 : _a.bind(i); }), payload, 'requestFail');
    }
    ResponseSuc(payload) {
        return this.loopCall(this.interceptorModuleList.map(i => { var _a; return (_a = i.responseSuc) === null || _a === void 0 ? void 0 : _a.bind(i); }), payload, 'responseSuc');
    }
    ResponseFail(payload) {
        return this.loopCall(this.interceptorModuleList.map(i => { var _a; return (_a = i.responseFail) === null || _a === void 0 ? void 0 : _a.bind(i); }), payload, 'responseFail');
    }
    /**
     *
     * 设置响应必须返回的参数 后续可在最后一个拦截器中清楚掉这个参数
     *
     */
    setRequestParametersWithResponse(type, response) {
        if (type === 'requestSuc') {
            Reflect.set(response, RESPONSE_MUST_CARRY_REQUEST_PARAMETERS, response);
        }
    }
    loopCall(fn, payload, type) {
        let newDate = payload;
        for (let index = 0; index < fn.length; index++) {
            const element = fn[index];
            newDate = (element === null || element === void 0 ? void 0 : element(newDate, this.instance)) || newDate;
            // this.setRequestParametersWithResponse(type, newDate)
        }
        return newDate;
    }
    getInterceptorModuleList() {
        return this.interceptorModuleList;
    }
}
