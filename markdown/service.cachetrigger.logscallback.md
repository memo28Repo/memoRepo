<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@memo28/service](./service.md) &gt; [CacheTrigger](./service.cachetrigger.md) &gt; [logsCallback](./service.cachetrigger.logscallback.md)

## CacheTrigger.logsCallback() method

触发缓存前后置回调后的 `log` 回调

**Signature:**

```typescript
logsCallback(type: "afterTrigger" | "beforeTrigger", data: void | initializeConfigurationTypes | beforeTriggerResultTypes<unknown>): void;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  type | "afterTrigger" \| "beforeTrigger" | 前后置触发拦截器类型 |
|  data | void \| [initializeConfigurationTypes](./service.initializeconfigurationtypes.md) \| [beforeTriggerResultTypes](./service.beforetriggerresulttypes.md)<!-- -->&lt;unknown&gt; | 传递的参数 |

**Returns:**

void

