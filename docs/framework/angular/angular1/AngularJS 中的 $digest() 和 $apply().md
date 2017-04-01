# AngularJS 中的 $digest() 和 $apply()

---

<!-- TOC -->

- [AngularJS 中的 $digest() 和 $apply()](#angularjs-中的-digest-和-apply)
  - [1. 什么时候需要人为调用 `$apply()`?](#1-什么时候需要人为调用-apply)
  - [2. `$digest` 循环要执行多少次呢](#2-digest-循环要执行多少次呢)
  - [3. 总结](#3-总结)

<!-- /TOC -->

## 1. 什么时候需要人为调用 `$apply()`?

AngularJS 只会关心在 `AngularJS 的执行上下文中` 发生的数据模型(model)的变化(比如: 改变数据的代码在 `$apply()` 里面)。`AngularJS 内建的指令` 也会自动触发 `$digest` 循环, 所以任何数据模型(model)的改变也都会反映到视图中。 但是, 如果更改一个 `不在 AngularJS 执行上下文中` 的数据模型(model), 就需要人为的调用 `$apply()` 来提醒 AngularJS 数据发生变化了。

例如, 但使用JavaScript的 `setTimeout()` 函数来更新一个数据模型的时候, AngularJS 就没有办法知道你改变了数据模型。这种情况下, 就需要调用 `$apply()` 来触发 `$digest` 循环了。类似的, 如果自定义了一个指令, 这个指令设置了一个 DOM 事件监听器, 更改数据模型的代码在时间处理函数里, 那么也需要调用 `$apply()` 来保证更改能反映出来。

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
            Delayed Message: {{message}}
        </div>
    </div>
    <script src="js/angular.js">
    </script>

    <script src="js/apply.js"></script>
</body>

</html>
```

JS 代码:

```javascript
var myApp = angular.module('myApp', [])

myApp.controller('myController', ['$scope', '$timeout', function($scope, $timeout) {
    $scope.getMessage = function() {

        // 方法1:
        setTimeout(function() {
            // 把需要写的逻辑放入$apply函数内
            $scope.$apply(function() {
                $scope.message = 'Fetched after 3 seconds'
                console.log('message: ', $scope.message);
            })
        }, 2000)

        // 方法2:

        // $timeout(function() {
        //     $scope.message = 'Fetched after 3 seconds'
        //     console.log('message: ', $scope.message);
        // }, 2000)

        // 方法3:

        // setTimeout(function() {
        //     $scope.message = 'Fetched after 3 seconds'
        //     console.log('message: ', $scope.message);
        //     $scope.$apply() // 这里触发了 $digest循环
        // }, 2000)
    }

    $scope.getMessage()
}])
```

注意:

> 但需要延时的时候, 尽可能的使用 `$timeout`, 这样, 就不用人为的去调用 `$apply()` 了。
> 在调用 `$apply()` 的时候, 应该总是要传入函数参数, 因为当为 `$apply()` 传入函数的时候, 这个函数在调用的时候是包含在 `try..catch` 中, 并且任何发生的异常都能够被 `$exceptionHandler` 服务所接收。

## 2. `$digest` 循环要执行多少次呢

`$digest` 循环并不只是运行一次。在当前循环结束后, 它会再次启动来检查是否有数据发生变化, 这被叫做 `脏检查`。`$digest` 循环会一直保持循环直到再也没有数据模型发生改变, 或者达到最大的循环次数(10次)。

> 注意: `$digest` 至少会循环两次即使监听函数没有更改任何数据模型。它会多运行一次以确保没有数据发生变化。

## 3. 总结

如果 `AngularJS` 不能检测到你的更改, 那么就必须人为调用 `$apply()`。