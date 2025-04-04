/*
 * @Author: @memo28.repo
 * @Date: 2025-01-19 22:36:54
 * @LastEditTime: 2025-01-19 22:47:28
 * @Description: 
 * @FilePath: /memoRepo/packages/nullSafety/src/vite/index.ts
 */

// @ts-ignore
import type { Plugin } from 'vite';

export default {
    name: '@memo28/null-safety',
    transform(code: string, id: string) {
        console.log(code, id);
        return code;
    },
} as Plugin
