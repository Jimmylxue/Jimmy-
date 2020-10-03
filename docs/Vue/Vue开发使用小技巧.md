---
title: Vue开发实用小技巧
date: 2020-10-03
sidebar: auto
categories:
  - 数据库
  - 小技巧
tags:
  - vue
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

### Vue 中的懒加载

> 毕设开发的过程中可能涉及到的数据量比较小，所以不怎么会出现需要懒加载的情况，但是这个在工作中就是非常非常重要的一个知识点了。懒加载的功能和分页其实是非常像的，就是一次性不会给太多的数据。

懒加载的作用：

- 界面的加载速度会有非常明显的提升
- 节省带宽
- 不必要加载无用（用户刷不到的数据） 减轻了服务器的压力

#### [vue-lazylaod](https://www.npmjs.com/package/vue-lazyload)

- 引入 CDN 形式

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200713200853648.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70)

- 脚手架开发模式

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200713200905272.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70)

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200713201019252.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70)

其中的参数：

- `error`表示的是当图片加载失败时会使用的图片地址
- `loading`表示的是图片处在加载状态时会显示的图片
- `attempt`表示图片会加载的次数（当加载失败以后会继续加载的次数）

当配置好了这个之后，就可以在页面中使用了，原来图片的连接时写在`src`下，现在写在`v-lazy`里面即可

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200713201345697.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70)

以上便是图片的懒加载，只有当页面使用到图片了之后，才会去加载所以的内容(即使后端一次性将全部的资源一次返回（七八百条也一样）之后再图片懒加载的时候才会去加载，并不会一次性的将七八百条都渲染)
