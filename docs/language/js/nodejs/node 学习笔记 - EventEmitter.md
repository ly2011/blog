# node 学习笔记 - EventEmitter

---

## 自定义事件类

感觉叫 触发器 反而更贴切，先来写个简单代码吧。

```
var EventEmitter = require('events');
var util = require('util');

function MyEmitter() {
  EventEmitter.call(this);
}

util.inherits(MyEmitter, EventEmitter);

var myEmitter = new MyEmitter();

myEmitter.on('event', function() {
  console.log('事件触发成功!');
});

myEmitter.emit('event');

```

上面这个是官方例子，如果你用的是 node 0.10.x，需要通过 `require('events').EventEmitter` 来引入。
当然如果你喜欢 es6 风格，那就更方便了。

```
import EventEmitter from 'events';

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('event', function() {
  console.log('事件触发成功!');
});

myEmitter.emit('event');

```

这里定义了一个 MyEmitter 事件类，他继承了 `EventEmitter` 所有属性方法，接下来我们来试试他的各个属性方法吧。

## 添加事件

其实跟 jQuery 一样，直接 on 方法绑定即可，但是没 jQuery 的 on 那么复杂，这里只有 2 个参数。

> **语法：**
>
> - emitter.addListener(event, listener)
> - emitter.on(event, listener) // emitter.addListener 别名

```
myEmitter.on('吃午饭', function () {
  console.log('努力的吃午饭中...');
});

myEmitter.on('干活', function () {
  console.log('努力的码代码中...');
});

myEmitter.emit('吃午饭');
myEmitter.emit('干活');

```

这里定义了 `吃午饭` 和 `干活` 事件，他们是同步的，根据你触发的顺序执行，也就是先吃完饭，然后干活，这样容易控制逻辑。也可以传入参数，比如：吃饭1小时，分2次干活2小时。

```
myEmitter.on('吃午饭', function (time) {
  console.log('吃饭' + time + '小时', '努力的吃午饭中...');
});

myEmitter.on('干活', function (time) {
  console.log('干活' + time + '小时', '努力的码代码中...');
});

// 休息下

myEmitter.on('干活', function (time) {
  console.log('继续干活' + time + '小时', '努力的码代码中...');
});

myEmitter.emit('吃午饭', 1); // 吃饭1小时 努力的吃午饭中...
myEmitter.emit('干活', 2); // 干活2小时 努力的码代码中...
                          // 继续干活2小时 努力的码代码中...

```

同步可以确保同类事件根据注册顺序执行，如果你的情况允许异步，可以通过 `setImmediate()` 或 `process.nextTick()` 处理。

```
myEmitter.on('吃午饭', function () {
  setImmediate(function () {
    console.log('努力的吃午饭中...');
  });
});

```

还有一个只绑定一次事件，执行一次后就自动移除。

```
myEmitter.once('吃午饭', function () {
  console.log('努力的吃午饭中...');
});

myEmitter.emit('吃午饭'); // 努力的吃午饭中...
myEmitter.emit('吃午饭'); // 触发不了，事件已经移除了，但是也不会报错

```

## 特殊事件

`EventEmitter` 提供了 `newListener`, `removeListener` 事件给我们，看名字就知道分别是添加事件个移除事件时触发的。

说是特殊事件吧，其实也不算，因为要我们自己添加该事件，`EventEmitter` 只是在合适的时候触发他们而已。

```
myEmitter.on('newListener', function (event, listener) {
  // event 是事件名, listener 是该事件回调函数
  console.log('新事件:', event);
});

myEmitter.on('removeListener', function (event, listener) {
  // event 是事件名, listener 是该事件回调函数
  console.log('移除事件:', event);
});

function fn() {}

myEmitter.on('hehe', fn); // 新事件: hehe
myEmitter.removeListener('hehe', fn); // 移除事件: hehe

```

还有个 `removeAllListeners` 方法，不过他会默认保留 `removeListener` 事件。

## 错误事件

这个事件比较特殊，官方文档说用 `process.on('uncaughtException')` 或 domain 模块，但同时说 domain 已被弃用了。

```
process.on('uncaughtException', function (err) {
  console.log('whoops! there was an error');
});

myEmitter.emit('error', new Error('whoops!'));

```

我测试后发现，其实 `process.on('uncaughtException')` 是捕获任何 `throw`，而且代码也随之终止。
还是正常点，注册个 `error` 事件安心点。

```
myEmitter.on('error', function (err) {
  console.log('whoops! there was an error');
});

myEmitter.emit('error', new Error('whoops!'));
myEmitter.emit('error', new Error('whoops!'));

```

这样，多次触发错误事件都没问题，因为他只当事件处理，而不是抛出异常。而且 myEmitter 内部发生的一切错误都会调用 `error` 来处理。

## 其他属性或方法

> 方法
>
> - EventEmitter.listenerCount(emitter, event) 获取指定事件数量 (不推荐)
> - emitter.listenerCount(event) 获取指定事件数量
> - emitter.listeners(event) 获取指定事件句柄 (函数或函数数组)
> - emitter.getMaxListeners() 获取最多能绑定的同类事件数
> - emitter.setMaxListeners(n) 设置最多能绑定的同类事件数
>
> 属性
>
> - EventEmitter.defaultMaxListeners 默认最多能绑定的同类事件数
