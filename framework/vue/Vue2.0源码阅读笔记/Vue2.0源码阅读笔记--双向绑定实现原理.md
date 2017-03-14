# Vue2.0源码阅读笔记--双向绑定实现原理

---

[TOC]

## 一、实现双向绑定的做法

---

前端MVVM最令人激动的就是双向绑定机制了, 实现双向绑定的做法大致有如下三种:

### 1. 发布者-订阅者模式(backbone.js)

> 思路：使用自定义的data属性在HTML代码中指明绑定。所有绑定起来的JavaScript对象以及DOM元素都将“订阅”一个发布者对象。任何时候如果JavaScript对象或者一个HTML输入字段被侦测到发生了变化，我们将代理事件到发布者-订阅者模式，这会反过来将变化广播并传播到所有绑定的对象和元素。

### 2. 脏值检查(angular.js)

> 思路: angular.js 是通过脏值检测的方式比对数据是否有变更, 来决定是否更新视图, 最简单的方式就是通过 setInterval() 定时轮询检测数据变动, angular 只有在特定的事件触发时进入脏值检测, 大致如下:
> - DOM事件, 比如 用户输入文本, 点击按钮等。(ng-click)
> - XHR响应事件($http)
> - 浏览器 location 变更($location)
> - Timer 事件 ($timeout, $interval)
> - 执行 $digest() 或 $apply

### 数据劫持(Vue.js)

> 思路: Vue.js 采用数据劫持结合发布者-订阅者模式的方式, 通过 Object.defineProperty() 来劫持各个属性的 setter、getter, 在数据变动时发布消息给订阅者, 触发相应的监听回调。

## 二、Object.defineProperty()

---

demo:

```javascript
const obj = {}
Object.defineProperty(obj, 'hello', {
    get() {
        console.log(`get val: ${val}`);
        return val
    },
    set(newVal) {
        val = newVal
        console.log(`set val: ${val}`);
    }
})

obj.hello = 'welcome to 皮皮虾乐园'
obj.hello
```

## 三、实现简单的双向绑定

---

demo:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <title>demo</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
    <div id="app">
        <input type="text" id="username" name="username" value="">
        <br>
        <span id="show_name"></span>
    </div>

    <script>
        const obj = {}
        Object.defineProperty(obj, 'hello', {
            get() {
                console.log(`get val: ${val}`);
                return val
            },
            set(newVal) {
                val = newVal
                console.log(`set val: ${val}`);
                document.getElementById('username').value = val
                document.getElementById('show_name').innerHTML = val
            }
        })

        document.addEventListener('keyup', e => {
            obj.hello = e.target.value
        })
    </script>
</body>

</html>
```

上面的例子直接用了 dom 操作改变了文本节点的值, 而且是在我们知道是哪个 id 的情况下, 通过 document.getElementById() 获取到相应的文本节点, 然后直接修改了文本节点的值, 这种做法是最简单粗暴的。

若要封装成一个框架, 肯定不能是这种做法, 我们需要一个解析 dom, 并能修改 dom 中相应的变量的模块。

## 四、实现简单 Compile

---

首先我们需要获取文本真实的 dom 节点, 然后再分析节点的类型, 根据节点类型做对应的处理。

在上面的例子中, 我们多次操作了 dom 节点, 为提高性能和效率, 会先将所有的节点转换成文档碎片 fragment 进行编译操作, 解析操作完成后, 再将 fragment 添加到原来的真实 dom 节点中。

```html

```
