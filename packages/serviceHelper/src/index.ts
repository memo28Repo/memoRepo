/*
 * @Author: 邱狮杰
 * @Date: 2023-06-04 09:58:45
 * @LastEditTime: 2023-06-04 10:58:40
 * @Description:
 * @FilePath: /memo/packages/serviceHelper/src/index.ts
 */

import { versionLog } from "@memo28/logs";
// @ts-ignore
import pack from "../package.json";

versionLog({
  name: "@memo28/serviceHelper",
  version: pack.version
});


export type {
  QuickCompletionCRUDAssistantImpl,
  customTrigger,
  QuickCompletionCRUDAssistantConfig,
  ConfigureSuffix,
  TriggerResult,
  QuickCompletionCRUDAssistantResponse
} from "./quickCompletionCRUDAssistant/impl";
export { unifyQuickCompletionCRUDAssistant, QuickCompletionCRUDAssistant } from "./quickCompletionCRUDAssistant/index";
export {
  Del,
  Get,
  Post,
  Put,
  Header,
  ConfigurationThrownToUser,
  parameter,
  config,
  multiVersionSwitchingRequestDecor,
  retryOptDecor,
  cacheDecor,
  validation,
  extractRequestInstance,
  controller,
  pocketValueDecor
} from "./sliceRequest";
