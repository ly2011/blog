# nodejs使用fs模块做文件copy的四种方法

---

[TOC]

首先引入文件模块: `const fs = require('fs')`

## 方法1

```javascript
function copy (src, target) {
  console.log(target);
  fs.writeFileSync(target, fs.readFileSync(src))
}
```

**特点:**

- 代码简短清晰

- 同步读取文件, 容易阻塞

- 读取大文件时, 容易内存溢出

- 尝试复制一个 1.5G 的电影, 结果内存轻松溢出如图

![](https://camo.githubusercontent.com/44a5d82a6f565b295ea175926644bbf21ae773d1/687474703a2f2f7069632e7975706f6f2e636f6d2f63636b696e672f4551696236484d392f346742787a2e706e67)

## 方法2(fs.on() 方法不存在了)

```javascript
function copy (src, target) {
  const rs = fs.createReadStream(src)
  ws = fs.createWriteStream(target)

  fs.on('data', chunk => {
    console.log('read');
    ws.write(chunk, () => {
      console.log('write');
    })
  })

  fs.on('end', () => {
    console.log('finish');
    ws.end()
  })
}
```

**特点:**

- 读取大文件时不太容易导致内容溢出

- 代码比较复杂

- 由于读取和写入的速度不一样, 同样存在内存溢出的风险, 不过相对 方法一 好了很多

## 方法三

基于 方法2 改进

```javascript
function copy (src, target) {
  const rs = fs.createReadStream(src)
  ws = fs.createWriteStream(target)

  fs.on('data', chunk => {
    console.log('read');
    if (ws.write(chunk, () => {
      console.log('write');
    }) === false) {
      // 暂停
      rs.pause()
    } else {
      // 恢复
      rs.resume()
    }
  })

  fs.on('end', () => {
    console.log('finish');
    ws.end()
  })
}
```

**特点:**

- 同步了读取和写入的速度, 没有内存溢出的风险

- 代码比较复杂

## 方法四

node 支持 `pipe` 方法, 类似于管道, 将读取出来的内容通过管道写入到目标文件中

```javascript
function copy (src, target) {
  fs.createReadStream(src).pipe(fs.createWriteStream(target))
}
```

**特点:**

- 代码简洁

- 没有内存溢出的风险
