/*
 * @Author: 邱狮杰
 * @Date: 2023-01-08 12:18:55
 * @LastEditTime: 2023-04-28 21:32:30
 * @Description:
 * @FilePath: /memo/packages/service/__test__/init.test.ts
 */

import { expect, it } from 'vitest'
import { ServiceUtils, ServiceCore, initializeConfiguration, instantiation, modules } from '../src/index'
import { RetData } from '../src/plugin'

@instantiation()
@modules({
  interceptorModule: [RetData],
})
@initializeConfiguration({
  baseURL: 'http://localhost:3011',
  debugger: false,
})
class Service extends ServiceCore {}

const server = new Service().getAxios()

it('init service', async () => {
  const result = await server<string>({
    url: '/hello',
    params: {
      data: 'hello! @memo/service',
    },
    pocketValue: 'hello! @memo/service',
  })

  console.log(result, 'result')

  expect(result).toBe('hello! @memo/service')
})

it('init serviceUtils', async () => {
  const serviceUtils = new ServiceUtils()
    .modules({ interceptorModule: [RetData] })
    .initializeConfiguration({
      baseURL: 'http://localhost:3011',
      debugger: true,
    })
    .instantiation()
    .getAxios()

  const result = await serviceUtils<string>({
    url: '/hello',
    params: {
      data: 'hello! @memo/service',
    },
    pocketValue: 'hello! @memo/service',
  })

  expect(result).toBe('hello! @memo/service')
})
