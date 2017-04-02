# Canvas之Api整理学习一

---

## 前言

---

假设html代码中有一个canvas标签:

```html

<canvas id="canvas">您的浏览器不支持canvas！</canvas>

```

```javascript

// 获取canvas容器
var canvas = document.getElementById('canvas')

// 创建一个画布
var ctx = canvas.getContext('2d')

```

获取canvas容器的宽高

```javascript

var width = canvas.width
var height = canvas.height

```

>注:canvas只是一个容器, 本身没有绘制能力, 所以我们需要得到一个画布 `ctx`。

## 绘制

---

- 绘制一个矩形

  **语法：**

```javascript

// 填充矩形(x, y 是横纵坐标,原点在canvas的左上角)
ctx.fillRect(x, y, width, height)
// 边框矩形, 默认1px黑色
ctx.strokeRect(x, y,width, height)
// 清除指定的矩形区域,变为透明
ctx.clearRect(x, y, width,height) //绘制动态效果时，常用来清除整个画布

```

- 绘制路径

```javascript

// 新建路径,beiginPath是绘制新图形的开始
ctx.beiginPath()
// 路径(线)的起点, 一般在上面这条命令后执行
ctx.moveTo(x, y)
// 线的终点
ctx.lineTo(x, y)
// 绘制圆形
ctx.arc(x, y, r, start, end, true/false) // x,y圆心, r半径, start和end是开始和结束角度, false表示顺时针(默认), true表示逆时针
// 绘制弧线
ctx.arcTo(x1, y1, x2, y2, r) // 当前端点、(x1, y1)、(x2, y2)这三个点连成的弧线,r是半径
// 闭合路径, 不是必须的, 如果线的终点跟起点一样, 会自动闭合
ctx.closePath()
// 通过线条绘制轮廓(边框)
ctx.stroke()
// 通过路径填充区域(实心)
ctx.fill()
```

>注意:
> 1. fill() 和 stroke()函数表示绘图结束。如果要继续绘制, 需要重新新建路径(beginPath())
> 2. 如果lineTo()最后的路径没有封闭, fill()函数就会自动封闭路径, 而stroke()函数不会

  **demo：**

例如绘制一个三角形

```javascript

ctx.beginPath()
ctx.moveTo(75, 75) // 路径起点
ctx.lineTo(100, 75)
ctx.lineTo(100, 25)
ctx.fill() // 将自动将路径闭合, 并默认填充黑色

```

## 样式

---

- 颜色

```javascript

ctx.fillStyle = 'red' // 针对fill()有效的颜色,还可以取值: '#fff', 'rgba(0, 0, 0, .5)' 等
ctx.strokeStyle ='red' // 针对 stroke() 有效的颜色, 取值同上
ctx.globalAlpha = 0.5 // 透明度

```

- 线段端点

```javascript

ctx.lineWidth = 2 // 线条宽度
ctx.lineCap = 'butt(默认)' 、 'round(圆弧)' 、 'square(方形)' // 线段端点显示的样式

```

  **demo：**

```javascript

var ctx = document.getElementById('canvas').getContext('2d')
var lineCap = ['butt', 'round', 'square']
ctx.strokeStyle = 'black'

for (var i = 0, len = lineCap.length; i < len; i++) {
  ctx.lineWidth = 15
  ctx.lineCap = lineCap[i]
  ctx.beginPath()
  ctx.moveTo(25 + i * 50, 10)
  ctx.lineTo(25 + i * 50, 140)
  ctx.stroke()
}

```

- 线段连接处

```javascript

ctx.lineJoin = 'miter(默认)'、'round(圆角)'、'bevel(横线)' //两线段连接处所显示的样子

```

```javascript

var ctx = document.getElementById('canvas').getContext('2d')
var lineJoin = ['round', 'bevel', 'miter']
ctx.lineWidth = 10

for (var i = 0, len = lineJoin.length; i < len; i++) {
  ctx.lineJoin = lineJoin[i]
  ctx.beginPath()
  ctx.moveTo(10, 50 + i * 40)
  ctx.moveTo(50, 10 + i * 40)
  ctx.lineTo(90, 50 + i * 40)
  ctx.lineTo(130, 10 + i * 40)
  ctx.lineTo(170, 50 + i * 40)
  ctx.stroke()
}

```

- 虚线

```javascript

ctx.setLineDash([4, 2]) // 设置虚线, 参数为数组, 第一个值为实现高度, 第二个值为空白的宽度
ctx.lineDashOffset = 0 // 虚线起始偏移量

```

  **demo：**

```javascript

var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var offset = 0
function draw () {
  offset++
  if (offset > 16) {
    offset = 0
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.setLineDash([6, 2])
  ctx.lineDashOffset = -offset
  ctx.strokeRect(10, 10, 100,100)
}

setInterval(draw, 20)

```

- 渐变

