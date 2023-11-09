import { Errors, Panic, readingWritingSeparationUtilsType, readingWritingSeparationDetor } from "@memo28/utils";
import { fn } from "@memo28/types";

export type enableConfigurationTypes<T extends any> = boolean | T | undefined


/**
 *
 * 绑定配置 所需参数
 * 该 class 假设配置为 bool ｜ T
 *
 *
 * 当 配置参数 为 false 时则忽略 配置流程
 * 而 配置参数 为 true  时 则绑定默认配置 即 `defaultConfig` 字段
 * 当 配置参数 为 配置对象时 则绑定该配置
 *
 * @paramType T - 配置类型 非 bool 类型
 *
 *
 * @paramType R - 绑定配置函数的返回值 即 `bindConfiguredFunc` 的 `return value`
 *
 * @public
 *
 */
export class EnableConfiguration<T = any, R = any> {

  /**
   *
   *
   * 绑定配置对象的函数
   *
   *  bindConfiguredFunc(true | false | config)
   *
   * @public
   *
   */
  @readingWritingSeparationDetor
  bindConfiguredFunc?: fn<[enableConfigurationTypes<T>], R>;


  /**
   *
   *
   * 默认配置 当配置入参为 true 时生效
   *
   * @public
   *
   */
  @readingWritingSeparationDetor
  defaultConfig?: enableConfigurationTypes<T>;
}


/**
 *
 *
 *
 * 核心逻辑流程见 {@link EnableConfiguration}
 *
 * @public
 */
export class BindingConfiguration<T = any, R = any | undefined> {

  constructor(private config: readingWritingSeparationUtilsType<EnableConfiguration<T, R>>, private params?: enableConfigurationTypes<T>) {

  }

  /**
   *
   * 当传参 为 `true` 时
   *
   * 返回  {@link EnableConfiguration.bindConfiguredFunc} 参数 本身
   *
   * @public
   *
   */
  returnItSelf(): Panic<fn | undefined> {
    if (this.params === undefined) {
      return [false, this.config.getBindConfiguredFunc];
    }
    if (this.params === true) {
      return [false, this.config.getBindConfiguredFunc];
    }
    if (this.params === false) {
      return [Errors.New("配置流程终止"), undefined];
    }
    return [Errors.New("配置流程终止"), undefined];
  }


  /**
   *
   *
   * 核心逻辑流程见 {@link EnableConfiguration}
   *
   * @public
   *
   */
  trigger(): Panic<R | undefined> {
    if (this.params === undefined) {
      return [false, this.config.getBindConfiguredFunc()(this.config.getDefaultConfig())];
    }
    if (this.params === true) {
      return [false, this.config.getBindConfiguredFunc()(this.config.getDefaultConfig())];
    }
    if (this.params !== false) {
      return [false, this.config.getBindConfiguredFunc()(this.params)];
    }
    return [Errors.New("参数不合法，将无法被应用"), undefined];
  }
}
