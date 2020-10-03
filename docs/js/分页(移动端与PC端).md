---
title: 分页（移动端与PC端不同处理方式）
date: 2020-10-03
sidebar: auto
categories:
  - JavaScript
tags:
  - 前端
  - JavaScript
---

## 后端分页

> 后端分页是非常常见的一个功能了，我们在请求的时候通常需要传递两个分页非常需要的参数，就是页码也每页的条数，后端就会根据这两个值来给我们返回指定的数据

- 从概念上来看我们应该就能够理解，后端分页主要是后端在操作懒加载，前端只需要判断当前时候已经到了需要分页的时候了即可。
- 后端分页最重要的是从数据库中读取数据，所以读取数据最重要的就是 sql 语句了，sql 语句就是`select * from emoticon limit 1,15;`像这句 sql 语句的意思就是读取这个表中 15 条数据，从索引为 1 的地方开始读取，所以分页最关键的就是 sql 的`limit`语句的判断了。
- 我们可以通过传递的页码和条数来判断返回哪些数据，返回的是页码\*条数开始读取传递条数的条数信息并返回。

## PC 端和移动端对分页的不同处理

> Pc 端和移动端的分页操作还是不一样的，pc 端通常是会使用按钮，有一个分页的按钮点一些分页点一下分页这种操作，而移动端就不一样了，移动端通过判断滚动条滚动的进度来判断是否需要分页了，下面我就重点的来讲一下移动端的操作。

移动端判断分页需要使用三个非常关键的值：分别是

- 滚动条与页面的高度：`document.documentElement.scrollTop`
- 可视区域高度:`document.documentElement.clientHeight`
- 页面的总高度:`document.body.scrollHeight`

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200713212326587.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70)

当页面触底的时候。这时候将请求的页码加一并请求一下后端的接口即可

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200713212743598.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70)

其实也是比较好理解，多想几遍就应该可以理解了，这里有几个比较难的地方，在 Vue 中给 window 设置点击事件

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200713212449631.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70)

还有一个比较难的地方是各种高度如何获取，这里我在其他大神的博客下面找了一个图，忘记是哪个大神的了，总之总结的非常好。记录了获取各种宽高，如下

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200713212637620.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70)

## 复习 koa.js 一些操作

- 跨域处理：过去我们可以使用`koa-core`这个模块来实现跨域，但是这个现在表老，已经会给提示了，所以现在如果是后端处理跨域的话需要使用`koa2-cors`模块，使用的步骤就是引用，然后以中间键的形式挂载在 koaApp 上。

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200713202545388.png)

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200713202556765.png)

- 获取 POST 请求传递的数据：在 koa 中，我们可以使用`ctx.request.body`来获取请求传递的参数，要使用这个语句的前提依然还是需要引用`koa-bodyparser`模块，并且以中间键的形式引入。

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200713202816649.png)

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200713202831594.png)

- 使用`mysql2-promise`模块操作 mysql 数据库:过去使用`mysql`模块来操作数数据库，使用的是异步的回调函数的方式来获取数据，这个就比较老，虽然也可以完成操作，但是比较不是很友好，使用`mysql2-promise`模块的操作是封装了 promise 的操作，更加的友好，但是返回的数据也是经过封装的了，有`[rows,fields]`信息，其中我们需要的数据就是这个 rows 行信息。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200713203323324.png)

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200713203336174.png)

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200713203358822.png)
