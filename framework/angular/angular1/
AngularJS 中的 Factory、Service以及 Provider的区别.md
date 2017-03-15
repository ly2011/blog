## AngularJS 的供应商($provide)

---

`$provide` 服务负责告诉 `AngularJS` 如何创建一个新的可注入的东西: 即服务。

服务会被叫做供应商的东西来定义, 可以使用 `$provide` 来创建一个供应商。

创建供应商的方法:

- 使用 `$provide` 中的 `provider()` 方法来定义一个供应商;

- 通过要求 `$provide` 被注入一个应用的 `config` 函数中来获得 `$provide` 服务;

![](https://segmentfault.com/img/bVm9Et)

## 定义供应商的方法们

---

- `constant`

- `value`

- `service`

- `factory`

- `provider`

- `decorator`

### 1. constant

定义常量的, 它定义的值不能被改变, 它可以被注入到任何地方, 但是不能被装饰器(`decorator`) 装饰。

DEMO:

HTML 代码:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <title>demo</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
    <div ng-app="myApp">
        <div ng-controller="myController">

        </div>
    </div>
    <script src="js/angular.js">
    </script>
    <script src="js/service.js"></script>
</body>

</html>
```

JS 代码:

```javascript
var myApp = angular.module('myApp', [])
myApp.config(function($provide) {
    $provide.constant('movieTitle', '功夫瑜伽')
})
myApp.controller('myController', function(movieTitle) {
    console.log('movieTitle: ', movieTitle);
})
```

语法糖:

```javascript
myApp.constant('movieTitle', '功夫瑜伽')
```

### 2. value

它可以是 `string`、 `number`、 `function`, 它和 `constant` 的不同之处在于, 它可以被修改, 不能被注入到 `config` 中, 但是它可以被 `decorator` 装饰。

HTML 代码:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <title>demo</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
    <div ng-app="myApp">
        <div ng-controller="myController">

        </div>
    </div>
    <script src="js/angular.js">
    </script>
    <script src="js/service.js"></script>
</body>

</html>
```

JS 代码:

```javascript
var myApp = angular.module('myApp', [])

myApp.config(function($provide) {
    $provide.value('movieTitle', '功夫瑜伽')
})

myApp.controller('myController', function(movieTitle) {
    console.log('movieTitle: ', movieTitle);
})
```

语法糖:

```javascript
myApp.value('movieTitle', '功夫瑜伽')
```

### 3. service

它是一个可注入的构造器, 在 `AngularJS` 中它是单例的, 用它在 `Controller` 中通信或者共享数据都合适

```javascript
var myApp = angular.module('myApp', [])

myApp.config(function($provide) {
    $provide.service('movie', function() {
        this.title = '功夫瑜伽'
    })
})

myApp.controller('myController', function(movie) {
    console.log('movieTitle: ', movie.title);
})
```

语法糖:

```javascript
myApp.service('movie', function () {
    this.title = '功夫瑜伽'
})
```

注意:

在 `service` 里面可以不用返回东西, 因为 `AngularJS` 会调用 `new` 关键字来创建对象。但是返回一个自定义对象好像也不会有错。

### 4. factory

它是一个可注入的 `function`, 它和 `service` 的区别就是: `factory` 是普通的 `function`, 而 `service` 是一个构造器(`constructor`), 这样 `AngularJS` 在调用 `service` 时会用 `new` 关键字, 而调用 `factory` 时只是调用普通的 `function`, 所以 `factory` 可以返回任何东西, 而 `service` 可以不返回 (可查阅 new 关键字的作用)

```javascript
var myApp = angular.module('myApp', [])

myApp.config(function($provide) {
    $provide.factory('movie', function() {
        return {
            title: '功夫瑜伽'
        }
    })
})

myApp.controller('myController', function(movie) {
    console.log('movieTitle: ', movie.title);
})
```

语法糖:

```javascript
$provide.factory('movie', function() {
    return {
        title: '功夫瑜伽'
    }
})
```

注意:

`factory` 可以返回任何东西, 它实际上是一个只有 `$get` 方法的 `provider`

### 5. provider

`provider` 是他们的老大, 上面的几乎(除了 `constant`) 都是 `provider` 的封装, `provider` 必须有一个 `$get` 方法, 当然也可以说 `provider` 是一个可配置的 `factory`。

JS 代码:

```javascript
var myApp = angular.module('myApp', [])

myApp.provider('movie', function() {
    var version
    return {
        setVersion: function(value) {
            version = value
        },
        $get: function() {
            return {
                title: '功夫瑜伽 ' + version
            }
        }
    }
})

myApp.config(function(movieProvider) {
    movieProvider.setVersion('正在热播')
})

myApp.controller('myController', function(movie) {
    console.log('movieTitle: ', movie.title);
})
```

注意:

- 这里 `config` 方法注入的是 `movieProvider`, `config` 方法中只能注入供应商(两个例外是 `$provide` 和 `$injector`),用驼峰命名法写成 `movieProvider`, `AngularJS` 会自动帮你注入它的供应商。

- `movie` 是一个供应商

### 6.decorator

`decorator` 不是 `provider`, 它是用来装饰其它 `provider` 的, 它不能装饰 `constant`(因为 `constant` 不是通过 `provider()` 方法创建的)。

JS 代码:

```javascript
var myApp = angular.module('myApp', [])

// myApp.value('movieTitle', '功夫瑜伽6')
myApp.config(function($provide) {
    $provide.value('movieTitle', '功夫瑜伽7')

    $provide.decorator('movieTitle', function($delegate) {
        return $delegate + ' - 测试'
    })
})

myApp.controller('myController', function(movieTitle) {
    console.log('movieTitle: ', movieTitle);
})
```

## 总结

---

- 所有的供应商都只被实例化一次, 也就是说它们都是单例的

- 除了 `constant`, 所有的供应商都可以被装饰器(`decorator`)装饰

- `value` 就是一个简单可注入的值

- `service` 是一个可注入的构造器

- `factory` 是一个可注入的方法

- `decorator` 可以修改或封装其他的供应商(除了 `constant`)

- `provider` 是一个可配置的 `factory`
