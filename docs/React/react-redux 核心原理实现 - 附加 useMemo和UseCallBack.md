---
title: react-redux 核心原理实现 - 附加 useMemo和UseCallBack
date: 2021-09-14
sticky:
  - 置顶
  - 3
sidebar: auto
categories:
  - 前端
tags:
  - react
  - 源码
---

## react-redux 核心原理实现 - 附加 useMemo 和 UseCallBack

> redux 不是 react 官方出的库，react-redux 才是 react 官方出的库，是在 redux 的基础上进行封装。react-redux 是将组件再次进行细分，分成了容器组件和 UI 组件

#### 为什么要使用 react-redux

这一点在我刚学习 react-redux 的时候也一直是困扰了我许久，因为我感觉就直接使用 redux 已经是很方便的可以使用了。但是使用 react-redux 我们在写类组件的时候还要写很复杂的`connect`函数来链接容器组件和 UI 组件。

但是在我深入的学习并且在实际开发中用到了 react 了以后，发现直接使用 redux 是有问题的，比如每个组件我们要使用 store 的数据都需要手动引入 store。再进行`getState`,`subscribe`,很复杂，而使用了 react-redux 之后就可以直接在最顶层向下传递，并且如果是类组件就可以直接将 store 中我们要用的东西通过 connect 方法链接到组件的 props 上，非常的方便

尤其是在 react-redux@7.1.0 版本之后直接支持了`useDispatch`和`useSelector`这两个 hooks，可以让我们在函数组件中更加优雅的获取到 state 和 dispatch。简直不要太好用。

#### API

- Provider

  > 是一个组件，可以接收一个 store 对象，store 就是 redux 的那个 store，一般都是放在整个项目的最外层根组件
  >
  > `<Provider store={store}><App /></Provider>`

- connect

  > 用于链接容器组件和 UI 组件的方法，是一个高阶函数，接收两个值，分别是 mapStateToProps 和 mapDIspatchToProps，返回的函数时一个高阶组件，接收 UI 组件，返回一个新的组件，新的组件上的 props 就含有映射到 props 上的所有的值
  >
  > `NewComponent = connect(({count}) => ({ count }), {add:()=>({type:'ADD'}),addTen:()=>({type:'ADD',payload:10})})(Index)`
  >
  > 上面的代码中 Index 就是一个 UI 组件最终返回 NewComponent 这个新组件
  >
  > mapStateToProps：最好的写法是写成一个函数 接收什么参数就返回什么参数
  >
  > - 正常写法 state => ({count:state.count}) 但是实际上可以更加的优雅
  > - 优雅写法 ({count})=>({count}) 在接收形参的时候就进行了一次解构 直接将解构后的数据以对象形式返回
  >
  > mapDispatchToProps：可以时 object 也可以是 function
  >
  > - object:{add:()=>({type:'ADD'}),addTen:()=>({type:'ADD',payload:10})}
  >
  > - function: _dispatch => {_
  >
  >   let creators = {
  >
  >   ​ add: ()=>({type:'ADD'}),
  >
  >   ​ addTen: ()=>({type:'ADD',payload:10})
  >
  >   }
  >
  >   creators = bindActionCreators(creators,dispatch)
  >
  >   return {...creators,dispatch}
  >
  >   }

- bindActionCreators

  > 接收一个对象，和 dispatch
  >
  > 这个函数的目的：将 {add:()=>({type:'ADD'})} 类型的数据 改成 {add:() => { dispatch(value()) }}

- useSelector

  > hooksAPI,直接获取 redux 的 state，接收一个函数，用法和 mapStateToProps 是一样的
  >
  > `const state = useSelector(({count})=>({count}))`

- useDispatch

  > hooksAPI，直接获取 redux 中 store 的 dispatch 函数
  >
  > `const dispatch = useDispatch()`

#### 基本用法

