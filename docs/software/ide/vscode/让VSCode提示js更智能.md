# 让VSCode提示js更智能

---

[TOC]

先上效果图：

![](https://segmentfault.com/img/bVDReN?w=594&h=359)

## 安装 nodejs

---

基于d.ts接口描述文件来实现的，因为d.ts本质上是微软的typescript的东西，所以要安装typescript，而typescript要想跑起来还要安装nodejs，所以要先安装nodejs。具体步骤不说了，去nodejs官网上下载相应的程序，点击下一步下一步安装就行了。

## 安装 typescript

---

安装完 nodejs 后, 在命令行窗口里面执行下面命令, 安装 typescript。

```bash
npm install typescript -g
```

需要说明的是, npm 软件库被墙了, 所以你呀翻墙, 或者用下面这个命令去安装 typescript。

```js
npm install typescript -g --registry=https://registry.npm.taobao.org
```

后面多出来的一长串东西，表示是通过淘宝搭建的服务器去安装。

## 把 typescript 和 vscode 关联起来

---

打开 vscode 的 `setting.json` 文件, 添加如下一条配置信息:


windows:

```json
"typescript.tsdk": "C:\\Users\\baby\\AppData\\Roaming\\npm\\node_modules\\typescript\\lib"
```

linux:

```json
"typescript.tsdk": "/usr/local/lib/node_modules/typescript/lib"
```

## 添加项目的配置文件

---

在项目的根目录下, 创建一个 `jsconfig.json` 文件, 内容如下:

```json
{
    // See https://go.microsoft.com/fwlink/?LinkId=759670
    // for the documentation about the jsconfig.json format
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "allowSyntheticDefaultImports": true
    },
    "exclude": [
        "node_modules",
        "bower_components",
        "jspm_packages",
        "tmp",
        "temp"
    ]
}
```

这个配置文件的作用就是告诉 vscode 编辑器, 你这个项目是一个 js 项目。

然后重启vscode。

## 安装相关的提示文件

---

最后安装你需要的提示文件, 比如我要提示的 jquery, 那么使用这个命令:

```bash
npm install @types/jquery --save
```

然后你就会发现你的项目里面多了个 `node_modules/@types/jquery` 文件夹。

```bash
npm install @types/node --save
npm install @types/express --save
npm install @types/koa --save
npm install @types/react --save
npm install @types/vue --save
```

## 参考文档

1. [https://segmentfault.com/a/1190000007110845](https://segmentfault.com/a/1190000007110845)
