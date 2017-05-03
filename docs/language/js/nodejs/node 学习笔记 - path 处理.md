# node 学习笔记 - path 处理

---

path 模块是 node 用于整理、转换、合并路径的神器，只要是路径问题，都可以交给它处理。
但它仅仅是处理路径字符串，而不会去坚持或处理文件。

## `path.normalize` 路径整理

做项目时，往往都是基于相对路径，于是经常会出现类似这样的路径 `path//upload/../file/./123.jpg`。
当然这个是把所有坑都写到一起了，不过就算这样的路径，`path.normalize` 分分钟搞定。

```
var path = require('path');

var str = path.normalize('./path//upload/data/../file/./123.jpg');
console.log(str); // path/upload/file/123.jpg

```

## `path.join` 拼接路径

那些奇葩路径往往都是自己拼接导致的，如果用一些工具帮助我们处理这，就可以直接得到规范的路径了，而且不需要担心跨平台问题。这里的 `path.join` 就可以帮助我们生产跨平台，规范化的路径字符串。

```
var path = require('path');

var str = path.join('./path/./', './upload', '/file', '123.jpg');
console.log(str); // path/upload/file/123.jpg

var str = path.join('path', 'upload', 'file', '123.jpg');
console.log(str); // path/upload/file/123.jpg

var arr = ['path', 'upload', 'file', '123.jpg'];
var str = path.join.apply(null, arr);
console.log(str); // path/upload/file/123.jpg

```

这个方法虽然方便，但是参数只能是字符串，否则会抛出错误(0.10以上版本)。

## `path.resolve` 绝对路径

这个绝对路径操作，跟上面的不太一样，如果你懂命令行 `cd` 命令，那就秒懂了，否则需要花点时间多跑几个例子才能理解。这次直接上官方例子。

```
path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile');
// 返回 /tmp/subfile

```

相当于命令行下的

```
cd foo/bar
cd /tmp/file/
cd ..
cd a/../subfile
pwd

```

他的解析不是在是简单的拼接关系，而是类似 `cd` 命令的解析了。

## `path.relative` 相对路径

有绝对就有相对，有时我们有两个绝对路径, 我们需要从中找出相对目录的起源目录。

```
path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')
// 返回 ../../impl/bbb

```

## `path.dirname` 文件路径

根据一个文件或目录得到它所在的目录路径，这个很常用。

```
var path = require('path');

var str = path.dirname('path/upload/file/123.jpg');
console.log(str); // path/upload/file

var str = path.dirname(__filename); // 等价于 __dirname
console.log(str, __dirname); // 当前文件所在目录

```

## `path.basename` 获取路径中的文件名

确切的说是返回最后一个路径分割后面的文件名，不论是文件还是目录，第二个参数可以忽略文件后缀。

```
var path = require('path');

var str = path.basename('path/upload/file/123.txt.jpg');
console.log(str); // 123.txt.jpg

var str = path.basename('path/upload/file/123.txt.jpg', '.jpg');
console.log(str); // 123.txt

var str = path.basename('path/upload/file/123.txt.jpg', '.txt.jpg');
console.log(str); // 123

var str = path.basename('path/upload/file/');
console.log(str); // file

```

代码都是简单易懂的。

## `path.extname` 文件后缀

确切说，就是返回最后一个 `.` 之后的字符串，没有则返回空。

```
var path = require('path');

var str = path.extname('path/upload/file/123.txt.jpg');
console.log(str); // '.jpg'

var str = path.extname('path/upload/file/123.txt');
console.log(str); // '.txt'

var str = path.extname('path/upload/file/');
console.log(str); // ''

```

## `path.parse` 解析路径

把一个路径解析为一个 `{root:'', dir:'', base:'', ext:'', name:''}` 这样的对象。
有时候要获取文件名，文件后缀，文件目录，这样到省事了，直接搞定。上官方例子。

```
path.parse('/home/user/dir/file.txt')
// returns
{
    root : "/",
    dir : "/home/user/dir",
    base : "file.txt",
    ext : ".txt",
    name : "file"
}

// windows
path.parse('C:\\path\\dir\\index.html')
// returns
{
    root : "C:\\",
    dir : "C:\\path\\dir",
    base : "index.html",
    ext : ".html",
    name : "index"
}

```

## `path.format` 生成路径

正好跟 `path.parse` 相反，这个则是根据 `{root:'', dir:'', base:'', ext:'', name:''}` 这样的对象来生成字符串。上官方例子。

```
path.format({
    root : "/",
    dir : "/home/user/dir",
    base : "file.txt",
    ext : ".txt",
    name : "file"
})
// returns
'/home/user/dir/file.txt'

```

## 其他属性

还有一些属性，如 `path.sep` 不同平台下的文件路径分隔符，win 是 `\\`，*nix 则是 `/`。
`path.delimiter` 字面解释，这才是分隔符，但这个往往是环境变量中出现的，win 是 `;`，*nix 则是 `:`，你们懂的。

还有两个奇葩属性，`path.posix` 和 `path.win32` 他们都包含上面这些方法属性，前者跨平台，后者只是win上。
