# 微信SPA单页面应用更换title

---

SPA 单页面应用在切换 hash 的时候, 往往需要修改页面标题, 一般是通过 document.title 来设置。

```javascript
// 方法1:
document.title = '新标题'

// 方法2:
document.getElementsByTagName('title')[0].innerHTML = '新标题'
```

以上方式在 Android 生效, 但在 IOS 下是无法在页面不刷新时设置浏览器 title 的。

**解决办法:**

```javascript
//基于jQuery或Zepto
function change_title(title){
    document.title = title;
    // hack在微信等webview中无法修改document.title的情况
    var $iframe = $('<iframe src="/favicon.ico"></iframe>');
    $iframe.on('load',function() {
        setTimeout(function() {
            $iframe.off('load').remove();
        }, 0);
    }).appendTo($('body'));
}

$('#demo1').on('click', function(){
    change_title('demo1 title');
});


// 原生触发
function changeTitle(title){
    var body = document.getElementsByTagName('body')[0];
    document.title = title;
    var iframe = document.createElement("iframe");
    iframe.setAttribute("src", "/favicon.ico");

    iframe.addEventListener('load', function() {
        setTimeout(function() {
            iframe.removeEventListener('load');
            document.body.removeChild(iframe);
        }, 0);
    });
    document.body.appendChild(iframe);
}

document.getElementById('demo2').ontouchend = function(){
    changeTitle('demo2 title');
}
```
