# 响应式图片— srcset 和 sizes 属性

---

## `srcset`属性

---

`srcset`属性允许我们可以提供一系列也许可以被浏览器使用的图片资源。我们提供一个以逗号为分割的图片list，user agent会根据设备特性来决定哪一张图片来显示在网页上。

当listing图片时，我们提供每张图片两个信息 ——

- 图片文件的_路径_
- 图片文件的_宽度_或者_像素密度_
  为了定义_像素密度_，我们添加一个`x`来表示图片的密度数值。举个栗子 —-

```
<img src="one.png"  
     srcset="two.png 2x, three.png 3x, four.png 4x"\>
```

在图片 `src` 中定义的默认为图片的 `1x` 。

在2012年`srcset`属性第一次提出时，我们只能提供不同的像素密度的图片，就像上面例子中显示的。然而，在2014年新添加了`width`属性，它可以使我们根据不同的宽度来提供不同的图片。

为了指定图片的宽度，我们添加一个`w`来表示图片的像素宽度。举个栗子 —-

```
<img src="one.png"  
     srcset="two.png 100w, three.png 500w, four.png 1000w"\>
```

只有在`srcset`中使用了宽度，我们才能随之设置`sizes`属性。

## `sizes`属性

---

`sizes`属性明确定义了图片在不同的media conditions下应该显示的尺寸。

```
<img src="one.png"  
     srcset="two.png 100w, three.png 500w, four.png 1000w"

     sizes="<media condition> <width>,
            <media condition> <width>,
            <optional default image width>"\>
```

### Media Conditions

Media Conditions不是确切的媒体查询。它是一部分的媒体查询。他不允许我们明确定义媒体类型，比如 `screen`或者 `print`，但是允许我们经常使用的媒体查询。

可以使用的有 —-

- A plain media condition 比如`(min-width: 900px)`
- A “not” media condition 比如`( not (orientation: landscape) )`
- An “and” media condition 比如`(orientation: landscape) and (min-width: 900px)`
- An “or” media condition 比如`( (orientation: portrait) or (max-width: 500px) )`

### width

`width`可以使用任意的长度单位，比如：em, rem, pixels, 和 viewport width。

然而，百分比单位是不允许的，如果需要使用相对单位，`vw`是推荐使用的。

### 合体

把`Media Conditions `和 `width` 合在一起 —-

```
<img src="one.png"  
     srcset="two.png 100w, three.png 500w, four.png 1000w"

     sizes="(min-width: 900px) 1000px,(max-width: 900px) and (min-width: 400px) 50em,
            ( not (orientation: portrait) ) 300px,
            ( (orientation: landscape) or (min-width: 1000px) ) 50vw,
            100vw"\>
```
