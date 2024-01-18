/**
 * 多版本拦截器
 *
 *
 * @remarks
 * ```ts
 * @instantiation()
 * @modules({
 *   interceptorModule: [RetData, MultiVersionSwitching], // MultiVersionSwitching Plug-in is used to quickly switch version number
 * })
 * @initializeConfiguration({
 *   baseURL: 'http://localhost:3011/baseVersion',
 *   debugger: false,
 *   versionPlaceholder: 'baseVersion', // used to replace the version placeholder on the baseURL
 *   version: 'v1', // replace the version placeholder with v1
 * })
 * class Service extends ServiceCore { }
 *
 * const http = new Service().getAxios()
 *
 *
 * http({
 *  version: 'v2' // used v1 version http
 * })
 * ```
 *
 *
 * @public
 */
export class MultiVersionSwitching {
    constructor() {
        this.displayName = "multiVersionSwitching";
        this.versionPlaceholder = "";
        //  private baseURL: string = ''
        //
        this.originalBaseURL = "";
    }
    /**
     * 修改版本号占位符
     *
     * @param { string } pl -  占位符
     *
     * @private
     *
     * @public
     */
    setVersionPlaceholder(pl) {
        this.versionPlaceholder = pl;
        return this;
    }
    /**
     *
     *
     * 设置基础路由
     *
     * @param { string } URL -  基础路由
     *
     * @private
     *
     * @public
     */
    setBaseURL(URL) {
        this.originalBaseURL = URL;
    }
    /**
     * 根据占位符 替换为 版本号
     *
     *
     * @param { string }  baseURL - 路哟
     *
     * @param { string } repl - 根据占位符替换
     *
     *
     * @private
     *
     * @public
     */
    replaceVersionPlaceholder(baseURL, repl) {
        return baseURL.replace(new RegExp(this.versionPlaceholder, "g"), repl);
    }
    /**
     *
     *
     * 获取原基础路由
     *
     * @private
     *
     * @public
     */
    getOriginalBaseURL() {
        return this.originalBaseURL;
    }
    /**
     * 请求成功
     *
     * @public
     *
     */
    requestSuc(value) {
        this.setVersionPlaceholder(value.versionPlaceholder);
        this.setBaseURL(value.baseURL);
        const baseURL = value.version ? this.replaceVersionPlaceholder(this.getOriginalBaseURL(), value.version) : value.baseURL;
        return Object.assign(Object.assign({}, value), { baseURL });
    }
}
