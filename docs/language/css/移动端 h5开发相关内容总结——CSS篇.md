# 移动端 h5开发相关内容总结——CSS篇

---

[TOC]

## a标签内容语义化

---

```html
<style>
a{display:block;}
span{dispaly:block;}
</style>

<a>
    <span></span>
    <span></span>
    <span></span>
</a>
```

## 为自己的页面设置最大宽度和最小宽度

---

```css
{
    max-width:640px;
    min-width:320px;
}
```

## 去掉 a，input 在移动端浏览器中的默认样式

---

### 1.禁止 a 标签背景

在移动端使用 a标签做按钮的时候，点按会出现一个“暗色”的背景，去掉该背景的方法如下

```css
a,button,input,optgroup,select,textarea {
    -webkit-tap-highlight-color:rgba(0,0,0,0); /*去掉a、input和button点击时的蓝色外边框和灰色半透明背景*/
}
```

### 2.禁止长按 a，img 标签长按出现菜单栏

使用 a标签的时候，移动端长按会出现一个 菜单栏，这个时候禁止呼出菜单栏的方法如下：

```css
a, img {
    -webkit-touch-callout: none; /*禁止长按链接与图片弹出菜单*/
}

```

3.流畅滚动

```css
body{
    -webkit-overflow-scrolling:touch;
}
```

## calc 相关问题

---

使用的时候要加上厂商前缀，达到兼容性。

```css
#formbox {
  width:  130px;
  /*加厂商前缀，操作符（+，-，*，/）两边要有空格）*/
  width:  -moz-calc(100% / 6);
  width:  -webkit-calc(100% / 6);
  width:  calc(100% / 6);
  border: 1px solid black;
  padding: 4px;
}
```

## box-sizing 的使用

---

- content-box: 默认值, 标准盒模型, width 与 height 只包括内容的宽和高。
- padding-box: width 与 height 包括内边距, 不包括边框和外边距
- border-box: width 与 height 包括内边距与边框, 不包括外边距。(IE怪异模式)

## 使用 vertical-align 调整图标垂直居中

---

`vertical-align` 指定了行内(inline) 元素或单元格(table-cell)元素

## flex 弹性盒模型的使用

---

父级元素如下定义

```javascript
{
    margin-bottom: .5rem;
    display: box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    -webkit-flex-flow: row;
    -ms-flex-flow: row;
    flex-flow: row;
}
```

```css
{
    box-flex: 1;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 18.5rem;
}
```
