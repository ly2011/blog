# [译] Fetch 请求的本地缓存

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
本文展示了如何使用实现 fetch 请求的本地缓存，遇到重复请求时，将会从 sessionStorage 中读取数据。这样做的好处是，无需为每个需要缓存的资源编写自定义代码。

如果你想在 JavaScript 盛会中露露脸，秀秀如何玩转 Promise、最前沿的 API 和 localStorage，那就接着往下看吧。

Fetch API

此时此刻，你对 fetch 可能已经很熟悉了。它是浏览器提供的用以替代旧版的XMLHttpRequest的原生 API。


并非所有浏览器都完美支持 fetch，但你可以使用 GitHub 上的 fetch polyfill（如果没事做，可以看看 Fetch 标准）。

原始替代版本

做个假设，我们准确了解需要下载的那个资源，并且只想下载一次。可以使用全局变量作为缓存，像下面这样：

```
let origin = null
fetch('https://httpbin.org/get')
  .then(r => r.json())
  .then(information => {
    origin = information.origin  // your client's IP
  })
// 需要延时以确保 fetch 完成
setTimeout(() => {
  console.log('Your origin is ' + origin)
}, 3000)
```

上面使用了全局变量来保存缓存的数据。马上可以发现问题，一旦刷新页面或者跳转到其他页面，缓存的数据就消失了。

在剖析这个办法的短板之前，先将解决方案升级下。

```
fetch('https://httpbin.org/get')
  .then(r => r.json())
  .then(info => {
    sessionStorage.setItem('information', JSON.stringify(info))
  })
// 需要延时以确保 fetch 完成
setTimeout(() => {
  let info = JSON.parse(sessionStorage.getItem('information'))
  console.log('Your origin is ' + info.origin)
}, 3000)
```

第一个问题是，fetch 是基于 Promise 的，意味着我们无法准确知晓 fetch 何时完成，因此在 fetch 完成之前，我们不能依赖它的执行。

第二个问题是，该解决方案详细指定了 URL 和缓存的内容（本例中的 information）。我们需要一个基于 URL 的通用解决方案。

第一次的简单实现

在 fetch外面再包装一层，同样也返回 Promise。调用该方法时，我们并不关心结果是来源于网络还是本地缓存。

之前你可能是这样做的：

```
fetch('https://httpbin.org/get')
  .then(r => r.json())
  .then(issues => {
    console.log('Your origin is ' + info.origin)
  })
```

现在加上一层包装，重复的网络请求可以通过本地缓存进行优化。我们将这个包装过的方法简单称作 cachedFetch，代码如下：

