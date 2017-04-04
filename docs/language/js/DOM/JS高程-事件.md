# JS高程-事件

---

## 事件流

---

事件流描述的是从页面中接收事件的顺序。

- IE的事件流是事件冒泡流

- Netscape Communicator的事件流是事件捕获流

### 事件冒泡

---

IE的事件流叫做 **事件冒泡** (event bubbing), 即事件开始时由最具体的元素(文档中嵌套层次最深的那个节点)接收, 然后逐级向上传播到较为不具体的节点(文档)。以下面的HTML页面为例:

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <title>demo</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
  <div id="myDiv">Click Me</div>
</body>

</html>
```

如果你单击了页面中的 div元素, 那么这个click事件就会按照如下顺序传播:

(1) <div>
(2) <body>
(3) <html>
(4) document

也就是说, click事件首先在<div>元素上发生, 而这个元素就是我们单击的元素。然后,click事件
沿DOM树向上传播,在每一级节点上都会发生,直至传播到document对象。

>所有现代浏览器都支持事件冒泡,但是在具体实现上还是有一些区别。
>1. IE5.5及更早版本中的事件冒泡会跳过<html>元素(从<body>直接跳到document)
>2. IE9、Firefox、chrome和Safari则将事件一直冒泡到window对象。

### 事件捕获

---

Netscape Communicator团队提出的另外一种事件流叫做 **事件捕获** (event capuring)。

事件捕获的思想是不太具体的节点应该更早接收到事件, 而更具体的节点应该最后收到事件。如果仍然以前面的HTML页面作为演示事件捕获的例子, 那么单击<div>元素就会以下列顺序触发click事件。

(1) document
(2) <html>
(3) <body>
(4) <div>

在事件捕获过程中,document对象首先接收到click事件, 然后沿DOM树向下,一直传播到事件的实际目标,即<div>元素。

IE9、Safari、chrome、Opera、Firefox也支持这种事件流模型。

>推荐使用 **事件冒泡**, 在有特殊需要时再使用 事件捕获 。

### DOM事件流

---

"DOM2级事件" 规定的事件流包括三个阶段：**事件捕获阶段**、**处于目标阶段**、**事件冒泡阶段**。首先发生的是事件捕获, 为截获事件提供了机会。然后是实际的目标接收到事件。最后一个阶段是冒泡阶段, 可以在这个阶段对事件做出响应。

在DOM事件流中,实际的目标(div元素)在捕获阶段不会接收到事件。这意味着在捕获阶段, 事件从 document 到<html>再到<body>后就停止了。下一个阶段是 "处于目标" 阶段, 于是事件在<div>上发生, 并在事件处理中被看成是冒泡阶段的一部分。然后, 冒泡阶段发生, 事件又传播回文档。

神奇的是: 大多数支持DOM事件流的浏览器都实现了一种特定的行为: 即使 "DOM2级事件" 规范明确要求捕获阶段不会涉及事件目标, 但IE9、Safari、Chrome、Fireox和Opera9.5以及更高版本都会在捕获阶段触发事件对象上的事件。结果，就是有 **两个机会** 在目标对象上操作事件。

>IE9、Safari、Chrome、Fireox和Opera都支持DOM事件流;IE8以及更早版本不支持DOM事件流。


## 事件处理程序

---

事件就是用户或浏览器自身执行的某种动作。如: click、load和mouseover,都是事件的名称。而响应某个事件的函数就叫做**事件处理程序(或事件监听器)**。事件处理程序的名字以 **on** 开头。

### HTML事件处理程序

### DOM0级事件处理程序

---

通过JavaScript指定事件处理程序的传统方式, 就是将一个函数赋值给一个事件处理程序属性。

每个元素(包括window和document)都有自己的事件处理程序属性, 这些属性通常全部小写,例如: onclick。

```javascript

var btn = document.getElementById('myBtn')
btn.onclick = function () {
  alert('Clicked')
  console.log(this.id) // <- "myBtn"
}

```

>使用 DOM0 级方法指定的事件处理程序被认为是元素的方法。因此, 这时候的事件处理程序实在元素的作用域中运行；换句话说,程序中的this引用当前元素。


**删除事件处理程序**

```javascript

btn.onclick = null

```

#### DOM2级事件处理程序

---

"DOM2级事件"定义了两个方法, 用来处理指定和删除事件处理程序的操作: `addEventListener()` 和 `removeEventListener()`。所有DOM节点中都包含这两个方法, 并且它们都接受 3 个参数: 要处理的事件名、作为事件处理程序的函数和一个布尔值。最后这个布尔值参数如果是 true, 表示在捕获阶段调用事件处理程序;如果是false, 表示在冒泡阶段调用事件处理程序(默认为false)。

例如:在按钮上为 click 事件添加事件处理程序:

```javascript

var btn = document.getElementById('myBtn')
btn.addEventListener('click', function () {
  console.log(this.id) // <- "myBtn"
}, false)

```

>与 DOM0 级方法一样, 这里添加的事件处理程序也是在其依附的元素的作用域中运行。

使用 DOM2 级方法添加事件处理程序的主要好处是可以添加多个事件处理程序(会按照添加它们的顺序触发)。

```javascript

var btn = document.getElementById('myBtn')
btn.addEventListener('click', function () {
  console.log(this.id)
}, false)

btn.addEventListener('click', function () {
  console.log('Hello World!')
}, false)

```

通过 `addEventListener()` 添加的事件处理程序只能使用 `removeEventListener() ` 来移除；移除时传入的参数与添加处理程序时使用的参数相同。也就意味着通过 `addEventListener()` 添加的匿名函数将无法移除;如:


**错误:**

```javascript

var btn = document.getElementById('myBtn')
btn.addEventListener('click', function () {
  console.log(this.id)
}, false)

btn.removeEventListener('click', function () { // 没有用！
  console.log(this.id)
}, false)
```

**正确**

```javascript

var btn = document.getElementById('myBtn')

var handler = function () {
  console.log(this.id)
}

btn.addEventListener('click', handler, false)

btn.removeEventListener('click', handler, false) // 有效

```

推荐将事件处理程序添加到事件流的冒泡阶段(最大限度地兼容各种浏览器)

> IE9、Firefox、Safari、Chrome、Opera支持DOM2级事件处理程序
