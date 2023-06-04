/*
 * @Author: 邱狮杰
 * @Date: 2023-06-04 10:01:34
 * @LastEditTime: 2023-06-04 10:58:15
 * @Description: 
 * @FilePath: /memo/packages/serviceHelper/src/quickCompletionCRUDAssistant/index.ts
 */
import { customTrigger, QuickCompletionCRUDAssistantConfig, ConfigureSuffix, QuickCompletionCRUDAssistantImpl, QuickCompletionCRUDAssistantResponse, TriggerResult } from './impl'



export class QuickCompletionCRUDAssistant<Req extends object, T extends QuickCompletionCRUDAssistantResponse = QuickCompletionCRUDAssistantResponse> implements QuickCompletionCRUDAssistantImpl<Req, T> {


    constructor(url?: string, configureSuffix?: Partial<ConfigureSuffix>) {
        url && this.setURL(url)
        configureSuffix && this.setConfigureSuffix(configureSuffix)
    }


    private config: QuickCompletionCRUDAssistantConfig = {
        triggerFn: () => { },
        url: '',
        configureSuffix: {
            get: 'get',
            delete: 'delete',
            create: 'create',
            update: 'update',
            excel: 'excel'
        }

    }

    setURL(url: string): this {
        this.config.url = url
        return this
    }

    setTriggeredRequestFunction(fn: Function): this {
        this.config.triggerFn = fn
        return this
    }

    setConfigureSuffix(config: Partial<ConfigureSuffix>) {
        this.config.configureSuffix = {
            ...this.config.configureSuffix,
            ...config
        }
        return this
    }


    trigger<Tr extends customTrigger<Req, T>>(config?: Tr): TriggerResult<Req, T> & ReturnType<Tr> {
        const basicTriggerCollection = {
            get: (req: Req): T['get'] => {
                return this.config.triggerFn({ url: this.config.url + this.config.configureSuffix.get, method: "GET", ...req })
            },
            del: (req: Req): T['delete'] => {
                return this.config.triggerFn({ url: this.config.url + this.config.configureSuffix.delete, method: "DELETE", ...req })
            },
            create: (req: Req): T['create'] => {
                return this.config.triggerFn({ url: this.config.url + this.config.configureSuffix.create, method: "POST", ...req })
            },
            update: (req: Req): T['update'] => {
                return this.config.triggerFn({ url: this.config.url + this.config.configureSuffix.update, method: "PUT", ...req })
            },

            excel: (req: Req): T['excel'] => {
                return this.config.triggerFn({ url: this.config.url + this.config.configureSuffix.excel, ...req })
            },
        }

        const triggerList: ReturnType<Tr> = (config?.(this.config.triggerFn, this.config.url, basicTriggerCollection) || {}) as ReturnType<Tr>

        return {
            ...basicTriggerCollection,
            ...triggerList
        }
    }
}

export function unifyQuickCompletionCRUDAssistant<Req extends object>(configureSuffix: Partial<ConfigureSuffix>, triggerFn: Function) {
    return () => {
        return new QuickCompletionCRUDAssistant<Req>().setTriggeredRequestFunction(triggerFn).setConfigureSuffix(configureSuffix)
    }
}


