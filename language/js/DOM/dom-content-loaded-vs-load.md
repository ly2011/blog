# 事件DOMContentLoaded和load的区别

---

它们的区别是, 触发的时机不一样, 先触发 `DOMContentLoaded` 事件, 后触发 load 事件。

**DOM文档加载的步骤为:**

- 1. 解析 HTML 结构

- 2. 加载外部脚本和样式表文件

- 3. 解析并执行脚本代码

- 4. DOM 数构建完成。 // DOMContentLoaded

- 5. 加载图片等外部文件

- 6. 页面加载完毕 // load
