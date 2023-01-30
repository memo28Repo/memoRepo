/*
 * @Author: 邱狮杰
 * @Date: 2023-01-08 12:18:55
 * @LastEditTime: 2023-01-19 20:06:42
 * @Description:
 * @FilePath: /memo/packages/service/__test__/init.test.ts
 */

import { expect, it } from 'vitest'
import { ServiceCore, initializeConfiguration, instantiation, modules } from '../src/index'
import { RetData } from '../src/plugin'

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

it('init service', async () => {
  const result = await server<string>({
    url: '/hello',
    params: {
      data: 'hello! @memo/service',
    },
    pocketValue: 'hello! @memo/service',
  })

  expect(result).toBe('hello! @memo/service')
})
