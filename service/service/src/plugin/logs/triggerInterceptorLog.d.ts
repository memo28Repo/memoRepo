import { initializeConfigurationTypes } from '../../types/engine';
import { beforeTriggerResultTypes, triggerInterceptorImpl } from '../../types/interceptor';
export declare class TriggerInterceptorLog implements triggerInterceptorImpl {
    beforeTrigger<T = unknown>(config: initializeConfigurationTypes): Promise<void | beforeTriggerResultTypes<T>>;
    afterTrigger<T = unknown>(res: unknown, req: initializeConfigurationTypes): Promise<void | T>;
}
