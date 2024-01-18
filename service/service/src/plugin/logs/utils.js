/*
 * @Author: 邱狮杰
 * @Date: 2023-03-26 09:06:07
 * @LastEditTime: 2023-03-26 10:37:55
 * @Description:
 * @FilePath: /memo/packages/service/src/plugin/logs/utils.ts
 */
export class HttpLog {
    constructor(requestConfig) {
        this.requestConfig = requestConfig;
    }
    getTime() {
        const time = new Date();
        const t = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
        return {
            time: t,
            color: `background:#35495e ; border-radius: 3px;  color: #fff;padding: 0 3px;`,
        };
    }
    getMethods() {
        var _a, _b, _c;
        const h = {
            GET: 'green',
            POST: 'orange',
            PUT: 'skyblue',
            PATCH: 'gray',
            DELETE: 'red',
        };
        return {
            method: (_a = this.requestConfig.method) === null || _a === void 0 ? void 0 : _a.toUpperCase(),
            color: `color: ${h[((_c = (_b = this.requestConfig) === null || _b === void 0 ? void 0 : _b.method) === null || _c === void 0 ? void 0 : _c.toUpperCase()) || 'gray']}; font-width: bold`,
        };
    }
    getURL() {
        return {
            url: this.requestConfig.url,
            color: `color: #58a6ff`,
        };
    }
    getParams() {
        var _a;
        if (((_a = this.requestConfig.method) === null || _a === void 0 ? void 0 : _a.toUpperCase()) === 'GET') {
            return this.requestConfig.params;
        }
        return this.requestConfig.data;
    }
}
export const colors = {
    // 请求响应成功
    requestResponseSucceeded: '#8b972f',
    // 触发前后置拦截器
    triggerFrontAndRearTnterceptors: '#91defc',
    // 当前置拦截器被强制返回后
    afterCurrentInterceptorIsForciblyReturnedBackground: '#fefbe8',
    // 当前置拦截器被强制返回后 color
    afterCurrentInterceptorIsForciblyReturnedColor: 'gray',
};
