---
title: Vue3.0 api学习记录
date: 2020-10-10
sidebar: auto
categories:
  - Vue
tags:
  - vue
---

## Vue3.0

Vue3.0 和 Vue2.x 之间并不是推翻重来，有很多地方还是集成了 Vue2.x 的，所以学会 Vue3.0 的前提是对 Vue2.x 有一定的了解  
Vue3.0 预计在 2021 年会正式在公司启用，现在就算已经发布了正式版了，但是一些周边环境并没有完全适配，一些库和插件还没有兼容。

## Vue3.0 优势

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

## Vue3.0 项目创建方式

- Vue-cli
- Webpack
- Vite （最推荐使用）

### Vite

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

### setup()函数

> setup()函数是 Componsition API 的入口函数

- setup() 入口函数的执行时机是在 beforeCreate() 和 created()之间
- setup()函数只能是同步的 不能是异步的
- setup()函数中无法使用`data`和`methods`，也没有 this
- 复习：  
  beforeCreate() 组件将要被创建 此时是还没有 data 和 methods  
  created() 组件创建完成 含有 data 和 methods  
  间接证明 setup() 注入 API setup 的时候会将里面的组合 API 注入到 Option API 当中

### reactive

> reactive 是 Vue3 中提供实现响应式数据的方法
>
> - 在 Vue2.x 中的响应式数据是通过`Object.defineProperty()`实现的
> - Vue3 中的响应式数据通过 ES6 的`Proxy()`实现的，也就是说响应式的数据本质上是一个 Proxy 对象

reactive 注意点：

- reactive 的参数必须是对象（json/arr）
- 如果 reactive 传递了其他对象，则默认下修改对象，页面是不会自动更新的，如果想要更新可以使用重新赋值的方式

### ref

> ref 和 reactive 一样也是用来实现响应式数据的方法
> 由于 reactive 必须要传递一个对象，所以导致企业开发中如果只想监听一个单独的变量就变得十分的麻烦，所以 vue3 提供了 ref 方法

ref 本质：

- ref 的本质实现其实还是 reactive
- 系统会自动的将 ref 传入的值改成对象形式，形如：ref(xx) -> reactive({value:xx})

注意点：

- JS 中使用 ref 的值必须使用.value
- template 中使用 ref 的值不需要加.value。可以简单的理解在 template 中 vue 自动的帮我们加了.value

### isRef() isReactive()

> isRef() isReactive()是 vue 向我们提供的两个判断响应式对象的类型的方法，返回值都是布尔类型

- isRef() 判断响应式数据是否是 ref 对象
- isReactive() 判断响应式数据是否是 reactive 对象
- Vue 系统就是通过对象是否含有这个属性 并且值为 true 来判断一个对象是否是 ref 对象
- 我们自己可以使用 vue 向我们提供的 isRef(), isReactive() 这种 API 来判断一个对象是什么类型的响应式对象

  ```js
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

### 递归监听与非递归监听

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

### toRaw

> 找到引用的初始数据，主要是为了提升性能

使用和不使用的区别

- 使用 reactive 创建的对象 默认是会创建成一个 Proxy  对象 自带监听功能
- 使用 toRaw(proxy 对象) 传递一个 proxy 对象 可以将 proxy 对象引用的原始数据导出来 我们修改原始数据， proxy 数据也会修改 是不会造成页面的重新渲染的
- 正常情况下，我们使用 reactive 创建的数据 一旦是发生改变，就会默认开启监听 去自动的修改 UI 界面， 单这个也是属于极其消耗性能的

demo

```js
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

### markRaw

> 永远不会被追踪，markRaw()的返回值是经过处理的原对象

一个对象只要被 markRaw()方法修饰过一次之后，及时再经历 ref(),或者 reactive()的处理，也是不会变成响应式的数据的。

原理

- markRaw()方法会给对象加上一个 `__v_skip: true` 属性，加了这个之后就不会成为响应式的数据了。

demo

```js
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

### toRef

> 和 ref 一样，也是创建响应式数据，不同点在于这个是引用原始数据

demo

```js
  setup(){
    const obj = { name:'Jimmy',age:22 }
    const obj1 = {name:'kangkang',age:18}
    const state = ref(obj.name)
    const state1 = toRef(obj1,'name')

    function change(){
      state.value = 'hello world'
      state1.value = 'Jack'
      console.log(obj,state)  //{name: "Jimmy", age: 22} RefImpl {_rawValue: "hello world", _shallow: false, __v_isRef: true, _value: "hello world"}
      console.log(obj1,state1) //{name: "Jack", age: 18} ObjectRefImpl {_object: {…}, _key: "name", __v_isRef: true}
    }

    return {state,state1,change}
  }
