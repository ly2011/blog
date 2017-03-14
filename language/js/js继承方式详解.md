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

```