```
cachedFetch('https://httpbin.org/get')
  .then(r => r.json())
  .then(info => {
    console.log('Your origin is ' + info.origin)
  })
该方法首次运行的时候，需要发出网络请求，并将结果缓存下来。第二次请求时，则会直接从本地存储中取出数据。

首先试试简单地将 fetch 包装下：

```
const cachedFetch = (url, options) => {
  return fetch(url, options)
}
```

这当然能工作，不过没什么用。接下来，来实现获取数据的存储。

```
const cachedFetch = (url, options) => {
  // 将 URL 作为 sessionStorage 的 key
  let cacheKey = url
  return fetch(url, options).then(response => {
    // 仅在结果为 JSON 或其他非二进制数据情况下缓存结果
    let ct = response.headers.get('Content-Type')
    if (ct && (ct.match(/application\/json/i) || ct.match(/text\//i))) {
      // 当然，除了 .text()，也有 .json() 方法
      // 不过结果最终还是会以字符串形式存在 sessionStorage 中
      // 如果不克隆 response，在其返回时就会被使用
      // 这里用这种方式，保持非入侵性
      response.clone().text().then(content => {
        sessionStorage.setItem(cacheKey, content)
      })
    }
    return response
  })
}
```

上面发生了不少事。

fetch 所返回的首个 Promise 实际上还是径直发出了 GET 请求。注意如果有 CORS（Cross-Origin Resource Sharing，跨域资源共享）的问题，.text()、.json() 、.blob() 这些方法不会工作。

最有意思的点在于，我们需要克隆首个 Promise 返回的 Response 对象。如果不这样做，我们就介入过多，当该 Promise 的最终使用者调用如 .json() 这些方法时，会得到如下错误：

```
TypeError: Body has already been consumed.
另外需要注意的一点是，需要注意响应类型：我们只存储状态码为 200 且内容类型为 application/json 或 text/*的响应。因为 sessionStorage 只能存储文本数据。

下面是使用示例：

```
cachedFetch('https://httpbin.org/get')
  .then(r => r.json())
  .then(info => {
    console.log('Your origin is ' + info.origin)
  })
cachedFetch('https://httpbin.org/html')
  .then(r => r.text())
  .then(document => {
    console.log('Document has ' + document.match(/<p>/).length + ' paragraphs')
  })
cachedFetch('https://httpbin.org/image/png')
  .then(r => r.blob())
  .then(image => {
    console.log('Image is ' + image.size + ' bytes')
  })
让人喜欢的是，这个解决方案到目前为止可以正常工作，也不会干扰 JSON 与 HTML 请求。当数据为图片的时候，它也不会试图将其存在 sessionStorage 中。

真实返回命中缓存的第二次实现

我们的第一次实现，仅仅只关心响应结果的存储。当你第二次调用 cachedFetch 时，并未试着从 sessionStorage 中检索任何内容。我们要做的，首先是返回一个 Promise，它需要返回一个 Response 对象。

先看下最基本的实现：

```
const cachedFetch = (url, options) => {
  // 将 URL 作为 sessionStorage 的 key
  let cacheKey = url
  // 命中缓存的新代码开始
  let cached = sessionStorage.getItem(cacheKey)
  if (cached !== null) {
    // it was in sessionStorage! Yay!
    let response = new Response(new Blob([cached]))
    return Promise.resolve(response)
  }
  // 命中缓存的新代码结束
  return fetch(url, options).then(response => {
    // 仅在结果为 JSON 或其他非二进制数据情况下缓存结果
    if (response.status === 200) {
      let ct = response.headers.get('Content-Type')
      if (ct && (ct.match(/application\/json/i) || ct.match(/text\//i))) {
        // 当然，除了 .text()，也有 .json() 方法
        // 不过结果最终还是会以字符串形式存在 sessionStorage 中
        // 如果不克隆 response，在其返回时就会被使用
        // 这里用这种方式，保持非入侵性
        response.clone().text().then(content => {
          sessionStorage.setItem(cacheKey, content)
        })
      }
    }
    return response
  })
}
```

这已经可以工作了！

打开 CodePen 查看上面代码的实际效果，记得开启浏览器开发者工具中的 Network tab。多点几次 “Run” 按钮（CodePen 的右上角），可以发现，只有图片被反复请求。

本解决方案的好处是避免了“意面式回调”（callback spaghetti）。sessionStorage.getItem 的调用是同步的（也就是阻塞的），所以在 Promise 或者回调中无需应对“它在本地存储中是否存在？”这种问题。只要有内容，就返回缓存结果。否则就按正常逻辑执行。

考虑失效时间的第三次实现

到目前为止我们一直在使用 sessionStorage，它有点像 localStorage，除了在打开新页面时会被清除这一点。这意味着我们在使用一种“自然形式”，内容不会缓存很久。如果要使用 localStorage 来缓存内容，那就算远程内容改变了，浏览器还是会“永远”卡在本地内容。这太糟糕了。

更好的解决办法是提供用户控制。（这里的用户指的是使用 cachedFetch 函数的 Web 开发者。）就像 Memcached 或 Redis 这些服务端存储一样，我们可以指定缓存的使用期。

例如在 Python (with Flask) 中：

```
>>> from werkzeug.contrib.cache import MemcachedCache
>>> cache = MemcachedCache(['127.0.0.1:11211'])
>>> cache.set('key', 'value', 10)
True
>>> cache.get('key')
'value'
>>> # waiting 10 seconds
...
>>> cache.get('key')
>>>
对此，目前 sessionStorage 和 localStorage 都没有内建的功能实现，所以需要自己手动来实现。通过对比存储与缓存命中时的时间戳，可以达成目的。

在此之前，先看看大概应该长什么样子：

```
// 使用默认过期时间，如 5 min
cachedFetch('https://httpbin.org/get')
  .then(r => r.json())
  .then(info => {
    console.log('Your origin is ' + info.origin)
  })
// 传递以秒为单位的数值
cachedFetch('https://httpbin.org/get', 2 * 60)  // 2 min
  .then(r => r.json())
  .then(info => {
    console.log('Your origin is ' + info.origin)
  })
// 和  fetch 选项放在一起，使用自定义的名字
let init = {
  mode: 'same-origin',
  seconds: 3 * 60 // 3 min
}
cachedFetch('https://httpbin.org/get', init)
  .then(r => r.json())
  .then(info => {
    console.log('Your origin is ' + info.origin)
  })
最重要的来了，每次保存响应数据的时候，也需要记录何时存储的。现在我们也可以切换到 localStorage 上了。代码会保证我们不会命中过期的缓存，在 localStorage 中内容原本是持久化的。

下面是最终的解决方案：

```
const cachedFetch = (url, options) => {
  let expiry = 5 * 60 // 默认 5 min
  if (typeof options === 'number') {
    expiry = options
    options = undefined
  } else if (typeof options === 'object') {
    // 但愿你别设置为 0
    expiry = options.seconds || expiry
  }
  // 将 URL 作为 localStorage 的 key
  let cacheKey = url
  let cached = localStorage.getItem(cacheKey)
  let whenCached = localStorage.getItem(cacheKey + ':ts')
  if (cached !== null && whenCached !== null) {
    // 耶！ 它在 localStorage 中
    // 尽管 'whenCached' 是字符串
    // 但减号运算符会将其转换为数字
    let age = (Date.now() - whenCached) / 1000
    if (age < expiry) {
      let response = new Response(new Blob([cached]))
      return Promise.resolve(response)
    } else {
      // 清除旧值
      localStorage.removeItem(cacheKey)
      localStorage.removeItem(cacheKey + ':ts')
    }
  }
  return fetch(url, options).then(response => {
    // 仅在结果为 JSON 或其他非二进制数据情况下缓存结果
    if (response.status === 200) {
      let ct = response.headers.get('Content-Type')
      if (ct && (ct.match(/application\/json/i) || ct.match(/text\//i))) {
        // 当然，除了 .text()，也有 .json() 方法
        // 不过结果最终还是会以字符串形式存在 sessionStorage 中
        // 如果不克隆 response，在其返回时就会被使用
        // 这里用这种方式，保持非入侵性
        response.clone().text().then(content => {
          localStorage.setItem(cacheKey, content)
          localStorage.setItem(cacheKey+':ts', Date.now())
        })
      }
    }
    return response
  })
}
```

未来更好、更理想、更酷的实现

我们在避免过度变动 Web API，最棒的是 localStorage 可比依赖网络快得多了。看看这篇文章对 localStorage 和 XHR 的比较： localForage vs. XHR。它还衡量了其他内容，但得出基本结论，localStorage 确实很快，磁盘缓存热身（disk-cache warm-ups，？不知如何翻译，请读者赐教）也很少出现。

接下来，我们还能怎样改进方案呢？

处理二进制响应

我们的实现没有考虑缓存非文本的内容，如图片等等，但这并非不可能。需要一些更多的代码。特别的，我们可能想存储更多关于 Blob 的信息。从根本上说，所有响应都是 Blob。对文本和 JSON 来说，它只是字符串数组，type 和 size 并不真正那么重要，因为从字符串本身就能识别出来。对二进制内容而言，需要将它们转换为 ArrayBuffer。

关注更多内容，请看 CodePen 上支持图片的实现。

使用哈希键值缓存

另外一点潜在的优化点是对用作 key 的每个 URL 进行哈希处理，使其变得更小，以空间换取速度（trade space for speed）。在上面的例子中，我们使用了很多非常短小整洁的 URL（如 https://httpbin.org/get），但如果你使用了大量的带有很多查询字符串的长 URL，这样做就很有意义了。

办法之一是使用这个不错的算法，以其安全快速而知名：

```
const hashstr = s => {
  let hash = 0;
  if (s.length == 0) return hash;
  for (let i = 0; i < s.length; i++) {
    let char = s.charCodeAt(i);
    hash = ((hash<<5)-hash)+char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}
如果觉得这个不错，看下 CodePen。在控制台上可以看到类似 557027443 这样的 key 值。

结语

现在我们拥有了一个可以使用在 web app 中的工作方案了，我们使用 Web API，并且知晓响应结果会很好地为用户缓存下来。
```
