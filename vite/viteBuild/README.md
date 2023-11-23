<!--
 * @Author: 邱狮杰
 * @Date: 2023-01-30 17:25:04
 * @LastEditTime: 2023-03-10 10:47:04
 * @Description:
 * @FilePath: /memo/packages/viteBuild/README.md
-->

# `@memo28/vitebuild`

## `useag`

```ts
// in vue.js
export default defineConfig(new Engine().setTechnologyStack('vue').addPlugins().getBuildConfig())
// in react.js
export default defineConfig(new Engine().setTechnologyStack('react').addPlugins().getBuildConfig())
```

## `setTechnologyStack`

定义技术栈返回指定技术栈默认插件

- `react`

  - `@vitejs/plugin-legacy`
  - `@vitejs/plugin-react-swc`
  - `vite-plugin-print-urls`

- `vue`
  - `@vitejs/plugin-legacy`
  - `vite-plugin-print-urls`
  - `@vitejs/plugin-vue`
  - `@vitejs/plugin-vue-jsx`
  - `unplugin-vue-macros/vite`

```ts
new Engine().setTechnologyStack('react').getBuildConfig()
```

## `addPlugins`

添加插件助手

```ts
new Engine()
  .setTechnologyStack('react')
  .addPlugins(plugins => {
    plugins.addAlias(config).addSassDts(config)
  })
  .getBuildConfig({ root: '', plugins: [] })
```

- 可配置的插件有

  - [unplugin-auto-import](https://www.npmjs.com/package/unplugin-auto-import)

  - [BrowserSync](https://browsersync.io/)

  - [vite-plugin-pwa](https://www.npmjs.com/package/vite-plugin-pwa)

  - [vite-plugin-sass-dts](https://www.npmjs.com/package/vite-plugin-sass-dts)

## `getBuildConfig`

返回所有配置参数

```ts
new Engine().setTechnologyStack('react').getBuildConfig({ root: '' })
```
