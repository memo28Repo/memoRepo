/*
 * @Author: 邱狮杰
 * @Date: 2023-01-13 14:35:14
 * @LastEditTime: 2023-05-12 22:59:04
 * @Description:
 * @FilePath: /memo/packages/service/__test__/cancel.test.ts
 */

import { describe, expect, it } from 'vitest'
import { ServiceUtils, ServiceCore, TerminationResult, initializeConfiguration, instantiation, modules } from '../src/index'
import { RetData } from '../src/plugin'

// @ts-ignore
@instantiation()
// @ts-ignore
@modules({
  interceptorModule: [RetData],
})
// @ts-ignore
@initializeConfiguration({
  baseURL: 'http://localhost:3011',
  debugger: false,
})
class Service extends ServiceCore { }

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

  it('cancel (time out three second) for serviceUtils', async () => {
    const serviceUtils = new ServiceUtils()
      .modules({
        interceptorModule: [RetData],
      })
      .initializeConfiguration({
        baseURL: 'http://localhost:3011',
        debugger: true,
      })
      .instantiation()
      .getAxios()
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

    const result = await serviceUtils<string>(terminationResult.getConfiguration())
    expect(result).toBe('setTimeout')
  })
})
