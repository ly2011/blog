# js 判断图片是否加载完成

---


1. 根据 url 加载图片



```js
/**
* 加载图片，直到加载完成后才调用回调函数
* @param url 后面读取图片流的url
* @param callback 回调函数
*/
function loadImage(url, callback) {
    var  img = new Image();
    img.src = url;
     var timer = setInterval(function() {
         if (img.complete) {
             callback(img);
             clearInterval(timer);
         }
     }, 50);
}
```

## 参考地址:

1. http://www.open-open.com/code/view/1453458480589
