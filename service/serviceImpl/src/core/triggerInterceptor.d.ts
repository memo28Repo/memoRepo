/**
 *
 * 拦截器前后置触发器  在请求前后 拦截器前后触发
 *
 *
 * @public
 *
 */
export type triggerInterceptorImpl<Req = unknown, Res = unknown, B = unknown> = {
    displayName?: string;
    beforeTrigger?(config: Req): Promise<Res | void | beforeTriggerResultTypes<B>>;
    afterTrigger?<T = unknown>(res: Res, req: Req): Promise<T | void>;
    logsCallback?(type: 'afterTrigger' | 'beforeTrigger', data: void | Res | Req, res?: unknown): void;
};
/**
 *
 *
 * 前置拦截器返回类型
 *
 * @public
 *
 */
export interface beforeTriggerResultTypes<T> {
    data: T;
    directReturnValue?: boolean;
}
export declare class TriggerInterceptor<Req = unknown, Res = unknown> {
    protected triggerInterceptorList: triggerInterceptorImpl<Req, Res>[];
    constructor(list: (new (...args: unknown[]) => triggerInterceptorImpl<Req, Res>)[]);
    protected loopInstantiation(list: (new (...args: unknown[]) => triggerInterceptorImpl<Req, Res>)[]): triggerInterceptorImpl<Req, Res>[];
    dispatchBefore(config: Req, callback?: (item: triggerInterceptorImpl<Req, Res>, result: beforeTriggerResultTypes<unknown>) => void): Promise<Req | unknown>;
    dispatchAfter(config: Req, res: any, callback?: (item: triggerInterceptorImpl<Req, Res>, result: Req) => void): Promise<any>;
}
