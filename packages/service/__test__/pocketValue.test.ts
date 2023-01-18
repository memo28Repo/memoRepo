/*
 * @Author: 邱狮杰
 * @Date: 2023-01-09 17:55:11
 * @LastEditTime: 2023-01-13 14:23:58
 * @Description: pocketValue 兜底值
 * @FilePath: /service/__test__/pocketValue.test.ts
 */
import { describe, expect, it } from 'vitest'
import { ServiceCore, initializeConfiguration, instantiation, modules } from '../src/index'
import { RetData, MultiVersionSwitching } from '../src/plugin'

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
