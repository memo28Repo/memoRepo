let timer = 0;
/**
 *
 *
 * `loading` 模块拦截器
 *
 * @remarks
 * 当你的请求频繁触发 则不建议 配置该模块 因为视图会频繁 `loading`
 *
 * @public
 *
 */
export class Loading {
    requestSuc(config) {
        if (!config.onStartLoading && !config.onHideLoading)
            return config;
        timer = setTimeout(() => {
            var _a;
            (_a = config.onStartLoading) === null || _a === void 0 ? void 0 : _a.call(config);
        }, (config === null || config === void 0 ? void 0 : config.loadingDelay) || 600);
        return config;
    }
    requestFail(error) {
        clearTimeout(timer);
        return error;
    }
    responseSuc(response) {
        var _a;
        (_a = Reflect.get(response.config, 'onHideLoading')) === null || _a === void 0 ? void 0 : _a();
        clearTimeout(timer);
        return response;
    }
    responseFail(error) {
        clearTimeout(timer);
    }
}
