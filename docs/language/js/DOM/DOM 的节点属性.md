# DOM的节点属性

---

## 什么是DOM

---

DOM 的全称：Document Object Model, 即文档对象模型。DOM把一份文档表示为一棵树，是由节点(node)构成的一棵节点树。

## 关于节点

---

DOM中有许多不同类型的节点。其中最重要的有三种：元素节点(element node)，文本节点(text node) 和 属性节点(attribute node)。

### 元素节点

元素节点是DOM的原子，比如 `<body>`, `<p>` 和 `<ul>` 等。
元素可以包含其他元素。唯一没有被其他元素包含的元素是 `<html>` 元素，它是DOM元素的根元素。

### 文本节点

比如 `<p>it is a test</p>`, "it is a test" 就是一个文本节点。
文本节点总是包含在元素节点内部。

"it is a test" 是 `<p>` 节点内的第一个子节点，所以 `p.nodeValue` 将是一个 null 值，应该写成 `p.childNodes[0].nodeValue`，才能取得 "it is a test"。

### 属性节点

比如 `<p title="logo">it is a test</p>`, `title="logo"` 就是属性节点，用来对元素做出更具体的描述。
属性总是被放在开始标签里，所以属性节点总是被包含在元素节点中。

## DOM操作

---

### getElementById

这个方法返回一个与那个有着给定 id 属性值的节点对应的对象。

### getElementsByTagName

这个方法返回一个对象数组，每个对象对应着这个标签的一个元素。

可以使用数组的 `length` 方法，document.getElementsByTagName("li").length。

### getElementsByClassName

这是HTML5 DOM中新增的一个方法。接受类名参数返回一个具有相同类名的元素的数组，同样可以使用数组方法 `length`。

### getAttribute

这个方法只有一个参数--打算查询的属性的名字。

### setAttribute

这个方法接收两个参数，第一个是要修改的属性名字，第二个是做出的修改的值。

```

object.setAttribute(attribute, value)

```

### childNodes属性

childNodes 属性可以用来获取任何一个元素的所有子元素，它是一个包含这个元素全部子元素的数组，同样，它支持 `length` 方法：

```

element.childNodes

```

### nodeType属性

每一个节点都有 `nodeType` 属性。这个属性可以让我们知道自己正在与哪一种节点打交道。

```

node.nodeType

```

差劲的是 `nodeType` 的值并不是文字，而是数字。

`nodeType` 属性总共有12种可取值，但其中仅有3种具有使用价值：

- `元素节点` 的 nodeType 属性值是 `1` 。
- `属性节点` 的 nodeType 属性值是 `2` 。
- `文本节点` 的 nodeType 属性值是 `3` 。

### nodeValue 属性

如果想改变一个文本节点的值，那就是用 DOM 提供的 nodeValue 属性，它用来得到（和设置）一个节点的值：

```

node.nodeValue

```

### firstChild 和 lastChild 属性

```

node.firstChild

```

这种写法完全等价于：

```
node.childNodes[0]
```

而相对应的

```
node.lastChild
```

等价于：

```
node.childNodes[node.childNodes.length - 1]
```
