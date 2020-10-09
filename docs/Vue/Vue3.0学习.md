---
title: Vue3.0 api学习记录
date: 2020-10-10
sidebar: auto
sticky:
  - 置顶
  - 5
categories:
  - Vue
tags:
  - vue
---

## Vue3.0

Vue3.0 和 Vue2.x 之间并不是推翻重来，有很多地方还是集成了 Vue2.x 的，所以学会 Vue3.0 的前提是对 Vue2.x 有一定的了解  
Vue3.0 预计在 2021 年会正式在公司启用，现在就算已经发布了正式版了，但是一些周边环境并没有完全适配，一些库和插件还没有兼容。

### Vue3.0 优势

- diff 算法的优化  
  Vue3.0 优化了 diff 算法，Vue 之所以能够完成双向数据绑定，就是通过前后虚拟 DOM 不断的进行比较，只要一有不同就立即通知 Watcher 进行更新。Vue3 优化的点在于通过算法减少了前后比较的次数，比较次数的减少，就间接的提升了性能。

  1. Vue2.xdiff 算法

     ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200927200826958.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

  2. Vue3.0diff 算法

     ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200927201028182.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

  可见，两者之间的比较次数就减少了，写死的 dom 在进行 diff 算法的时候是不会进行比较的，并且比较还有分类型，比如类是动态的，text 是动态，点击事件是动态的，只比较前后指定的 flag 类型，就更加进一步的减少了前后比较的次数。提升了性能。

- 静态提升  
  在 Vue2.x 中，一个数据每次刷新的时候都会被重新的渲染到页面上（不管有没有发生变化），Vue3 就是根据这点判断有没有发生改变，如果是静态的数据会直接提升道最前面，等到页面 render 渲染的时候直接拿来用，就不重新创建渲染了

- 监听缓存  
  这个主要是发生在一些点击事件或其他事件上面，如果绑定的函数名是一样的就不用重新的绑定，还是用原来的那个绑定的即可，这个就是通过 diff 算法的 flag 绑定类型来判断的。

### Vue3.0 项目创建方式

- Vue-cli
- Webpack
- Vite （最推荐使用）

#### Vite

> Vue 作者开发的一款意图取代 webpack 的工具,实现的原理是通过 ES6 的 import 会发送请求加载文件的特性，拦截这些请求，做一些预编译。极大的省去了 webpack 的打包时间

安装

`npm install -g create-vite-app`

创建 vue3 项目

`create-vite-app 项目名`

总结

最直观的感受就是创建项目极快。

### Vue2.x 存在的问题

> Vue2.x 是将所有的内容都通过组件化的形式来开发，这个组件化是比较鸡肋的组件化，逻辑的代码没有办法抽离出来，这个也就是为什么 Vue2.x 不适合用于开发大型项目的原因

- 一个属性对应的一个方法
- 有可能在 method 中 有可能在 computed 中 有可能在 filter 中 有可能在 watch 中。过于复杂
- 功能逻辑不能抽离，不利于维护

### Vue3 （Componsition）组合 API

> Vue3 的组合 API 的好处在于我们可以将一些单独的功能模块给隔离开,这个就在开发大型应用的时候更加的便于维护了

Componsition API（Vue3）和 Option API（Vue2.x）的区别：
Vue2.x 的 API 是要写很多的配置项 如`data` `method` `computed`等等.

Componsition API 本质：Componsition API 又称注入 API，意思就是在编译的过程中，会将 Componsition API 中 return 暴露出来的一些对象分别注入到 Option API 中，这个就是 Componsition API 的本质

对比：

