---
title: 虚拟DOM的理解(附源码)
date: 2020-08-22
sidebar: auto
categories:
  - javascript
tags:
  - 架构
  - 源码
  - 虚拟DOM
---

## 虚拟 DOM

虚拟 dom 是有 react 首创的，但是其实是可以独立存在的。虚拟 dom 这个概念也是一直都很火热

- 什么是虚拟 dom

  虚拟 dom 我们可以简单的理解成就是我们用自己的 JS 代码来表示的一个 dom 元素。而不是用浏览器的原生 dom 来表示

- 为什么要使用虚拟 dom

  因为浏览器本身的原生 dom 是非常非常庞大的一个数据，如果直接使用浏览器的原生 dom 来操作的话，会消耗我们宝贵的资源性能。

  ```
    let div = document.createElement('div')
    let str = ''
    for (let key in div) {
      str = str + key + '__'
    }
    console.log(str)
  ```

  ![一个空的原生DOM的数据量](https://img-blog.csdnimg.cn/20200822234149562.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

  可见，一个空的原生 DOM 数据量这么大，在遍历属性等等的时候就会遍历到很多无用的一些数据吗，造成资源极大的浪费，所以就需要使用轻量级的虚拟 DOM

## 虚拟 DOM 的基本数据结构

```
  {
    tag:'div',
    data:{
      id:'app'
    },
    children:[
      {
        tag:'p',
        data:{
          class:'p1'
        },
        children:'hello'
      }，
      {
        tag:'p',
        data:{
          class:'p2',
          style:{
            color:'red'
          }
        },
        children:'world'
      }
    ]
  }

  // 以上我们用代码表示dom就可以映射在html上为
  <div id="app">
    <p class="p1">hello</p>
    <p class="p2">world</p>
  </div>

```

当我们用自己的代码来表示一个 dom 的时候，和原生的 DOM 庞大的数据量相比，就是一个非常非常轻量级和迷你的数据了，所以在操作的时候可以极大的提高性能。

### 虚拟 DOM 要有的功能

虚拟 dom 要有的基本功能和原生 dom 基本是一样的，我们就得写一套代码，让虚拟 dom 能够添加数据，对比数据，以及渲染的功能。

## 代码

代码已经上传一遍在仓库了，在[这里](https://gitee.com/jimmyxuexue/front_end_architecture/tree/master/%E8%99%9A%E6%8B%9FDOM)

```
const VnodeType = {
HTML: 'HTML',
TEXT: 'TEXT',
COMPONENT: 'COMPONENT',
}

const childFlag = {
  EMPTY: 'EMPTY',
  SINGLE: 'SINGLE',
  MULTIPE: 'MULTIPE',
}

function createElement(tag, data, childen = null) {
  let flag
  let childrenFlag
  if (typeof tag == 'string') {
    // 普通的HTML标签
    flag = VnodeType.HTML
  } else if (typeof tag == 'function') {
    flag = VnodeType.COMPONENT
  } else {
    flag = VnodeType.TEXT
  }

  if (childen == null) {
    childrenFlag = childFlag.EMPTY
  } else if (Array.isArray(childen)) {
    let length = childen.length
    if (length == 0) {
      childrenFlag = childFlag.EMPTY
    } else {
      childrenFlag = childFlag.MULTIPE
    }
  } else {
    // 文本  文本也是单个元素
    childrenFlag = childFlag.SINGLE
    childen = createTextVnode(childen + '')
  }
  // 返回Vnode
  return {
    flag, // vnode 的类型
    tag, // 标签，div  文本就没有tag  组件就是一个函数
    data,
    childen,
    childrenFlag, // children的类型
    el: null,
  }
}

// 新建文本类型的vnode
function createTextVnode(texts) {
  // 返回文本标签的内容
  return {
    flag: VnodeType.TEXT,
    tag: null,
    data: null,
    childen: texts,
    childenFlag: childFlag.EMPTY, //  文本类型的子元素是空的
  }
}

// 渲染函数  需要传递  要渲染的虚拟DOM 以及容器（父元素）
function render(vnode, container) {
  // 区分首次渲染和再次渲染
  mount(vnode, container)
}

// 首次渲染
function mount(vnode, container) {
  let { flag } = vnode //  通过解构赋值 先获取虚拟DOM的类型
  if (flag == VnodeType.HTML) {
    mountElement(vnode, container)
  } else if (flag == VnodeType.TEXT) {
    mountText(vnode, container)
  }
}

function mountElement(vnode, container) {
  let dom = document.createElement(vnode.tag)
  vnode.el = dom
  // let data = vnode.data // 属性

  let { data, childen, childrenFlag } = vnode
  // 挂载data属性
  if (data) {
    for (let key in data) {
      // 分别是 dom元素 键名称  初始值 新值
      patchData(dom, key, null, data[key])
    }
  }

  if (childrenFlag != childFlag.EMPTY) {
    if (childrenFlag == childFlag.SINGLE) {
      // 文本
      mount(childen, dom)
    } else if (childrenFlag == childFlag.MULTIPE) {
      for (let i = 0; i < childen.length; i++) {
        mount(childen[i], dom)
      }
    }
  }

  container.appendChild(dom)
}

function mountText(vnode, container) {
  let dom = document.createTextNode(vnode.childen)
  vnode.el = dom
  container.appendChild(dom)
}

function patchData(dom, key, before, now) {
  switch (key) {
    case 'style':
      for (const key in now) {
        dom.style[key] = now[key]
      }
      break
    case 'class':
      dom.classList.add(now)
      break
    default:
      if (key[0] == '@') {
        // 点击事件的处理
        if (now) {
          dom.addEventListener(key.slice(1), now)
        }
      } else {
        // 直接在dom上以键值对的形式添加属性
        dom.setAttribute(key, now)
      }
  }
}

```
