# CSS隐藏元素的N种实现方式

## width: 0;

缺点文字隐藏不了, 可以加个 `color: #fff`和背景颜色一样就ok了。

>注意: 如果有文字的话, 还是可以点击事件的。

## height: 0;

和 `width: 0` 是同样的道理。

## opacity: 0;

元素还在, 只是看不见而已。

## position: absolute; left: -9999px;

元素还在, 只是超出了屏幕范围

## text-index: -9999;

只能达到隐藏文字的效果, 没有其他副作用。(例如给logo添加文字)

## z-index: -99999;

需要配合定位使用

>如果这个元素比后面的元素高了或者宽了，再着有文字一样还是可以看到这个元素。

## display: none;

元素被隐藏, 并且不占位置

## background-color: #fff;

把元素的背景颜色设置成body的背景, 障眼法。

## max-width: 0px;

同 `width: 0px` 原理一样。

## max-height: 0px;

同 `height: 0px` 原理一样。

## background-color: rgba(0, 0, 0, 0); color: #fff;

把元素的透明度设置成0, 达到看不见的效果, 和 `opacity: 0` 原理一样。
如果想让文字也看不见, 给它一个障眼法就好了, 或者设置 `font-size: 0` 。

## font-size: 0px;

隐藏文字的效果

## margin-left: -9999px;

把元素移出屏幕可视区

## -webkit-clip-path: polygon(0px 0px, 0px 0px, 0px 0px, 0px 0px);

把元素裁剪了
