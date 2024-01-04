/*
 * @Author: @memo28.repo
 * @Date: 2023-12-19 17:06:30
 * @LastEditTime: 2023-12-19 17:10:17
 * @Description: 
 * @FilePath: /memo/vite/viteBuild/vitest.config.ts
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
