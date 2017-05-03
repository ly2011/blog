# 在Sublime Text 配置GoLang开发环境

---

## GoSublime 插件

[GoSublime](https://github.com/DisposaBoy/GoSublime) 的功能有：自动添加包，自动格式化，自动补全，等，所以有了他就跟 ide 差不多功能了。
安装过程就不说了，st 安装插件分分钟的事情，至于那些打不开安装列表，或没有安装/安装不上 Package Control 的朋友，可以参考《[Sublime Text 之 Package Control 镜像](http://www.52cik.com/2015/11/24/Package-Control.html)》。

安装后需要简单配置下，否则没办法使用自动添加包功能，这里需要安装 `goimports` 第三方包：

```
$ go get golang.org/x/tools/cmd/goimports

```

然后打开菜单 `Preferences -> Package Settings -> GoSublime -> Settings – User`

```
{
  "fmt_cmd": ["goimports"]
}

```

保存即可，这样每次保存文件或格式化的时候都会自动导入包了。

如果每次打开go文件都有提示你如下信息：

```
MarGo: Missing required environment variables: GOPATH
See the `Quirks` section of USAGE.md for info

```

需要修改配置如下：

```
{
  "env": {
    "GOPATH": "$HOME/go" // go项目路径
  },
  "fmt_cmd": ["goimports"]
}

```

## Godef 插件

[GoSublime](https://github.com/DisposaBoy/GoSublime) 固然强大，但却没跳转定义功能，所以需要安装另一个插件 [Godef](https://github.com/buaazp/Godef)。
安装插件过程…同上。。

> ps：当然转定义功能做的没 idea 那样智能，不过也非常方便了。

在使用 [Godef](https://github.com/buaazp/Godef) 之前，也一样要安装 `godef` 第三方包：

```
$ go get github.com/rogpeppe/godef

```

**到这里，如果你的 Godef 可以正常工作了，下面步骤可以省略，不能正常工作，就需要继续配置一下。**

然后打开菜单 `Preferences -> Package Settings -> Godef -> Settings – User`

```
{
  "goroot": "/Users/zippo/Go",
  "gopath": "/Users/zippo/gopath"
}

```

好了，可以使用快捷键或右键跳转定义了。各个平台下快捷键不一样，不过右键是一样的，具体信息去官网查看吧。

## 最后

如果你用不惯 GoSublime 的编译系统的话，可以做如下修改。
打开菜单 `Preferences -> Browse Packages`，然后打开 `GoSublime/GoSublime.sublime-build` 文件。
修改如下：

```
{
  // "target": "gs9o_build",
  "cmd": ["/usr/local/go/bin/go", "run", "$file"],
  "selector": "source.go"
}

```

这样就可以直接运行而不会调用它的控制台了。

Windows 用户把 `/usr/local/go/bin/go` 改成自己的 go.exe 绝对路径即可。
如果控制台输出乱码，加上 `"encoding": "utf-8"` 试试，如果还不行，自己折腾吧。