```

注意点

- toRef 创建对象的方式是 `const state = toRef(obj,key)`,此处的 obj 是引用的对象，key 是引用对象的某个属性，是可以监听某个属性，然后将这个属性创建成一个响应式对象的。
- toRef 只能写两个参数，如果 toRef 想设置一个对象的多个属性为响应式数据的话，那就只能多写几遍 toRef，修改一下第二个参数`const state = toRef(obj,'name')`,`const state = toRef(obj,'age')`
- 当需要修改的数据属性比较多的时候，可以使用`toRefs`方法

toRef 和 ref 的区别

- ref 本质上是复制了一份原始数据，将复制的那个对象修饰为一个响应式的对象，对响应式对象的修改不会影响到原始的数据
- toRef 本质上是对原始数据地址的引用，对使用 toRef 创建的对象进行修改是会直接影响到原始数据的。

### toRefs

> 使用 toRefs 和 toRef 一样都是引用类型的响应式数据

使用 toRefs 只需要传递一个参数，就是需要变成响应式对象的原始对象，这样就会默认的将这个对象的所有属性都变成响应式对象

demo

```js
const obj = { name: "Henry", age: 22 };
const state = toRefs(obj);
```

toRefs、ref、toRef 的区别

- toRefs 相对于 toRef 可以更方便的将一个对象的所有属性都变成引用类型的响应式数据
- toRefs 和 ref 一样都是将一个对象变成响应式数据，区别在于对于原始数据而言 toRefs 是引用原始数据，ref 是复制原始数据。
- 使用 toRef，和 toRefs 的目的都是为了性能优化，真正企业开发中使用的最多的还是 ref 和 reactive

### customRef

> 自定义 Ref 接口函数，我们可以自动以哪些数据需要响应式，哪些数据的变化会触发界面的更新

具有两个形参，`track`和`trigger`

- track  
  告诉 Vue 这个参数是需要追踪的
- trigger  
  告诉 Vue 触发界面的更新

demo

```js
function myRef(value) {
  return customRef((track, trigger) => {
    return {
      get: () => {
        track(); // 追踪数据，即这个数据的变化会影响原始的数据
        return value;
      },
      set: (newVal) => {
        value = newVal;
        trigger(); //  触发界面UI的更新
        return value;
      },
    };
  });
}
export default {
  setup() {
    const state = myRef(18);
    function change() {
      state.value++;
    }
    return { state, change };
  },
};
```

### ref 获取元素

> Vue2.x 是可以通过\$refs.元素的 ref 值来获取一个 DOM 元素的，Vue3 也可以使用 ref 来获取元素

Vue3.x 和 Vue2.x 使用 ref 的不同

- Vue2.x  
  DOM 元素设置一个 ref 属性值，然后通过\$ref.refname 可以获取到指定的 DOM 元素
- Vue3.x
  DOM 元素设置一个 ref 属性值，在 setup()函数设置一个 ref 变量，变量名和 ref 绑定的值名字一致，且 ref 的值为 null

  ```js
  <template>
    <div class="refs">
      <h3 ref="box">Ref获取元素</h3>
    </div>
  </template>;

  export default {
    /*
        Vue的 ComponsitionApi 将生命周期函数也给抽离出来了  抽离出来的名字都是以onMountend onCreated这样
          生命周期函数传递一个回调函数，  回调函数里面写的内容会在ComponsitionAPI转成Option Api的过程中注入到各自的生命周期内部
      */
    setup() {
      /*
          ref和Vue2.x一样也是可以用来获取页面的HTML元素，  需要注意两点：
            ref的变量名要和html的ref属性值是同一个名字
            ref在设置值的时候要给 值为 null
        */
      const box = ref(null);
      onMounted(() => {
        console.log("mounted", box.value); //  mounted <h3 data-v-f9d94688>​Ref获取元素​</h3>​
      });
      console.log("componsition", box.value); // null
      return { box };
    },
  };
  ```

### 声明周期函数

> setup 函数，是在 beforecreate 钩子之前完成的，所以我们要写其他的生命周期函数需要通过 vue3 给的声明周期 API 来复写一下

demo

```js
import { ref, onMounted } from "vue";
export default {
  setup() {
    const box = ref(null);
    onMounted(() => {
      console.log("mounted", box.value); //  mounted <h3 data-v-f9d94688>​Ref获取元素​</h3>​
    });
    console.log("componsition", box.value); // null
    return { box };
  },
};
```

vue3 为我们提供了完整的生命周期函数（类似于生命周期钩子），如：onMounted 等等，传递一个回调函数

原理：

- 通过这些钩子函数，会在 Componsition API 注入 Option API 的过程中分别一一对应的注入 mounted、created 等等生命周期内部去
- 可以简单的理解是 ComponsitionAPI 将生命周期函数抽离出来了
