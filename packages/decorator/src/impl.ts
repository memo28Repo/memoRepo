/*
 * @Author: @memo28.repo
 * @Date: 2025-04-04 11:45:21
 * @LastEditTime: 2025-04-05 13:16:59
 * @Description: 
 * @FilePath: /memoRepo/packages/decorator/src/impl.ts
 */
import { metadata, retentionPolicy, targetType } from "./index";

export interface DecoratorOptions {
  target: any;
  propertyKey?: string | symbol;
  descriptor?: PropertyDescriptor;
  parameterIndex?: number;
}

export abstract class DecoratorImpl<T, R = unknown> {
  abstract onBefore?(options: T & DecoratorOptions): void;

  /**
   *
   * - method 方法装饰器
   *   会将结果返回传入 result
   *
   *
   * @param result
   * @param options
   */
  abstract onAfter?(result: R, options: T & DecoratorOptions): void;

  abstract onThrow?(error: Error, options: T & DecoratorOptions): void;

  abstract onSource?(): void

  getTarget(): string[] {
    return Reflect.getMetadata(metadata.target, this);
  }

  getRetention(): string[] {
    return Reflect.getMetadata(metadata.retention, this);
  }


  /**
   *
   * class 装饰器
   *
   * @returns
   */
  asClassDecorator(config?: T): ClassDecorator {
    if (!this.getTarget().includes(targetType.class)) return (target: object) => {
    };
    if (this.getRetention().includes(retentionPolicy.source)) {
      this.onSource?.();
    }
    ;
    const that = this;
    return (target: Function) => {
      if (!this.getRetention().includes(retentionPolicy.runtime)) return;
      const context: DecoratorOptions = {
        target: this
      };
      try {
        // @ts-ignore
        that.onBefore?.({ ...context, ...config });
      } catch (error) {
        // @ts-ignore
        that.onThrow?.(error, { ...context, ...config });
      }
    };
  }


  /**
   * 参数装饰
   *
   * @public
   */
  asParameterDecorator(config?: T): ParameterDecorator {
    if (!this.getTarget().includes(targetType.parameter)) return (target: object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
    };
    if (this.getRetention().includes(retentionPolicy.source)) {
      this.onSource?.();
    }
    ;
    const that = this;
    return (target: object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
      if (!this.getRetention().includes(retentionPolicy.runtime)) return;
      const context: DecoratorOptions = {
        target: this,
        propertyKey,
        parameterIndex: parameterIndex
      };
      try {
        // @ts-ignore
        that.onBefore?.({ ...context, ...config });
      } catch (error) {
        // @ts-ignore
        that.onThrow?.(error, { ...context, ...config });
      }
    };
  }


  asPropertyDecorator(config?: T): PropertyDecorator {
    if (!this.getTarget().includes(targetType.property)) return (target: object, propertyKey: string | symbol) => {
    };
    if (this.getRetention().includes(retentionPolicy.source)) {
      this.onSource?.();
    }
    ;
    const that = this;
    return (target: object, propertyKey: string | symbol) => {
      if (!this.getRetention().includes(retentionPolicy.runtime)) return;
      const context: DecoratorOptions = {
        target: this,
        propertyKey
      };

      try {
        // @ts-ignore
        that.onBefore?.({ ...context, ...config });
      } catch (error) {
        // @ts-ignore
        that.onThrow?.(error, { ...context, ...config });
      }
    };
  }

  /**
   *
   * 返回一个方法装饰器
   *
   * @param config
   * @returns
   */
  asMethodDecorator(config?: T): MethodDecorator {
    if (!this.getTarget().includes(targetType.method)) return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    };

    if (this.getRetention().includes(retentionPolicy.source)) {
      this.onSource?.();
    }
    ;
    const that = this;
    return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
      if (!this.getRetention().includes(retentionPolicy.runtime)) return;
      const originalMethod = descriptor.value;

      descriptor.value = async function(...args: any[]) {
        const context: DecoratorOptions = {
          target: this,
          propertyKey,
          descriptor
        };

        try {
          // @ts-ignore
          that.onBefore?.({ ...context, ...config });
          if (originalMethod[Symbol.toStringTag] === "AsyncFunction") {
            const result = await originalMethod.apply(this, args);
            // @ts-ignore
            that.onAfter?.(result, { ...context, ...config });
            return result;
          }

          const noPromiseResult = originalMethod.apply(this, args);
          // @ts-ignore
          that.onAfter?.(noPromiseResult, { ...context, ...config });

          return noPromiseResult;
        } catch (error) {
          // @ts-ignore
          that.onThrow?.(error, { ...context, ...config });
        }
      };

      return descriptor;
    };
  }
}