- Vue2.x

  ![Vue2.x](https://img-blog.csdnimg.cn/20201004234921622.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

- Vue3

  ![Vue3](https://img-blog.csdnimg.cn/20201004235108407.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

- 组合 API 好处缩略图

  ![缩略对比图](https://img-blog.csdnimg.cn/20201004235455876.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

#### setup()函数

> setup()函数是 Componsition API 的入口函数

- setup() 入口函数的执行时机是在 beforeCreate() 和 created()之间
- setup()函数只能是同步的 不能是异步的
- setup()函数中无法使用`data`和`methods`，也没有 this
- 复习：  
  beforeCreate() 组件将要被创建 此时是还没有 data 和 methods  
  created() 组件创建完成 含有 data 和 methods  
  间接证明 setup() 注入 API setup 的时候会将里面的组合 API 注入到 Option API 当中

#### reactive

> reactive 是 Vue3 中提供实现响应式数据的方法
>
> - 在 Vue2.x 中的响应式数据是通过`Object.defineProperty()`实现的
> - Vue3 中的响应式数据通过 ES6 的`Proxy()`实现的，也就是说响应式的数据本质上是一个 Proxy 对象

reactive 注意点：

- reactive 的参数必须是对象（json/arr）
- 如果 reactive 传递了其他对象，则默认下修改对象，页面是不会自动更新的，如果想要更新可以使用重新赋值的方式

#### ref

> ref 和 reactive 一样也是用来实现响应式数据的方法
> 由于 reactive 必须要传递一个对象，所以导致企业开发中如果只想监听一个单独的变量就变得十分的麻烦，所以 vue3 提供了 ref 方法

ref 本质：

- ref 的本质实现其实还是 reactive
- 系统会自动的将 ref 传入的值改成对象形式，形如：ref(xx) -> reactive({value:xx})

注意点：

- JS 中使用 ref 的值必须使用.value
- template 中使用 ref 的值不需要加.value。可以简单的理解在 template 中 vue 自动的帮我们加了.value

#### isRef() isReactive()

> isRef() isReactive()是 vue 向我们提供的两个判断响应式对象的类型的方法，返回值都是布尔类型

- isRef() 判断响应式数据是否是 ref 对象
- isReactive() 判断响应式数据是否是 reactive 对象
- Vue 系统就是通过对象是否含有这个属性 并且值为 true 来判断一个对象是否是 ref 对象
- 我们自己可以使用 vue 向我们提供的 isRef(), isReactive() 这种 API 来判断一个对象是什么类型的响应式对象

  ```
    setup() {
      const name = ref('Jimmy')
      const age = reactive({
        value: 20,
      })

      function show() {
        console.log(name)
        /*
          RefImpl {_rawValue: "Jimmy", _shallow: false, __v_isRef: true, _value: "Jimmy"}
            __v_isRef: true   //  是否是ref对象   Vue系统就是通过对象是否含有这个属性 并且值为true 来判断一个对象是否是ref对象
            _rawValue: "Jimmy"
            _shallow: false
            _value: "Jimmy"
            value: (...)
        */
        console.log(name.value) // jimmy
        console.log(age) //  Proxy {value: 20}
        console.log(isRef(name), isRef(age)) //   true false
        console.log(isReactive(name), isReactive(age)) //  false true
      }

      return { name, age, show }
    },
  ```

#### 递归监听与非递归监听

> 当我们使用 ref()和 reactive()创建的对象都是属于递归监听的，也就是说会递归子元素，给子元素也包装成一个`Proxy`对象

递归监听存在的问题

- 如果数据量比较庞大（层次深），是非常的消耗性能的（因为要一直递归）

非递归监听

`shallowRef`/`shallowReactive`,这两个是 vue 提供的创建非递归监听的 API 方法

- `shallowRef`顾明思议是创建 ref 的非递归函数，它只会监听到 ref 值.value 的变化，如果改变了 ref 内层的变化是不会重新刷新 UI 的，这时候可使用`triggerRef`来实现手动控制刷新 UI。
- `shallowReactive`是创建 reactive 的非递归函数，它只会监听第一层数据的改变， -- 只要第一层有改变，就会重新刷新渲染 UI.如果第一层没变，第二三层改变是不会渲染 UI 的.
  shallowReactive 只会监听第一层数据的修改，也就是它其实没有做递归监听.但实际上还是有细节的 只有第一层修改的数据有在 UI 上的时候 修改才会触发重新刷新 UI
- 只有`triggerRef`,没有`triggerReactive`
- `triggerRef(state)`， state 是通过 shallowRef 创建的对象

shallowRef 本质

- ref 的本质 是通过讲 ref 转换为 reactive 加了一个.value 的对象形式  
  如： ref(10) = reactive({value:10})

- shallowRef 本质上也是将 shallowRef 转换成 shallowReactive  
  如： shallowRef(10) = shallowReactive({value:10})

- shallowReactive 只能监听第一层的数据的变化 所以这里就是只能监听到 .value 这第一层的变化

应用场景

- 一般情况下我们使用 ref 和 reactive 即可
- 只有在需要监听数据量比较大（层次深）的时候，我们才使用 shallowRef/shallowReactive

#### toRaw

> 找到引用的初始数据，主要是为了提升性能

使用和不使用的区别

- 使用 reactive 创建的对象 默认是会创建成一个 Proxy  对象 自带监听功能
- 使用 toRaw(proxy 对象) 传递一个 proxy 对象 可以将 proxy 对象引用的原始数据导出来 我们修改原始数据， proxy 数据也会修改 是不会造成页面的重新渲染的
- 正常情况下，我们使用 reactive 创建的数据 一旦是发生改变，就会默认开启监听 去自动的修改 UI 界面， 单这个也是属于极其消耗性能的

demo

```
  const state = reactive({ name: 'Jimmy', age: 22 })
  const refss = ref({ name: 'jack' })
  const obj = toRaw(state)
  const obj2 = toRaw(refss)
  console.log(state) // Proxy {name: "Jimmy", age: 22}
  console.log(obj) //{name: "Jimmy", age: 22}
  console.log(refss) // RefImpl {_rawValue: {…}, _shallow: false, __v_isRef: true, _value: Proxy}
    console.log(obj2) // RefImpl {_rawValue: {…}, _shallow: false, __v_isRef: true, _value: Proxy}
    console.log(obj3)  //  {name: "jack"}
  两个对象数据是一样的，区别在于是不是Proxy 对象  是不是具有响应式功能
```

注意点：

- 如果是 toRaw()获取的是 ref 创建出来的响应式数据，那么直接 toRaw(ref 对象)是没有用的，原因是因为 ref 对象本质是包装成 reactive 对象，所以想要获取 ref 的原始数据，就要加上.value，如`toRaw(ref对象.value)`

#### markRaw

> 永远不会被追踪，markRaw()的返回值是经过处理的原对象

一个对象只要被 markRaw()方法修饰过一次之后，及时再经历 ref(),或者 reactive()的处理，也是不会变成响应式的数据的。

原理

- markRaw()方法会给对象加上一个 `__v_skip: true` 属性，加了这个之后就不会成为响应式的数据了。

demo

```
  setup() {
    let obj = { name: 'Jimmy', age: 22 }
    console.log(obj) // {name: "Jimmy", age: 22}
    obj = markRaw(obj)
    console.log(obj) //  {name: "Jimmy", age: 22, __v_skip: true}
    let state = reactive(obj)
    function change() {
      state.name = 'xuexue'
    }
    return { state, change }
  },
```
