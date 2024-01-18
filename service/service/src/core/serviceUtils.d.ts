import { initializeConfigurationTypes, modulesImpl } from '../types/engine';
export declare let debug: boolean;
/**
 *
 * 请求工具
 *
 * @remarks
 * 如项目不支持装饰器 则降级为该方案
 *
 * @public
 */
export declare class ServiceUtils<T extends object> {
    private injection;
    private axios;
    /**
     *
     * - 配置拦截器
     * - 配置前后置拦截器
     *
     * @param { Partial<modulesImpl> } opt  - 模块配置
     *
     * @public
     */
    modules(opt: Partial<modulesImpl>): this;
    /**
     *
     * 初始化 `axios` 参数
     *
     * @public
     */
    initializeConfiguration(opt: initializeConfigurationTypes & T): this;
    /**
     *
     * 配置初始化 `axios` 参数 并且创建 `axios` & 绑定拦截器
     *
     * @public
     */
    instantiation(): this;
    /**
     *
     * 获取实例化后的  `axios`
     *
     * @public
     */
    getAxios(): <R>(req: initializeConfigurationTypes & T) => Promise<R>;
}
