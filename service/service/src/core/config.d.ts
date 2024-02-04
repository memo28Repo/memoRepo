import { getObjValues, initializeConfigurationTypes } from '../types/engine';
export declare const initializeConfigurationKeys: {
    readonly initializeConfiguration: "initializeConfiguration";
};
export type getInitializeConfigurationValues = getObjValues<typeof initializeConfigurationKeys>;
export declare function initializeConfiguration<v = object>(conf?: initializeConfigurationTypes & Partial<v>): (target: object) => void;
