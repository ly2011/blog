# React组件的生命周期

---

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

## getDefaultProps

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

## getInitialState

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

## componentWillMount

---

该方法在首次渲染之前调用, 也是在 `render()` 方法调用前修改 state 的最后一次机会了。

## render

