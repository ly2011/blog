# JavaScript问题集锦

---

[TOC]

* [JavaScript问题集锦](#javascript问题集锦)
   * [1. 对象字面值不能正常解析](#1-对象字面值不能正常解析)
   * [2. 数字的点操作浮](#2-数字的点操作浮)
   * [3. 连等赋值问题(执行顺序: 从右到左)](#3-连等赋值问题执行顺序-从右到左)
   * [4. 逗号操作符(执行顺序: 从左到右)](#4-逗号操作符执行顺序-从左到右)
   * [5. parseInt 传入数字](#5-parseint-传入数字)
   * [6. 数组的展开/扁平](#6-数组的展开扁平)
   * [7. 使用 typeof bar === 'object' 判断 <code>bar</code> 是不是一个对象有神马潜在的弊端? 如何避免这种弊端?](#7-使用-typeof-bar--object-判断-bar-是不是一个对象有神马潜在的弊端-如何避免这种弊端)
   * [8. 浮点数精度问题](#8-浮点数精度问题)
   * [9. 实现函数 isInteger(x) 来判断 x 是否是整数](#9-实现函数-isintegerx-来判断-x-是否是整数)

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

## 4. 逗号操作符(执行顺序: 从左到右)

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

即逗号操作符会从 `左到右` 计算它的操作数, 返回最后一个操作数的值。 所以 `(temp.foo, temp.foo)();` 等价于 `var fun = temp.foo; foo();`, `fun` 调用时 `this` 指向 `window`, 所以返回 20.

## 5. parseInt 传入数字

---

**问题:**

`parseInt` 传入数字时为什么会有以下输出?

```javascript
parseInt(0.000008) // 0
parseInt(0.0000008) // 8
```

**原因:**

`parseInt(arg)` 时会调用 `arg.toString()`。

```javascript
(0.000008).toString() // '0.000008'
(0.0000008).toString() // '8e-7'
```


## 6. 数组的展开/扁平

---

**问题:**

`[1, 2, [4, 5]] ---> [1, 2, 3, 4, 5]`

```javascript
function flatten (arr) {
  if (!isArray(arr) || !arr.length) {
    return []
  } else {
    return Array.prototype.concat.apply([], arr.map(val => isArray(val) ? flatten(val) : val))
  }

  function isArray (arr) {
    if (!Array.isArray) {
      Array.isArray = function (arr) {
        return Object.prototype.toString.call(arr) == '[object Array]'
      }
    }
    return Array.isArray(arr)
  }
}

flatten([1, 2, 3, [4, 5]])

// [1, 2, 3, 4, 5]
```

**方法2: (array.toString())**

利用 `array.toString()` 然后重新解析也可以完成, 但是此时数组元素类型丢失。这种方法利用了 `ToString(array)` 会转换成 `'x, y, z...'` 。

## 7. 使用 `typeof bar === 'object'` 判断 `bar` 是不是一个对象有神马潜在的弊端? 如何避免这种弊端?

**问题:**

```javascript
const obj = {}
const arr = []

console.log(typeof obj === 'object'); // true
console.log(typeof arr === 'object'); // true
console.log(typeof null === 'object'); // true
```

**原因:**

从上面输出的结果来看, `typeof bar === 'object'` 并不能准确判断 `bar` 就是一个 Object。

**解决办法:**

可以通过 `Object.prototype.toString.call(bar) === '[object String]'` 来避免这种弊端:

```javascript
const obj = {}
const arr = []

console.log(Object.prototype.toString.call(obj)); // [object Object]
console.log(Object.prototype.toString.call(arr)); // [object Array]
console.log(Object.prototype.toString.call(null)); // [object Null]
```

## 8. 浮点数精度问题

---

**问题:**

```javascript
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 == 0.3); // false
```

**原因:**

javascript 中的 number 类型就是 浮点型, javascript 中的浮点数采用 `IEEE-754` 格式的规定, 这是一种二进制表示法，可以精确地表示分数, 比如 1/2, 1/8, 1/1024, 每个浮点数占 64位。
但是二进制浮点数表示法并不能精确的表示类似 0.1 这样简单的数字, 会有舍入误差。

由于采用二进制, javascript 也不能有限表示 1/10、1/2 等这样的分数。在二进制中. 1/10(0.1)被表示为 `0.00110011001100110011……` 注意 `0011` 是无限重复, 这是舍入误差造成的, 所以对于 0.1 + 0.2 这样的运算, 操作数会先被转成二进制, 然后再计算:

```javascript
0.1 => 0.0001 1001 1001 1001…（无限循环）
0.2 => 0.0011 0011 0011 0011…（无限循环）
```

双精度浮点数的 小数部分 最多支持 52 位, 所以两者相加之后得到这么一串 `0.0100110011001100110011001100110011001100...` 因浮点数小数位的限制而截断的二进制数字, 这时候, 再把它转为十进制, 就成了 `0.30000000000000004`。

对于保证浮点数计算的正确性, 有两种常见方式。

**一是先升幂在降幂:**

```javascript
function add (num1, num2) {
  let r1, r2, m

  r1 = ('' + num1).split('.')[1].length
  r2 = ('' + num2).split('.')[1].length

  m = Math.pow(10, Math.max(r1, r2))
  return (num1 * m + num2 * m) / m
}

console.log(add(0.1, 0.2));
console.log(add(0.15, 0.2256));
```

**二是使用内置的 `toPrecision()` 和 `toFixed()` 方法, 注意, 方法的返回值是字符串**

```javascript
function add (x, y) {
  return x.toPrecision() + y.toPrecision()
}
console.log(add(0.1 0.2)); // '0.10.2'
```

## 9. 实现函数 `isInteger(x)` 来判断 x 是否是整数

---

**解决办法:**

**方法一:**
可以将 `x` 转换成 10 进制, 判断和本身是不是相等即可:

```javascript
function isInteger (x) {
  return parseInt(x, 10) === x
}
```

**方法二:**

ES6 对数值进行了扩展, 提供了静态方法 `isInteger()` 来判断参数是否是整数(并提供了 `Number.isSafeInteger()` 来判断整数是否是安全型整数):

```javascript
Number.isInteger = Number.isInteger || function (value) {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value
}
```
