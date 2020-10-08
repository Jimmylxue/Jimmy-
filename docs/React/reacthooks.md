---
title: React Hooks基础使用
date: 2020-10-08
sidebar: auto
tags:
  - react
---

## ReactHooks

react 创建组件的方式有两种，分别时**纯函数组件**和**类组件**，实际上函数组件和类组件的差别还是非常大的，开发中类组件给人的感觉是很长的一大串代码，实际上**组件的最佳写法应该是函数，并不是类**。  
函数组件的缺陷在于：

1. 纯函数组件时无状态的组件
2. 纯函数组件没有生命周期
3. 纯函数组件没有 this
4. 纯函数组件组件本质上也是只能时一个纯函数

最终目标：
希望我们写起组件来，能够像**写纯函数一样轻，同时还具有类函数的一系列功能**

### Hooks

> hooks 的意思是钩子，本质上是为了实现写纯函数组件，需要一些状态等其他信息，就用钩子，将外部信息钩进来。

react 默认提供了四种常用的钩子

- useState()
- useContext()
- useReducer()
- useEffect()

不同的钩子函数可以钩入不同的外部功能，并且着些都含有`use`前缀，所以 React 规定，钩子一律是使用`use`为前缀，我们自己自定义的钩子也是要遵守这个规定使用`use`为前缀。

### useState

> 状态钩子 在函数组件中引用这个就拥有了状态

```
  import { useState } from 'react'
  const [state, setState] = useState(0)
```

可以通过结构赋值的方式，解构出一个 state 值，和一个 setState()改变状态的方法

计数器案例：

```
  function UseState() {
    const [state, setState] = useState(0)
    // 使用 useState 可以为我们创建出一个状态，  可以分别结构出 类似于 类组件的  state 和 setState

    const change = () => {
      setState(state + 1)
    }
    return (
      <div>
        <h3>hello world react_hooks</h3>
        <p>count:{state}</p>
        <button onClick={change}>change</button>
      </div>
    )
  }
```

注意点：

- 结构出来的名字并不是固定只能是 state，是可以自定义的，如: `const [name,setName] = useState('Jimmy')`

### useContext()

> 共享状态钩子

使用步骤

- 父组件共享数据  
  父组件使用`React.createContext()`创建一个组件容器，可以通过 value 属性来开放可被子组件共享的数据。
- 子组件使用 useContext()共享状态钩子，可以钩出父组件共享出来的数据

```
  import React, { useContext } from 'react'

  function UserContext() {
    const Conatiner = React.createContext()
    // 使用 React.createContext() 创建出一个父容器  这个父容器可以通过 value属性 传递共享的数据  子组件可以使用 useContext() 钩子，钩出数据

    const Achild = () => {
      // 通过  useContext()  钩子  可以获取到其他组件共享出来的状态   实现不同组件之间的共享
      const { name } = useContext(Conatiner)
      return (
        <div>
          <p>我是Achild函数组件,作者是{name}</p>
        </div>
      )
    }

    const Bchild = () => {
      const { name } = useContext(Conatiner)
      return (
        <div>
          <p>我是Bchild函数组件,作者是{name}</p>
        </div>
      )
    }

    return (
      // 此处和react-redux 使用很类似  都是使用一个父容器   暴露出一个对象  子组件就可以使用钩子 构出共享的那个状态
      <Conatiner.Provider value={{ name: 'Jimmy' }}>
        <h3>共享状态组件UserContext</h3>
        <Achild></Achild>
        <Bchild></Bchild>
      </Conatiner.Provider>
    )
  }

  export default UserContext
```

注意点：

- 一定要是在共享组件的子组件才可以使用`useContext()`钩出共享数据
- 通过`React.createContext()`创建一个组件容器,使用方式和 react-redux 使用很类似 都是使用一个父容器 暴露出一个对象 子组件就可以使用钩子 构出共享的那个状态

### useReducer

> 状态管理钩子函数

