---
title: react组件化通信-ContextApi的使用细节
date: 2021-09-04
sidebar: auto
categories:
  - 前端
tags:
  - react
---

## react 组件化通信-ContextApi 的使用细节

#### 常见问题

- context 现在不常见了，不建议使用？

  > 现在的开发，context 不常见是对的，但是不是不建议使用，存在即合理，如 redux 源码就是有用到这个思想的，react-router 也是有用到的
  >
  > 但是尽量少用是真的，因为消耗的性能是相对比较大的，因为一旦改变所有的有使用的子组件都会进行渲染更新，这个还是相对比较消耗性能的，所以要慎重！并不是不用

- context 与 redux

  > redux 主要做的是数据共享，而 context 目标的跨层级传递
  >
  > context 涉及到祖孙组件的关系，而 redux 不涉及这个，组件之间没有明显的层级关系

#### contextAPI

> context 的定义就是组件跨层级通讯，思想是有生产者和消费者的概念，生产者定义传递给子组件的数据，子组件作为消费者只要根据指定的设置`contextType`或者`useContext`就可以接收到这个数据，无论组件之间跨越了多少层级都可以传递数据
>
> 最常见使用到的场景就是网站的一件换肤

```js
// 创建context对象与生产者消费者对象
import React from 'react'
export const ThemeContext = React.createContext({themeColor:'skyblue'})
export const ThemeProvider = ThemeContext.Provider
export const ThemeConsumer = ThemeContext.Consumer

// 生产者使用
const Index = ()=>{
    return (
    return (
        <div>
          <button onClick={changeColor}>一键换肤</button>
          <ThemeProvider value={theme}>
            <UseContextPage />
            <ContextTypePage />
          </ThemeProvider>
        </div>
      )
}

// 使用contextType接收context对象
class Index extends Component {
  // 类组件固定写法 这个 静态属性 名字不能改 赋值的就是提供Provider的那个对象
  static contextType = ThemeContext
  render() {
    const { themeColor } = this.context
    return (
      <div className={themeColor}>换肤功能已经上线</div>
    )
  }
}

// 使用useContext接收context对象
const Index = () => {
  // 使用hooks接收 赋值的就是提供Provider的那个对象
  const { themeColor } = useContext(ThemeContext)
  return (
    <div className={themeColor}>换肤功能已经上线</div>
  )
}

// 使用Consumer接收context对象
class Index extends Component {
  render() {
    return (
      <div>
        <ThemeConsumer>
          {(themeContext) => (<div className={themeContext.themeColor}>换肤功能已经上线</div>)}
        </ThemeConsumer>
      </div>
    )
  }
}
```

##### contextType 与 useContext 与 consumer 的区别

- contextType 方式只能用在类组件中

- useContext 只能用在函数组件和自定义 hooks 中

- contextType 只能订阅单一的 context 来源，useContext 可以读取多个

  ```js
  // contextType
  class Index extends Component {
    static contextType = ThemeContext;
    static contextType = UserContext; //后写的会覆盖先写的
  }
  // useContext
  const Index = () => {
    // 两个都会生效
    const { themeColor } = useContext(ThemeContext);
    const { user } = useContext(UserContext);
  };
  ```

- 在类组件中如果想接收多个 context 源，则可以使用 consumer 来接收

  > 真实项目中不会这么用，但是可以实现的

  ```js
  class Index extends Component {
    render() {
      return (
        <div>
          <ThemeConsumer>
            {(themeContext) => (<div className={themeContext.themeColor}>换肤功能已经上线</div>)}
            <UserConsumer>
              {userContext => <p>user:{userContext.user}</p>
            </UserConsumer>
          </ThemeConsumer>
        </div>
      )
    }
  }
  ```

- consumer 没有那么多限制了，可以用在类组件也可以使用也可以在函数组件中使用
