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
<!DOCTYPE html>
<html lang="en">

<head>
    <title>comp</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
    <div id="app">
        <input type="text" name="username" id="username" v-model="username" value=""> {{username}}
    </div>

    <script>
        function Compile(node, vm) {
            if (node) {
                this.$frag = this.nodeToFragment(node, vm)
                return this.$frag
            }
        }

        Compile.prototype = {
            nodeToFragment(node, vm) {
                const self = this
                const frag = document.createDocumentFragment()
                let child

                while (child = node.firstChild) {
                    self.compileElement(child, vm)

                    // 将所有属性添加到fragment中
                    frag.append(child)
                }

                return frag
            },

            compileElement(node, vm) {

                const reg = /\{\{(.*)\}\}/

                // 节点类型为元素
                if (node.nodeType === 1) {
                    const attr = Array.prototype.slice.call(node.attributes)

                    // 解析属性
                    attr.map((item, index) => {
                        if (item.nodeName === 'v-model') {
                            const name = item.nodeValue // 获取v-model绑定的属性名
                            node.addEventListener('input', e => {
                                // 给相应的 data 属性赋值, 进而触发该属性的set方法
                                vm.data[name] = e.target.value
                            })
                            node.value = vm.data[name] // 将data的值赋给该node
                            node.removeAttribute('v-model')
                        }
                    })
                }

                // 节点类型为text
                if (node.nodeType === 3) {
                    if (reg.test(node.nodeValue)) {
                        const name = RegExp.$1 // 获取匹配到的字符串
                        node.nodeValue = vm.data[name] // 将data的值赋给该node
                    }
                }
            }
        }

        function Vue(options) {
            this.data = options.data
            const data = this.data
            const id = options.el
            const dom = new Compile(document.getElementById(id), this)

            // 编译完成后, 将dom返回到app中
            document.getElementById(id).appendChild(dom)
        }

        const vm = new Vue({
            el: 'app',
            data: {
                username: 'Hello Kitty'
            }
        })
    </script>
</body>

</html>
```

## 五、实现简单的 Observe (Object.defineProperty)

---

简单的 Observe 定义如下:

```javascript
function defineReactive (obj, key, val) {
  Object.defineProperty(obj, key, {
    get () {
      console.log(`get val: ${val}`);
      return val
    },
    set (newVal) {
      if (val === newVal) {
        return
      }
      val = newVal
      console.log(`set val: ${val}`);
    }
  })
}

function observe (obj, vm) {
  Object.keys(obj).map((key) => {
    defineReactive(vm, key, obj[key])
  })
}
```

完整代码如下:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <title>comp</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
    <div id="app">
        <input type="text" name="username" id="username" v-model="username" value=""> {{username}}
    </div>

    <script>
        function Compile(node, vm) {
            if (node) {
                this.$frag = this.nodeToFragment(node, vm)
                return this.$frag
            }
        }

        Compile.prototype = {
            nodeToFragment(node, vm) {
                const self = this
                const frag = document.createDocumentFragment()
                let child

                while (child = node.firstChild) {
                    self.compileElement(child, vm)

                    // 将所有属性添加到fragment中
                    frag.append(child)
                }

                return frag
            },

            compileElement(node, vm) {

                const reg = /\{\{(.*)\}\}/

                // 节点类型为元素
                if (node.nodeType === 1) {
                    const attr = Array.prototype.slice.call(node.attributes)

                    // 解析属性
                    attr.map((item, index) => {
                        if (item.nodeName === 'v-model') {
                            const name = item.nodeValue // 获取v-model绑定的属性名
                            node.addEventListener('input', e => {
                                    // 给相应的 data 属性赋值, 进而触发该属性的set方法
                                    // vm.data[name] = e.target.value
                                    vm[name] = e.target.value // vm.data[name] => vm[name]
                                })
                                // node.value = vm.data[name] // 将data的值赋给该node
                            node.value = vm[name] // vm.data[name] => vm[name]
                            node.removeAttribute('v-model')
                        }
                    })
                }

                // 节点类型为text
                if (node.nodeType === 3) {
                    if (reg.test(node.nodeValue)) {
                        const name = RegExp.$1 // 获取匹配到的字符串
                            // node.nodeValue = vm.data[name] // 将data的值赋给该node
                        node.nodeValue = vm[name] // vm.data[name] => vm[name]
                    }
                }
            }
        }

        function defineReactive(obj, key, val) {
            Object.defineProperty(obj, key, {
                get() {
                    console.log(`get val: ${val}`);
                    return val
                },
                set(newVal) {
                    if (val === newVal) {
                        return
                    }
                    val = newVal
                    console.log(`set val: ${val}`);
                }
            })
        }

        function observe(obj, vm) {
            Object.keys(obj).map((key) => {
                defineReactive(vm, key, obj[key])
            })
        }

        function Vue(options) {
            this.data = options.data
            const data = this.data

            observe(data, this)

            const id = options.el
            const dom = new Compile(document.getElementById(id), this)

            // 编译完成后, 将dom返回到app中
            document.getElementById(id).appendChild(dom)
        }

        const vm = new Vue({
            el: 'app',
            data: {
                username: 'Hello Kitty'
            }
        })
    </script>
</body>

</html>
```

