---
title: Vue3设计思路 -- 虚拟DOM以及patch算法
date: 2021-07-16
sidebar: auto
sticky:
  - 置顶
  - 6
categories:
  - javascript
tags:
  - 前端
  - 源码
---

## Vue3 设计思路 -- 虚拟 DOM 以及 patch 算法

> 虚拟 DOM：一个对象，对象真实 DOM 的一个抽象，可以用来表示一个真实 DOM 的基本基本结构

#### 虚拟 DOM 的优势

- 引入了虚拟 DOM，当我们更新的时候可以不用做全量的更新，虚拟 DOM 在每次更新前会进行两次虚拟 DOM 的比对，只对不同的地方转换成 DOM 操作。有人说真是 DOM 也可以比对，但是真实 DOM 的属性太多了，在遍历的时候如果使用真实 DOM 比对，就会造成极大的性能消耗

- 多了虚拟 DOM 这一层，数据驱动就可以只驱动虚拟 DOM。渲染层（render）就可以根据平台来写不同的代码。我们有机会根据这一层写出很好的跨平台的代码。
- 在虚拟 DOM 渲染之前我们可以做一些优化的代码

#### 虚拟 DOM 的结构

> 关键的几个名词：h patch
>
> vue 中创建虚拟 DOM 是通过 `h` 函数，所以我们可以自己创建一个 h 函数
>
> `createEle`虚拟 dom 转换为真实 dom 的方法
>
> `patch`主要就是用来对比两次虚拟 dom 的方法，做的主要就是 diff 的操作

h 函数接收三个参数，target：目标标签，props：属性（类，id，方法等等），children：子元素信息

```javascript
function h(target, props, children) {
  // 创建 虚拟dom 最最基本的一个对象
  return {
    target,
    props,
    children,
  };
}
// props 涉及到的东西极其的复杂，主要就是包含一些标签的属性，类，id，type，方法等等，这里为了理解最简单的虚拟dom过程就默认标签没有属性，

// children是嵌套的虚拟dom
{
  h("h3", null, [
    h("p", null, this.title),
    h("p", null, this.title),
    h("p", null, this.title),
  ]);
}
// children是值
{
  h("h3", null, this.title);
}
```

##### 开始思路

我们首先要明白虚拟 dom 的优势在于可以用很小的体积进行前后虚拟 dom 的比对，所以我们应该是在初次挂载的时候就存下虚拟 dom 的信息，再下次更新的时候又会生成一个虚拟 dom 和最初存的虚拟 dom 进行对比，将有变化的地方转换成 dom 操作再更新，更新完成之后将这次更新的虚拟 dom 存下来作为下次更新的对比目标

###### patch

> 真正 vue3 源码中 patch 是一个极其复杂的函数，因为涉及的对比项实在是太多了，还采用了最长递增子序列的算法

```javascript
app.patch = function(node1, node2) {
  // 这里就是有涉及到 diff 算法了，但是我只会最简单的部分
  // 这步很重要，把每次node1绑定的元素再赋值给node2的元素，这样才可以每次都保持更新元素
  const el = (node2.el = node1.el);
  let child1 = node1.children,
    child2 = node2.children;
  // 两次虚拟dom比对，只更新变化的
  console.log(node1, node2);
  if (typeof node1.children === "string") {
    if (typeof node2.children === "string") {
      if (child1 !== child2) {
        el.textContent = child2;
      }
    } else {
      // 变成了数组 -- 遍历虚拟dom转换成真实dom 再插入
      el.innerHTML = "";
      child2.forEach((child) => el.appendChild(document.createElement(child)));
    }
  } else {
    // node1 是数组
    if (typeof node2.children === "string") {
      el.textContent = child2;
    } else {
      // 两个虚拟dom都是数组，这里就需要数组之间的比对了
    }
  }
};
```

###### createEle

> 讲虚拟 DOM 转换为真实 DOM，注意虚拟 dom 的 children 可能是个虚拟 dom 的数组，所以这个方法是需要递归调用的

```javascript
app.createEle = function(vnode) {
  let el = document.createElement(vnode.target);
  // 先忽略掉属性
  // vnode.props
  if (typeof vnode.children === "string") {
    // 文本
    /*
          {
            h('h3',null,this.title)
          }
      */
    el.textContent = vnode.children;
  } else {
    // 是数组，数组里面是子虚拟DOM
    /*
        {
          h('h3',null,[
            h('p',null,this.title),
            h('p',null,this.title),
            h('p',null,this.title)
          ])
        }
      */
    vnode.children.forEach((node) => {
      // 递归调用
      el.appendChild(this.createEle(node));
    });
  }
  // 这一步极其重要，在虚拟dom上存一下dom，方法最后比对完成之后转换成真实dom操作，触发更新页面，所以说虚拟dom也是要做真实dom操作的，
  vnode.el = el;
  return el;
};
```

#### 完整代码

> 完整代码比较长，建议先看一下前面两篇，分别是挂载和响应式，这个代码是基于上面的，都看下来会理解的比较快

