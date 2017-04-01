# let 与 const 作用域疑惑

---

[TOC]

## ES6 声明变量的六种方法

---

ES5 只有两种声明变量的方法: `var` 命令和 `function` 命令。

ES6 除了添加 `let` 和 `const` 命令, 还有 `import` 命令和 `class` 命令。

## 顶层对象的属性

---

顶层对象, 在浏览器环境指的是 `window` 对象, 在 Node 指的是 `global` 对象。 ES5 之中, 顶层对象的属性与全局变量是等价的。

例如:

```javascript
window.a = 1;
a // 1
a = 2
window.a // 2
```

ES6 为了改变这一点, 一方面规定, 为了保持兼容性, `var` 命令和 `function` 命令声明的全局变量, 依然是顶层对象的属性; 另一方面规定, `let` 命令、`const` 命令、`class` 命令声明的全局变量, 不属于顶层对象的属性。也就是说, 从 ES6 开始, 全局变量将逐步与顶层对象的属性脱钩。如:

```javascript
var a = 1
// 如果在Node的REPL环境, 可以写成 global.a
// 或采用通用方法, 写成 this.a
window.a // 1 (var 声明的变量, 属于顶级对象)

let b = 1
window.b // undefined (let/const 声明的变量, 不属于顶级对象)
```
