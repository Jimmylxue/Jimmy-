---
title: MySql高频实用操作
date: 2020-10-01
sidebar: auto
categories:
  - 数据库
  - 小技巧
tags:
  - mysql
---

## MySql 高频实用操作 -- 持续更新

### 获取一个表中某个字段去掉重复之后的个数，并得出每种字段的个数

> 这一题乍一看我想到的是使用`distinct`关键字，`distinct`关键字是可以实现去重的功能，但是实际上`distinct`关键字是十分消耗资源的效率是十分的低下的，所以一些想法比较好的数据库是已经禁止掉使用这种低效率的关键字了。比较有效率的就是使用`group by`分组来进行操作

- 使用`distinct`处理

  `select distinct type from quizzes;`

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20201001104406873.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

* 使用`group by`分组

  `select type from quizzes GROUP BY type;`

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20201001104508289.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

* 查询分组之后每组内部的个数 (常见的逻辑 -- 掌握)

  `SELECT type, COUNT(*) from quizzes GROUP BY type`

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/2020100110472767.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)
