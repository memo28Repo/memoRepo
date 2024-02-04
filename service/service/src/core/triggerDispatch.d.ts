import { TriggerInterceptor } from '@memo28/serviceimpl';
import { initializeConfigurationTypes, modulesImpl } from '../types/engine';
export declare class TriggerDispatch extends TriggerInterceptor<initializeConfigurationTypes, any> {
    constructor(list: modulesImpl['triggerInterceptor']);
    logs(opt: {
        config: initializeConfigurationTypes;
        type: string;
        name?: string;
        directReturnValue?: boolean;
        callback?: () => void;
    }): void;
    dispatchBefore(config: initializeConfigurationTypes): Promise<initializeConfigurationTypes | unknown>;
    dispatchAfter(config: initializeConfigurationTypes, res: any): Promise<any>;
}
