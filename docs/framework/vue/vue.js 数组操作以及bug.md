# 问题1:

因为 JavaScript 的限制，Vue.js 不能检测到下面数组变化：

* 直接用索引设置元素，如 vm.items[0] = {}；

* 修改数据的长度，如 vm.items.length = 0。

为了解决问题 (1)，Vue.js 扩展了观察数组，为它添加了一个 $set() 方法：

```javascript
// 与 `example1.items[0] = ...` 相同，但是能触发视图更新
example1.items.$set(0, { childMsg: 'Changed!'})
```
至于问题 (2)，只需用一个`空数组`替换 items。

除了 `$set()`， Vue.js 也为观察数组添加了 `$remove()` 方法，用于从目标数组中查找并删除元素，在内部它调用 splice() 。因此，不必这样：
```javascript
var index = this.items.indexOf(item)
if (index !== -1) {
  this.items.splice(index, 1)
}
```
只用这样：
```javascript
this.items.$remove(item)
```

# 问题2:

vue 如何删除数组元素

```javascript
this.items.$remove(this.items.find(t => t.goods_id === 5))
this.items = this.items.filter(t => t.goods_id != 5)
```


例子:

```javascript
let key = -1
_self.addressList.forEach(function(v, i){
    if (v.id === data.data.id) {
        key = i
    }
})
_self.addressList.$set(key, data.data)
```
