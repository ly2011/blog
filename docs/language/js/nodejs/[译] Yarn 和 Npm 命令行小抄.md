# [译] Yarn 和 Npm 命令行小抄

- 好，想必你对新的 JavaScript 包管理工具 [yarn](https://github.com/yarnpkg/yarn) 已经有所耳闻，并已通过 `npm i -g yarn` 进行了安装，现在想知道怎么样使用吗？如果你了解 npm，你已经会很大一部分啦！

  下面是我从 npm 切换到 yarn 的一些笔记。

  ## 需要了解的命令

  - `npm install` === `yarn` —— install 安装是默认行为。

  - `npm install taco --save` === `yarn add taco` —— taco 包立即被保存到 `package.json` 中。

  - `npm uninstall taco --save` === `yarn remove taco`

    在 npm 中，可以使用 `npm config set save true` 设置 `—-save` 为默认行为，但这对多数开发者而言并非显而易见的。在 yarn 中，在`package.json` 中添加（add）和移除（remove）等行为是默认的。

  - `npm install taco --save-dev` === `yarn add taco --dev`

  - `npm update --save` === `yarn upgrade`

    update（更新） vs upgrade（升级）， 赞！upgrade 才是实际做的事！版本号提升时，发生的正是upgrade！

    [**注意**](https://github.com/npm/npm/issues/13555)： `npm update --save` [在版本 3.11 中似乎有点问题](https://github.com/npm/npm/issues/13555)。

  - `npm install taco@latest --save` === `yarn add taco`

  - `npm install taco --global` === `yarn global add taco` —— 一如既往，请谨慎使用 global 标记。

  ## 已知悉的命令

  包和 npm registry 上是一样的。大致而言，Yarn 只是一个新的安装工具，npm 结构和 registry 还是一样的。

  - `npm init` === `yarn init`
  - `npm link` === `yarn link`
  - `npm outdated` === `yarn outdated`
  - `npm publish` === `yarn publish`
  - `npm run` === `yarn run`
  - `npm cache clean` === `yarn cache clean`
  - `npm login` === `yarn login` (logout 同理)
  - `npm test` === `yarn test`

  ## Yarn 独有的命令

  我跳过了一些提醒我们不要使用的内容，如 [yarn clean](https://yarnpkg.com/en/docs/cli/clean)。

  - `yarn licenses ls` —— 允许你检查依赖的许可信息。
  - `yarn licenses generate` —— 自动创建依赖免责声明 license。
  - `yarn why taco` —— 检查为什么会安装 taco，详细列出依赖它的其他包（鸣谢 [Olivier Combe](https://medium.com/u/5ae4b2205cba)）。
  - Emojis
  - [速度](https://yarnpkg.com/en/compare)
  - 通过 yarn lockfile 自动实现 shrinkwrap 功能
  - 以安全为中心的设计

  ## Npm 独有的命令

  - `npm xmas` === **NO EQUIVALENT**
  - `npm visnup` === **NO EQUIVALENT**

  笔者写作本文时， yarn 的 `run` 命令似乎出了点问题，应该会在 `0.15.2` 中修复。在这一点上， npm 好多了。感谢 [Zachary](https://medium.com/u/5563771fbaad) 的研究！

  ## 还有更多呢!

  ### 值得一看

  - **Yehuda Katz using Yarn** — [http://yehudakatz.com/2016/10/11/im-excited-to-work-on-yarn-the-new-js-package-manager-2/](http://yehudakatz.com/2016/10/11/im-excited-to-work-on-yarn-the-new-js-package-manager-2/)
  - **Facebook Announce** — [https://code.facebook.com/posts/1840075619545360](https://code.facebook.com/posts/1840075619545360)
  - **News** — [http://thenextweb.com/dd/2016/10/12/facebook-launches-yarn-a-faster-npm-client/](http://thenextweb.com/dd/2016/10/12/facebook-launches-yarn-a-faster-npm-client/)
  - **Benchmarking** — [https://www.berriart.com/blog/2016/10/npm-yarn-benchmark/](https://www.berriart.com/blog/2016/10/npm-yarn-benchmark/)

  ### 进阶阅读

  - [https://yarnpkg.com/en/docs/](https://yarnpkg.com/en/docs/)
  - [https://twitter.com/yarnpkg](https://twitter.com/yarnpkg)
  - [https://github.com/yarnpkg/yarn](https://github.com/yarnpkg/yarn)
  - [https://yarnpkg.com/en/docs/migrating-from-npm](https://yarnpkg.com/en/docs/migrating-from-npm#toc-cli-commands-comparison)
