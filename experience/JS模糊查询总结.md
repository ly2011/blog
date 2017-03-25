# JS 模糊查询总结

---

<!-- TOC -->

- [JS 模糊查询总结](#js-模糊查询总结)
  - [search() 方法](#search-方法)
  - [match() 方法](#match-方法)
  - [indexOf() 方法](#indexof-方法)
  - [includes() 方法](#includes-方法)

<!-- /TOC -->

## search() 方法

---

**语法**

```javascript

str.search(regexp)

```

**参数**

- regexp: 一个正则表达式对象, 如果传入一个非正则表达式对象, 则会使用 `new RegExp(obj)` 隐性地将其转为正则表达式对象。

**返回值**

如果匹配成功, 则 `search()` 返回正则表达式在字符串中首次匹配项的索引。否则, 返回-1。

```javascript
// util

function isArray(arr) {
  if (!Array.isArray) {
    Array.isArray = function(arr) {
      return Object.prototype.toString.call(arr) === "[object Array]"
    }
  }
  return Array.isArray(arr)
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]"
}

function FuzzySearch(re, str) {
  if (str.search(re) !== -1) {
    return true
  } else {
    return false
  }
}

const arr = [
  {
    id: 1,
    username: "梅西"
  },
  {
    id: 2,
    username: "C罗"
  },
  {
    id: 3,
    username: "科比"
  },
  {
    id: 4,
    username: "詹姆斯"
  },
  {
    id: 5,
    username: "詹姆斯二世"
  },
  {
    id: 6,
    username: "科比的女儿"
  },
  {
    id: 7,
    username: "Ly love eat"
  },
  {
    id: 8,
    username: 'ly love sleep'
  },
  {
    id: 9,
    username: 'LY dislike keep fit'
  }
];

const queryString = 'ly'
const queryExpI = /ly/i
const queryExp = 'ly'
let newArr = []
if (isArray(arr)) {
  newArr = arr.filter(item => {
    if (isObject(item)) {
      return FuzzySearch(queryExpI, item.username)
    }
  })
}

console.log('newArr: ', newArr)
```


## match() 方法

---

**语法**

```javascript

str.match(regexp)

```

**参数**

regexp: 一个正则表达式对象。如果传入一个非正则表达式对象,则会隐式地使用 `new RegExp(obj)` 将其转换为一个 RegExp。如果未提供任何参数,直接使用 `match()`, 将会得到一个包含空字符串的 Array: [""]

**返回值**

array: 一个包含整个匹配结果以及任何括号捕获的匹配结果的 Array, 如果没有匹配项, 则返回 null。

**示例**

```javascript
// util

function isArray(arr) {
  if (!Array.isArray) {
    Array.isArray = function(arr) {
      return Object.prototype.toString.call(arr) === "[object Array]"
    }
  }
  return Array.isArray(arr)
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]"
}

function isNull(obj) {
  return Object.prototype.toString.call(obj) === "[object Null]"
}

function FuzzySearch(re, str) {
  const result = str.match(re)
  if (isNull(result) || (isArray(result) && result[0] === '')) {
    return false
  } else {
    return true
  }
}

const arr = [
  {
    id: 1,
    username: "梅西"
  },
  {
    id: 2,
    username: "C罗"
  },
  {
    id: 3,
    username: "科比"
  },
  {
    id: 4,
    username: "詹姆斯"
  },
  {
    id: 5,
    username: "詹姆斯二世"
  },
  {
    id: 6,
    username: "科比的女儿"
  },
  {
    id: 7,
    username: "Ly love eat"
  },
  {
    id: 8,
    username: 'ly love sleep'
  },
  {
    id: 9,
    username: 'LY dislike keep fit'
  }
];

const queryString = 'ly'
const queryExpI = /ly/i
const queryExp = 'ly'
let newArr = []
if (isArray(arr)) {
  newArr = arr.filter(item => {
    if (isObject(item)) {
      return FuzzySearch(queryExpI, item.username)
    }
  })
}

console.log('newArr: ', newArr)
```


## indexOf() 方法

---

>注意, indexOf()方法区分大小写

**语法**

```javascript

str.indexOf(searchValue[,fromIndex])

```

**参数**

- searchValue: 一个字符串表示被查找的值

- fromIndex(可选): 表示该方法的字符串开始查找的位置。


**返回值**

指定值得第一次出现的索引;如果没找到返回 -1。

**示例**

```javascript
// util

function isArray(arr) {
  if (!Array.isArray) {
    Array.isArray = function(arr) {
      return Object.prototype.toString.call(arr) === "[object Array]"
    }
  }
  return Array.isArray(arr)
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]"
}

function isNull(obj) {
  return Object.prototype.toString.call(obj) === "[object Null]"
}

function FuzzySearch(re, str) {
  if (str.indexOf(re) !== -1) {
    return true
  } else {
    return false
  }
}

const arr = [
  {
    id: 1,
    username: "梅西"
  },
  {
    id: 2,
    username: "C罗"
  },
  {
    id: 3,
    username: "科比"
  },
  {
    id: 4,
    username: "詹姆斯"
  },
  {
    id: 5,
    username: "詹姆斯二世"
  },
  {
    id: 6,
    username: "科比的女儿"
  },
  {
    id: 7,
    username: "Ly love eat"
  },
  {
    id: 8,
    username: 'ly love sleep'
  },
  {
    id: 9,
    username: 'LY dislike keep fit'
  }
];

const queryString = 'ly'
const queryExpI = /ly/i
const queryExp = 'ly'
let newArr = []
if (isArray(arr)) {
  newArr = arr.filter(item => {
    if (isObject(item)) {
      return FuzzySearch(queryString, item.username)
    }
  })
}

console.log('newArr: ', newArr)
```

## includes() 方法

---

>注意, `includes()` 方法是区分大小写的。

`includes()` 方法用于判断一个字符串是否包含在另一个字符串中，根据情况返回true或false。

**语法**

```javascript
str.includes(searchString[, position])
```

**参数**

- searchString: 要在此字符串中搜索的字符串

- position(可选): 从当前字符串的哪个索引位置开始搜寻子字符串;默认值为 0。


**返回值**

如果当前字符串包含被搜寻的字符串, 就返回true; 否则返回false。

```javascript
// util

function isArray(arr) {
  if (!Array.isArray) {
    Array.isArray = function(arr) {
      return Object.prototype.toString.call(arr) === "[object Array]"
    }
  }
  return Array.isArray(arr)
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]"
}

function isNull(obj) {
  return Object.prototype.toString.call(obj) === "[object Null]"
}

function FuzzySearch(re, str) {
  if (str.includes(re)) {
    return true
  } else {
    return false
  }
}

const arr = [
  {
    id: 1,
    username: "梅西"
  },
  {
    id: 2,
    username: "C罗"
  },
  {
    id: 3,
    username: "科比"
  },
  {
    id: 4,
    username: "詹姆斯"
  },
  {
    id: 5,
    username: "詹姆斯二世"
  },
  {
    id: 6,
    username: "科比的女儿"
  },
  {
    id: 7,
    username: "Ly love eat"
  },
  {
    id: 8,
    username: 'ly love sleep'
  },
  {
    id: 9,
    username: 'LY dislike keep fit'
  }
];

const queryString = 'ly'
const queryExpI = /ly/i
const queryExp = 'ly'
let newArr = []
if (isArray(arr)) {
  newArr = arr.filter(item => {
    if (isObject(item)) {
      return FuzzySearch(queryString, item.username)
    }
  })
}

console.log('newArr: ', newArr)
```
