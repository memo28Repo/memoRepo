/*
 * @Author: 邱狮杰
 * @Date: 2023-01-09 17:04:41
 * @LastEditTime: 2023-03-22 10:37:11
 * @Description:
 * @FilePath: /memo/packages/service/__test__/versionSwitching.test.ts
 */

import { describe, expect, it } from 'vitest'
import { ServiceCore, initializeConfiguration, instantiation, modules, ServiceUtils } from '../src/index'
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

  it('switch to v1 version for serviceUtils', async () => {
    const serviceUtils = new ServiceUtils()
      .modules({
        interceptorModule: [RetData, MultiVersionSwitching],
      })
      .initializeConfiguration({
        baseURL: 'http://localhost:3011/baseVersion',
        debugger: true,
        versionPlaceholder: 'baseVersion',
        version: 'v1',
      })
      .instantiation()
      .getAxios()

    const result = await serviceUtils<string>({
      url: '/hello',
      method: 'get',
    })

    expect(result).toBe('/v1/hello')
  })
})
