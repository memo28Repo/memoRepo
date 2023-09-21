/*
 * @Author: 邱狮杰
 * @Date: 2023-06-04 10:02:10
 * @LastEditTime: 2023-09-21 15:04:45
 * @Description:
 * @FilePath: /memo/packages/serviceHelper/src/quickCompletionCRUDAssistant/impl.ts
 */

/**
 * 
 * 传入 `curd` 响应的类型
 * 
 * @public
 * 
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




/**
 * 
 * 快速生成 `curd` 请求助手的配置
 *  
 * @public
 * 
 */
export interface QuickCompletionCRUDAssistantConfig {
  triggerFn: Function
  url: string,
  configureSuffix: ConfigureSuffix
}


/**
 * 
 * 传入 `curd` 请求类型 和 响应类型
 * 
 *  @public
 */
export interface TriggerResult<Req extends object, Res extends QuickCompletionCRUDAssistantResponse = QuickCompletionCRUDAssistantResponse> {
  get(req: Req): Promise<Res["get"]>;

  del(req: Req): Promise<Res["delete"]>;

  create(req: Req): Promise<Res["create"]>;

  update(req: Req): Promise<Res["update"]>;

  excel(req: Req): Promise<Res["excel"]>;
}

/**
 * 
 * 自定义触发器 - 通过拓展请求
 * 
 * @public
 * 
 */
export type customTrigger<Req extends object, Res extends QuickCompletionCRUDAssistantResponse = QuickCompletionCRUDAssistantResponse> = (fn: Function, url: string, TriggerResult: TriggerResult<Req, Res>) => object


/**
 * 
 * 快速完成CRUD请求实现 抽象类
 * 
 * @public
 * 
 */
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


  /**
   * 
   * 配置路由前缀
   * 
   * @param { string } url - 路由前缀
   * 
   * @public
   */
  abstract setURL(url: string): this


  /**
   * 
   * 返回响应路由前缀的 `get` `update` `del`  `put` 请求方法
   * 
   * @remarks
   * 可传入`config` 来扩展更多请求
   * 
   * @param { Partial<customTrigger<Req, Res>> } config - 扩展请求配置
   * 
   * @public
   * 
   */
  abstract trigger(config?: Partial<customTrigger<Req, Res>>): TriggerResult<Req, Res>
}
