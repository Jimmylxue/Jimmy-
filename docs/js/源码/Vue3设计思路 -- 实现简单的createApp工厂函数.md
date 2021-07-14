---
title: Vue3设计思路 -- 实现简单的createApp工厂函数
date: 2021-07-14
sidebar: auto
categories:
  - javascript
tags:
  - 前端
  - 源码
---

## Vue3 设计思路 -- 实现简单的 createApp 工厂函数

> vue3 相比于 vue2 有了质的飞跃，尤大大做了很多底层的逻辑工作。使得 vue3 的速度比原来要快乐非常的多，配合上 Vite 这个工具，可以给开发者更好的开发体验。
>
> 看代码可以知道`createApp()`之后创建的实例可以立刻跟一个`mount`方法，但是底层其实还有一个编译的过程。写了以后会收获很大的，原来还能这样设计！

#### 创建实例的区别

> vue3 是底层实现了`createApp` 这个工厂函数，而不是使用像 vue2 一样需要 `new Vue()` 产生的实例的方式，并且在 vue 里面暴露了非常多方法，其中很多都是 vue2 原来就直接封装在组件的实例对象身上的。

```js
import { createApp, render, h } from "vue";
/*
	在vue3中将这些东西都使用暴露的方式提供给各个组件，如果有组件需要就引入，这样的好处就是非常有利于整项目的tree shaking（摇树优化），不需要的就组件身上就不会有，会极大的节约最后项目打包的空间
*/
```

#### mount 期间都做了什么

> mount()我们都知道是挂载，到底是怎么挂载的呢？实际的操作是什么呢？其实做的事情有很多。

- 根据用户传入的选择器，就以这个选择器选中的元素作为宿主元素
- 拿到宿主元素之后 拿到这个元素的 innerHTML 作为 template，通过编译的方式得到渲染函数 -- 根据渲染函数可以真正的得到 DOM 节点（再根据用户传入的状态数据最终生成）
- 最终将 render 函数生成的 DOM 节点追加到宿主元素身上

#### 编译过程的理解

浏览器是不认识 vue 风格的一些语法的，像`{{}}`、`@click`、`v-if`等等这些特殊的指令的，所以在 mount 方法执行到最终挂载在宿主元素上之前需要先进行一次编译，把这些指令处理成浏览器认识的语法。

真实的这一块是极其复杂的，代码量极其的大，这里我处理的地方只是最最简单的处理`{{}}`插值表达式，同时阉割掉了动态的 DOM，只生成一个写死的 h3 标签，我们只是要理解设计思路就可以了，我对自己的要求暂时也没有那么高，到这一步就可以了。

通过编译完成之后会生成一个`render`函数。

#### render 函数的理解

`render`（渲染），着是个函数，我们只需要理解成执行了一个函数之后，会返回一个具有真是 DOM 的对象。

在 vue 的组件中是也可以自己写 render 方法，也可以不写，所以根据这个细节我们就知道要判断一下用户传入的配置对象中是否含有 rende 方法，如果没有就使用自己的 render 方法

#### composition API 与 option API 的兼容

> composition API 就是在代码块处写`setup`函数。option API 就是 vue2 的代码风格，通过写各种的配置项。
>
> 这里就用到了 ES6 的`proxy`代理 api

```javascript
this.proxy = new Proxy(this, {
  get(target, key) {
    if (key in target.setupCtx) {
      return target.setupCtx[key];
    } else {
      return target.dataCtx[key];
    }
  },
  set(target, key, value) {
    if (key in target.setupCtx) {
      target.setupCtx[key] = value;
    } else {
      target.dataCtx[key] = value;
    }
  },
});
```

上面就是代理的部分，当我们访问`this.proxy`的某个值的时候，会走入 get 方法，在 get 方法中就可以做优先级判断等等操作，如果使用了`setupAPI`就从 setup 函数中取值，否则就从传统的`optionAPI`中的 data 中取值。设置值也是一样的理解

`proxy`和`Object.defineProperty`的 api 风格非常像，但是性能更高，同时也可以做更多的事情，具体红宝书上有详细的描述功能

#### 代码部分

> 代码不长，但是很值得多看几遍，我也是自己看了一些源码，再跟着老师一起写下来的。收获很大。

```javascript
function createApp(config) {
  let app = {};
  app.mount = function(id) {
    // 宿主元素
    this.rootDOM = document.getElementById(id);

    if (!config.render) {
      /*
        判断传入的配置项是是否有render方法 如果没有就自己通过编译生成render方法
      */
      config.render = this.compile(this.rootDOM.innerHTML);
      // 将宿主元素的 innerHTML 部分进行编译，主要就是为了处理 像 {{}} @ v-if 等等插值表达式，指定进行编译成浏览器认识的代码
    }

    if (config.setup) {
      this.setupCtx = config.setup();
    } else {
      this.dataCtx = config.data();
    }
    /*
      封装一个 proxy 对象代理， 相比于Object.defineProperty 性能更高，且可以代理代理至别的对象，有他可以很好的兼容vue2和vue3的api
    */
    this.proxy = new Proxy(this, {
      get(target, key) {
        if (key in target.setupCtx) {
          return target.setupCtx[key];
        } else {
          return target.dataCtx[key];
        }
      },
      set(target, key, value) {
        if (key in target.setupCtx) {
          target.setupCtx[key] = value;
        } else {
          target.dataCtx[key] = value;
        }
      },
    });
    /*
      这里把这个代理传进入 将来访问代理的某个值 就会进入代理的 get方法 
        get方法就会去判断是否又 setup api 如果有就用 setup api 没有就用 option api
    */
    const el = config.render.call(this.proxy);
    this.rootDOM.innerHTML = "";
    this.rootDOM.appendChild(el);
    return this;
  };
  app.compile = function(template) {
    /*
      这个是个阉割版本的 生成写死的h3标签了
        
      尤大大完整版这里是会根据 template 去解析有什么dom，把DOM中的 {{title}} 替换成用户传入对象的数据的那个title
        目前只是为了理解mount的过程 所以就写一个阉割版本，但是这样写下来，已经能够很好的理解和明白 mount 函数的作用和意义了
    */
    return function() {
      const h3 = document.createElement("h3");
      h3.textContent = this.title;
      return h3;
    };
  };
  return app;
}

// 使用过程
const app = createApp({
  data() {
    return {
      title: "haihai",
    };
  },
  /*
    vue3 是兼容vue2api的 其实逻辑是通过 proxy 这个ES6 的新 API 来实现的
      proxy可以代理数据 判断有没有 setup 函数之类 再从执行的地方拿值 这个是大概的思路
  */
  setup() {
    return {
      title: "JImmy",
    };
  },
});

app.mount("app");
```

#### 总结

> 这里看完了就可以很好的理解 createApp 这个期间到底是做了什么。对我来说收货还是非常大的

相信明白了这个，面试官如果问这块的内容能答出来面试官就会很满意的!
