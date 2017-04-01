# Window API 接口

---

## `Window.getComputedStyle()`

`Window.getComputedStyle()` 方法会在一个元素应用完有效样式且计算完所有属性值之后给出所有 CSS 属性的值

**语法:**

```javascript
let style = window.getComputedStyle(element, [pseudoElt])
```

- element: 用于获取计算样式的 element(非节点元素, 例如一个 #text 节点, 将会抛出一个错误 )

- pseudoElt: 指定一个要匹配的伪元素的字符串。必须对普通元素省略(或 null)
