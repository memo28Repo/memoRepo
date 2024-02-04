import { initializeConfigurationTypes } from '../types/engine';
/**
 *
 * 取消请求类
 *
 * @remarks
 *
 * @public
 */
export declare class TerminationResult<T> {
    ConfigurationParameters(config: initializeConfigurationTypes & T): {
        getConfiguration(): initializeConfigurationTypes;
        terminateTrigger(): void;
    };
}
