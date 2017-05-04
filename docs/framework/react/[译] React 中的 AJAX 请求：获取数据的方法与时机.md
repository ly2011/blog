# [译] React 中的 AJAX 请求：获取数据的方法与时机

React 新手一开始可能会问到这样一个问题，“在 React 中如何发送 AJAX 请求呢？”

本文正要回答该问题。

首先：React 本身对获取数据的方式并无任何特殊偏好。实际上，在 React 的图景中，根本就不知道“服务器”这种东西的存在。

React 只是使用 **props** 和 **state** 两处的数据进行组件渲染。

因此，想要使用来自服务端的数据，必须将数据放入组件的 props 或 state 中。

你完全可以按照喜好使用服务、数据模型（额，“建立抽象”）完成这个过程，但归根结底只不过是通过 props 和 state 渲染组件。

#### 选择 HTTP 工具库

要从服务端拿到数据，首先得有一个 HTTP 工具库。现成的轮子数都数不清。它们最终做的事情都一样，但在一些特性上有所不同。

喜欢 Promise？那就试试 [axios](https://github.com/mzabriskie/axios) 吧。

不喜欢 Promise，对回调函数情有独钟？可以看一眼 [superagent](https://github.com/visionmedia/superagent)。

要不试试将要成为标准的一些工具？[fetch](https://github.com/github/fetch) 可能是你的菜。

这些其实根本不重要。没有“最佳”工具。

有些人可能会说，`fetch` 是最好的，因为 fetch 差不多已经是标准了。但我敢打赌，就算fetch **真正** 成为标准，还是会有人喜欢、使用一些与之匹敌的 HTTP 工具库。所以随你怎么选咯。

我个人比较喜欢 [axios](https://github.com/mzabriskie/axios)，这也是本文示例所使用的。不过，认真的说，如果你偏偏不喜欢它，那就选其他的呗。

#### 获取数据

下面是一个简单的示例组件，它从 Reddit 站点获取文章列表。先看一眼，后面会讲述代码是如何工作的。

```
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class FetchDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios.get(`http://www.reddit.com/r/${this.props.subreddit}.json`)
      .then(res => {
        const posts = res.data.data.children.map(obj => obj.data);
        this.setState({ posts });
      });
  }

  render() {
    return (
      <div>
        <h1>{`/r/${this.props.subreddit}`}</h1>
        <ul>
          {this.state.posts.map(post =>
            <li key={post.id}>{post.title}</li>
          )}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <FetchDemo subreddit="reactjs"/>,
  document.getElementById('root')
);
```

### 如何工作

首先引入 `axios`。

```
`import axios from 'axios';`
```

constructor 方法非常标准，调用 `super`，然后初始化 state，设置一个空的 `posts` 数组。

真正神奇的事情发生在 `componentDidMount` 方法中。组件首次“挂载”（mount）时，该方法就会执行。在组件生命周期中，该方法只会执行**一次**。

**TL;DR: 在 componentDidMount 方法中获取服务端数据**

`componentDidMount` 方法中，根据传入的`subreddit`属性，调用 `axios.get` 方法获取数据。反引号中是 ES6 模板字符串，可能如你所想，`${...}` 部分会被其中表达式的值所替换，因此传给 `axios.get`的 URL 实际上是 `http://www.reddit.com/r/reactjs.json`。

此处需注意两点，和 Reddit 有关：

- 可以在 Reddit 网站下面所有的 URL 后面添加 `.json` 后缀，以获取 JSON 格式的内容。
- 如果去掉 `www`，会产生 CORS 错误（至少我碰到了这个错误）。

因为 Axios 使用了 Promise，所以可以通过 `.then` 方法链式处理响应。经过一些处理后，`posts` 被提取出来了，紧接着是重点：

传入新的 posts 数组，使用 `this.setState` 方法更新组件状态。这会导致重新渲染，接下来文章列表就显示出来了。

这就是所有的一切啦哈哈！

### 思考题：添加加载指示

知道怎样修改代码，在请求尚未返回时添加一个 “Loading…” 消息吗？

提示：在 state 中设置一个标志，一旦请求完成则将其切换其值。在 render 函数中使用这个标志显示加载提示。

如果想看示例代码（包括加载提示以及附加奖励 `error state`~），可以点击[这里](https://daveceddia.com/freebies/react-ajax-example.zip)下载可运行的例子，无需注册哟~

解压文件，依次执行 `npm install` 和 `npm start`。示例基于棒棒哒 [Create React App](https://daveceddia.com/create-react-app-official-project-generator) 创建。
