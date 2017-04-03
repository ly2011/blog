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

## 像素操作

---

如果我们想对一个canvas画布做如下操作: 每一个点的信息, 对每一个坐标点进行操作。那我们就需要了解一下 `ImageData对象`了。

ImageData 对象(由 getImageData 方法获取) 中存储着 canvas 对象真实的像素数据, 它包含以下几个只读属性:

- width: 图片宽度,单位是像素

- height: 图片高度, 单位是像素

- data:

### 创建ImageData对象

---

去创建一个新的、空白的ImageData对象,你应该会使用 `createImageData()方法`：

```javascript

var myImageData = ctx.createImageData(width, height)

```

上面代码创建了一个新的具体特定尺寸的ImageData对象。所有像素被预设为透明黑。

### 获取像素数据

---

为了获得一个包含画布场景像素数据的ImageData对象,可以用 `getImageData()方法`：

```javascript

var myImageData = ctx.getImageData(left, top, width, height)

```

创建的 `myImageData对象就有 width、height、data` 三个属性的值了。看下面这个实例:

```javascript

var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

function drawImage(imgPath) {
  const img = new Image()
  img.src = imgPath
  img.setAttribute('crossOrigin', 'anonymous')
  img.onload = () => {
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0,img.width,img.height)
  }
}

drawImage('./images/1.jpg')

var color = document.getElementById('color')

function pick(event) {
  var x = event.layerX
  var y = event.layerY
  var area = ctx.getImageData(x, y, 1, 1) // 创建ImageData对象
  var data = area.data // 获取data属性(一个存储颜色rgba值得数组)
  var rgba = 'rgba(' + data[0] + ',' + data[1] + ',' + data[2] + ',' + data[3] + ')'
  color.style.color = rgba
  color.textContent = rgba
}

canvas.addEventListener('mousemove', pick)
```

> 注意：
> 1. `drawImage() 方法时` 需在图片加载完成后才能使用,否则不生效
> 2. 图片跨域: `img.setAttribute('crossOrigin', 'anonymous')`

## 写入像素数据

---

可以用 `putImageData()方法` 对场景进行像素数据的写入:

```javascript

ctx.putImageData(myImageData, x, y) // 在画布的(x, y)点开始绘制myImageData所存储的数据信息

```

我们可以把获取到的像素信息进行处理, 然后再重新绘制, 就得到了新的图形。

html代码:

```html

<canvas id="canvas" width="600" height="277"></canvas>

```

```javascript

var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

var imageData = null;

function drawImage(imgPath, callback) {
  const img = new Image();
  img.src = imgPath;
  img.setAttribute("crossOrigin", "anonymous");
  img.onload = () => {
    canvas.width = img.width * 3;
    canvas.height = img.height * 3;
    ctx.drawImage(img, 0, 0, img.width, img.height);

    imageData = ctx.getImageData(0, 0, img.width, img.height); // 获取ImageData信息

    callback && callback();
  };
}

drawImage("http://7xtawy.com1.z0.glb.clouddn.com/phtos/fangao.jpg", init);

function init() {
  var colors = imageData.data; // 获取像素信息


  function invert() {
    for (var i = 0, len = colors.length; i < len; i++) {
      colors[i] = 255 - colors[i]; // red
      colors[i + 1] = 255 - colors[i + 1]; // green
      colors[i + 2] = 255 - colors[i + 2]; // blue
      colors[i + 3] = 255; //alpha
    }

    ctx.putImageData(imageData, 1000, 0); // 从(220, 0) 位置开始绘制改变过的颜色
  }

  function toGray() {
    for (var i = 0, len = color.length; i < len; i++) {
      var avg = (colors[i] + colors[i + 1] + colors[i + 2]) / 3;
      colors[i] = avg; // red
      colors[i + 1] = avg; // green
      colors[i + 2] = avg; // blue
      colors[i + 3] = 255; //alpha
    }
    ctx.putImageData(imageData, 440, 0); // 从(440, 0) 位置开始绘制改变过的颜色
  }

  invert(); // 反转色
  toGray(); // 变灰色
}

```

## 性能优化

---

### 坐标点尽量用整数

---

浏览器为了达到抗锯齿的效果会做额外的运算。为了避免这种情况，请保证使用canvas的绘制函数时，尽量用 `Math.floor()` 函数对所有的坐标点取整。比如：

```javascript

ctx.drawImage(myImage, 0.3, 0.5);  //不提倡这样写，应该像下面这样处理
ctx.drawImage(myImage, Math.floor(0.3), Math.floor(0.5));

```

### 使用多个画布绘制复杂场景

---

比如做一个游戏，有几个层面：背景层（简单变化）、游戏层（时刻变化）。这个时候，我们就可以创建两个画布，一个专门用来绘制不变的背景（少量绘制），另一个用来绘制游戏动态部分（大量绘制），就像这样：

```javascript

<canvas id="background-can" width="480" height="320"></canvas>
<canvas id="game-can" width="480" height="320"></canvas>

```

### 用CSS设置静态大图

---

如果有一层是永远不变的，比如一张静态的背景图，最好使用`div+css的方法`去替代`ctx.drawimage()`，这么做可以避免在每一帧在画布上绘制大图。简单讲，dom渲染肯定比canvas的操作性能更高。

### 尽量少操作canvas的缩放

---

如果要对一个画布进行缩放，如果可以的话，尽量使用CSS3的transform来实现。总之，记住一个原则，能用html+div实现的尽量不用js对canvas进行操作。

### 更多Tips

- 将画布的函数调用集合到一起（例如，画一条折线，而不要画多条分开的直线）

- 使用不同的办法去清除画布(clearRect()、fillRect()、调整canvas大小)

- 尽可能避免 shadowBlur特性

- 有动画，请使用window.requestAnimationFrame() 而非window.setInterval()
