/*
 * @Author: 邱狮杰
 * @Date: 2023-01-09 17:04:41
 * @LastEditTime: 2023-01-13 14:34:22
 * @Description:
 * @FilePath: /memo/packages/service/__test__/versionSwitching.test.ts
 */

import { describe, expect, it } from 'vitest'
import { ServiceCore, initializeConfiguration, instantiation, modules } from '../src/index'
import { MultiVersionSwitching, RetData } from '../src/plugin'

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
