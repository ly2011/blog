# js 继承方式详解

---

[TOC]

## 1. js 继承的概念

---

`js` 里常用的两种继承方式

```txt
- 原型链继承 (对象间的继承)

- 类式继承 (构造函数间的继承)
```

`js` 不是真正面向对象的语言, `js` 是基于对象的, 没有类的概念。
所以要想实现继承, 可以用 `js` 的原型 `prototype` 机制或者用 `apply` 和 `call` 方法去实现。

## 2. 原型式继承与类式继承

---

`类式继承` 是在子类型构造函数的内部调用超类型(父类)的构造函数。
严格的类式继承并不是很常见, 一般都是组合着用:

```javascript
function Super () {
  this.colors = ['red', 'blue']
}

function Sub () {
  Super.call(this)
}
```

`原型式继承` 是借助已有的对象创建行的对象, 将子类的原型指向父类, 相当于加入了父类这条原型链。

## 3. 原型链继承

---

为了让子类继承父类的属性(也包括方法), 首先需要定义一个构造函数。然后, 将父类的新实例赋值给构造函数的原型。实例如下:

>注意: 原型链继承这种方式不能直接使用 `prototype` 属性来表示父类是谁, 而是使用 `getPrototypeOf()` 方法来知道父类是谁。
>例如: Object.getPrototypeOf(Child.prototype).constructor     //显示 function Parent() {
  this.name = 'ly'
}

```javascript
function Parent() {
  this.name = 'ly'
}
function Child() {
  this.age = 20
}

Child.prototype = new Parent() // Child继承Parent, 通过原型, 形成链条
Child.prototype.constructor = Child
const child = new Child()

console.log(child.age);
console.log(child.name); // 得到被继承的属性

// 继续原型链继承
function Brother () {
  this.weight = 60
}

Brother.prototype = new Child() // 继续原型链继承
Brother.prototype.constructor = Brother
const brother = new Brother()

console.log(brother.name); // 继承了 Parent 和 Child, 弹出 ly
console.log(brother.age); // 20

```

**原型继承的问题:**

- 一是字面量重写原型会中断关系, 使用引用类型的原型

- 二是子类型没法给超类型(父类)传递参数

**解决办法:**

伪类解决引用共享和超类型没法传参的问题, 可以采用 **"借用构造函数"** 技术

### 借助构造函数 (类式继承)

```javascript
function Parent (age) {
  this.name = ['ly', 'tom', 'baby']
  this.age = age
}

function Child (age) {
  Parent.call(this, age)
}

const child = new Child(20)
console.log(child.age); // 20
console.log(child.name); // [ly, tom, baby]
child.name.push('杰伦')
console.log(child.name); // [ly, tom, baby, 杰伦]
```

**借助构造函数的缺点:**
借助函数虽然解决了刚才两个问题, 但是没有原型, 则复用无从谈起, 所以我们需要采用 `原型链 + 借助构造函数` 的模式,这种模式称为 `组合继承`。

### 组合继承(超类型在使用的过程中会被调用两次)

```javascript
function Parent (age) { // 构造函数
  this.name = ['ly', 'tom', 'baby']
  this.age = age
}

Parent.prototype.run = function () {
  return `${this.name} are both ${this.age}`
}

function Child (age) { // 构造函数
  Parent.call(this, age) // 对象冒充, 给超类型传参(第二次调用超类型)
}

Child.prototype = new Parent() // 原型链继承(第一次调用超类型)
const child = new Child(20) // 写 new Parent(20) 也行
console.log(child.run()); // 'ly', 'tom', 'baby' are both 21
```

**组合继承的原理:**

使用原型链实现对原型属性和方法的继承, 而通过借助构造函数来实现对实例属性的继承。

## 4. call 和 apply

---

全局函数 `apply` 和 `call` 可以用来改变函数中 `this` 的指向, 如下:

```javascript
// 定义一个全局函数
function foo () {
  console.log(this.fruit);
}

// 定义一个全局变量
var fruit = 'apple' // (若是 const/let, 则 foo.apply(window) 为undefined, 具体原因是由于 let/const造成的, ES6规定: `var` 命令和 `function` 命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，`let` 命令、`const` 命令、`class` 命令声明的全局变量，不属于顶层对象的属性)

// 定义一个对象
var pack = {
  fruit: 'orange'
}

// 等价于window.foo()
foo.apply(window) // 'apple', 此时foo中的 this 等于 window

foo.apply(pack) // 'orange', 此时foo中的 this 等于 pack
```
