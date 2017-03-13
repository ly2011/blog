## DOM操作写法示例

---

### 选取元素

---

```javascript
document.querySelector('a') // 返回找到的第一个, 不存在返回 null
document.querySelectorAll('a') // 返回所有, 类型是 NodeList。不存在返回长度为 0 的 NodeList
```

### 遍历元素

---

```javascript
[].slice.call(document.querySelectorAll('a')).map((el, index) => {
  console.log(`index: ${el.innerHTML}`);
})
```

### 创建元素

---

```javascript
const newEl = document.createElement('div')
```

### 复制元素

---

```javascript
el.cloneNode(true)
```

### 元素的末尾插入子元素

---

```javascript
el.appendChild(newEl)
```

### 元素的开始插入子元素

---

```javascript
el.insertBefore(newEl, el.firstChild)
```

### 当前元素前面插入元素

---

```javascript
el.parentNode.innsertBefore(newEl, el)
```

### 当前元素后面插入元素

---

```javascript
el.parentNode.insertBefore(newEl, el.nextSibling)
```

### 删除元素

---

```javascript
el.parentNode.removeChild(el)
```

## 表单元素

---

### 获取/设置值

```javascript
document.querySelector('#my-input').value // 获取, 相当于 jQuery 的 $('#my-input').val()
document.querySelector('#my-input').value = 3 // 设置
```

### 单选/复选选中状态

```javascript
document.querySelector('input[type=checkbox]').checked
document.querySelector('input[type=checkbox]').checked = true
```

## 其他

---

### 获取/修改内容

```javascript

// 获取文本
el.textContent
el.textContent = 'xxx' // 相当于 jQuery 的 $el.text('xxx')

// 获取 html
el.innerHTML
el.innerHTML = 'xxx' // 相当于 jQuery 的 $el.html('xxx')
```

### 获取/修改属性

```javascript
el.getAttribute('href')
el.setAttribute('href', 'xxx')
el.tagName
```

### 添加/修改/删除类

```javascript
el.classList.add(className)
el.classList.remove(className)
el.classList.contains(className) // 相当于 jquey 的 hasClass
el.classList.toggle(classList) // 相当于 jquey 的 toggleClass
```

### 获取/设置样式

```javascript
// 注意：此处为了解决当 style 值为 auto 时，返回 auto 的问题
var win = el.ownerDocument.defaultView;

// null 的意思是不返回伪类元素
win.getComputedStyle(el, null).color; // 获取元素的颜色

el.style.color = '#ff0011'
```

### 获取元素的高度

```javascript

// 与 jQuery.height() 一致（一直为 content 区域的高度）
function getHeight(el) {
  const styles = this.getComputedStyle(el);
  const height = el.offsetHeight;
  const borderTopWidth = parseFloat(styles.borderTopWidth);
  const borderBottomWidth = parseFloat(styles.borderBottomWidth);
  const paddingTop = parseFloat(styles.paddingTop);
  const paddingBottom = parseFloat(styles.paddingBottom);
  return height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom;
}

// 精确到整数 (border-box 时为 height - border 值, content-box 时为 height + padding 值)
el.clientHeight
// 精确到小数 (border-box 时为 height 值, content-box 时为 height + padding + border 值)
el.getBoundingClientRect().height
```

## 参考

---

[You Don't Need jQuery](https://github.com/oneuijs/You-Dont-Need-jQuery/blob/master/README.zh-CN.md)
