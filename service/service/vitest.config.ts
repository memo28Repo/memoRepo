/*
 * @Author: 邱狮杰
 * @Date: 2023-01-08 12:08:25
 * @LastEditTime: 2023-12-19 17:10:24
 * @Description:
 * @FilePath: /memo/service/service/vitest.config.ts
 */

import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environmentOptions: {
      jsdom: {},
    },
    environment: 'jsdom',
  },
})
