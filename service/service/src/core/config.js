/*
 * @Author: 邱狮杰
 * @Date: 2023-01-06 18:11:53
 * @LastEditTime: 2023-04-04 14:13:26
 * @Description:
 * @FilePath: /memo/packages/service/src/core/config.ts
 */
import { Injection } from '@memo28/utils';
export const initializeConfigurationKeys = {
    initializeConfiguration: 'initializeConfiguration',
};
export function initializeConfiguration(conf) {
    return (target) => {
        const injection = new Injection(target);
        injection.setValue('initializeConfiguration', conf);
    };
}
