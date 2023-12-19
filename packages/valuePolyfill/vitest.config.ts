/*
 * @Author: @memo28.repo
 * @Date: 2023-12-19 17:10:59
 * @LastEditTime: 2023-12-19 17:11:00
 * @Description: 
 * @FilePath: /memo/packages/valuePolyfill/vitest.config.ts
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
