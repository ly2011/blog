# [如何更好地运用 Chrome (Google)](http://jeffjade.com/2017/05/01/122-how-to-better-use-google_chrome/)

By [晚晴幽草轩轩主](http://jeffjade.com/About)

发表于 2017-05-01

已经在很多工具类文章前言中，提及使用**工具的重要性**；以至于在写这篇时候，大为窘迫：穷尽了脑海中那些名句箴言，目测都已然在先前文章中被引用。鉴于杳让人心底意识到工具的重要性，并且能践行之，远比介绍如何使用重要的多，所以，开篇之前，还是得再次重申：**工欲善其事，必先利其器**。如能领悟，善莫大焉；然而根据长期观察，这个现状并不容乐观，所以就有了这篇文章的存在；毕竟[晚晴幽草轩](http://jeffjade.com/)有部分职责，就是作为经世致用的布道者般的存在。

[![如何更好地使用 Chrome (Google)](http://images2015.cnblogs.com/blog/558479/201703/558479-20170326161708986-635492458.jpg)](http://images2015.cnblogs.com/blog/558479/201703/558479-20170326161708986-635492458.jpg)如何更好地使用 Chrome (Google)

> **微注：** 写博，本就不是易事，非朝夕可至，尤其这种整理总结性文章；故此，这里将采取阶段性更新手法，一来防止了拖延之；二来，也能不断学习提炼，减少内容的错误误导，三来，也是防止些许聚合网恶意抓取的尝试。（Update @2017-05-16）

## **科学上网篇**

使用浏览器，懂得如何去科学上网，这一点再重要不过了（个别浏览器除外，有些浏览器的存在，就只是用来下载其他浏览器的，大家都懂得）。这其中，首当其冲的就是选择合适搜索引擎。在国内，倒是有那么几家可选，譬如百度，360，搜狗，Bing等等，搜索写娱乐八卦什么的，倒也无妨。但是，要搜索些专业性、原味性的干货，你当知道，此时该选择谷歌(Google)，这就跟饿了知道该吃饭一般；然而，这在我国大陆，多半只存在于**好**的程序员之间。然后就是如何能使用谷歌（Google）了——须**翻墙**，你知道在国内，无法直接使用 Google 搜索（略大型点的科技公司除外）。

谈起这翻墙，可供选择的办法就很多了。愿意花钱的话，购买个靠谱的 VPN 即可。需要流量不是很多，则可以选择像 [lantern (蓝灯)](https://github.com/getlantern/lantern)这样产品，据悉每天可有几百兆可供使用。不怕麻烦的话，大可到网上搜索，时常会有些好心人，贡献出些 Shadowsocks 免费服务，只不过，这好比像是在打游击，时间长了既累也烦。倒不如，自己动手，丰衣足食。稍微一折腾，即可自己搭建一套 VPS ，来达到科学上网的目的，这里推荐使用 Shadowsocks，对于它的使用，在[Shadowsocks 使用说明](https://github.com/shadowsocks/shadowsocks/wiki/Shadowsocks-%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E)，已经写明，为确保文章完整性，特此补充一份心得：

### **搭建 Shadowsocks 服务器**

首先需要一台服务器(这得是国外的)，推荐使用 [DigitalOcean](https://m.do.co/c/046a8e6b255c)；注册，完成 SSH 配置（具体操作可参考 [如何设置添加SSH](http://jeffjade.com/2015/06/26/2015-06-26-ssh-setting/)），直接用 root 用户登录即可：

> ssh root@your_server_ip

- **安装 Shadowsocks 服务端**

运行以下命令即可快速安装(For Debian / Ubuntu System)：

> apt-get install python-pip
> pip install shadowsocks
> apt-get install ssserver

- **配置 Shadowsocks 服务端**
  安装好 Shadowsocks 以后，可以通过以下指令，来启动 Shadowsocks 服务：

```
ssserver -p 8836 -k yourPassword -m rc4-md5
```

以上这种法子，诸多不便，推荐使用配置文件来操纵；新建配置文件，运行命令 `vim /etc/shadowsocks.json`

```
{
  "server":"your_server_ip",
  "server_port":8388,
  "password":"yourpassword",
  "timeout":300,
  "method":"aes-256-cfb",
  "fast_open":false,
  "workers": 1
}
```

> **server**：服务器 IP地址 (IPv4/IPv6)
> **server_port**：服务器监听的端口，一般设为80，443等，注意不要设为使用中的端口
> **password**：设置密码，自定义
> **timeout**：超时时间（单位：秒）
> **method**：加密方法，可选择 “aes-256-cfb”, “rc4-md5”等等。推荐使用 “rc4-md5”
> **fast_open**：true 或 false。如果你的服务器 Linux 内核在3.7+，可以开启 fast_open 以降低延迟。
> **workers**：workers数量，默认为 1。

备注：亦配置多个 Shadowsocks 账户，具体可以参考如下的代码配置：

```
{
  "server":"your_server_ip",
  "port_password":{
    "8001":"pass01",
    "8002":"pass02",
    "8003":"pass03",
    "8004":"pass04"
  },
  "timeout":60,
  "method":"rc4-md5",
  "fast_open":false,
  "workers":1
}
```

接下来,你就可以使用下面这个指令启动服务咯，是不是很简单？

```
ssserver -c /etc/shadowsocks.json
```

- **下载 Shadowsocks 客户端并填入**
  这里没什么好介绍的，Shadowsocks 的客户端支持各大主流平台，而且客户端的配置相当简单；下载之，填入需要对应的: 服务器IP，端口，密码，加密方式，即可；至此就可以在浩瀚无垠的网上浪起来了。Shadowsocks 客户端下载地址传送门：[OS X](https://sourceforge.net/projects/shadowsocksgui/files/dist/)、 [Windows](https://sourceforge.net/projects/shadowsocksgui/files/dist/)、 [Android](https://github.com/shadowsocks/shadowsocks/wiki/Ports-and-Clients#android)、[IOS](https://github.com/shadowsocks/shadowsocks-iOS/wiki/Help)。

------

【做个补充】：运用命令 `ssserver -c /etc/shadowsocks.json` 来开启服务，很不方便，一旦退出服务器，下次就得再次开启。于此，Shadowsocks 也提供了后台运行的命令：

```
ssserver -c /etc/shadowsocks.json -d start
ssserver -c /etc/shadowsocks.json -d stop
```

然而在真正实施上，却会遭遇报错：[option -d not recognized](https://github.com/shadowsocks/shadowsocks/issues/320)，根据 Issues 给出的回答，唯有升级版本才能解决该问题。而事实上，shadowsocks 开源库，已经根据规定被移除（Removed according to regulations）。折腾再三，幸而找见了更好的衍生产品： [shadowsocks-libev](https://github.com/shadowsocks/shadowsocks-libev) —— 一个纯 C 实现，并且对于数千个连接而言具有非常小的占用空间（几兆字节），用于嵌入式设备和低端盒的轻量级的安全 SOCKS5 代理；值得推荐使用。对于安装和配置也都挺方便，如果你是 Ubuntu 14.04 and 16.04 使用者的话：

```
// install from PPA
sudo add-apt-repository ppa:max-c-lv/shadowsocks-libev
sudo apt-get update
sudo apt install shadowsocks-libev

// Build deb package from source
mkdir -p ~/build-area/
cp ./scripts/build_deb.sh ~/build-area/
cd ~/build-area
./build_deb.sh

// Configure and start the service（配置，同上文所讲）
# Edit the configuration file
sudo vim /etc/shadowsocks-libev/config.json

# Start the service
sudo /etc/init.d/shadowsocks-libev start    # for sysvinit, or
sudo systemctl start shadowsocks-libev      # for systemd
```

如此，简单的一次操作之后，就能长久的欢乐嗨皮了；更多系统的安装配置方法，请自行参见 [shadowsocks-libev](https://github.com/shadowsocks/shadowsocks-libev)。还需要提及的是，使用这个库，也有些弊端性，就是不能方便的支持多端口，可以参见[issues/#5](https://github.com/shadowsocks/shadowsocks-libev/issues/5)；可以有的办法是，启用多个配置来曲线达成所愿，操作方法如下：

```
ss-server -c config1.json -f pid1
ss-server -c config2.json -f pid2
ss-server -c config3.json -f pid3
```

如此即可；也可通过运行 `netstat -tlnp` 命令，查看 ss-server 是否监听了多个配置文件的端口。如果略嫌这样操作麻烦的话，也可以用 Shadowsocks 的 Go 版本 —— [shadowsocks-go](https://github.com/shadowsocks/shadowsocks-go)，它更为方便的支持多端口的设置（update@2017-05-15）。

------

> **有个广告：** 突入一则利人利己的广告：服务器推荐使用 [DigitalOcean](https://m.do.co/c/046a8e6b255c), 它简单灵活、价格公道(最低 5$/月)，童叟无欺，可免费试用 30天。堪称业界良心。此处广告的缘由在于，你若有意使用它，不妨用我的专属推荐链接 [DigitalOcean For JeffJade](https://m.do.co/c/046a8e6b255c)，注册即可获得 10 美刀，当花费了 25 美刀，我就可获取 25 美刀；如有意向，不妨一试；用上一年，算下来每天也不到一元。欲查看更多广告，请[点击我](http://jeffjade.com/Links?form=me)。

------

## **搜索技巧篇**

### **精确搜索**

精确搜索，就是搜索的关键字用`“”`（双引号，中英文皆可）包含。也叫完整搜索，表示查询词不能被拆分，在搜索结果中必须完整出现。举例说明：

> “胜天半子，其又奈何”
> 胜天半子，其又奈何

前者搜索出来的内容，就是必须包含指定关键字；如果没有查询到任何内容，Google 会在下方给出不包含引号的结果。后者，搜索的内容，是关键词以一定规则被拆分的结果。

### **模糊搜索**

星号（`*`） 是常用的通配符，也可以用在搜索中，实现模糊匹配搜索。比如在 Google 中搜索：`"搜索*擎"`，精确模糊，搭配使用，效果更显著。其中的 `*` 号代表任何文字。返回的结果就不仅包含“搜索引擎”，还包含了“搜索收擎”，“搜索巨擎”等内容。

### **站内搜索**

顾名思义，就是我们可以指定仅在某个站点下搜索，这很有用，可以加快定位出你想要的内容；而且也可以用它来替代些许论坛 or 博客自带的站内搜索。譬如，我自己就常这样使用：

> site:jeffjade.com 数组
> site:ruanyifeng.com npm

### **排除搜索**

如果你想更精确你的搜索，此法大有可为；在想搜索结果中不包含某个词，就在该词的前面加一个 -（减号，⚠️这个得是半角英文，并和之后的词得连着，不能有空格）。表示所有搜索结果不包含减号后面的词，含有它的网页将被过滤掉。举例说明，ListView 控件在 Android 跟 React Native 都会含有，如果你想要更精确你的结果，即可屏蔽掉另一方，相这样：

> ListView -Android
> ListView -ReactNative // (这 React Native 得连起来，否则会被拆分)

### **标题中搜索**

这标题中搜索，即在查询的关键字前面加上 `intitle:` (冒号得是半角英文，且与关键词间不能有空格)， 表示搜索结果的标题都必须含有 `intitle:`后的查询关键词，以帮助排除无关网页。

> intitle:静晴轩
> intitle:天意人间舫

这里可以补充说明的是：还可以加 `allintitle:`；如此搜索，返回的内容是，页面标题中包含多组关键词的页面。例如：**allintitle:SEO 搜索引擎优化**，就相当于：**intitle:SEO intitle:搜索引擎优化**，返回的是标题中既包含“SEO”，也包含“搜索引擎优化”的页面。

### **文件类型**

在搜索的时候，是可以指定文件格式的，指定格式用：filetype ，表示搜索特定的文件格式；如此一来，我们搜索出来的内容，就是指定格式文件（eg：PDF）。看姑姑(Google)是不是很贴心？

> 代码大全 filetype:PDF
> Clean Code filetype:PDF

以上，只是 Google 搜索技巧中常用的几个，其他还有很多，比如：`inurl`， `inanchor`，`allinurl`诸次等等，更多玩法，可以参考知乎 [如何用好谷歌等搜索引擎？](https://www.zhihu.com/question/20161362)；熟练运用，灵活搭配，从而大幅度提升工作效率，并更好地解决问题。此处需要补充的是，以上诸法，并非都适用于百度；即使支持，因为其自身缘由(比如收录不及时)，并不能很好的起到应有的效用。

## 插件扩展篇

当你发现，有人使用 Chrome，而插件扩展栏目，竟空空如也，你就知道：**Ta 的业余是专业的**，尤其是开发者。**Chrome**，以及很多主流工具，比如手机，Mac，编辑器等等，都是基于按需索取的理念，这才是一种更合理的存在。将更多功能，以插件、扩展的形式按需注入，不仅更合理地满足所有人所需，也给出了更多选择余地的同时，还能让软件本身更加轻盈体瘦。这一点需要讲明的是，如果说“小白”执意甘为小白，那么这里未有苦劝之义务。关于这部分，早先有在 [Awesome Chrome 插件集锦](http://jeffjade.com/2017/01/23/118-chrome_awesome_plug-in/?from=me)一文中做过记载，并持续更新，此不赘述。

这里还需**郑重声明**的是：欲要优雅地使用 Chrome，首先也得**注册谷歌账号，并保持登录**。登录使你所有的东西（书签，应用，扩展，浏览记录等），都可以保存到云端，如此在不同的环境（如家 or 公司）下可以方便的同步。试想，重装系统，或者换台电脑之后，如果要逐个去找之前装的扩展，保存的书签，这样的事情，怎能称不上优雅？不是么?

## 快捷操作篇

**天下武功，唯快不破**。掌握了搜索技巧，用对了合适插件，此为策略方法层面的事儿。这好比是在玩儿竞技游戏，能犀利而灵动的操作，也是取胜的关键。何况，在你的阵地上（Eg：电脑，浏览器，Terminal等），手随脑动，运指如飞，是一件多么酷的存在。而这，只需划分一点点时间，了解之熟悉之，享受快捷中寻求进阶，假以时日，便可心指合一，臻至化界。

首先，你需要了解其快捷键操作（常用），毕竟键盘操作，远比鼠标要迅捷且准确；这一点，Chrome 做的非常好，在于它跟很多软件操作习惯，是大致相同的（比如 Sublime），一通则百通。这个可以 在 Setting（F1 呼出） 项中的 Shortcuts 中查看。如果不符合固有操作习惯，也可以更改。然，欲穷千里目，则须更上一层楼；如要更为便捷的去操作，则强烈推荐 `Vimium`（或者 cVim），他们犀利的存在，好如游戏手柄，可以让你在 Chrome 上纵横捭阖；具体可以参见[Vimium~让您的Chrome起飞](http://www.jeffjade.com/2015/10/19/2015-10-18-chrome-vimium/)。举例来说，比较常用 `r` 来刷新，`x` 来关闭当前，`t` 来新建标签，`gg` 回到页首等等；当然，这看起来方便的不是太多，可是有些需求，比如：你想拷贝当前标签页，一般操作可分为: **ctrl+l** 选中当前网址，然后 **ctrl+c**，**ctrl+t** 新建标签页之后 **ctrl+v**，最后还需 **Enter** 一回。如果使用 `Vimium`呢，只需 `yt` 即可，更可贵的在于，这还是深度拷贝，可将当前网页不仅是内容，还包括浏览历史，Session 等一并都复制了去，相比之下，真是贴心到了天际。

当你在搜索引擎搜某关键词时，多半会展示有一堆列表，一一点开查看，这样的效率实在是不高；这时候，就可以借助 [Linkclump](https://chrome.google.com/webstore/detail/linkclump/lfpjkncokllnfokkgpkobnkbkmelfefj?hl=zh-CN),一款用来**批量打开多个网页链接**的插件, 她能让你用鼠标框出你想打开的链接，就能在后台自动打开。这样的例子实在数不胜数，只要你足够懒，并积极探索与折腾，总能不断的提升效率，达至极致。

除此外，还可以讲的是，很有必要**管理好书签**；你应该将其按一定规则，分门别类，放置于不同的书签夹中，以便自己清晰快速的检索。如果能略微记得，书签所存网址的个别单词，又完全可以借助 `Vimium` 去搜索，快捷键 `b(/B)`，分别是在当前页和新标签页打开，如此，效率的提升又进了一步，善哉。
