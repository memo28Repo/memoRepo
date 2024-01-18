/*
 * @Author: 邱狮杰
 * @Date: 2023-01-06 15:09:36
 * @LastEditTime: 2023-03-22 09:27:17
 * @Description:
 * @FilePath: /memo/packages/service/src/interceptor/core.ts
 */
import { DispatchInterceptor } from './dispatchInterceptor';
export class Cannel {
    constructor() {
        this.displayName = 'as';
    }
}
export class Interceptor {
    constructor(target, instance) {
        this.dispatchInterceptor = new DispatchInterceptor();
        this.dispatchInterceptor.getAllInterceptorPlugIns(instance, target.getValue('interceptorModule')).bindInterceptorToInstance();
    }
}
