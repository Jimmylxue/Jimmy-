---
title: MySql高频实用操作
date: 2020-10-03
sidebar: auto
categories:
  - 数据库
  - 小技巧
tags:
  - mysql
---

## Vue 开发实用小技巧 -- 持续更新

### Vuex 中页面刷新，state 数据丢失的问题

> 这个本身 vuex 机制就是这样，我们不能不让用户刷新页面，但是可以使用一些小插件可以做到不让页面刷新,可以使用特定的插件来实现页面刷新数据不丢失，原理就是先将数据存储在本地的`localStroage`或者`sessionStroage`中

#### [Vue-savedata](https://www.npmjs.com/package/vue-savedata) -- 指定数据持久化（配置简，性能佳，体积小)

> vuex 指定【模块】的 state 持久化（配置简，性能佳，体积小: gzip 压缩之后 1238 字节 ≈ 1.2kb） ## updata 2.x

安装

`npm install vue-savedata`

使用案例

```
  import createPersiste from 'vue-savedata'
  // 默认全部持久化，你也可以通过一丢丢配置项,指定数据持久化
  const store = new Vuex.Store({
    // ...
    plugins: [createPersiste()],
  })
```
