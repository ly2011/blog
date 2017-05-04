# [译] 让人倾倒的 11 个 Npm Trick

有效率地使用 npm 可能会很困难。内置特性堆积如山，尝试学习它们是很艰巨的任务。

就我个人而言，单学习并使用其中一些小 trick 解救了我，从前移除那些未使用的模块时，我只能先删除整个 `node_modules` 文件夹，接着再用 `npm install` 重新安装*一切*。（`npm prune`，请见本文第四节。）如你所想，这简直要让人发狂了。

我们编了这样一个 trick 列表，使用起来很简单，它们会加速你使用 npm 开发的过程，无论你在做什么项目。

## 1.打开 package 主页

**运行:** `npm home $package`

执行 `home` 命令会打开 `$package` 的主页。例如，如果指定 `$package` 为 `lodash`，那么就就会打开 Lodash 官网。没有安装（全局/某个项目） package 不影响该命令的使用。

## 2. 打开 package Github 仓库

**运行:** `npm repo $package`

类似前面的 `home` 命令， `repo` 命令会打开 `$package` 的 Github 仓库。如 `npm repo express` 会打开 Express 的官方仓库地址。同样，不需要安装 package 就能使用。

## 3. 检查 package 的过时依赖

**运行:** `npm outdated`

在项目中，运行 `outdated` 命令会通过 npm registry 检查是否有过时的 package，并在命令行中打印出当前版本、所需版本以及最新版本。

![在 Node 项目中运行 npm outdated](http://p9.qhimg.com/t01be55669dcc86377b.png)

## 4. 检查 package.json 中未声明的 package

**运行:** `npm prune`

运行 `prune` 命令，npm CLI 会读取 `package.json`，并将结果与项目的 `/node_modules` 目录进行对比，并打印出不在 `package.json` 之列的模块列表。

`npm prune` 命令接着会拿出这些 package，并移除那些没有手动加到 `package.json` 中或没有使用 `--save` 标志安装的 package。

![在 Node 项目中运行 npm prune](http://p0.qhimg.com/t01d021722c08048520.png)

**更新：** 感谢 [@EvanHahn](https://twitter.com/EvanHahn) 提醒，一种个人配置可以让 `npm prune` 提供与 `npm` 默认方式略有不同的结果。

## 5. 锁定依赖版本

**运行:** `npm shrinkwrap`

在项目中使用 `shrinkwrap` 命令，会生成一个 `npm-shrinkwrap.json` 文件，将项目依赖锁定在当前在 `node_modules` 中使用的特定版本。运行 `npm install` 时，若发现存在 `npm-shrinkwrap.json`，则会覆盖列出的依赖以及 `package.json` 中的任何语义版本范围。

如果需要验证项目中 `package.json`、 `npm-shrinkwrap.json` 及 `node_modules` 的一致性，可以考虑使用 [npm-shrinkwrap](https://github.com/uber/npm-shrinkwrap)。

![在 Node 项目中运行 npm shrinkwrap](http://p2.qhimg.com/t010ecff8dd4bc1fe35.png)

## 6. 在 Node.js v4 LTS 中使用 npm v3

**运行:** `npm install -g npm@3`

使用 npm 全局安装 `npm@3`，会将 npm v2 升级至 v3。使用 npm v2 LTS 的 Node.js v4 LTS 发布版本（“Argon”）中也是如此。这会在 v4 LTS 中安装 npm v3 的最新稳定版本。（译者注：LTS 指 Long-Term Support， 即提供长期技术支持的版本。）

## 7. 运行 `npm install -g`，无需加 `sudo`

**运行:** `npm config set prefix $dir`

`$dir` 指你想将*全局依赖安装在的*目录，运行命令，这一来，安装全局模块再也不用使用 sudo，该目录则成为全局的 bin 目录。唯一需要注意的是，确保使用 `chown -R $USER $dir` 该目录的**调整用户权限**。

## 8. 改变所有项目的默认前缀

**运行:** `npm config set save-prefix ~`

使用 `--save` 或 `--save-dev` 标志安装新 package 时，使用 `~` 比默认的 `^` 行为更加保守。`~` 将依赖锁定在小版本（minor version），允许使用 `npm update` 安装补丁版本。`^` 将依赖锁定在主版本，允许使用 `npm update`更新小版本。

## 9. 生产环境下去除 `devDependencies` 依赖

项目准备上到生产环境时，确保使用 `--production` 标志安装依赖。该标志会安装 `dependencies`，忽略 `devDependencies`。这会确保开发所使用的工具及 package 不会进入生产环境。

此外，还可以将 `NODE_ENV` 环境变量设置为 `production`，确保 `devDependencies` 绝不会被安装。

## 10. 使用 `.npmignore` 要当心

如果还没使用过 `.npmignore`，会默认使用 `.gitignore` 文件，加上一些更健全的默认选项。

很多人不明白都是，一旦在项目中添加了 `.npmignore` 文件，`.gitignore` 的规则就会被忽略（好讽刺，出乎意料啊）。结果就是，发布项目时，不得不审查两个文件是否同步，防止敏感信息的泄露。

## 11. 带默认内容的 `npm init`

在新项目中运行 `npm init` 时，可以配置 `package.json` 细节。如果想设置 `npm init` 会一直使用的默认工作，可以使用 `config set` 命令，加上一些额外的参数：

```
npm config set init.author.name $name
npm config set init.author.email $email
```

若想彻底自定义初始化脚本，可以指定一个自定义的默认脚本：

```
npm config set init-module ~/.npm-init.js
```

下面是一个示例脚本，会弹出私有设置项，在需要情况下创建 Github 仓库。确保更改默认的 Github 用户名（`YOUR_GITHUB_USERNAME`），作为 Github 用户名环境变量的 fallback 值。

```
var cp = require('child_process');
var priv;

var USER = process.env.GITHUB_USERNAME || 'YOUR_GITHUB_USERNAME';

module.exports = {

  name: prompt('name', basename || package.name),

  version: '0.0.1',

  private: prompt('private', 'true', function(val){
    return priv = (typeof val === 'boolean') ? val : !!val.match('true')
  }),

  create: prompt('create github repo', 'yes', function(val){
    val = val.indexOf('y') !== -1 ? true : false;

    if(val){
      console.log('enter github password:');
      cp.execSync("curl -u '"+USER+"' https://api.github.com/user/repos -d " +
        "'{\"name\": \""+basename+"\", \"private\": "+ ((priv) ? 'true' : 'false')  +"}' ");
      cp.execSync('git remote add origin '+ 'https://github.com/'+USER+'/' + basename + '.git');
    }

    return undefined;
  }),

  main: prompt('entry point', 'index.js'),

  repository: {
    type: 'git',
    url: 'git://github.com/'+USER+'/' + basename + '.git' },

  bugs: { url: 'https://github.com/'+USER'/' + basename + '/issues' },

  homepage: "https://github.com/"+USER+"/" + basename,

  keywords: prompt(function (s) { return s.split(/\s+/) }),

  license: 'MIT',

  cleanup: function(cb){

    cb(null, undefined)
  }

}
```
