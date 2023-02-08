# `@memo28/vite-plugin-mete`

通过配置的方式生成制定`meta`标签并添加在页面上

## usage

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vitePluginMetes from 'vite-plugin-meta'

export default defineConfig({
     plugins: [vitePluginMetes({
       ...opts
     })]
})

// or

import { Engine } from '@memo28/vitebuild'
import { defineConfig } from 'vite'

const config = new Engine().setTechnologyStack('vue').addPlugins(
  (plugin) => {
    // 添加额外插件配置
    plugin.addHTMLMeta({
      // 页面加载后间隔5秒跳转至url配置处
      // refreshJump: {
      //   timeout: 5,
      //   url: "https://www.baidu.com"
      // }
    })
  }
).getBuildConfig({
  plugins: []
})

export default defineConfig({
     ...config
})
```

## `refreshJump`

  刷新跳转

```ts
const config = new Engine().setTechnologyStack('vue').addPlugins(
  (plugin) => {
    // 添加额外插件配置
    plugin.addHTMLMeta({
      // 页面加载后间隔5秒跳转至url配置处
      refreshJump: {
        timeout: 5,
        url: "https://www.baidu.com"
      }
    })
  }
).getBuildConfig()
```

## `xDnsPrefetchControl`
  
  一般来说，`HTML`页面中的`a`标签会自动启用DNS提前解析来提升网站性能，但是在使用`https`协议的网站中失效了，我们可以设置：来打开`dns`对`a`标签的提前解析

```ts
const config = new Engine().setTechnologyStack('vue').addPlugins(
  (plugin) => {
    // 添加额外插件配置
    plugin.addHTMLMeta({
       xDnsPrefetchControl: true
    })
  }
).getBuildConfig()
```

## `author`

  用来表示网页的作者的名字，例如某个组织或者机构

  ```ts
const config = new Engine().setTechnologyStack('vue').addPlugins(
  (plugin) => {
    // 添加额外插件配置
    plugin.addHTMLMeta({
     author: '@memo28'
    })
  }
).getBuildConfig()
  ```

## `keywords`

  与页面内容相关的关键词，使用逗号分隔。某些搜索引擎在遇到这些关键字时，会用这些关键字对文档进行分类。 还是以头条和`taobao`为例

  ```ts
const config = new Engine().setTechnologyStack('vue').addPlugins(
  (plugin) => {
    // 添加额外插件配置
    plugin.addHTMLMeta({
      keywords: 'javascript,typescript'
    })
  }
).getBuildConfig()
  ```

## `tencentQq`

  腾讯qq相关

### `forcedVerticalScreen`

  强制竖屏

  ```ts
const config = new Engine().setTechnologyStack('vue').addPlugins(
  (plugin) => {
    // 添加额外插件配置
    plugin.addHTMLMeta({
      tencentQq: {
          forcedVerticalScreen: true
      }
    })
  }
).getBuildConfig()
  ```

### `fullscreen`

  强制全屏

  ```ts
const config = new Engine().setTechnologyStack('vue').addPlugins(
  (plugin) => {
    // 添加额外插件配置
    plugin.addHTMLMeta({
      tencentQq: {
          fullscreen: true
      }
    })
  }
).getBuildConfig()
  ```

### `appMode`

  QQ应用模式

  ```ts
const config = new Engine().setTechnologyStack('vue').addPlugins(
  (plugin) => {
    // 添加额外插件配置
    plugin.addHTMLMeta({
      tencentQq: {
          appMode: true
      }
    })
  }
).getBuildConfig()
  ```

## `apple`

  苹果相关

### `appleItunesApp`

 在网页上方显示一个app banner，提供app store下载

```ts
const config = new Engine().setTechnologyStack('vue').addPlugins(
  (plugin) => {
    // 添加额外插件配置
    plugin.addHTMLMeta({
      apple: {
          appleItunesApp: {
            appId: '',
            affiliateId: '',
            someText: '',
          }
      }
    })
  }
).getBuildConfig()
```

### `appleTitle`

 添加到主屏后的标题

```ts
const config = new Engine().setTechnologyStack('vue').addPlugins(
  (plugin) => {
    // 添加额外插件配置
    plugin.addHTMLMeta({
      apple: {
        appleTitle: ""
      }
    })
  }
).getBuildConfig()
```
