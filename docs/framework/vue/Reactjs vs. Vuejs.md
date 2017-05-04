# Reactjs vs. Vuejs

这里要讨论的话题，不是前端框架哪家强，因为在 [Vue 官网](http://cn.vuejs.org/v2/guide/comparison.html#React)就已经有了比较全面客观的介绍，并且是中文的。

![img](https://blog-10039692.file.myqcloud.com/1493706989822_9114_1493706990770.png)

上图是二月份前端框架排名，React 位居第一，Vue 排名第三。还清晰记得，16 年十月份该 showcase 首页并未看到 Vue，如今已有 40000+ stars，那时的 React 也差不多这个成绩，可见 Vue 2.0 有多受关注，而排名第二的 Angular 当时位居第一，短短数月 React、Vue 都有比较好的成绩，而 Angular 的 stars 没有明显增长，是否可以断章取义，Angular 正在慢慢地退出这个舞台。

对于近期关注度最高的 React 和 Vue，想在这里谈谈两个框架在开发风格上的差异。Vue 升级到[2.0](https://cn.vuejs.org/v2/guide/)之后新增了很多 React 原有的特性，我的理解是 Vue 在这些方面对 React 的肯定和致敬，下面将在几个细节上作对比。

## Vue更容易上手

Vue 更容易上手！这是真的吗？我书读的少，作者是想支持国产吗？

Vue 的语法很自由，比如：

- 前期不需要认识复杂的生命周期函数，可能只关心 mounted 和 Vue.nextTick（保证 this.$el 在 document 中）
- 熟悉的前端模板
- 父子组件间通信更灵活
- slot，可以大尺度地扩展组件（但也不要过度使用哦）
- v-model，mvvm 的方式处理表单更方便
- 官网中文文档（哈哈，不得不承认）

从入门学习一个框架的角度看，少一些规则多一些自由空间，门槛会低些。

## 表单在 React 中的蛋疼之处

React 和 Vue 如何拿 input 的 value，先上代码

**Reactjs**

```
class Demo extends React.Component{
  constructor(props){
    super(props)
    this.state={
      inputA: '',
      inputB: ''
    }
  }
  _onChangeA(e){
    this.setState({
      inputA: e.target.value
    })
  }
  _onChangeB(e){
    this.setState({
      inputB: e.target.value
    })
  }
  render() {
    return (
      <div>
          <input
          onChange={this._onChangeA.bind(this)}
          value={this.state.inputA}
          />
        <input
          onChange={this._onChangeB.bind(this)}
          value={this.state.inputB}
          />
      </div>
    );
  }
};

ReactDOM.render(
  <Demo/>,
  document.getElementById('container')
);

```

**Vuejs**

```
<div id="demo">
    <input
      v-model="inputA"
      :value="inputA"/>
    <input
      v-model="inputB"
      :value="inputB"
      />
    <button
      @click="show"
      >
      show
    </button>
</div>
new Vue({
    el: '#demo',
    data: {
      inputA: '',
      inputB: ''
    }
})

```

Vue 进行表单处理的方式是不是更简洁，由于 v-model 属性支持数据双向绑定，说白了就是（value 的单向绑定 + onChange 事件监听）的语法糖，但这个味道还不错吧，比起在 React 中需要绑定多个 onChange 事件确实要方便得多。

## JSX vs Templates

刚接触 React，因为用惯了javascript 模板引擎，一直坚信视图与功能逻辑分离是正确的选择，突然看到 JSX 把 html 写在 js 里，内心是拒绝的！

Facebook 官方好像知道大家对 JSX 有偏见，在文档一开始就给出[解释](http://reactjs.cn/react/docs/displaying-data.html#jsx-syntax)

> We strongly believe that components are the right way to separate concerns rather than “templates” and “display logic.” We think that markup and the code that generates it are intimately tied together. Additionally, display logic is often very complex and using template languages to express it becomes cumbersome.

在这里结合我的理解翻译一下， React 团队坚信一个组件的正确用途是 “separate concerns”，而不是前端模板或者展示逻辑。我们认为前端模板和组件代码是紧密相连的。另外，模板语言经常让展示的逻辑变得更复杂。

刚开始没弄明白什么是 “separate concerns”，其实现在也… Facebook 可能是在强调组件应该从功能上去抽象定义，而不仅仅从视觉上区分。

- 看完官方答复我欣然接受了，有谁在写前端模板的时候，没有掺杂业务逻辑的，掺杂了不就违背 MVC 吗！Facebook 觉得这种“分离”让问题更复杂，不如把模板和逻辑代码结合到一块。而开发者一开始不接受 JSX，是受到传统js拼接字符串模板的死板方式影响，其实 JSX 更灵活，[它在逻辑能力表达上完爆模板，但也很容易写出凌乱的render函数，不如模板直观](https://www.zhihu.com/question/31585377)

## 组件通信

Vue 组件向上通信可通过触发事件，但在 Vue 2.0 [废弃 dispatch](https://cn.vuejs.org/v2/guide/migration.html#dispatch-和-broadcast-替换)，建议使用global event bus。而大多初学者以为 React 只能靠调用父组件的 callback，并且这种方式遇到组件层次太深的时候简直就是噩梦。其实 React 也可以通过[事件通信](http://www.alloyteam.com/2016/01/some-methods-of-reactjs-communication-between-components/)来解决问题，只不过需要额外 coding 或调用第三方插件，而 Vue 的核心库已实现了该功能。React 拥有丰富的生态圈，很多事情是大家一起完成的。

## ref or props

父组件可通过 ref 定位子组件并调用它的 api，也可通过 props 传递数据，实现父组件通知子组件，ref 和 props 这两种方式将决定组件的形态。在实际开发中，可能 Vue 先入为主，ref 也用的比较多，因为它在组件封装力度上确实有优势， api 可让组件更抽象、更关注自身的功能，不受外界影响。而后来转到 React 几乎都是用 props 通信，一开始还以为是 React 的问题，甚至还得出了这样的结论：React 组件像是 UI 组件，Vue 组件更接近对象。直到最近看了 Facebook 文档，才发现另有蹊跷。先看看之前用 Vue ，我是如何去创建一个列表（List）组件，并实现列表数据的新增和删除，以及调用方式。

没用过 ref 的同学，可以先看下[文档](https://facebook.github.io/react/docs/refs-and-the-dom.html)，不过看完下面代码也能大概知道 ref 的作用。

**Vuejs**

```
<script src="https://unpkg.com/vue/dist/vue.js"></script>

<div id="demo">
  <input
    :value="input"
    v-model="input"
    />
  <button
    @click="add"
    >
    add
  </button>
  <List
    ref="list"
  />
</div>
var List = Vue.extend({
  props: {
    list: {
      type: Array,
      default: function(){return []}
    }
  },
  template:'<div><ul v-for="(item, index) in list"><li>{{item.name}} <i @click="deleteItem(item, index)">delete</i></li></ul></div>',
  data: function(){
    return{
        input: ''
    }
  },
  methods: {
    addItem: function(name){
        this.list.push({name: name})
    },
    deleteItem: function(item, index){
        this.list.splice(index, 1)
    }
  }
})

Vue.component('List',List)

new Vue({
    el: '#demo',
    data: {
      input: ''
    },
    methods: {
      add: function(){
        this.$refs.list.addItem(this.input)
      }
    }
})

```

再看看 React 是怎么做的

```
class List extends React.Component{
  _delete(index){
    this.props.onDelete && this.props.onDelete(index)
  }
  render() {
    return (
      <ul>
      {
          this.props.list.map((item, index)=>{
          return (
            <li
              key={index}
            >
                 {item}
              <i onClick={this._delete.bind(this, index)}>
                  delete
              </i>
            </li>
          )
        })
      }
      </ul>
    );
  }
};

class Page extends React.Component{
  constructor(props){
    super(props)
    this.state={
      input: '',
      list: []
    }
  }
  _bindChange(e){
    this.setState({
      input: e.target.value
    })
  }
  _add(){
    this.state.list.push(this.state.input)
    this.forceUpdate()
  }
  _delete(index){
    this.state.list.splice(index, 1)
    this.forceUpdate()
  }
  render() {
    return (
      <div>
        <input
          onChange={this._bindChange.bind(this)}
          value={this.state.input}
          />
        <button
          onClick={this._add.bind(this)}
          >
          add
        </button>
        <List
          list={this.state.list}
          onDelete={this._delete.bind(this)}
        />
      </div>
    );
  }
};

ReactDOM.render(
  <Page/>,
  document.getElementById('container')
);

```

通过上面两段代码可以看出，在调用 List 组件的时候，React 比 Vue 复杂的多，不仅仅是多了 onChange，还有新增和删除的逻辑，都必须在父组件中实现，这样会导致项目中多处调用 List 组件，都必须实现这套相似的逻辑，而这套逻辑在 Vue 中已封装在组件里，这也是为什么利用 ref 在封装力度上有优势，所以给我的感觉，React 比较关注组件的展示，而 Vue 比较关注功能。

细心的同学可能发现了，React也有[ ref 属性](http://reactjs.cn/react/docs/more-about-refs.html#the-ref-callback-attribute)，它也可以让父组件调用子组件的 api，但实际项目中却很少看到，为什么大家都这么同步一致呢？我查了一下文档，[原来 Facebook 不推荐过度使用 ref](https://facebook.github.io/react/docs/refs-and-the-dom.html#dont-overuse-refs)

> Your first inclination may be to use refs to “make things happen” in your app. If this is the case, take a moment and think more critically about where state should be owned in the component hierarchy. Often, it becomes clear that the proper place to “own” that state is at a higher level in the hierarchy. See the Lifting State Up guide for examples of this.

官方还有个[栗子](https://facebook.github.io/react/docs/lifting-state-up.html)，这里我也举个比较常见的
![img](https://blog-10039692.file.myqcloud.com/1493708208719_2208_1493708209384.png)
基于上面的栗子，比如现在列表数据多啦！需要在列表顶部显示有多少条数据！我们可以定义一个显示条数的组件 Counts。

**Vuejs**

```
var bus = new Vue()
var Counts = Vue.extend({
  data: function(){
    return{
      count: 0
    }
  },
  template: '<span>{{count}}</span>',
  mounted: function(){
    var self = this
    bus.$on('plus', function(){
      self.count++
    })
    bus.$on('minus', function(){
      self.count--
    })
  }
})
Vue.component('Count', Count)

```

**Reactjs**

```
let Counts = (props)=>{
  return (
    <span>
      {props.count}
    </span>
  );
}

```

如按照 Vue 的实现方法（好吧！这里好像要黑 Vue，其实是我一开始的误解），Counts 组件需监听两个事件（plus & minus），在事件回调中去更新条数，当 List 进行`add()` 或 `delete()` 需触发`plus / minus`，且不说 Counts 组件复杂，这事件流也很难追溯，代码放久看着吃力！但 React 把共享数据抽离了，父组件把`this.state.list.length`通过 props 传入 Counts，这种方式逻辑更清晰，扩展能力更强。虽然像 React 这种，在不需要组件共享数据时，调用起来很繁琐，调用 List 时`add / delete` 逻辑都要写一遍，但业务的发展很难说，很多意想不到的情况都会发生，比如上面的栗子，后期指不定还要加一个分页组件呢，所以我悬崖勒马，以后不管在 Vue 还是 React，尽量少用 ref 调用子组件。当组件之间有共享数据时，该数据与操作该数据的逻辑，应该放在最接近它们的父组件，这样组件的逻辑会更合理，更清晰！

最后，这两个框架的路线有差异，Vue 偏向大而全，把很多特性都封装进核心库，React 则不同，React 核心库只是 React 生态圈很小一部分，只负责 view 这个层面，其它事情都是由大家一起完成，所以 React 会有这么多插件。Reactjs 和 Vuejs 都是伟大的框架！
