/*
 * @Author: @memo28.repo
 * @Date: 2023-12-19 17:10:55
 * @LastEditTime: 2023-12-19 17:11:59
 * @Description: 
 * @FilePath: /memo/packages/utils/vitest.config.ts
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