```js
// 根组件
import { Provider } from "react-redux";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// 使用connect方法为组件的props绑定参数
import React, { Component } from "react";
import { connect, bindActionCreators } from "react-redux";

class Index extends Component {
  constructor(e) {
    super(e);
  }

  render() {
    console.log(this.props);
    const { count, dispatch, add, addTen } = this.props;
    return (
      <div>
        <h3>ClassReactReduxPage</h3>
        <p>{count}</p>
        <button
          onClick={() => {
            add();
          }}
        >
          +1
        </button>
        <button
          onClick={() => {
            addTen();
          }}
        >
          +10
        </button>
      </div>
    );
  }
}
const NewComponent = connect(({ count }) => ({ count }), {
  add: () => ({ type: "ADD" }),
  addTen: () => ({ type: "ADD", payload: 10 }),
})(Index);
export default NewComponent;

// 使用hooks更加优雅的方式
import { useSelector, useDispatch } from "react-redux";
const Index = () => {
  const state = useSelector(({ count }) => ({ count }));
  const dispatch = useDispatch();
  console.log(state, dispatch);
  return (
    <div>
      <h3>FunctionReactReduxPage</h3>
      <p>{state.count}</p>
      <button
        onClick={() => {
          dispatch({ type: "ADD" });
        }}
      >
        +1
      </button>
      <button
        onClick={() => {
          dispatch({ type: "ADD", payload: 10 });
        }}
      >
        +10
      </button>
    </div>
  );
};
export default Index;
```

#### 实现的思路

通过 context 在最外层传递 store 对象，里面的子组件再分别获取这个 context 上的值，就能拿到 store 的值。思路比较清晰，就是封装起来其实还蛮复杂，不过不会很难

#### 核心实现

- Provider

  ```js
  // 分别导入react和redux
  import React, {
    useContext,
    useEffect,
    useLayoutEffect,
    useReducer,
  } from "react";
  import store from "../store/index";
  // 创建全局的context
  const storeContext = React.createContext(store.getState());
  // 创建Provider组件，这个组件接收store 组件内部返回的实际上是 context的provider 并绑定 value  这样所有的子组件都能接收到这个context
  const Provider = ({ store, children }) => {
    return (
      <storeContext.Provider value={store}>{children}</storeContext.Provider>
    );
  };
  // 最后到处这个组件
  export { Provider };
  ```

- connect

  ```js
  import React, {
    useContext,
    useEffect,
    useLayoutEffect,
    useReducer,
  } from "react";
  import store from "../store/index";
  const storeContext = React.createContext(store.getState());

  // 这里的细节实际上 connect 的写法，它是接收两个参数，mapStateToprops，mapDispatchToprops，返回一个函数，函数再接收一个组件，最终返回一个新组件。这里一定要理清了 才会看得懂这个connect  刚开始写可以不要全是箭头，可以把所有的括号和return都写出来，更有利于理解

  const connect = (
    mapStateToProps = (state) => {
      return state;
    },
    mapDispatchToProps
  ) => (Component) => (props) => {
    const store = useContext(storeContext);
    const { dispatch } = store;
    const stateProps = mapStateToProps(store.getState());
    let dispatchProps = null;
    if (typeof mapDispatchToProps === "object") {
      // {add:()=>{dispatch({type:'ADD'})}}
      dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
    } else if (typeof mapStateToProps === "function") {
      dispatchProps = mapDispatchToProps(dispatch);
    }

    // 函数组件通过 useReducer 改变state的方式实现类组件中的 foceUpdate 强制刷新
    const [, foceUpdate] = useReducer((prev) => prev + 1, 0);
    useLayoutEffect(() => {
      store.subscribe(() => {
        // 执行组件的foceupdate
        foceUpdate();
      });
      return () => {
        // 这里相当于是 组件 willmounted 的生命周期
      };
    }, [store]);
    // react返回的组件一定要大写开头
    return <Component {...props} {...stateProps} {...dispatchProps} />;
  };

  export { connect };
  ```

- bindActionCreators

  ```js
  // 这个函数比较简单，就正常的修改对象结构
  function bindActionCreators(obj, dispatch) {
    /**
     * 这个函数的目的：
     *  将 {add:()=>{dispatch({type:'ADD'})}} 类型的数据 改成 {add:() => { dispatch(value()) }}
     */

    let dispatchObj = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        dispatchObj[key] = () => {
          dispatch(value());
        };
      }
    }
    dispatchObj["dispatch"] = dispatch;
    return dispatchObj;
  }
  ```

