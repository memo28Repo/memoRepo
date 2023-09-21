/*
 * @Author: 邱狮杰
 * @Date: 2023-06-04 09:58:45
 * @LastEditTime: 2023-09-21 15:05:46
 * @Description:
 * @FilePath: /memo/packages/serviceHelper/src/index.ts
 */


/**
 * 请求常用帮助助手
 * 
 * - 以装饰器方式配置请求 {@link extractRequestInstance} {@link Get}
 * 
 * - 快速定义 `CRUD` 请求
 *
 * @packageDocumentation
 */

import { versionLog } from "@memo28/logs";
// @ts-ignore
import pack from "../package.json";



versionLog({
  name: "@memo28/serviceHelper",
  version: pack.version
});


export type {
  ConfigureSuffix, QuickCompletionCRUDAssistantConfig, QuickCompletionCRUDAssistantImpl, QuickCompletionCRUDAssistantResponse, TriggerResult, customTrigger
} from "./quickCompletionCRUDAssistant/impl";

export { QuickCompletionCRUDAssistant, unifyQuickCompletionCRUDAssistant } from "./quickCompletionCRUDAssistant/index";

export {
  ConfigurationThrownToUser, Del,
  Get, Header, Post,
  Put, cacheDecor, config, controller, extractRequestInstance, multiVersionSwitchingRequestDecor, parameter, pocketValueDecor, retryOptDecor, validation
} from "./sliceRequest";

