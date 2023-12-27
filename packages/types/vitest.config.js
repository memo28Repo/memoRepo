"use strict";
/*
 * @Author: @memo28.repo
 * @Date: 2023-12-19 17:10:48
 * @LastEditTime: 2023-12-19 17:12:04
 * @Description:
 * @FilePath: /memo/packages/types/vitest.config.ts
 */
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("vitest/config");
exports.default = (0, config_1.defineConfig)({
    test: {
        environmentOptions: {
            jsdom: {},
        },
        environment: 'jsdom',
    },
});
