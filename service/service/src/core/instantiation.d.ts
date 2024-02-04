import { Injection } from "@memo28/utils";
import { AxiosInstance } from "axios";
import { initializeConfigurationTypes } from "../types/engine";
import { getInitializeConfigurationValues } from "./config";
import { getModulesValues } from "./modules";
export declare class GenerateSchedulingAxios {
    private injection;
    private triggerDispatch;
    private req;
    private triggerDispatchReq;
    private axios;
    private response;
    constructor(injection: Injection<getInitializeConfigurationValues | getModulesValues>, req: initializeConfigurationTypes, axios: AxiosInstance);
    beforeTriggeringInterception(): Promise<this | any>;
    triggerRequest(): Promise<this>;
    afterTriggeringInterception(): Promise<any>;
}
export declare function instantiation(): (target: any) => void;