到这, 虽然 set 方法触发了, 但是文本节点 {{text}} 的内容没有变化, 要让绑定的文本节点同步变化, 我们需要引入订阅发布模式。

## 六、订阅发布模式

---

> 订阅发布模式(又称观察者模式)定义了一种一对多的关系, 让多个观察者同时监听某一个主题对象, 这个主题对象的状态发生改变时就会通知所有观察者对象。

发布者发出通知 => 主题对象收到通知并推送给订阅者 => 订阅者执行相应操作

- 首先我们要一个收集订阅者的容器, 定义一个 Dep 作为主题对象

```javascript
function Dep () {
  this.subs = []
}

Dep.prototype = {
  addSub (sub) {
    this.subs.push(sub)
  },
  notify () {
    this.subs.map(sub => {
      sub.update()
    })
  }
}
```

- 然后定义订阅者 Watcher

```javascript
function Watcher (vm, node, name, type) {
  Dep.target = this
  this.name = name
  this.node = node
  this.vm = vm
  this.type = type
  this.update()
  Dep.target = null
}

Watcher.prototype = {
  update () {
    this.get()
    this.node[this.type] = this.value // 订阅者执行相应操作
  },
  // 获取 data 的属性值
  get () {
    this.value = this.vm[this.name] // 触发相应属性的get
  }
}
```

- 添加订阅者 Watcher 到主题对象 Dep, 发布者发出通知放到属性监听里面

```javascript
function defineReactive(obj, key, val) {

    const dep = new Dep()

    Object.defineProperty(obj, key, {
        get() {

            // 添加订阅者 watcher 到主题对象 Dep
            if (Dep.target) {
              // JS的浏览器单线程特性, 保证这个全局变量在同一时间内, 只会有同一个监听器在使用
              dep.addSub(Dep.target)
            }

            console.log(`get val: ${val}`);
            return val
        },
        set(newVal) {
            if (val === newVal) {
                return
            }
            val = newVal
            console.log(`set val: ${val}`);

            // 作为发布者发出通知
            dep.notify()
        }
    })
}
```

- 最后需要订阅的地方

```javascript
compileElement(node, vm) {

    const reg = /\{\{(.*)\}\}/

    // 节点类型为元素
    if (node.nodeType === 1) {
        const attr = Array.prototype.slice.call(node.attributes)

        // 解析属性
        attr.map((item, index) => {
            if (item.nodeName === 'v-model') {
                const name = item.nodeValue // 获取v-model绑定的属性名
                node.addEventListener('input', e => {
                        // 给相应的 data 属性赋值, 进而触发该属性的set方法
                        // vm.data[name] = e.target.value
                        vm[name] = e.target.value // vm.data[name] => vm[name]
                    })
                    // node.value = vm.data[name] // 将data的值赋给该node
                // node.value = vm[name] // vm.data[name] => vm[name]

                new Watcher(vm, node, name, 'value')
                node.removeAttribute('v-model')
            }
        })
    }

    // 节点类型为text
    if (node.nodeType === 3) {
        if (reg.test(node.nodeValue)) {
            const name = RegExp.$1 // 获取匹配到的字符串
                // node.nodeValue = vm.data[name] // 将data的值赋给该node
            // node.nodeValue = vm[name] // vm.data[name] => vm[name]

            new Watcher(vm, node, name, 'nodeValue')
        }
    }
}
```

