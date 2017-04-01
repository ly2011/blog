# CSS清除浮动总结

---

例子最初的结构

```html
.news {
  background-color: gray;
  border: solid 1px black;
  }
.news img {
  float: left;
  }
.news p {
  float: right;
  }
<div class="news">
  <img src="news-pic.jpg" />
  <p>some text</p>
</div>
```

## 一、使用带 clear 属性的空元素

---

在浮动元素后使用一个空元素, 如

```html
<div class="clear">

</div>
```
,并且在CSS中赋予

```css
.clear {
  clear: both;
}
```
来清理。

完整例子:

```html
.news {
  background-color: gray;
  border: solid 1px black;
}
.news img {
  float: left;
}
.news p {
  float: right;
}
.clear {
  clear: both;
}
<div class="news">
  <img src="news-pic.jpg" />
  <p>some text</p>
  <div class="clear">

  </div>
</div>
```

**优点:** 简单, 代码少, 浏览器兼容性好。
**缺点:** 需要添加大量无语义的html元素, 代码不够优雅, 后期不容易维护。

## 二、使用CSS的overflow属性

---

给浮动元素的容器添加 `overflow: hidden;`

或 `overflow: auto;`

可以清除浮动, 另外在 IE6 中还需要触发 hasLayout, 例如为父元素设置容器宽高或设置 `zoom: 1`。在添加overflow属性后，浮动元素又回到了容器层，把容器高度撑起，达到了清理浮动的效果。

完整代码:

```html
.news {
  background-color: gray;
  border: solid 1px black;

  overflow: hidden;
  *zoom: 1;
}
.news img {
  float: left;
}
.news p {
  float: right;
}

<div class="news">
  <img src="news-pic.jpg" />
  <p>some text</p>
</div>
```

## 三、给浮动的元素的容器添加浮动

---

给浮动元素的容器也添加上浮动属性即可清除内部浮动，但是这样会使其整体浮动，影响布局，不推荐使用。

## 四、使用相邻元素处理

---

给浮动元素后面的远近苏添加 clear 属性。

完整代码:

```html
.news {
  background-color: gray;
  border: solid 1px black;
}
.news img {
  float: left;
}
.news p {
  float: right;
}
.content {
  clear: both;
}
<div class="news">
  <img src="news-pic.jpg" />
  <p>some text</p>

  <div class="content">
    ***
  </div>
</div>
```

>注意: 这里的 div.content 有内容。

## 五、使用CSS的 :after伪元素

---

结合 :after 伪元素（注意这不是伪类，而是伪元素，代表一个元素之后最近的元素）和 IEhack ，可以完美兼容当前主流的各大浏览器，这里的 IEhack 指的是触发 hasLayout。
给浮动元素的容器添加一个clearfix的class，然后给这个class添加一个:after伪元素实现元素末尾添加一个看不见的块元素（Block element）清理浮动。

完整例子:

```html
.news {
  background-color: gray;
  border: solid 1px black;
  }
.news img {
  float: left;
  }
.news p {
  float: right;
  }
.clearfix:after{
  content: "020";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;  
  }
.clearfix {
  /* 触发 hasLayout */
  zoom: 1;
  }
<div class="news clearfix">
<img src="news-pic.jpg" />
<p>some text</p>
</div>
```

通过CSS伪元素在容器的内部元素最后添加了一个看不见的空格 "020" 或点 "."，并且赋予clear属性来清除浮动。需要注意的是为了IE6和IE7浏览器，要给clearfix这个class添加一条 `zoom:1;` 触发haslayout。
