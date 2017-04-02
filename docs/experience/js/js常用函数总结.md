# js常用函数总结

---

## Ajax

- jquery ajax 函数封装

```javascript

var myAjax = function (url, type, success, error) {
  $.ajax({
    url: url,
    type: type,
    dataType: 'json',
    timeout: 10000,
    success: function (data) {
      var res = data.data
      success&& success(res)
    },
    error: function (err) {
      error && error(err)
    }
  })
}

```

## 常用js函数

---

- 回到顶部

```javascript

$(window).scroll(function() {
    var a = $(window).scrollTop();
    if(a > 100) {
        $('.go-top').fadeIn();
    }else {
        $('.go-top').fadeOut();
    }
});
$(".go-top").click(function(){
    $("html,body").animate({scrollTop:"0px"},'600');
});

```

- 阻止冒泡

```javascript

function stopBubble(e){
    e = e || window.event;
    if(e.stopPropagation){
        e.stopPropagation();  //W3C阻止冒泡方法
    }else {
        e.cancelBubble = true; //IE阻止冒泡方法
    }
}

```

- 字符串全部替换 replaceAll

```javascript

var replaceAll = function(bigStr, str1, str2) {  //把bigStr中的所有str1替换为str2
    var reg = new RegExp(str1, 'gm');
    return bigStr.replace(reg, str2);
}

```

- 获取浏览器url中的参数值

```javascript

var getURLParam = function(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
};

```

- 生成随机数

```javascript

function randomBetween(min,max) {
  return min + (Math.random() * (max - min + 1))
}

```

- 操作cookie

```javascript

function setCookie (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + '; ' + expires;
}

function getCookie(cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for(var i=0; i< ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return '';
}
```

- 判断是否有中文

```javascript

var reg = /.*[\u4e00-\u9fa5]+.*$/;
reg.test('123792739测试')  //true

```
