## 如何在 AngularJS 中使用 Promise

---

要在 `AngularJS` 中使用 `Promise`, 要使用 `AngularJS` 的内置服务 `$q`。

我们可以先使用 `$q` 的 `defer()` 方法创建一个 `deferred` 对象, 然后通过 `deferred` 对象的 `promise` 属性, 将这个对象变成一个 `promise` 对象; 这个 `deferred` 对象还提供了三个方法, 分别是 `resolve()`, `reject()`, `notify()`。

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
            <label for="flag">成功
      <input type="checkbox" name="flag" id="flag" ng-model="flag">
    </label>
            <hr>
            <button ng-click="handle()">点击我</button>
        </div>
    </div>
    <script src="js/angular.js">
    </script>
    <script src="js/promise.js"></script>
</body>

</html>
```

JS 代码:

```javascript
angular.module('myApp', [])
    .controller('myController', ['$scope', '$q', function($scope, $q) {
        $scope.flag = true
        $scope.handle = function() {
            // 创建一个 deferred 对象
            var deferred = $q.defer()
            // 创建一个 promise 对象
            var promise = deferred.promise

            promise.then(function(result) {
                alert('Success: ' + result)
            }, function(error) {
                alert('Fail: ' + error)
            })

            if ($scope.flag) {
                deferred.resolve('you are lucky!')
            } else {
                deferred.reject('sorry, it lost!')
            }
        }
    }])
```

`$q` 的 `defer()` 方法创建的对象具有哪些方法

- `resolve(value)`: 用来执行 `deferred promise`, `value` 可以为字符串, 对象等。

- `reject(value)`: 用来拒绝 `deferred promise`, `value` 可以为字符串, 对象等。

- `notify(value)`: 获取 `deferred promise` 的执行状态, 然后使用这个函数来传递它。

- `then(successFunc, errorFunc, notifyFunc)`: 无论 `promise` 是成功了还是失败了, 当结果可用之后, `then` 都会立即异步调用 `successFunc`, 或者 `errorFunc`, 在 `promise` 被执行或者拒绝之前, `notifyFunc` 可能会被调用0 到 多次, 以提供过程状态的提示。

- `catch(errorFunc)`

- `finally(callback)`
