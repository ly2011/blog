# 移动端1px细线解决方案总结

---

```html
<div class="border"></div>
```


## 1. 用小数来写px值

---

IOS8 下已经支持带小数的px 值，media query 对应 devicePixelRatio 有个查询值 `-webkit-min-device-pixel-ratio`, css可以写成这样：

```css

.border {
  border: 1px solid #999;
}

@media screen and (-webkit-min-device-pixel-ratio: 2) {
  .border {
    border: .5px solid #999;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 3) {
  .border {
    border: .333333px solid #999;
  }
}
```

如果使用 less/sass 的话只是多加了一句 mixin

缺点：

安卓与低版本IOS不适用


## 2. border-image

---

![](http://images2015.cnblogs.com/blog/866189/201603/866189-20160317143339131-2118326634.png)

这样的1张6X6的图片, 9宫格等分填充border-image, 这样元素的4个边框宽度都只有1px。

```css

@media screen and (-webkit-min-device-pixel-ratio: 2){
  .border{
    border: 1px solid transparent;
    border-image: url(border.gif) 2 repeat;
  }
}

```

图片可以用gif, png, base64多种格式, 以上是上下左右四条边框的写法, 需要单一边框只要定义单一边框的border, 代码比较直观。

**缺点：**

对于圆角样式，将图片放大修改成圆角也能满足需求，但这样无形中增加了 border 的宽度。
存在多种边框颜色或者更改的时候麻烦。

## 3. background-image

---

设置1px通过css 实现的image，50%有颜色，50%透明

```css

.border {
	background-image:linear-gradient(180deg, red, red 50%, transparent 50%),
	linear-gradient(270deg, red, red 50%, transparent 50%),
	linear-gradient(0deg, red, red 50%, transparent 50%),
	linear-gradient(90deg, red, red 50%, transparent 50%);
	background-size: 100% 1px,1px 100% ,100% 1px, 1px 100%;
	background-repeat: no-repeat;
	background-position: top, right top,  bottom, left top;
	padding: 10px;
}

```

## 4. :before, :after与transform(推荐)

---

构建1个伪元素, 将它的长宽放大到2倍, 边框宽度设置为1px, 再以transform缩放到50%。

```css

.border {
  position: relative;
}

.border:before {
  pointer-events: none;
  box-sizing: border-box;
  height: 1px;
  content: "";
  width: 100%;
  border-top: 1px solid #eee;
  position: absolute;
  bottom: -1px;
  right: 0;
  -webkit-transform: scaleY(0.5);
      -ms-transform: scaleY(0.5);
          transform: scaleY(0.5);
  -webkit-transform-origin: 0 0;
      -ms-transform-origin: 0 0;
          transform-origin: 0 0;
}

```

><input type="button"> 是没有:before.:after伪元素的

**缺点：**

占据了伪元素，容易引起冲突

## 5. box-shadow

---

利用 css 对阴影处理的方式实现 0.5px 的效果

```css

.border {
  -webkit-box-shadow:0 1px 1px -1px rgba(0, 0, 0, 0.5);
}

```

**优点：**

基本所有场景都能满足。包括圆角的 button、单条、多条线。

**缺点：**

颜色不好处理，黑色 rgba(0, 0, 0, 1) 最浓的时候，有阴影出现，不好用。
