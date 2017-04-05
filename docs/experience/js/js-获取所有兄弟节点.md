<!--
@Date:   2017-04-05T09:48:47+08:00
@Last modified time: 2017-04-05T09:52:08+08:00
-->



# js-获取所有兄弟节点

---

```javascript

/**
 * 获取所有兄弟节点
 */
function siblings(elm) {
  var a = [];
  var p = elm.parentNode.children;
  for (var i = 0, pl = p.length; i < pl; i++) {
    if (p[i] !== elm) a.push(p[i]);
  }
  return a;
}

```

demo:

```html

<!DOCTYPE html>
<html lang="en">

<head>
  <title>demo</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="css/base.css" rel="stylesheet">
  <link href="css/style.css" rel="stylesheet">
</head>

<body>
  <header class="header">
    <nav class="nav">
      <ul>
        <li class="tab-item tab-item1 active">商品介绍</li>
        <li class="tab-item tab-item2">商品详情</li>
      </ul>
    </nav>
  </header>

  <main class="main">
    <div class="goods-item goods-item1 active">
      内容111
    </div>
    <div class="goods-item goods-item2">
      内容222
    </div>
  </main>
  <script src="js/index.js">
  </script>
</body>

</html>
```

```javascript

/**
 * 获取所有兄弟节点
 */
function siblings(elm) {
  var a = [];
  var p = elm.parentNode.children;
  for (var i = 0, pl = p.length; i < pl; i++) {
    if (p[i] !== elm) a.push(p[i]);
  }
  return a;
}

var tabItems = document.querySelectorAll('.tab-item')

Array.prototype.slice.call(tabItems).map(function (item, index) {
  item.index = index
  item.addEventListener('click', function (event) {
    var self = this
    this.classList.toggle('active')
    var brothers = siblings(this)
    brothers.map(function (brother) {
      brother.classList.toggle('active')
    })

    var goodsItems = document.querySelectorAll('.goods-item')
    Array.prototype.slice.call(goodsItems).map(function (good, good_index) {
      document.querySelector('.goods-item' + (good_index + 1)).classList.toggle('active')
    })
  })
})

```

```css

.header .nav ul {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 200px;
}

.header .nav ul li {
    flex: 1;
}

.header .nav ul li.active {
    color: lightsalmon;
}

.main .goods-item {
    display: none;
}

.goods-item.active {
    display: block;
}

```