- useSelector

  ```js
  function useSelector(fn) {
    /**
     * react的钩子 只能在函数组件和自定义hooks钟使用
     */
    const [, foceUpdate] = useReducer((prev) => prev + 1, 0);
    useEffect(() => {
      store.subscribe(() => {
        // 执行组件的foceupdate
        foceUpdate();
      });
      return () => {
        // 这里相当于是 组件 willmounted 的生命周期
      };
    }, [store]);
    const { getState } = useStore(); // 获取全局的那个context
    const selectState = fn(getState());
    return selectState;
  }

  function useStore() {
    return useContext(storeContext);
  }
  ```

- useDispatch

  ```js
  function useDispatch() {
    const { dispatch } = useStore();
    let selectDispatch = dispatch;
    return selectDispatch;
  }

  function useStore() {
    return useContext(storeContext);
  }
  ```

#### react-redux 总结：

以上的那几个函数封装好之后其实就可以使用啦。react-redux 的源码上还有处理很多的细节。但是核心的实现其实和这里不会差的很多。多写几遍，更有利于理解！

#### useMemo 和 useCallBack

> 这两个都是用于缓存数据的，区别在于，useMemo 是缓存参数 useCallBack 用于缓存函数，主要的目的都是为了性能优化，减少一些没有必要的渲染

- useMemo

  > 非常类似于 vue 中的 computed

  ```js
  import { useState, useMemo } from "react";

  const UseMemoPage = () => {
    const [count, setCount] = useState(0);
    const [input, setInput] = useState(0);

    const expensive = () => {
      console.log("expensive!!!");
      return count + 1;
    };

    /**
     * useMemo 用于缓存数据 传递一个effect和一个依赖性
     *  只有依赖项发生改变的时候才会去执行effect
     *  就算整个组件重新render也不会去反复执行没有必要的render
     *  是节约资源的一种使用方式
     */
    const expensiveMemo = useMemo(() => {
      // 只有count这个state发生改变的时候 这里的内容才会执行 否则其他state改变 这里不会执行
      console.log("expensiveMemo!!!");
      return count + 1;
    }, [count]);

    return (
      <div>
        <h3>UseMemoPage</h3>
        <p>expensive:{expensive()}</p>
        <p>expensiveMemo:{expensiveMemo}</p>
        <p>{count}</p>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          +1
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </div>
    );
  };

  export default UseMemoPage;
  ```

- useCallBack

  ```js
  import { useState, useCallback, PureComponent } from "react";

  const UseCallBackPage = () => {
    const [count, setCount] = useState(0);
    const [input, setInput] = useState(0);

    /**
     * useCallBack 函数 传递一个 effect 和 一个依赖性
     *  会将这个effect函数给缓存起来 只有当依赖项发生改变的时候  子组件才会重新渲染
     *
     *  但是细节是子组件 必须是 类组件且继承自 PureComponent 才能达到这个效果
     *    函数组件和继承自Component的类组件都不行
     */

    const minsCount = useCallback(() => {
      let sum = 0;
      for (let i = 0; i < count; i++) {
        sum += i;
      }
      return sum;
    }, [count]);

    return (
      <div>
        <h3>UseCallBackPage</h3>
        <p>{count}</p>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          +1
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <Child minsCount={minsCount} />
      </div>
    );
  };

  class Child extends PureComponent {
    render() {
      console.log("child render！");
      return (
        <div>
          <h5>child!!</h5>
          <button
            onClick={() => {
              this.props.minsCount();
            }}
          >
            min
          </button>
        </div>
      );
    }
  }

  export default UseCallBackPage;
  ```

  - 只有当依赖项发生改变的时候 子组件才会重新渲染
  - 类组件且继承自 PureComponent 才能达到这个效果，函数组件和继承自 Component 的类组件都不行

#### 总结

在开发 react 的时候就少不了性能优化，性能优化不够会造成资源的浪费，也会导致页面卡顿，所以 react 程序员一定要很注重性能优化，useMemo 和 useCallBack 就是性能优化的手段

#### useEffect 和 useLayoutEffect

> 两者的 API 和函数签名都是一模一样的，区别在于两者的执行时间。

- useEffect 是异步，也就是组件过载之后并不会立刻执行，而是会间隔一小段时间才去执行
- useLayoutEffect 是同步的，组件一旦挂载成功就会立刻执行
- 大部分的场景使用 useEffect 即可，有的场景就必须使用 useLayoutEffect，比如 react-redux，在监听 store 的时候就需要使用 useLayoutEffect，很有可能就是在那个间隔的时间内丢失监听最后造成 bug
