/*
 * @Author: 邱狮杰
 * @Date: 2023-01-13 14:35:14
 * @LastEditTime: 2023-01-15 10:48:53
 * @Description:
 * @FilePath: /memo/packages/service/__test__/cancel.test.ts
 */

import { describe, expect, it } from 'vitest'
import { ServiceCore, TerminationResult, initializeConfiguration, instantiation, modules } from '../src/index'
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
