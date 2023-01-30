/*
 * @Author: 邱狮杰
 * @Date: 2023-01-08 12:08:25
 * @LastEditTime: 2023-01-18 17:16:18
 * @Description:
 * @FilePath: /memo/packages/service/vitest.config.ts
 */

import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    threads: true,
    environmentOptions: {
      jsdom: {},
    },
    environment: 'jsdom',
  },
})
