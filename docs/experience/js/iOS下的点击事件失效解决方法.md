# iOS下的点击事件失效解决方法

---

## 问题描述

---

当委托给一个元素添加click事件时，如果事件是委托到 `document` 或 `body` 上，并且委托的元素是默认不可点击的(如 div, span 等)，此时 click 事件会失效。

demo:

```html

<!DOCTYPE html>
<html lang="en">
  <head>
    <title></title>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="robots" content="index,follow"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="format-detection" content="telphone=no, email=no">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <meta name="HandheldFriendly" content="true">
    <meta name="MobileOptimized" content="320">
    <meta name="screen-orientation" content="portrait">
    <meta name="x5-orientation" content="portrait">
    <meta name="full-screen" content="yes">
    <meta name="x5-fullscreen" content="true">
    <meta name="browsermode" content="application">
    <meta name="x5-page-mode" content="app">
    <meta name="msapplication-tap-highlight" content="no">
    <meta http-equiv="Expires" content="0">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Cache-control" content="no-cache">
    <meta http-equiv="Cache" content="no-cache">
  </head>
  <body>
    <div class="container"></div>
      <div class="target">点击我!</div>
    </div>
    <script src="https://cdn.bootcss.com/jquery/2.2.4/jquery.js"></script>
    <script>
      $(function () {
        // $(document).on('click', '.target', function () {})
        $('body').on('click', '.target', function () {
          alert('我被点击了！！！');
        });
      });
    </script>
  </body>
</html>

```

## 解决办法

---

解决办法有6种：

- 将 `click` 事件直接绑定到目标元素(即 `.target` ) 上
- 将目标元素换成 `<a>` 或者 `<button>` 等可点击的元素
- 给目标元素添加一个空的 `onclick=""`(<div class="target" onclick="">点击我!</div>)
- 把 `click` 改成 `touchend` 或 `touchstart`（注意加上preventDefault）
- 将 `click` 元素委托到非 `document` 或 `body` 的父级元素上
- 给目标元素加一条样式规则 `cursor: pointer;` (cursor: pointer; -webkit-tap-highlight-color: transparent;)

推荐后两种。推测在 Safari 中，不可点击元素的点击事件是不会冒泡到父级元素的。通过添加 `cursor: pointer;` 使得元素变成了可点击的了。

## 补充

---

### 问题

---

iOS系统 `input` 及 input内元素 `cursor: pointer;` 失效，使得在 iOS系统 上需要借助 `cursor` 属性才能生效的 `click` 事件无法触发

### 解决办法

- 设置 font-size: 0;
- 把 `click` 改成 `touchend` （注意加上preventDefault）

## 参考文档

- [https://github.com/facebook/react/issues/134](https://github.com/facebook/react/issues/134)
- [http://stackoverflow.com/questions/5421659/html-label-command-doesnt-work-in-iphone-browser/6472181#6472181](http://stackoverflow.com/questions/5421659/html-label-command-doesnt-work-in-iphone-browser/6472181#6472181)
