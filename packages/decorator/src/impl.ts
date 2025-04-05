/*
 * @Author: @memo28.repo
 * @Date: 2025-04-04 11:45:21
 * @LastEditTime: 2025-04-05 12:43:34
 * @Description: 
 * @FilePath: /memoRepo/packages/decorator/src/impl.ts
 */
import { metadata, retentionPolicy, targetType } from './index';

export interface DecoratorOptions {
    target: any;
    propertyKey?: string | symbol;
    descriptor?: PropertyDescriptor;
}

export abstract class DecoratorImpl<T = any> {
    abstract onBefore?(options: T & DecoratorOptions): void;
    abstract onAfter?(result: any, options: T & DecoratorOptions): void;
    abstract onThrow?(error: Error, options: T & DecoratorOptions): void;
    abstract onSource?(): void

    getTarget(): string[] {
        return Reflect.getMetadata(metadata.target, this)
    }

    getRetention(): string[] {
        return Reflect.getMetadata(metadata.retention, this)
    }

    // 关键：创建方法装饰器
    asMethodDecorator(config?: T): MethodDecorator {
        if (!this.getTarget().includes(targetType.method)) return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        }

        if (this.getRetention().includes(retentionPolicy.source)) {
            this.onSource?.();
        };
        const that = this
        return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
            if (!this.getRetention().includes(retentionPolicy.runtime)) return;
            const originalMethod = descriptor.value;

            descriptor.value = async function (...args: any[]) {
                const context: DecoratorOptions = {
                    target: this,
                    propertyKey,
                    descriptor
                };

                try {
                    // @ts-ignore
                    that.onBefore?.({ ...context, ...config });
                    const result = await originalMethod.apply(this, args);
                    // @ts-ignore
                    that.onAfter?.(result, { ...context, ...config });
                    return result;
                } catch (error) {
                    // @ts-ignore
                    that.onThrow?.(error, { ...context, ...config });
                    throw error;
                }
            };

            return descriptor;
        };
    }
}