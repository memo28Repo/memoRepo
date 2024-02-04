import { getInitializeConfigurationValues } from '../core/config';
import { Injection } from '@memo28/utils';
import { getModulesValues } from '../core/modules';
import { interceptorImpl } from '../types/interceptor';
import { DispatchInterceptor } from './dispatchInterceptor';
import { AxiosInstance } from 'axios';
export declare class Cannel implements interceptorImpl {
    displayName?: string | undefined;
}
export declare class Interceptor {
    protected dispatchInterceptor: DispatchInterceptor;
    constructor(target: Injection<getInitializeConfigurationValues | getModulesValues>, instance: AxiosInstance);
}
