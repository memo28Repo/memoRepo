/*
 * @Author: 邱狮杰
 * @Date: 2023-06-04 10:02:10
 * @LastEditTime: 2023-06-04 10:52:13
 * @Description:
 * @FilePath: /memo/packages/serviceHelper/src/quickCompletionCRUDAssistant/impl.ts
 */
export interface QuickCompletionCRUDAssistantResponse<Get = unknown, Delete = unknown, Create = unknown, Update = unknown, Excel = unknown> {
  get: Promise<Get>;
  delete: Promise<Delete>;
  create: Promise<Create>;
  update: Promise<Update>;
  excel: Promise<Excel>;
}


/**
 * 配置路由后缀
 *
 *
 * @public
 */
export interface ConfigureSuffix {
  get: string;
  delete: string;
  create: string;
  update: string;
  excel: string;
}

export interface QuickCompletionCRUDAssistantConfig {
  triggerFn: Function
  url: string,
  configureSuffix: ConfigureSuffix
}


export interface TriggerResult<Req extends object, Res extends QuickCompletionCRUDAssistantResponse = QuickCompletionCRUDAssistantResponse> {
  get(req: Req): Promise<Res["get"]>;

  del(req: Req): Promise<Res["delete"]>;

  create(req: Req): Promise<Res["create"]>;

  update(req: Req): Promise<Res["update"]>;

  excel(req: Req): Promise<Res["excel"]>;
}

export type customTrigger<Req extends object, Res extends QuickCompletionCRUDAssistantResponse = QuickCompletionCRUDAssistantResponse> = (fn: Function, url: string, TriggerResult: TriggerResult<Req, Res>) => object


export abstract class QuickCompletionCRUDAssistantImpl<Req extends object, Res extends QuickCompletionCRUDAssistantResponse = QuickCompletionCRUDAssistantResponse> {
  abstract setTriggeredRequestFunction(fn: Function): this

  /**
   *
   * 配置 路由的后缀
   *
   * @example
   *
   * @public
   */
  abstract setConfigureSuffix(config: Partial<ConfigureSuffix>): this

  abstract setURL(url: string): this

  abstract trigger(config?: Partial<customTrigger<Req, Res>>): TriggerResult<Req, Res>
}
