# Canvas之Api整理学习二

---

## 前言

---

```javascript

// 获取canvas容器
var canvas = document.getElementById('canvas')
// 创建一个画布
var ctx = canvas.getContext('2d')

```

所有操作都在画布 ctx 上进行操作

## 高级动画

---

html代码:

```html

<canvas id="canvas" width="400" height="200" style="background: #fff;"></canvas>

```

js代码:

```javascript

var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var ball = { //小球属性, 原点位置，速度，半径等
  x: 100,
  y: 100,
  vx: 4,
  vy: 2,
  radius: 20,
  color: 'blue',
  draw: function () {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.fillStyle = this.color
    ctx.fill()
  }
}

function draw () {
  ctx.clearRect(0, 0, canvas.width, canvas.height) //绘制之前清除整个画布
  ball.draw() // 在画布中绘制小球
  ball.x += ball.vx // 改变小球横向坐标
  ball.y += ball.vy // 改变小球纵向坐标

  if (ball.y + ball.vy > canvas.height - 15 || ball.y + ball.vy < 15)  {//边界检测
    ball.vy = -ball.vy
  }

  if (ball.x + ball.vx > canvas.width - 15 || ball.x + ball.vx < 15) { // 边界检测
    ball.vx = -ball.vx
  }

  window.requestAnimationFrame(draw)
}
draw()

```
