/*
 * @Author: 邱狮杰
 * @Date: 2023-01-15 11:32:44
 * @LastEditTime: 2023-01-16 10:06:54
 * @Description:
 * @FilePath: /memo/packages/service/__test__/cache.test.ts
 */

import { describe, expect, it } from 'vitest'
import { ServiceCore, initializeConfiguration, instantiation, modules } from '../src/index'
import { Cache, CacheTrigger, ExpirationTime, RetData, requestConfig } from '../src/plugin'

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
