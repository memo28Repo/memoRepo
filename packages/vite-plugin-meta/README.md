# `@memo28/vite-plugin-mete`

Generate and formulate `meta` tags through configuration and add them to the page

[中文文档](packages/vite-plugin-meta/README_CN.md)

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
    // Add additional plug-in configuration
    plugin.addHTMLMeta({
      // Jump to the url configuration every 5 seconds after the page is loaded
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

  Refresh jump

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
  
 Generally speaking, the `a` tag in the `HTML` page will automatically enable DNS pre-resolution to improve website performance, but it is invalid in websites using the `https` protocol. We can set: to turn on the' dns' pre-resolution of the `a` tag

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

  Used to indicate the name of the author of the page, such as an organization or institution

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

  The keywords related to the page content are separated by commas. Some search engines will use these keywords to classify documents when they encounter these keywords. Take headlines and `taobao` as examples

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

  Tencent qq related

### `forcedVerticalScreen`

  Forced vertical screen

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

  Force full screen

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

  QQ application mode

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

  Apple related

### `appleItunesApp`

 An app banner is displayed at the top of the page to provide app store download

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

 Title added to the main screen

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
