/*
 * @Author: @memo28.repo
 * @Date: 2023-12-19 17:10:37
 * @LastEditTime: 2023-12-19 17:12:12
 * @Description: 
 * @FilePath: /memo/packages/logs/vitest.config.ts
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
