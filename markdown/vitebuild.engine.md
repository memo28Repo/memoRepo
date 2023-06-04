<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@memo28/vitebuild](./vitebuild.md) &gt; [Engine](./vitebuild.engine.md)

## Engine class

自带了 `vue` 和 `react` 的默认配置 和一些公共的通用插件

**Signature:**

```typescript
export declare class Engine 
```

## Example

`vue` 默认配置 - `jsx` - `legacy` - `printURL` - `vueMarcos`

`react` 默认配置 - `legacy` - `reactSwc` - `printURL`

```ts
new Engine()
 启动`vue`默认配置
.setTechnologyStack('vue')
 //  添加常用插件
.addPlugins(plugin => {    plugin.addAutoHooks()  })
.getBuildConfig({
 //   `vite` 配置
   root:''
})
```

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [addPlugins(cb)](./vitebuild.engine.addplugins.md) |  |  添加插件 |
|  [getBuildConfig(config)](./vitebuild.engine.getbuildconfig.md) |  |  获取配置 |
|  [setTechnologyStack(technology)](./vitebuild.engine.settechnologystack.md) |  |  选择技术栈 注入默认插件 |
