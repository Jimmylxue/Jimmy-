---
title: windows电脑中安装mysql（简单版）
date: 2020-11-17
sidebar: auto
categories:
  - 数据库
  - 小技巧
tags:
  - mysql
---

## windows电脑中安装mysql（简单版）
>MySql的安装有很多种，网上比较多的都是自己配置,这种酒比较繁琐，需要记很多的指令，当然繁琐有繁琐的好处，能够更加的理解mysql在系统层面上的运行。今天上传的是使用软件的方式快速的配一个Mysql，非常香！

### 需要的环境
- 电脑要有*VC++2015-2019*的环境，如果没有的可以在[下载地址](https://support.microsoft.com/zh-cn/help/2977003/the-latest-supported-visual-c-downloads)中快速下载一个，就十几M，下载安装一下很快

- 去mysql官网下载 *mysql-installer-community-8.0.17.0.msi* 记住要是一个可执行文件,[网盘地址](https://pan.baidu.com/s/1qidUPXhzW8nRX3tToGTDCQ),提取码1250

### 进入安装

- 安装的界面就很普通了 先是根据箭头一个个指向选择mysql server 安装的时候就可以通过图形化界面的方式设置mysql的名字、密码、端口号啥的，

  安装成功之后在我们开始界面就能找到mysql了

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20201117235546688.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

- 在安装好了推荐再进入那个msi可执行文件，可以安装一个`workbench`这款图形化界面的软件，挺好用的，全英文的，但是操作简单。这个软件也是可以除了链接本地还可以链接远端的服务器上的mysql

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20201117235812615.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)