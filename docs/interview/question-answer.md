# 收集前端常见的面试题

---

## JS 部分

---

### 初级 JavaScript

- 怎样添加、移除、移动、复制、创建和查找节点（原生JS，实在基础，没细写每一步）

**1）创建新节点**

```javascript
createDocumentFragment() //创建一个DOM片段
createElement() //创建一个具体的元素
createTextNode() //创建一个文本节点
```


**2）添加、移除、替换、插入**

```javascript
appendChild() //添加
removeChild() //移除
replaceChild() //替换
insertBefore() //插入
```

**3）查找**

```javascript
getElementsByTagName() //通过标签名称
getElementsByName() //通过元素的Name属性的值
getElementById() //通过元素Id，唯一性
querySelector() // 返回找到的第一个, 不存在返回 null
querySelectorAll() // 返回所有, 类型是 NodeList。不存在返回长度为 0 的 NodeList
```

### 中级 JavaScript

- 原生JS的window.onload与Jquery的$(document).ready(function(){})有什么不同？如何用原生JS实现Jq的ready方法？

`window.onload()` 方法是必须要等到页面内包括所有元素加载完毕后才能执行。
`$(document).ready()` 是DOM结构绘制完毕后执行, 不必等到加载完毕。

```javascript
function ready (fn) {
  if (document.addEventListener) { // W3C
    document.addEventListener('DOMContentLoaded', function () {
      // 注销事件, 避免反复触发
      document.removeEventListener('DOMContentLoaded', arguments.callee, false)
    }, false)
  } else if (document.attachEvent) { // IE
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState == 'complete') {
        // 注销事件, 避免反复触发
        document.detachEvent('onreadystatechange', arguments.callee)

        // 函数执行
        fn()
      }
    })
  }
}
```
