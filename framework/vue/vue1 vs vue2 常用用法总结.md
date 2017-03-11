# vue1 vs vue2 常用用法总结

---

[TOC]

## 1.指令

---

### 循环

#### 循环数组

```javascript
<!-- Vue1 这么写-->
<li v-for="item in items"> 第 {{$index}} 条: {{item.message}}</li>
<div v-for="item in items" track-by="id"></div>

<!-- Vue2 这么写 -->
<li v-for="(item, index) in items">第 {{index}} 条: {{item.message}}</li>
<div v-for="item in items" v-bind:key="item.id"></div>

```

#### 循环对象

```javascript
<!-- Vue1 这么写 -->
<li v-for="(key, value) in obj"></li>

<!-- Vue2 这么写 -->
<li v-for="(value, key) in obj"></li>
```

#### 循环数字

```javascript
<!-- Vue1 从 0 开始, Vue2 从 1 开始 -->
<span v-for="n in 10">{{n}}</span>
```

### 条件

```javascript
<!-- 如果ok为false, 不输出在HTML中 -->
<div v-if="ok">Yes</div>
<div v-else>No</div>

<!-- 如果ok为false, 只是 display: none 而已 -->
<h1 v-show="ok">Hello!</h1>
```

## 2. 事件绑定

---

```javascript
<button v-on:click="say('hi')">点击</button>

<!-- 简写 -->
<button @click="say('hi')">点击</button>

<!-- 传入 event 对象 -->
<button @click="say('hi', $event)">点击</button>

<!-- 阻止单击事件冒泡 -->
<button @click.stop="doSth">点击</button>

<!-- 阻止默认行为 -->
<button @submit.prevent="doSth">单击</button>

<!-- 修饰符可以串联 -->
<a @click.stop.prevent="doThat"></a>

<!-- 按键修饰符: 回车才会执行 -->
<input @keyup.13="submit"><!-- 13 为 keycode -->
<input @keyup.enter="submit">
<!-- 支持的全部按钮为 enter, tab, delete, space, up, down, left, right 字母 -->

```

## 3. 表单的双向绑定

---

```javascript
<input type="text" v-model="message">
<!-- 自定义选中值。否则选中为value值, 不选为空 -->

<input
type="checkbox"
v-model="toggle"
v-bind:true-value="a"
v-bind:false-value="b"
>
```

## 4. 绑定属性

---

```javascript
<div v-bind:class="{ 'class-a': isA, 'class-b': isB }"></div>

<!-- classArr是一个数组 -->
<div v-bind:class="classArr"></div>

<!-- 简写 -->
<div :class="{ 'class-a': isA, 'class-b': isB }"></div>
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
<img :src="imgSrc">
<a :href="baseURL + '/path'"></a>
```

在 Vue2 中, 如果属性值是变量, 必须用绑定属性的写法。

```javascript
<!-- wrong -->
<img src="{{imgSrc}}">

<!-- right -->
<img :src="imgSrc">
```

## 5. 避免闪烁: v-cloak

---

```css
[v-cloak] {
  display: none;
}
```

```html
<div v-cloak>
{{message}}
</div>
```

不会显示 `<div>` 的内容, 直到编译结束。

## 6. 单向绑定

---

单向绑定的意思是, 即使绑定变量的值发生变化, 显式的内容仍旧就是最初绑定时候的值。

```javascript
<!-- Vue1 这么写 -->
<span>This will never change: {{* msg}}</span>

<!-- Vue2 不支持 -->

```

## 7. 输出HTML

---

```javascript
<!-- Vue1 这么写-->
<div>{{{ raw_html }}}</div> <!-- {{}} 中的 HTML 内容会转化为纯文本 -->
<!-- 或者 -->
<div v-html="raw_html"></div>


<!-- Vue2 这么写 -->
<div v-html="raw_html"></div>
```

## 8. 计算属性

---

```html
<div id="demo">{{ fullName }}</div>
```

```javascript
new Vue({
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```

## 9. 自定义指令

---

