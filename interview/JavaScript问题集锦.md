# JavaScript问题集锦

---

[TOC]

## 1. 对象字面值不能正常解析

---

**问题:**

`{a:1}.a` 报错, 错误 `Uncaught SyntaxError: Unexpected token :`。

**解决:**

```javascript
({a: 1}.a) // 或 ({a: 1}).a
```

**原因:**

简单说, 就是声明对象字面值时, 语句开头不应该用 `{`, 因为 js 解析器会认为这是语句块 (`block`) 的开始。

同理, 类似问题 `{ id: 1, name: 'ly' }` 会报错 `Uncaught SyntaxError: Unexpected token :` 也是这个道理。
`({ id: 1, name: 'ly' })` 即可正确解析。但是注意, `{ name: 'ly' }` 是不会报错的, 它等同于 `name: 'ly'`, 并返回一个字符串 `'ly'`。

## 2. 数字的点操作浮

---

**问题:**

`123.toFixed(2)` 报错, 错误 `Uncaught SyntaxError: Invalid or unexpected token`

**解决:**

```javascript
(123).toFixed(2) // "123.00"

// 以下两种都可以, 但是不推荐
123..toFixed(2)
123 .toFixed(2)
```

**原因:**

很简单, js 解析器会把数字后面的 `.` 当做小数而不是点操作符。

## 3. 连等赋值问题(执行顺序: 从右到左)

---

**问题:**

尝试解析下连等赋值的过程。下面的代码为什么是这样的输出?

```javascript
var a = { n: 1 }
var b = a
a.x = a = { n: 2 }
console.log(a.x) // undefined
console.log(b.x) // { n: 2 }
```

**原因:**

我们可以尝试交换下连等赋值顺序 (`a = a.x = { n: 2 };`), 可以发现输出不变, 即顺序不影响结果。

那么现在来解析对象连等赋值的问题: 按照 [es5规范](https://es5.github.io/#x11.13), 题中连等赋值等价于 `a.x = (a = {n: 2});`, 按优先获取左引用 (`lref`),
然后获取右引用 (`rref`) 的顺序, `a.x` 和 `a` 中的 a 都指向了 `{n: 1}`。

拆分:

实际执行过程: 从右到左, a先被赋值为 `{ n: 2 }`, 随后 `a.x` 被赋值 `{ n: 2 }`

```javascript
a = { n: 2 }
a.x = { n: 2 }
```

等价于:

```javascript
a.x = (a = { n: 2 })
```

另一道题:

```javascript
function fun () {
  var a = b = 5
}
fun()
console.log(typeof a) // undefined
console.log(typeof b) // number
```

[写了10年Javascript未必全了解的连续赋值运算](http://yanhaijing.com/javascript/2012/04/05/javascript-continuous-assignment-operator/)

## 4. 逗号操作符(执行顺序)

---

**问题:**

下面的代码返回什么, 为什么?

```javascript
var x = 20
var temp = {
  x: 40,
  foo: function () {
    var x = 10
    return this.x
  }
}
(temp.foo, temp.foo)() // 20, 而不是40
```

**原因:**

即逗号操作符会从 左到右 计算它的操作数, 返回最后一个操作数的值。 所以 `(temp.foo, temp.foo)();` 等价于 `var fun = temp.foo; foo();`, `fun` 调用时 `this` 指向 `window`, 所以返回 20.

## 5. parseInt 传入数字

---

**问题:**
