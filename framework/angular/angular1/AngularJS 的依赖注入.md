### AngularJS 依赖注入的方法

---

<!-- TOC -->

- [AngularJS 依赖注入的方法](#angularjs-依赖注入的方法)
  - [1. 通过函数的参数进行推断式注入声明](#1-通过函数的参数进行推断式注入声明)
  - [2. 显式的注入声明](#2-显式的注入声明)
  - [3. 行内注入声明](#3-行内注入声明)

<!-- /TOC -->

#### 1. 通过函数的参数进行推断式注入声明

如果没有明确的什么, `AngularJS` 会假定参数名称就是依赖的名称。因此, 它会在内部调用函数对象的 `toString()` 方法, 分析并提取出函数的参数列表, 然后通过 `$injector` 将这些参数注入进对象实例。

HTML代码:

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
            <p mg-cloak>{{clock.time | date: "yyyy-MM-dd hh:mm:ss"}}</p>
        </div>
    </div>
    <script src="js/angular.js"></script>
    <script src="js/inject.js">
    </script>
</body>

</html>
```

JS 代码:

```javascript
angular.module('myApp', [])
    .controller('myController', myController)

function myController($scope, $timeout) {
    var updateTime = function() {
        $scope.clock = {
            time: new Date()
        }

        $timeout(function() {
            $scope.clock.time = new Date()
            updateTime()
        }, 1000)
    }
    updateTime()
}
```

需要注意的地方:

- 这个方法只适合未经过压缩和混淆的代码, 因为 `AngularJS` 需要原始未经压缩的参数列表来进行解析。

#### 2. 显式的注入声明

`AngularJS` 提供了显式的方法来明确定义一个函数在被调用时需要用到的依赖关系。通过这种方法声明依赖, 即使在源代码被压缩, 参数名称发生改变的情况下依然可以正常工作。

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
            <p mg-cloak>{{clock.time | date: "yyyy-MM-dd hh:mm:ss"}}</p>
        </div>
    </div>
    <script src="js/angular.js"></script>
    <script src="js/inject.js">
    </script>
</body>

</html>
```

JS 代码:

```javascript
angular.module('myApp', [])
    .controller('myController', myController)

function myController(s, t) {
    var updateTime = function() {
        s.clock = {
            time: new Date()
        }
        t(function() {
            s.clock.time = new Date()
            updateTime()
        }, 1000)
    }
    updateTime()
}

myController['$inject'] = ['$scope', '$timeout']
```

#### 3. 行内注入声明

`AngularJS` 提供的行内注入方法实际上是一种语法糖, 它与前面提到的通过 `$inject` 属性进行声明的原理是一样的, 但是允许我们在函数定义的时候从行内将参数传入, 这种方法方便，简单，而且避免了在定义的过程中使用临时变量。

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
            <p mg-cloak>{{clock.time | date: "yyyy-MM-dd hh:mm:ss"}}</p>
        </div>
    </div>
    <script src="js/angular.js"></script>
    <script src="js/inject.js">
    </script>
</body>

</html>
```

JS 代码:

```javascript
angular.module('myApp', [])
    .controller('myController', ['$scope', '$timeout', function(s, t) {
        var updateTime = function() {
            s.clock = {
                time: new Date()
            }
            t(function() {
                s.clock.time = new Date()
                updateTime()
            }, 1000)
        }
        updateTime()
    }])
```

注意的地方:

- 行内声明的方式允许我们直接传入一个参数数组, 而不是一个函数。数组的元素是字符串, 它们代表的是可以被注入到对象中的依赖名字, 最后一个参数就是依赖注入的目标函数对象本身。