```
  import { useReducer } from 'react'
  const [state, dispatch] = useReducer(reducer,{count:0}) // 传递的两个参数分别是reducer函数和要管理的状态
```

可以通过结构赋值的方式，解构出一个 state 值，和一个 dispatch()触发不同的 action 执行的函数

计数器案例：

```
  function UseReducer() {
    const reducer = (state, action) => {
      const ActionFn = {
        add: () => {
          return { ...state, count: state.count + 1 }
        },
      }

      return ActionFn[action.type]()
    }

    const [state, dispatch] = useReducer(reducer, { count: 0 })

    const AddOne = () => {
      dispatch({
        type: 'add',
      })
    }

    return (
      <div>
        <h3>UseReducer</h3>
        <p>now Count {state.count}</p>
        <button onClick={AddOne}>+1</button>
      </div>
    )
  }
```

### useEffect

> useEffect()钩子起的主要是生命周期的作用，可以传递两个参数，分别是回调函数和数组

不同的参数，起的不同的效果

- 当只有一个回调函数的时候 这时候 useEffect(()=>{})起的主要是一个 componendtDidmount()函数的作用 也就是当组件加载完毕之后会执行回调函数的代码
- 当组件传递了第二个参数并且是一个数组的时候，这时候起的主要是一个 watcher 监听器的作用，只有这个数组变化了之后才会触发回调函数里面的内容
- useEffect()可以返回一个函数，这个函数里面的代码只有在组件注销卸载的时候才会被使用

案例:

```
  function AsyncPage({ user }) {
    const [loading, setloading] = useState(true)  // 结构出来的名字是可以自定义的
    const [person, setperson] = useState({})

    useEffect(() => {
      setloading(true)
      setTimeout(() => {
        setloading(false)
        setperson({ user })
      }, 3000)
    }, [user])  // 传入的第二个参数数组，  只有当数组发生变化了之后，才会触发这个钩子

    return (
      <div>
        <h4>异步页面</h4>
        {loading ? <div>Loading...</div> : <div>所在的班级是{person.user}</div>}
      </div>
    )
  }

  function UseEffect() {
    const [name, setname] = useState('Jimmy')
    const [user, setUser] = useState('17信管')
    const [show, setShow] = useState(true)

    useEffect(() => {
      setTimeout(() => {
        setname('Jack')
      }, 3000)

      // useEffect() 钩子的返回值是一个函数的时候 当组件被注销的时候会被触发
      return () => {
        console.log('组件已经成功卸载 -- 通过useEffect() 钩子函数所监测到的结果')
      }
    })

    const changeName = name => {
      setUser(name)
    }

    const closeComponent = () => {
      setShow(false)
    }

    return (
      <div>
        <h3>UseEffect钩子函数</h3>
        <p>作者是：{name}</p>
        {show ? <AsyncPage user={user}></AsyncPage> : <div>异步组件已经卸载</div>}
        <button
          onClick={() => {
            changeName('17软开')
          }}
        >
          改成17软开
        </button>
        <button
          onClick={() => {
            changeName('17数媒')
          }}
        >
          改成17数媒
        </button>
        <button onClick={closeComponent}>卸载组件</button>
        {/* <p>所在的班级是{user}</p> */}
      </div>
    )
  }
```

### 自定义钩子函数

> 当页面上比较多的地方需要使用到相同数据的时候，我们就可以做一层封装，返回出需要的数据

案例：

```
  function userUse(user) {
    const [loading, setloading] = useState(true)
    const [person, setperson] = useState({})

    useEffect(() => {
      setloading(true)
      setTimeout(() => {
        setloading(false)
        setperson({ user })
      }, 3000)
    }, [user])

    return [loading, person]
  }

  function AsyncPage({ user }) {
    const [loading, person] = userUse(user)

    return (
      <div>
        <h4>异步页面</h4>
        {loading ? <div>Loading...</div> : <div>所在的班级是{person.user}</div>}
      </div>
    )
  }
```