完整版代码:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <title>comp</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
    <div id="app">
        <input type="text" name="username" id="username" v-model="username" value=""> {{username}}
    </div>

    <script>
        function Compile(node, vm) {
            if (node) {
                this.$frag = this.nodeToFragment(node, vm)
                return this.$frag
            }
        }

        Compile.prototype = {
            nodeToFragment(node, vm) {
                const self = this
                const frag = document.createDocumentFragment()
                let child

                while (child = node.firstChild) {
                    self.compileElement(child, vm)

                    // 将所有属性添加到fragment中
                    frag.append(child)
                }

                return frag
            },

            compileElement(node, vm) {

                const reg = /\{\{(.*)\}\}/

                // 节点类型为元素
                if (node.nodeType === 1) {
                    const attr = Array.prototype.slice.call(node.attributes)

                    // 解析属性
                    attr.map((item, index) => {
                        if (item.nodeName === 'v-model') {
                            const name = item.nodeValue // 获取v-model绑定的属性名
                            node.addEventListener('input', e => {
                                    // 给相应的 data 属性赋值, 进而触发该属性的set方法
                                    // vm.data[name] = e.target.value
                                    vm[name] = e.target.value // vm.data[name] => vm[name]
                                })
                                // node.value = vm.data[name] // 将data的值赋给该node
                                // node.value = vm[name] // vm.data[name] => vm[name]

                            new Watcher(vm, node, name, 'value')
                            node.removeAttribute('v-model')
                        }
                    })
                }

                // 节点类型为text
                if (node.nodeType === 3) {
                    if (reg.test(node.nodeValue)) {
                        const name = RegExp.$1 // 获取匹配到的字符串
                            // node.nodeValue = vm.data[name] // 将data的值赋给该node
                            // node.nodeValue = vm[name] // vm.data[name] => vm[name]
                        new Watcher(vm, node, name, 'nodeValue')
                    }
                }
            }
        }

        function Dep() {
            this.subs = []
        }

        Dep.prototype = {
            addSub(sub) {
                this.subs.push(sub)
            },
            notify() {
                this.subs.map(sub => {
                    sub.update()
                })
            }
        }

        function Watcher(vm, node, name, type) {
            Dep.target = this
            this.name = name
            this.node = node
            this.vm = vm
            this.type = type
            this.update()
            Dep.target = null
        }

        Watcher.prototype = {
            update() {
                this.get()
                this.node[this.type] = this.value // 订阅者执行相应操作
            },
            // 获取 data 的属性值
            get() {
                this.value = this.vm[this.name] // 触发相应属性的get
            }
        }

        function defineReactive(obj, key, val) {

            const dep = new Dep()

            Object.defineProperty(obj, key, {
                get() {

                    // 添加订阅者 watcher 到主题对象 Dep
                    if (Dep.target) {
                        // JS的浏览器单线程特性, 保证这个全局变量在同一时间内, 只会有同一个监听器在使用
                        dep.addSub(Dep.target)
                    }

                    console.log(`get val: ${val}`);
                    return val
                },
                set(newVal) {
                    if (val === newVal) {
                        return
                    }
                    val = newVal
                    console.log(`set val: ${val}`);

                    // 作为发布者发出通知
                    dep.notify()
                }
            })
        }

        function observe(obj, vm) {
            Object.keys(obj).map((key) => {
                defineReactive(vm, key, obj[key])
            })
        }

        function Vue(options) {
            this.data = options.data
            const data = this.data

            observe(data, this)

            const id = options.el
            const dom = new Compile(document.getElementById(id), this)

            // 编译完成后, 将dom返回到app中
            document.getElementById(id).appendChild(dom)
        }

        const vm = new Vue({
            el: 'app',
            data: {
                username: 'Hello Kitty'
            }
        })
    </script>
</body>

</html>
```
