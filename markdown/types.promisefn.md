<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@memo28/types](./types.md) &gt; [promiseFn](./types.promisefn.md)

## promiseFn type

定义一个`promise`<!-- -->函数

**Signature:**

```typescript
export declare type promiseFn<P extends any[] = any, R = unknown> = (...args: P) => Promise<R>;
```

## Example


```ts
type f = fn<[number,string],void> // (number,string) => Promise<void>
```

