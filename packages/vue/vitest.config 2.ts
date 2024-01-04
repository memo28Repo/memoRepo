/*
 * @Author: @memo28.repo
 * @Date: 2023-12-19 17:11:01
 * @LastEditTime: 2023-12-19 17:11:03
 * @Description: 
 * @FilePath: /memo/packages/vue/vitest.config.ts
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
