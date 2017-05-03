# 在Visual Studio Code配置GoLang开发环境

---

## 一、GoLang 的安装

---

省略

验证一下：

```shell

D:\test\go\0503> go version
go version go1.8.1 windows/amd64

```

要注意，GoLang的安装要确保两个环境变量，一个是 `GOROOT` 环境变量；二是 `PATH` 环境变量要包含 `$GOROOT\bin` 值。

> windows下GoLang 安装会自动加上 `GOROOT` 和 `PATH` 环境变量。

## 二、GoLang 插件介绍

---

对于Visual Studio Code开发工具，有一款优秀的GoLang插件，它的主页为：[https://github.com/microsoft/vscode-go](https://github.com/microsoft/vscode-go)

这款插件的特性包括：

- 代码着彩色
- 代码自动完成（使用gocode）
- 代码片段
- 快速提示信息（使用godef）
- 跳转到定义（使用godef）
- 搜索参考引用（使用go-find-references）
- 文件大纲（使用go-outline）
- 重命名（使用gorename）
- 保存构建（使用go build和go test）
- 代码格式化（使用goreturns或goimports或gofmt）
- 调试代码（使用delve）

## 三、插件安装

---

- 1、安装插件

进入Visual Studio Code界面，使用快捷键 `Ctrrl+Shift+p` ，打开命令面板，选择 "Extensions: Install Extension"，等待插件名列表的加载（这一步国内较慢）。
然后在输入框 "ext install" 输入Go，选择go 0.6.15，点击安装，安装完成后要求重启开发环境，点击重启按钮，自动刷新环境。

- 2、设置GOPATH环境变量

在Windows系统中设置 `GOPATH` 环境变量，我的值为 `D:\tools\VSCode\works`
缺少GOPATH环境变量通常会报 "$GOPATH not set." 这样的错误。

- 3、开启自动保存

强烈建议把自动保存功能开启。开启方法为：选择菜单File，点击Auto save。

- 4、安装Git

Windows安装Git的过程省略。记得把 "git\bin" 配置到 `PATH` 环境变量中。

## 四、配置插件

---

Visual Studio Code的配置选项支持GoLang插件的设置，可以通过用户偏好设置或workspace设置进行配置。在菜单File->Preferences处可以找到。


- 1、点击User Settings

找到

```json
// Specifies the GOPATH to use when no environment variable is set.
"go.gopath": null,
```

如果没有设置GOPATH环境变量，那么这里就该设置。

- 2、执行命令

1）安装gocode

```shell
go get -u -v github.com/nsf/gocode
```

2）安装godef

```shell
go get -u -v github.com/rogpeppe/godef
```

3）安装golint

```shell
go get -u -v github.com/golang/lint/golint
```

4）安装go-find-references

```shell
go get -u -v github.com/lukehoban/go-find-references
```

5）安装go-outline

```shell
go get -u -v github.com/lukehoban/go-outline
```

6）安装goreturns

```shell
go get -u -v sourcegraph.com/sqs/goreturns
```

7）安装gorename

```shell
go get -u -v golang.org/x/tools/cmd/gorename
```

3、使用

以上都完成后，开始GoLang开发就很方便了。如图所示：

![](http://img.blog.csdn.net/20151127233111747)
