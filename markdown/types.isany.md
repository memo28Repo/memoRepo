<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@memo28/types](./types.md) &gt; [IsAny](./types.isany.md)

## IsAny type

`0 extends 1` 永远返回`false`<!-- -->, (`0` 不可分配给 `1`<!-- -->), 因此`0 extends (1 & T)` 也不会满足,因为 `( 1 & T)` 比 `1` 的类型范围 更窄 . 但是当`T` 是 `any` 时 , 由于 `any` 是故意不健全的类型(顶级类型), 并且充当了几乎所有其他类型的超类型和子类型, 因此比较`any`<!-- -->时其他类型会被忽略 就变成了 `0 extends any`<!-- -->, 自然返回 `true`<!-- -->. 需要注意的时这仅仅适用 `strictNullChecks` 启用 (默认启用)

**Signature:**

```typescript
export declare type IsAny<T> = 0 extends 1 & T ? true : false;
```
