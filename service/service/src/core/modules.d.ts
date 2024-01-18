import { getObjValues, modulesImpl } from '../types/engine';
declare const modulesKeys: {
    readonly interceptorModule: "interceptorModule";
    readonly triggerInterceptor: "triggerInterceptor";
};
/**
 *
 * 获取 {@link modules} 配置的 `key`
 *
 * @public
 *
 */
export type getModulesValues = getObjValues<typeof modulesKeys>;
/**
 *
 * 配置模块
 *
 * @param { modulesImpl } conf - 配置拦截器，前后置拦截器
 *
 * @defaultValue
 * - 拦截器 默认配置 {@link Logs}
 * - 前后置拦截器 默认配置 {@link PocketValue}
 *
 * @public
 */
export declare function modules(conf?: modulesImpl): (target: any) => void;
export {};
