## js基本操作-数组去重

---

<!-- TOC -->

- [js基本操作-数组去重](#js基本操作-数组去重)
  - [数组去重的方法](#数组去重的方法)
    - [1. 临时数组保存(其实这里面还没考虑到数组里面嵌套数组/对象的情况)](#1-临时数组保存其实这里面还没考虑到数组里面嵌套数组对象的情况)
    - [2. 利用对象去重(当数组的键为 11, '11'时, 会保留第一个出现的值)](#2-利用对象去重当数组的键为-11-11时-会保留第一个出现的值)
    - [3. 先排序, 后去重](#3-先排序-后去重)
    - [4. 利用 ES6 的 Set 对象 和 Array.from 方法](#4-利用-es6-的-set-对象-和-arrayfrom-方法)
    - [5.利用 filter 和 Map 对象](#5利用-filter-和-map-对象)

<!-- /TOC -->

### 数组去重的方法

---

#### 1. 临时数组保存(其实这里面还没考虑到数组里面嵌套数组/对象的情况)

把去重后的结果放在一个临时数组中, 对原来数组的元素与临时数组元素比较, 临时数组中不存在这个元素的, 放入临时数组。

```javascript
function unique (arr) {
    if (!Array.isArray(arr)) return arr;
    var result = [];
    arr.map(function (item) {
        if (result.indexOf(item) == -1) {
            result.push(item);
        }
    })
    return result;
}
```

#### 2. 利用对象去重(当数组的键为 11, '11'时, 会保留第一个出现的值)

创建一个新的数组存放结果, 和一个空的对象。for循环时, 每次取出一个元素与对象进行对比, 如果这个元素不重复, 则把它存放到结果数组中, 同时把这个元素的内容作为一个对象的属性, 并赋值, 存入对象中。

```javascript
function unique (arr) {
    if (!Array.isArray(arr)) return arr;
    var result = [];
    var obj = {}
    arr.map(function (item) {
        if (!obj[item]) {
            result.push(item);
            obj[item] = 1
        };
    })
    return result;
}
```

#### 3. 先排序, 后去重

先把数组排序, 然后比较相邻的两个值。排序的时候用原生的 sort 方法, JS引擎内部使用的是快速排序。

```javascript
function unique(arr) {
    if (!Array.isArray(arr)) return arr;
    if (arr.length < 2) return arr;
    arr.sort(); // sort在元数组进行排序, 不生成副本
    var result = [arr[0]]
    arr.map(function (item, index, arr) {
        if (index > 0) {
            if (item !== arr[index - 1]) {
                result.push(item);
            }
        }
    })

    return result;
}
var arr = [99, 88, 22, 22, 44, 88, 99, '99']
console.log(unique(arr));
```

#### 4. 利用 ES6 的 Set 对象 和 Array.from 方法

- Set对象: 它是ES6新增的有序列表集合, 不会包含重复项。
- Array.from()方法: 将一个类数组或可遍历对象转换成真正的数组。

```javasript
function unique (arr) {
    if (!Array.isArray(arr)) return arr;
    if (arr.length < 2) return arr;
    return Array.from(new Set(arr))
}
var arr = [99, 88, 22, 22, 44, 88, 99, '99']
console.log(unique(arr));
```

#### 5.利用 filter 和 Map 对象

```javascript
function unique(arr) {
    if (!Array.isArray(arr)) return arr;
    if (arr.length < 2) return arr;
    return arr.filter(function(item, index, arr) {
        if (arr.indexOf(item) === index) {
            return true;
        }
    });
}
var arr = [99, 88, 22, 22, 44, 88, 99, '99']
console.log(unique(arr));
```