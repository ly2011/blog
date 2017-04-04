# 有趣的JavaScript原生数组函数

---


本文涉及到的知识点:

- 循环: `forEach`

- 判断: `some` 和 `every`

- 区分: `join` 和 `concat`

- 栈和队列的实现: `pop`、`push`、`shift`和 `unshift`

- 模型映射: `map`

- 查询: `filter`

- 排序: `sort`

- 计算: `reduce` 和 `reduceRight`

- 强大的: `splice`

- 查找: `indexOf`

- 操作符: `in`

- 走进: `reverse`


## 循环: forEach

`forEach` 有一个回调函数作为参数, 遍历数组时, 每个数组元素均会调用它，回调函数接收三个参数:

- value: 当前元素

- index: 当前元素的索引

- array: 要遍历的数组

此外, 可以传递可选的第二个参数, 作为每次函数调用的上下文(this)

```javacript

['_', 't', 'a', 'n', 'i', 'f', ']'].forEach(function (value, index, array) {
    this.push(String.fromCharCode(value.charCodeAt() + index + 2))
}, out = [])
out.join('')
// <- 'awesome'

```

>注意: 不能中断 `forEach` 循环, 并且抛出异常也是不明智的选择。


## 判断: some 和 every

---


和 `forEach` 的参数类似, 需要一个包含 value、index和array三个参数的回调函数, 并且也有一个可选的第二个上下文参数。

- `some`: 对数组里每一个元素执行一遍回调函数, 直到回调函数返回 true。

- `every`: 对数组里每一个元素执行一遍回调函数, 当所有元素都符合指定条件时返回 true。


## 区分 join 和 concat

---

- `join(separator)`: 以 separator 作为分隔符拼接数组元素, 并返回字符串形式,如果没有提供 separator, 将使用默认的 `,`。

- `concat()`: 会创建一个新数组, 作为源数组的浅拷贝。

  + `concat` 常用用法: array.concat(val, val2, val3, valn)

  + `concat` 返回一个新数组

  + `array.concat()` 在没有参数的情况下, 返回源数组的浅拷贝

浅拷贝意味着新数组和原数组保持相同的对象引用:

```javascript

var a = { foo: "bar" };

var b = [1, 2, 3, a];

var c = b.concat()

a.foo = '我被改变了'

console.log(b === c);
console.log(b[3] === a && c[3] === a);
console.log(c);

```

## 栈和队列的实现: pop、push、shift、unshift

---

`pop` 是 `push` 的反操作, 它返回被删除的数组末尾元素, 如果数组为空, 将返回  void 0 (undefined)

## 模型映射: map

---

>.map为数组中的每个元素提供了一个回调方法，并返回有调用结果构成的新数组。回调函数只对已经指定值的数组索引执行；它不会对已删除的或未指定值的元素调用。

`map` 和上面提到的 `forEach`、`some`、`every` 有相同的参数格式: `map(function (value, index, array) {}, thisArgument)`

```javascript

values = [void 0, null, false, '']
values[7] = void 0
result = values.map(function(value, index, array){
    console.log(value)
    return value
})
// <- [undefined, null, false, '', undefined × 3, undefined]

```

## 查询: filter

---

>filter对每个数组元素执行一次回调函数，并返回一个由回调函数返回true的元素组成的新数组。回调函数只会对已经指定值的数组项调用。

`filter` 和上面提到的 `forEach`、`some`、`every` 有相同的参数格式: `filter(function (value, index, array) {}, thisArgument)`

```javascript

[void 0, null, false, '', 1].filter(function (value) {
    return value
})
// <- [1]
[void 0, null, false, '', 1].filter(function (value) {
    return !value
})
// <- [void 0, null, false, '']

```


## 排序: sort

>如果没有提供 compareFunction, 元素会被转换为字符串并按照字典排序。例如, '80' 排在 '9' 之前，而不是在其后。

跟大多数排序函数类似, Array.prototype.sort(fn(a,b)) 需要一个包含两个测试参数的回调函数, 其返回值如下:

- a在b之前则返回值小于0

- a和b相等则返回值是0

- a在b之后则返回值小于0

```javascript

[9,80,3,10,5,6].sort()
// <- [10, 3, 5, 6, 80, 9]
[9,80,3,10,5,6].sort(function (a, b) {
    return a - b
})
// <- [3, 5, 6, 9, 10, 80]
```

## 计算: reduce 和 reduceRight

---

`reduce` 从左往右遍历数组, 而 `reduceRight` 则从右往左遍历数组,两者典型用法: `reduce(callback(previousValue,currentValue, index, array), initialValue)`

previousValue 是最后一次调用回调函数的返回值，initialValue则是其初始值，currentValue是当前元素值，index是当前元素索引，array是调用.reduce的数组

