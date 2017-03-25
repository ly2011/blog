# React组件的生命周期

---

<!-- TOC -->

- [React组件的生命周期](#react组件的生命周期)
  - [实例化](#实例化)
    - [getDefaultProps](#getdefaultprops)
    - [getInitialState](#getinitialstate)
    - [componentWillMount](#componentwillmount)
    - [render](#render)
    - [componentDidMount](#componentdidmount)
  - [存在期](#存在期)
    - [componentWillReceiveProps](#componentwillreceiveprops)
    - [shouldComponentUpdate](#shouldcomponentupdate)
    - [componentWillUpdate](#componentwillupdate)
    - [componentDidUpdate](#componentdidupdate)
  - [销毁时](#销毁时)
    - [componentWillUnmount](#componentwillunmount)

<!-- /TOC -->

一个 React 组件的生命周期分为三个部分: 实例化、存在期和销毁期。

## 实例化

---

当组件在**客户端**被实例化，第一次被创建时，以下方法依次被调用：

1、getDefaultProps(只存在React.createClass)
2、getInitialState(只存在React.createClass)
3、componentWillMount
4、render
5、componentDidMount

当组件在**服务端**被实例化，首次被创建时，以下方法依次被调用：

1、getDefaultProps(只存在React.createClass)
2、getInitialState(只存在React.createClass)
3、componentWillMount
4、render

componentDidMount 不会在服务端被渲染的过程中调用。

### getDefaultProps

---

对于每个组件实例来讲，这个方法只会调用一次，该组件类的所有后续应用，getDefaultPops 将不会再被调用，其返回的对象可以用于设置默认的 props(properties的缩写) 值。

```javascript
var Hello = React.creatClass({
    getDefaultProps: function(){
        return {
            name: 'pomy',
            git: 'dwqs'
        }
    },

    render: function(){
        return (
            <div>Hello,{this.props.name},git username is {this.props.dwqs}</div>
        )
    }
});

ReactDOM.render(<Hello />, document.body);
```

也可以在挂载组件的时候设置 props：

```javascript
var data = [{title: 'Hello'}];
<Hello data={data} />

```

### getInitialState

---

对于组件的每个实例来说，这个方法的调用有且只有一次，用来初始化每个实例的 state，在这个方法里，可以访问组件的 props。每一个React组件都有自己的 state，其与 props 的区别在于 state只存在组件的内部，props 在所有实例中共享。

getInitialState 和 getDefaultPops 的调用是有区别的，getDefaultPops 是对于组件类来说只调用一次，后续该类的应用都不会被调用，而 getInitialState 是对于每个组件实例来讲都会调用，并且只调一次。

```javascript
var LikeButton = React.createClass({
  getInitialState: function() {
    return {liked: false};
  },
  handleClick: function(event) {
    this.setState({liked: !this.state.liked});
  },
  render: function() {
    var text = this.state.liked ? 'like' : 'haven\'t liked';
    return (
      <p onClick={this.handleClick}>
        You {text} this. Click to toggle.
      </p>
    );
  }
});

ReactDOM.render(
  <LikeButton />,
  document.getElementById('example')
);

```

每次修改 state，都会重新渲染组件，实例化后通过 state 更新组件，会依次调用下列方法：

```javascript

1、shouldComponentUpdate
2、componentWillUpdate
3、render
4、componentDidUpdate

```

但是不要直接修改 `this.state`，要通过 `this.setState` 方法来修改。

### componentWillMount

---

该方法在首次渲染之前调用, 也是在 `render()` 方法调用前修改 state 的最后一次机会了。

### render

该方法会创建一个虚拟DOM, 用来表示组件的输出。对于一个组件来说, render方法是唯一一个必须的方法。

render() 方法需要满足下面几点:

-1. 只能通过 `this.props` 和 `this.state` 访问数据(不能修改)

-2.可以返回 null、false或者任何 React组件

-3.只能出现一个顶级组件, 不能返回一组元素

-4.不能改变组件的状态

-5. 不能修改DOM的输出


### componentDidMount

---

该方法不会在服务端被渲染的过程中被调用。该方法被调用时, 已经渲染出真实的 DOM,可以在该方法中通过 `this.getDOMNode()` 访问到真实的 DOM (推荐使用 `React.findDOMNode()`)。

```javascript
const data = [...]

class Comp extends Component {
  componentDidMount() {
    console.log(this.getDOMNode())
  }
  render () {
    return (
      <input .../>
    )
  }
}
```

由于组件并不是真实的DOM节点, 而是存在于内存之中的一种数据结构, 叫做虚拟DOM,只有当它插入文档之后,才会变成真实的 DOM。有时需要从组件获取真实 DOM的节点,这时就要用到 `ref` 属性:

```javascript
class Area extends Component {
  componentDidMount () {
    // 可以访问到Canvas节点
    const canvas = this.refs.mainCanvas.getDOMNode()
  }

  render () {
    // render调用时,组件未挂载, 这里将报错
    this.getDOMNode()

    return (
      <canvas ref='mainCanvas'>
    )
  }
}
```

>注意: 由于 `this.refs.[refName]` 属性获取的是真实的 DOM, 所以必须等到虚拟DOM插入文档之后, 才能使用这个属性, 否则会报错。

## 存在期

---

此时组件已经渲染好并且用户可以与它进行交互, 比如鼠标点击、手指点按、或者其它的一些事件，导致状态的改变，你将会看到下面的方法依次被调用:

- 1.componentWillReceiveProps

- 2.showComponentUpdate

- 3.componentWillUpdate

- 4.render

- 5.componentDidUpdate

### componentWillReceiveProps

---

组件的 props 属性可以通过父组件来更改，这时，`componentWillReceiveProps` 将会被调用。可以在这个方法里更新 state 以触发 render 方法重新渲染组件。

```javascript
componentWillReceiveProps (nextProps) {
  if (nextProps.checked !== undefined){
    this.setState({
      checked: nextProps.checked
    })
  }
}
```

### shouldComponentUpdate

---

如果确定组件的 props 或者 state 的改变不需要重新渲染, 可以通过在这个方法返回 `false` 来阻止组件来重新渲染, 返回 `false` 则不会执行 render 以及后面的 `componentWillUpdate`、`componentDidUpdate` 方法。

```javascript
showComponentUpdate (nextProps, nextState) {
  return this.state.checked === nextState.checked
  // return false 则不更新组件
}
```

### componentWillUpdate

---

这个方法和 `componentWillMount` 类似, 在组件接收到新的 props 或者 state 即将进行重新渲染前, `componentWillUpdate(nextProps, nextState)` 会被调用, **注意不要在此方法里再去更新props或者state**。

### componentDidUpdate

---

这个方法和 `componentDidMount` 类似, 在组件重新被渲染之后, `componentDidUpdate(prevProps, prevState)` 会被调用。可以在这里访问并修改DOM。


## 销毁时

---

### componentWillUnmount

---

每当React使用完一个组件, 这个组件必须从DOM中卸载后被销毁, 此时 `componentWillUnmount` 会被执行, 完成所有的清理和销毁工作, 在 `componentDidMount` 中添加的任务都需要在该方法中撤销, 如创建的定时器或事件监听器。

在再次装载组件时, 以下方法会被依次调用:

- 1. getInitialState

- 2. componentWillMount

- 3. render

- 4. componentDidMount