```javascript
Vue.directive('my-directive', {
  bind: function () {
    // 准备工作
    // 例如, 添加事件处理器或只需要运行一次的高耗任务
    this.el; // 添加指令的元素
    this.vm.$get(name); // 或得该指令的上下文 ViewModel
    this.expression; // 指令的表达式的值
  },
  update: function (newValue, oldValue) {
    // 值更新时的工作
    // 也会以初始值为参数调用一次
  },
  unbind: function () {
    // 清理工作
    // 例如, 删除 bind() 添加的事件监听器
  }
})
```

```html
<div v-my-directive="someValue"></div>
```

## 10. 监听数据变化

---

```javascript
new Vue({
  data: {
    firstName: 'Foo'
  },
  watch: {
    firstName: function (val, oldVal) {}
  }
})
```

## 11. 过滤器

---

```javascript
{{ msg | capitalize }} // 'abc' => 'Abc'
```

常见内置过滤器

`capitalize`, `uppercase`, `lowercase`, `json`, `limitBy`, `filterBy`。所有见[这里](http://cn.vuejs.org/api/#%E8%BF%87%E6%BB%A4%E5%99%A8)。

Vue2 中把这些内置的过滤器都删除了。

### 自定义过滤器

```javascript
Vue.filter('wrap', function (value, begin, end) {
  return begin + value + end
})
```

```html
<!-- 'hello' => 'before hello after' -->

<!-- Vue1 这么写 -->
<span v-text="message | wrap 'before' 'after'"></span>

<!-- Vue2 这么写 -->
<span v-text="message | wrap('before', 'after')"></span>
```

`this.$options.filters.filter名称` 可以获取到具体的 filter

## 12. 生命周期相关的钩子函数

---

```javascript
// Vue1
new Vue({
  created: function () {},
  beforeCompile: function () {},
  compiled: function () {},
  ready: function () {}, // DOM 元素已经加入到HTML中(可以在这里调用ajax获取数据)
  beforeDestroy: function () {},
  destroyed: function () {}
})

// Vue2
new Vue({
  created: function () {},
  mounted: function () {}, 相对于 Vue1 中的 ready
  beforeDestroy: function () {},
  destroyed: function () {}
})
```

## 13. 过渡效果

---

```html
<!-- Vue1 这么写 -->
<div v-if="show" transition="my-transition"></div>

<!-- Vue2 这么写 -->
<transition v-bind:name="my-transition">
  <!-- ... -->
</transition>
```

```css
/* 必须 */
.my-transition-transition {
  transition: all .3s ease;
}

/* .my-transition-enter 定义进入的开始状态 */
.my-transition-enter {}

/* .my-transition-leave 定义离开的结束状态 */
.my-transition-leave {}
```

## 14. 组件

---

Vue2 与 Vue1 的组件区别有点大。

### Vue1

#### 定义和调用组件

`this.$parent` 访问它的父组件。
`this.$root` 访问它的根组件。
`this.$children` 访问它的子组件。

## 15. 小技巧

### Vue.set 和 Vue.delete

用于解决 不能检测到属性添加、属性删除的限制。

### Vue.nextTick

```javascript
// 修改数据
vm.msg = 'Hello'

// DOM 没有更新
Vue.nextTick(function () {
  // DOM 更新了
})
```

Vue 在检测到数据变化时是异步更新 DOM 的。vm 上也有 `this.$nextTick`。

## 16. Vue 插件


### vue-resource(Vue2推荐使用 axois)

#### 拦截

```javascript
Vue.http.interceptors.push(function(request, next) {
  var data = request.data;
  // 添加 url 前缀
  request.url = serverPrefix + request.url;
  // 加请求参数
  request.data.sessionid = localStorage.getItem('sessionid');

  next(function (response) {
    if(登陆超时){
      setTimeout(function () {
        router.go('/login');
      });
    } else {
      // modify response
      response.body = '...';
    }
  });
});
```

#### 支持 Promise

```javascript
Vue.http.post('/someUrl', [optinos])
  .then(function(res) {
    var data = res.data;
    return new Promise(function(resolve, reject) {
      if (!data.error) {
        reject()
      } else {
        resolve(data);
      }
    }.bind(this));
  })
  .then(function(res) {
    var data = res.data;
    return new Promise(function(resolve, reject) {
      Vue.http.post('/someUrl', data).then(function (res) {
        if(res.data){
          resolve();
        }
      });
    }.bind(this));
  }, failFn)
  .then(succFn, failFn);
```