```javascript

var bg = ctx.createLinearGradient(x1, y1, x2, y2) // 定义线性渐变, 渐变的起点(x1,y1) 与终点 (x2,y2)
var bg1 = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1) // 定义径向渐变, 渐变开始圆的起点半径(x0, y0, r0)
bg.addColorStop(0, 'red') // 定义好, 之后开始上色
bg.addColorStop(0.5, 'blue')
bg.addColorStop(1, 'rgba(0, 0, 0, 0.6)')

```

  **demo：**

1. 线性渐变

```javascript

var bg = ctx.createLinearGradient(0, 0, 0, 200)
bg.addColorStop(0, 'black')
bg.addColorStop(0.6, '#fff')
ctx.fillStyle = bg
ctx.fillRect(10, 10, 100, 100)

```

2. 径向渐变

```javascript

var bg1 = ctx.createRadialGradient(100, 100, 0, 100, 100, 50)
bg1.addColorStop(0, '#FF5F98')
bg1.addColorStop(0.75, '#FF0188')
bg1.addColorStop(1, 'rgba(255, 1, 136, 0)')
ctx.fillStyle = bg1
ctx.fillRect(0, 0, 150, 150)
```

## 文字

---

```javascript

var ctx = document.getElementById('canvas').getContext('2d')
ctx.shadowOffsetX = 2 // X轴阴影距离, 负值表示往上, 正值表示往下
ctx.shadowOffsetY = 2 // y轴阴影距离, 负值表示往左, 正值表示往右
ctx.shadowBlur = 2 // 阴影的模糊程度
ctx.shadowColor = 'rgba(0, 0, 0, .5)' // 阴影颜色
ctx.font = '30px Times New Roman' // 设置字体和字体大小
ctx.fillStyle = 'Black'
ctx.fillText('Sample String', 15, 30) // 实体文字
ctx.strokeStyle ='red'
ctx.strokeText('Hello World', 15, 100) // 边框文字

```

文字的属性除了上面的外, 还有以下一些属性:

```javascript

ctx.textAlign ='center' // start、end、left、right、center
ctx.textBaseline = 'middle' // top、hanging、middle、alphabetic、 ideographic、 bottom
ctx.direction = 'inherit' // ltr、 rtl、 inherit

```

## 图像

---

```javascript

var img = new Image()
img.src = './images/logo.png'
ctx.drawImage(img, 0, 0) // img为图像, (0, 0)为起始坐标

```

这里的img可以是img对象, 可以是一个img元素

```javascript

<img id="img" src="./images/logo.png" />
ctx.drawImage(document.getElementById('img'), 0, 0)

```

另外, 绘制图片的时候还可以对图片进行缩放, 类似于css中的 `background-size`

```javascript

ctx.drawImage(img, 0, 0, w, h) // w、h指定图片的宽高,则会同比例缩放

```

## 变形

---

- 状态

`save()和restore()`

save()用来保存当前状态, restore()用来恢复刚才保存的状态。

```javascript

ctx.fillStyle = 'black'
ctx.fillRect(20, 20, 150, 150)
ctx.save()  // 保存当前状态
ctx.fillStyle = '#fff'
ctx.fillRect(45, 45, 100, 100)
ctx.restore() // 恢复到刚才保存的状态(即是回到 黑色)
ctx.fillRect(70, 70, 50, 50)
```

效果图:

![](https://img.alicdn.com/tps/TB1CLzJMVXXXXa_aXXXXXXXXXXX-235-227.png)

- 位移

```javascript

ctx.translate(x, y) // 更改canvas的原点

```

```javascript

var ctx = document.getElementById('canvas').getContext('2d')
for (var i = 1; i < 4; i ++) {
  ctx.save() // 使用save()方法保存状态, 让每次位移时都针对(0, 0)移动
  ctx.translate(100 * i, 0)
  ctx.fillRect(0, 50, 50, 50)
  ctx.restore()
}

```

- 旋转

```javascript

ctx.rotate(Math.PI * 2) // 按照原点顺时针旋转360度

```

```javascript

ctx.translate(75, 75) // 把原点移动到(75, 75)
for (var i = 1; i < 6; i++) {
  ctx.save()
  ctx.fillStyle = 'rgb(' + (50 * i)+ ',' + (255 - 50 * i) + ' 255)'
  for (var j = 0; j < i * 6; j++) {
    ctx.rotate(Math.PI * 2 / (i * 6))
    ctx.beginPath()
    ctx.arc(0, i * 12.5, 5, 0, Math.PI * 2, true)
    ctx.fill()
  }
  ctx.restore()
}

```

效果图:

![](https://img.alicdn.com/tps/TB1VMIaMVXXXXXjXXXXXXXXXXXX-183-181.png)

- 缩放

```javascript

ctx.scale(x, y) // 基于原点缩放, x、y是两个轴的缩放倍数

```

```javascript

var ctx = document.getElementById('canvas').getContext('2d')
ctx.fillStyle ='red'
ctx.scale(0.8, 1.2)
ctx.beginPath()
ctx.arc(75, 75, 60, 0, Math.PI * 2)
ctx.fill()

```
