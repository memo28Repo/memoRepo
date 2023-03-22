# `@memo/service`

## 取消请求

```ts
import { describe, expect, it } from 'vitest'
import { ServiceCore, TerminationResult, initializeConfiguration, instantiation, modules } from '@memo/service'
import { RetData } from '@memo/service/plugin'

@instantiation()
@modules({
  interceptorModule: [RetData],
})
@initializeConfiguration({
  baseURL: 'http://localhost:3011',
  debugger: true,
})
class Service extends ServiceCore {}

const server = new Service().getAxios()

describe('cancel collection', () => {
  it('cancel (time out three second)', async () => {
    const terminationResult = new TerminationResult().ConfigurationParameters({
      url: '/timeout',
      params: {
        timeout: '3000',
      },
      pocketValue: 'setTimeout',
    })

    setTimeout(() => {
      terminationResult.terminateTrigger()
    }, 1000)

    const result = await server<string>(terminationResult.getConfiguration())

    expect(result).toBe('setTimeout')
  })
})


```

## 请求兜底

```ts
import { describe, expect, it } from 'vitest'
import { ServiceCore, initializeConfiguration, instantiation, modules } from '@memo/service'
import { RetData, MultiVersionSwitching } from '@memo/service'

@instantiation()
@modules({
  interceptorModule: [RetData, MultiVersionSwitching],
})
@initializeConfiguration({
  baseURL: 'http://localhost:100/base',
  versionPlaceholder: 'base',
  version: 'v1',
})
class Service extends ServiceCore {}

const axi = new Service().getAxios()

describe('pocket value test', () => {
  it('bad port', async () => {
    const result = await axi<string>({
      url: '/hello',
      pocketValue: '/v1/hello',
      version: 'v2',
      method: 'get',
    })

    expect(result).toBe('/v1/hello')
  })
})


```

## 版本切换

```ts
import { describe, expect, it } from 'vitest'
import { ServiceCore, initializeConfiguration, instantiation, modules } from '@memo/service'
import { MultiVersionSwitching, RetData } from '@memo/service/plugin'

@instantiation()
@modules({
  interceptorModule: [RetData, MultiVersionSwitching], // MultiVersionSwitching Plug-in is used to quickly switch version number
})
@initializeConfiguration({
  baseURL: 'http://localhost:3011/baseVersion',
  debugger: true,
  versionPlaceholder: 'baseVersion', // used to replace the version placeholder on the baseURL
  version: 'v1', // replace the version placeholder with v1
})
class Service extends ServiceCore {}

const axi = new Service().getAxios()

describe('switch version', () => {
  it('switch to v1 version', async () => {
    const result = await axi<string>({
      url: '/hello',
      method: 'get',
    })
    expect(result).toBe('/v1/hello')
  })
})


```

## 缓存

```ts
import { describe, expect, it } from 'vitest'
import { ServiceCore, initializeConfiguration, instantiation, modules } from '@memo/service'
import { Cache, CacheTrigger, ExpirationTime, RetData, requestConfig } from '@memo/service/plugin'

@instantiation()
@modules({
  interceptorModule: [Cache, RetData],
  triggerInterceptor: [CacheTrigger],
})
@initializeConfiguration<requestConfig>({
  baseURL: 'http://localhost:3011',
  debugger: true,
})
class Service extends ServiceCore<requestConfig> {}

const axi = new Service().getAxios()

describe('cache collection', async () => {
  it('onec http', async () => {
    const result = await axi({
      url: '/hello',
      params: {
        data: 'hello',
      },
      cacheExpirationTime: new ExpirationTime('min', 1).generateExpirationTime(),
    })
    expect(result).toBe('hello')
  })

  it('cache http', async () => {
    // 取缓存的值 因缓存未过期
    const result = await axi({
      url: '/hello',
      params: {
        data: 'hello',
      },
      useCache: true,
    })
    expect(result).toBe('hello')
  })
})

```

## 不兼容装饰器？ 试试 `ServiceUtils`

```ts
import { ServiceUtils } from '@memo28/utils'
const serviceUtils = new ServiceUtils()
      .modules({
        interceptorModule: [RetData, MultiVersionSwitching],
      })
      .initializeConfiguration({
        baseURL: 'http://localhost:100/base',
        versionPlaceholder: 'base',
        version: 'v1',
      })
      .instantiation()
      .getAxios()

serviceUtils<string>({
  url: ''
})
```


- ~~取消请求~~

- ~~用插件的形式使用拦截器~~

- ~~请求兜底~~

- ~~版本切换~~