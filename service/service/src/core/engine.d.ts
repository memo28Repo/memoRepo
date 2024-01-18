import { AxiosResponse } from 'axios';
import 'reflect-metadata';
import { initializeConfigurationTypes } from '../types/engine';
type Res = Promise<AxiosResponse<any, any>> | AxiosResponse<any, any>;
type Req<R> = Partial<R> & initializeConfigurationTypes;
export declare class ServiceCore<R = unknown> {
    getAxios(): <T = Res>(req?: Req<R>) => T | Promise<T>;
}
export {};
