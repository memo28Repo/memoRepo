<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@memo28/utils](./utils.md) &gt; [AnomalousChain](./utils.anomalouschain.md)

## AnomalousChain class

处理错误class, 将错误封装到该类中，从类中获取操作错误的方法

**Signature:**

```typescript
export declare class AnomalousChain 
```

## Remarks


## Example

class A extends AnomalousChain {<!-- -->}

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [getErrors()](./utils.anomalouschain.geterrors.md) | <code>protected</code> |  获取错误 |
|  [recover()](./utils.anomalouschain.recover.md) | <code>protected</code> |  将错误置空 |
|  [setErrors(err)](./utils.anomalouschain.seterrors.md) | <code>protected</code> |  设置错误值 |
|  [skip(errors)](./utils.anomalouschain.skip.md) | <code>protected</code> |  当发生错误时 被 panicProcessing 装饰器包裹的方法会停止执行并且 调用该 skip 函数 |
