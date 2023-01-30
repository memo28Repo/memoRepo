"use strict";
/*
 * @Author: 邱狮杰
 * @Date: 2023-01-09 17:04:41
 * @LastEditTime: 2023-01-13 14:34:22
 * @Description:
 * @FilePath: /memo/packages/service/__test__/versionSwitching.test.ts
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const index_1 = require("../src/index");
const plugin_1 = require("../src/plugin");
let Service = class Service extends index_1.ServiceCore {
};
Service = __decorate([
    (0, index_1.instantiation)(),
    (0, index_1.modules)({
        interceptorModule: [plugin_1.RetData, plugin_1.MultiVersionSwitching], // MultiVersionSwitching Plug-in is used to quickly switch version number
    }),
    (0, index_1.initializeConfiguration)({
        baseURL: 'http://localhost:3011/baseVersion',
        debugger: true,
        versionPlaceholder: 'baseVersion',
        version: 'v1', // replace the version placeholder with v1
    })
], Service);
const axi = new Service().getAxios();
(0, vitest_1.describe)('switch version', () => {
    (0, vitest_1.it)('switch to v1 version', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield axi({
            url: '/hello',
            method: 'get',
        });
        (0, vitest_1.expect)(result).toBe('/v1/hello');
    }));
});
