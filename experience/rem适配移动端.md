# rem适配移动端

---

```javascript
/**
 * 基础配置
 */
import FastClick from 'fastclick'

;((doc, win) => {
  const docEl = doc.documentElement
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  const recalc = () => {
    const clientWidth = docEl.clientWidth
    if (!clientWidth) {
      return
    }

    // 这个7.5就是根据设计稿的横向宽度来确定的，假如你的设计稿是750(手机deviceWidth跟设计稿的比例值 的 100倍, 即是元素大小除以100)
    // https://segmentfault.com/a/1190000003931773
    docEl.style.fontSize = clientWidth / 750 * 100 + 'px'
  }
  if (!doc.addEventListener) {
    return
  }
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
  // 当dom加载完成时，或者 屏幕垂直、水平方向有改变进行html的根元素计算
})(document, window)

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body)
  }, false)
}
```
