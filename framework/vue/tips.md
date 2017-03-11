# 使用 Vue 的注意点

---

- 组件中的 `data` 必须是函数

```javascript
Vue.component('my-component', {
  template: '<span>{{ message }}</span>',
  data: function () {
    return {
      message: 'hello'
    }
  }
})
```

- 属性传值

用字面量语法给组件传值的话, 值会转换成字符串, 如

```html
<comp some-prop="{ a: 3 }"></comp>
```

上面的代码传入的是字符串 `{a: 3}`, 而不是对象。如果要传入非字符串或变量, 需要用动态 prop 的语法: `v-bind`。上面的代码可以这样写:

```html
<comp v-bind:some-prop="{ a: 3 }"></comp>

<!-- 简写 -->
<comp :some-prop="{ a: 3 }"></comp>
```

- 组件命名约定

注册组件 (或者 props ()) 时, 可以使用 kebab-case (短横线隔开)

```javascript
component: {
  // 使用 kebab-case 形式注册
  'kebab-cased-component': {},
  // 使用 驼峰形式注册
  'camelCasedComponent': {},
  // 使用首字母大写的形式注册
  'TitleCasedComponent': {}
}
```

在 HTML 模板中, 请使用 kebab-case 形式:

```html
<!-- 在HTML模板中始终使用 kebab-case -->
<kebab-cased-component></kebab-cased-component>
<camel-cased-component></camel-cased-component>
<title-cased-component></title-cased-component>
```

- navtive 修饰符

在 Vue2 中的自定义组件上使用 `v-on` 只会监听自定义事件 (即组件用 `$emit` 触发的事件)。如果要监听原生事件, 必须使用 `.navtive` 修饰符, 如:

```html
<my-component @click.native="handleClick"></my-component>
```
