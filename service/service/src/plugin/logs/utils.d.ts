import { initializeConfigurationTypes } from '../../types/engine';
export declare class HttpLog {
    private requestConfig;
    constructor(requestConfig: initializeConfigurationTypes);
    getTime(): {
        time: string;
        color: string;
    };
    getMethods(): {
        method: string | undefined;
        color: string;
    };
    getURL(): {
        url: string | undefined;
        color: string;
    };
    getParams(): any;
}
export declare const colors: {
    requestResponseSucceeded: string;
    triggerFrontAndRearTnterceptors: string;
    afterCurrentInterceptorIsForciblyReturnedBackground: string;
    afterCurrentInterceptorIsForciblyReturnedColor: string;
};
