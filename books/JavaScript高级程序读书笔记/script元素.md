# <script> 元素

---

## <script>定义了下列6个属性:

---

- `async`: 可选。表示应该立即下载脚本,但不应妨碍页面中的其他操作, 比如下载其他资源或等待加载其他脚本。只对外部脚本文件有效。

- `charset`: 可选。表示通过 src 属性指定的代码的字符集。由于大多数浏览器会忽略它的值,因此这个属性很少有人使用。

- `defer`:可选。表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有效。

- `language`: 已废弃。

- `src`: 可选。表示包含要执行代码的外部文件。

- `type`: 可选。可以看成是 language 的替代属性; 表示编写代码使用的脚本语言的内容类型(也称为 MIME 类型)。默认值为`text/javascript`。

## 标签的位置

---

在文档的 `<head>` 元素中包含所有 javascript 文件, 意味着必须等到全部 javascript 代码都被下载、解析和执行完以后,才能呈现页面的内容(浏览器在遇到 <body> 标签时才开始呈现内容)


## 延迟脚本(defer)

---

`defer`这个属性的用途是表明脚本在执行时不会影响页面的构造。也就是说, 脚本会被延迟到整个页面都解析后再运行。
因此, 在 <script> 元素中设置 defer 属性, 相当于告诉浏览器立即下载, 但延迟执行。(当浏览器遇到 `</html>` 标签后再执行)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>example</title>
    <script type="text/javascript" defer="defer" src="example1.js">
    </script>
    <script type="text/javascript" defer="defer" src="example2.js">
    </script>
  </head>
  <body>

  </body>
</html>
```

>注意: html5规范要求脚本按照它们出现的先后顺序执行, 因此第一个延迟的脚本会先于第二个脚本执行, 而这两个脚本会先于 `DOMContentLoaded` 事件执行。然而在现实当中, 延迟脚本并不一定会按顺序执行, 也不一定会在 `DOMContentLoaded` 事件触发前执行, 因此最好只包含一个延迟脚本。


## 异步脚本(async)

---

`async` 与 `defer` 的不同点在于, 标记为 `async` 的脚本并不能按照指定它们的先后顺序执行。

指定 async 属性的目的是不让页面等待两个脚本下载和执行, 从而异步加载页面其他内容,

>注意: 为此,建议异步脚本不要在加载期间修改 DOM。
异步脚本一定会在页面的 `load` 事件前执行, 但可能会在 `DOMContentLoaded` 事件触发之前或之后执行。
