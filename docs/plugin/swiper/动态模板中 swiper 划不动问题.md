# 动态模板中 swiper 划不动问题

---

[TOC]

swiper 是目前较为流行的移动端触摸滑动插件，因为其简单好用易上手,受到很多前端开发者的欢迎。
今天在使用Swiper的时候遇到这个问题：

> 使用(avalonjs/vuejs/react)动态循环生成 `swiper-slide` 类，在 `swiper-wrapper` 里生成6个以上的滑动页，可是就是划不到第二页，尝试将 `longSwipesRatio` 的值修改到最小，仍然不起作用。

**avalonjs:**

```html
<div class="swiper-container" ms-visible="result.status==1">
<div class="swiper-wrapper" >
     <!-- =======循环部分======= -->
      <div class="swiper-slide" ms-repeat="result.mediaList">
         //此处为一个滑动页内容
      </div>
      <!-- ============== -->
</div>
</div>
```

在测试时发现，手动复制n个循环部分，则可以滑动n个块；手动调节窗口大小，使页面文档发生改变（动态响应）后，可以正常滑动。
于是猜测swiper的机制是：**初始化的时候自动扫描 `swiper-wrapper` 类下有多少个  `swiper-slide` 类块，则允许滑动多少个块。**
而在avalon始终在swiper初始化之后定义，swiper则无法正确 `scan` 有多少个slide（实际上找到一个待循环模板），所以划不动。

找到原因后，只须对症下药。在查阅Swiper的API时发现，有这样两个参数：`observer`和`observeParents`，前者启动动态检查器，当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。后者原理和前者一样，只是将observe应用于Swiper的父元素。两者默认值都为`false`。
所以在原来的swiper初始化代码中加上这两行即可。

```js
var mySwiper = new Swiper('.swiper-container',{
  pagination : '.swiper-pagination',
    paginationClickable: true,
    longSwipesRatio: 0.3,
    touchRatio:1,
    spaceBetween: 30,
    lazyLoading: true,
    lazyLoadingInPrevNext: true,
    slidesPerView: 4.8, // 每行展示多少张图片
    observer:true, // 修改swiper自己或子元素时，自动初始化swiper
    observeParents:true, // 修改swiper的父元素时，自动初始化swiper
})
```

**附件:**

vuejs版:

```js
const vm = new Vue({
  el: '#app',
  data: {
    items: []
  },
  created() {
    console.log('created')
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted() {
    console.log('mounted')
    const self = this
    const mySwiper = new Swiper('.swiper-container', {
      autoplay: 5000,
      longSwipesRatio: 0.3,
      touchRatio: 1,
      spaceBetween: 30,
      lazyLoading: true,
      lazyLoadingInPrevNext: true,
      slidesPerView: 4.8, // 每行展示多少张图片
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true //修改swiper的父元素时，自动初始化swiper
    })
    setTimeout(() => {
      self.items = ['slider1', 'slider2', 'slider3']
    }, 5000)
  }
})
```

## 参考文档

1. [https://segmentfault.com/a/1190000002962202](https://segmentfault.com/a/1190000002962202)
