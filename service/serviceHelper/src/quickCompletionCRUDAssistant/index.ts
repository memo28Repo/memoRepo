import {
  ConfigureSuffix,
  QuickCompletionCRUDAssistantConfig,
  QuickCompletionCRUDAssistantImpl,
  QuickCompletionCRUDAssistantResponse,
  TriggerResult,
  customTrigger
} from "./impl";

/**
 *
 *
 *  请求帮助函数 自动生成CURD函数，可扩展
 *
 * @example
 * ```ts
 *
 * const CRUD = new QuickCompletionCRUDAssistant().setURL("url").setTriggeredRequestFunction(httpHandler).trigger((fn, url) => {
 *     return {
 *         page() {
 *             return fn({
 *                 url: url + '/page'
 *             })
 *         }
 *     }
 * })
 *
 * // { url: 'url/get' }
 * CRUD.get({ params: { id: 1 } })
 *
 * // { url: 'url/create' }
 * CRUD.create({ params: { id: 1 } })
 *
 * // { url: 'url/delete' }
 * CRUD.del({ params: { id: 1 } })
 *
 * // { url: 'url/put' }
 * CRUD.update({ params: { id: 1 } })
 *
 * // 轻松拓展
 * CRUD.page()
 *
 * ```
 *
 * @public
 */
export class QuickCompletionCRUDAssistant<Req extends object, T extends QuickCompletionCRUDAssistantResponse = QuickCompletionCRUDAssistantResponse> implements QuickCompletionCRUDAssistantImpl<Req, T> {

  constructor(url?: string, configureSuffix?: Partial<ConfigureSuffix>) {
    url && this.setURL(url);
    configureSuffix && this.setConfigureSuffix(configureSuffix);
  }


  private config: QuickCompletionCRUDAssistantConfig = {
    triggerFn: () => {
    },
    url: "",
    configureSuffix: {
      get: "get",
      delete: "delete",
      create: "create",
      update: "update",
      excel: "excel"
    }

  };

  setURL(url: string): this {
    this.config.url = url;
    return this;
  }

  setTriggeredRequestFunction(fn: Function): this {
    this.config.triggerFn = fn;
    return this;
  }

  setConfigureSuffix(config: Partial<ConfigureSuffix>) {
    this.config.configureSuffix = {
      ...this.config.configureSuffix,
      ...config
    };
    return this;
  }


  trigger<Tr extends customTrigger<Req, T>>(config?: Tr): TriggerResult<Req, T> & ReturnType<Tr> {
    const basicTriggerCollection = {
      get: async (req: Req): Promise<T["get"]> => {
        return await this.config.triggerFn({
          url: this.config.url + this.config.configureSuffix.get,
          method: "GET", ...req
        });
      },
      del: async (req: Req): Promise<T["delete"]> => {
        return await this.config.triggerFn({
          url: this.config.url + this.config.configureSuffix.delete,
          method: "DELETE", ...req
        });
      },
      create: async (req: Req): Promise<T["create"]> => {
        return this.config.triggerFn({
          url: this.config.url + this.config.configureSuffix.create,
          method: "POST", ...req
        });
      },
      update: async (req: Req): Promise<T["update"]> => {
        return this.config.triggerFn({
          url: this.config.url + this.config.configureSuffix.update,
          method: "PUT", ...req
        });
      },

      excel: async (req: Req): Promise<T["excel"]> => {
        return await this.config.triggerFn({ url: this.config.url + this.config.configureSuffix.excel, ...req });
      }
    };

    const triggerList: ReturnType<Tr> = (config?.(this.config.triggerFn, this.config.url, basicTriggerCollection) || {}) as ReturnType<Tr>;

    return {
      ...basicTriggerCollection,
      ...triggerList
    };
  }
}


/**
 *
 *
 * 统一请求帮助函数 请求发起函数参数, 配置路由后缀
 *
 *
 * @example
 * ```ts
 * const common = unifyQuickCompletionCRUDAssistant({},()=>{})
 *
 * common().setURL("order").trigger().get({})
 *
 * common().setURL("menu").trigger().get({})
 * ```
 *
 * @param {Partial<ConfigureSuffix>} configureSuffix - 配置路由后缀，不配置则使用默认，配置则覆盖默认
 * @param {Function} triggerFn - 请求发起函数, 用于识别出请求函数参数
 *
 * @public
 */
export function unifyQuickCompletionCRUDAssistant<Req extends object>(configureSuffix: Partial<ConfigureSuffix>, triggerFn: Function) {
  return <Res extends QuickCompletionCRUDAssistantResponse = QuickCompletionCRUDAssistantResponse>() => {
    return new QuickCompletionCRUDAssistant<Req, Res>().setTriggeredRequestFunction(triggerFn).setConfigureSuffix(configureSuffix);
  };
}



