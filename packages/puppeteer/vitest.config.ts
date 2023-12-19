/*
 * @Author: @memo28.repo
 * @Date: 2023-12-19 17:10:32
 * @LastEditTime: 2023-12-19 17:12:21
 * @Description: 
 * @FilePath: /memo/packages/puppeteer/vitest.config.ts
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
