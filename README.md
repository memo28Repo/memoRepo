<!--
 * @Author: 邱狮杰
 * @Date: 2023-01-06 13:48:02
 * @LastEditTime: 2023-04-14 23:08:57
 * @Description:
 * @FilePath: /memo/README.md
-->

# `@memo28(备忘录📕)`

![vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

![vue](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)

![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

![rollup](https://img.shields.io/badge/rollup%20js-EC4A3F?style=for-the-badge&logo=rollup.js&logoColor=white)

# link 流程

- 在需要 `link` 的包的`package.json` -> `script` 字段内添加 `links : yarn link`

- 在`/`目录下 执行 `pnpm links`

# publish 流程

- [给自己的 github 仓库配置 npm token](https://docs.github.com/en/actions/publishing-packages/publishing-nodejs-packages)

- 打包测试

- 更新包版本 `changset add` 和 `changset version`

- 将代码切换到 `main` 分支上

- `push` 支 `git` 仓库让 `action` 帮你完整最后的发包流程

# [分支管理](/docs/branchManagement.md)

# [包管理规范](/docs/packagingSpecification.md)

# [文档](/markdown/index.md)