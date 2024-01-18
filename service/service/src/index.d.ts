/**
 * 请求最佳实践
 *
 * @remarks
 * 该库
 *
 * @packageDocumentation
 */
import "reflect-metadata";
export { RetData } from "./plugin/RetData";
export { MultiVersionSwitching, multiVersionSwitchingRequest } from "./plugin/multiVersionSwitching";
export { Cache, CacheConfig, CachePrerequisites, CacheTrigger, ExpirationTime, requestConfig } from "./plugin/cache";
export { LocalCache } from './plugin/cache/impl/local';
export { Logs } from "./plugin/logs/index";
export { Loading, LoadingOpt } from "./plugin/loading/index";
export { Retry, retryOpt } from "./plugin/retry";
export * from "./core/config";
export * from "./core/engine";
export * from "./core/instantiation";
export * from "./core/modules";
export * from "./core/serviceUtils";
export * from "./core/terminationResult";
export * from "./types/engine";
export * from "./types/interceptor";