```javascript
function reactive(obj) {
  const proxy = new Proxy(obj, {
    get(target, key) {
      /*
        render函数第一次渲染的时候会获取引用的值 所以第一次渲染就会走到这个 get 方便我们开始做依赖收集
      */
      track(target, key);
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      console.log("proxy", key);
      /*
        修改的时候，去依赖收集的数据结构中 找到对应的key 把 key 对应的 更新函数都执行一遍，这就触发了页面的响应式
      */
      trigger(target, key);
      // app.update()
    },
    /*
      proxy 的优势出了可以监听get 和 set之外 还是可以监听另外十多种情况，这个是Object.defineProperty()做不到的
        这个是语言层面上的升级
    */
  });
  return proxy;
}

// 副作用函数 -- 这里是为了暂时的存放每一个副作用函数，当副作用函数已经和依赖关系建立好了之后再清除空间
const effectStack = [];

function effect(fn) {
  const eff = function() {
    try {
      effectStack.push(eff);
      fn();
    } finally {
      effectStack.pop();
    }
  };
  eff();
  return eff;
}

// 依赖收集函数
/*
  依赖收集的数据结构是这样的
  {
    state:{
      title:[effect,effect] // effect 对应的就是一个个的更新函数，每个响应式对象的值都是存着更新函数的数组，当这个值变化的时候遍历执行数组里面的一个个effect函数
    }
  }
*/
const trackMap = {};

function track(target, key) {
  /* 
    effectStack 是临时存放副作用函数的地方，每次关系建立完成之后就会再清空掉，所以获取数组的最后一个元素即可
  */
  const effect = effectStack[effectStack.length - 1];
  if (effect) {
    let map = trackMap[target];
    if (!map) {
      map = trackMap[target] = {};
    }

    let deps = map[key];
    if (!deps) {
      deps = map[key] = [];
    }

    // 将副作用函数放入 deps
    if (deps.indexOf(effect) === -1) {
      deps.push(effect);
    }
  }
}

function trigger(target, key) {
  const map = trackMap[target];
  if (map) {
    const effects = map[key];
    effects.forEach((effect) => effect());
  }
}

function h(target, props, children) {
  // 创建虚拟DOM的函数
  return {
    target,
    props,
    children,
  };
}

function createApp(config) {
  let app = {};
  app.mount = function(id) {
    this.rootDOM = document.getElementById(id);

    if (!config.render) {
      config.render = this.compile(this.rootDOM.innerHTML);
    }

    if (config.setup) {
      this.setupCtx = config.setup();
    } else {
      this.dataCtx = config.data();
    }

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

    this.update = effect(() => {
      // render 函数的结果是一个 vnode
      const vnode = config.render.call(this.proxy);
      if (!this.isMounted) {
        // 首次挂载
        const el = this.createEle(vnode);
        this.__node = vnode;
        this.rootDOM.innerHTML = "";
        this.rootDOM.appendChild(el);
      } else {
        // 更新
        this.patch(this.__node, vnode);
        this.__node = vnode;
      }
    });

    this.update();

    this.isMounted = true; // 已经挂载成功

    return this;
  };
  app.compile = function(template) {
    return function() {
      // 真实DOM操作
      // const h3 = document.createElement('h3')
      // h3.textContent = this.title
      // return h3

      // 采用虚拟dom
      const vnode = h("h3", null, this.title);
      return vnode;
    };
  };

  app.createEle = function(vnode) {
    let el = document.createElement(vnode.target);
    // 先忽略掉属性
    // vnode.props
    if (typeof vnode.children === "string") {
      // 文本
      /*
          {
            h('h3',null,this.title)
          }
      */
      el.textContent = vnode.children;
    } else {
      // 是数组，数组里面是子虚拟DOM
      /*
        {
          h('h3',null,[
            h('p',null,this.title),
            h('p',null,this.title),
            h('p',null,this.title)
          ])
        }
      */
      vnode.children.forEach((node) => {
        // 递归调用
        el.appendChild(this.createEle(node));
      });
    }
    vnode.el = el;
    return el;
  };

  app.patch = function(node1, node2) {
    // 这里就是有涉及到 diff 算法了，但是我只会最简单的部分
    // 这步很重要，把每次node1绑定的元素再赋值给node2的元素，这样才可以每次都保持更新元素
    const el = (node2.el = node1.el);
    let child1 = node1.children,
      child2 = node2.children;
    // 两次虚拟dom比对，只更新变化的
    console.log(node1, node2);
    if (typeof node1.children === "string") {
      if (typeof node2.children === "string") {
        if (child1 !== child2) {
          el.textContent = child2;
        }
      } else {
        // 变成了数组 -- 遍历虚拟dom转换成真实dom 再插入
        el.innerHTML = "";
        child2.forEach((child) =>
          el.appendChild(document.createElement(child))
        );
      }
    } else {
      // node1 是数组
      if (typeof node2.children === "string") {
        el.textContent = child2;
      } else {
        // 两个虚拟dom都是数组，这里就需要数组之间的比对了
      }
    }
  };

  return app;
}
```

##### 浏览器控制台调试

> 这里我通过定时器两次修改 reactive 响应式对象的值，分别打印出两次虚拟 DOM

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210716151827988.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70)

#### 总结：

虚拟 dom 的操作流程基本就是这样，已经理解了虚拟 dom 的作用和意义以及基本结构，但是虚拟 dom 的比对，也就是`diff`算法才是真正的精髓，这个这一块我还没有写，确实是不会写，得再修炼一段时间才能继续写下去。