一个典型的用例,使用 `reduce` 的求和函数(多此一举, sum不就是可以了吗, 狗带...)

```javascript

Array.prototype.sum = function () {
  return this.reduce(function (partial, value) {
    return partial + value
  }, 0)
}

[3,4,5,6,10].sum()
// <- 28
```

如果想把数组拼接成一个字符串，可以用 `join` 实现。然而，若数组值是对象， `join` 就不会按照我们的期望返回值了，除非对象有合理的 `valueOf` 或 `toString` 方法，在这种情况下，可以用 `reduce` 实现：

```javascript

function concat (input) {
    return input.reduce(function (partial, value) {
        if (partial) {
            partial += ', '
        }
        return partial + value
    }, '')
}
concat([
    { name: 'George' },
    { name: 'Sam' },
    { name: 'Pear' }
])
// <- 'George, Sam, Pear'

```

## 复制: slice

---

和 `concat` 类似, 调用没有参数的 `slice()` 方法会返回源数组的一个浅拷贝。
`slice()` 有两个参数: 一个是开始的位置和一个结束位置。

- `Array.prototype.slice` 能被用来将类数组对象转换为真正的数组。

```javascript

Array.prototype.slice.call({ 0: 'a', 1: 'b', length: 2 })

// <- ['a', 'b']
这对.concat不适用，因为它会用数组包裹类数组对象。

Array.prototype.concat.call({ 0: 'a', 1: 'b', length: 2 })
// <- [{ 0: 'a', 1: 'b', length: 2 }]

```

- `slice`的另外一个通常用法是从一个参数列表中删除一些元素, 这可以将类数组对象转换为真正的数组。

```javascript


function format (text, bold) {
  if (bold) {
    text = `<b>${text}</b>`
  }
  var values = Array.prototype.slice.call(arguments, 2)
  console.log('values: ', values);
  values.forEach(function (value) {
    text = text.replace('%s', value)
  })
  return text
}

console.log(format('some%sthing%s %s', true, 'some', 'other', 'things'))

```


## 强大的: splice

**语法:**

```javascript

arrayObject.splice(index, howmany, item1,......, itemX)

```

`splice`: 只需调用一次, 就允许你删除元素、插入元素、并能同时进行删除、插入操作。

>注意, 不同于 `concat` 和 `slice`, 这个函数会改变源数组。

```javascript

var source = [1,2,3,8,8,8,8,8,9,10,11,12,13]
var spliced = source.splice(3, 4, 4, 5, 6, 7)
console.log(source)
// <- [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ,13]
spliced
// <- [8, 8, 8, 8]

```

正如你看到的，`splice` 会返回删除的元素。如果你想遍历已经删除的数组时，这会非常方便

```javascript

var source = [1,2,3,8,8,8,8,8,9,10,11,12,13]
var spliced = source.splice(9)
spliced.forEach(function (value) {
    console.log('removed', value)
})
// <- removed 10
// <- removed 11
// <- removed 12
// <- removed 13
console.log(source)
// <- [1, 2, 3, 8, 8, 8, 8, 8, 9]

```

## 查找: indexOf

---

利用 `indexOf` 可以在数组中查找一个元素的位置，没有匹配元素则返回 -1。我经常使用 `indexOf` 的情况是当我有比较时，例如：a === 'a' || a === 'b' || a === 'c'，或者只有两个比较，此时，可以使用 indexOf：['a', 'b', 'c'].indexOf(a) !== -1。

注意，如果提供的引用相同，indexOf也能查找对象。第二个可选参数用于指定开始查找的位置。


```javascript

var a = { foo: 'bar' }
// var b = [{ foo: 'bar' }, 2]
var b = [a, 2]
console.log(b.indexOf(1))
// <- -1
console.log(b.indexOf({ foo: 'bar' }))
// <- -1
console.log(b.indexOf(a))
// <- 0
console.log(b.indexOf(a, 1))
// <- -1
b.indexOf(2, 1)
// <- 1

```

如果想从后向前搜索, 也可以使用 `lastIndexOf`。

## 操作符: in

---

容易和 `indexOf` 混淆。

```javascript

var a = [1, 2, 5]

console.log(1 in a)

// <- true

console.log(5 in a)

// <- false


```

问题在于 `in` 操作符是检索对象的健而不是值。当然，这在性能上比 `indexOf` 快得多。

```javascript

var a = [ 3, 7, 6]

console.log(1 in a === !!a[1])

// <- true

```

## 走进: reverse

---

该方法将数组中的元素倒置。

```javascript

var a = [1, 1, 7, 8]
a.reverse()
// [8, 7, 1, 1]

```

>注意: `reverse` 会修改数组本身。







