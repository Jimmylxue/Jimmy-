---
title: 深入浅出了解HTTP与HTTPS
date: 2020-10-10
sidebar: auto
categories:
  - 前端
tags:
  - 前端
  - 优化
---

## 深入浅出了解 HTTP 与 HTTPS

> http 有关网络的知识天天都会遇到，不管是前端还是后端都需要掌握的一个知识，面试也非常的容易考到

大部分人是知道 https 相比于 http 是更加的安全。这只是其中的一个点。还有很多的其他区别。

### http 历史

#### 什么是 http

http 是基于请求和响应，无状态，且是应用层的协议，常是基于 Tcp/Ip 协议传输数据，是互联网上应用最广的一种网络协议，所有的 www 开头的文件都是必须遵守这个协议，设计 http 的初衷实际上是为了发布和接收 HTML 文件。

#### http 发展历史

- http0.9  
  本质上只是一个草案，纯文本格式。功能是十分的有限，最初也只是为了接收和发布 HTML 文件。蒂姆.伯纳斯-李最初设想的系统里的文档都是只读的，所以只允许用"GET" 动作从服务器上获取 HTML 文档，并且在响应请求之后立即关闭连接
- http1.0  
  1996 年正式发布。

  1. 增加了 HEAD、POST 等方法
  2. 增加了响应状态码，标记可能的错误原因
  3. 引入了协议版本号概念，
  4. 引入了 HTTP header 头概念
  5. 传输的数据不仅限于文本

  在 1.0 中服务器发送完一个 http 响应后，会断开连接。1.0 中确立了大部分现在使用的技术，但是它还不是一个正式的标准

- http1.1

  1999 年，HTTP1.1 发布了 RFC 文档。是现在使用到的最多的版本。即使现在已经是 2020 年了。

  ![百度的http版本](https://img-blog.csdnimg.cn/20201010111408678.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

  http1.1 在功能上也是十分的完善，主要体现在

  1. 增加了 PUT、 DELETE 等新的方法;
  2. 增加了缓存管理和控制;
  3. 明确了连接管理，允许持久连接;
  4. 允许响应数据分块(chunked),利于传输大文件;
  5. 强制要求 Host 头，让互联网主机托管成为可能。

- http2.0  
  2015 年发布。主要是新增了
  1. 允许多路复用（极大的压缩时间），可以同一时间发送多个请求，同时响应。
  2. 头部信息进行了压缩
  3. 服务器推送（server push）
  4. 二进制分帧  
     现如今大多数的在使用的版本就是 http1.1 和 http2.0 结合在一起使用。

#### http 报文格式

- 请求报文

  ![请求报文](https://img-blog.csdnimg.cn/20201010122104581.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20201010122846862.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

- 响应报文

  ![响应报文](https://img-blog.csdnimg.cn/20201010122157984.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

  ![response](https://img-blog.csdnimg.cn/2020101012295336.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

### https

#### 什么是 https

https 中的 s 是 security，https 是 http 身披 SSL 外壳，简单的理解就是 https 是由 http 进行通信，利用 SSL/TLS 建立安全信道，加密数据包。  
ps：TLS 传输层加密协议，前身是 SSL 协议

目的

- 主要是为了提供对网站服务器的身份认证，同时保护交换数据隐私与完整新

### HTTP 与 HTTPS 区别

#### HTTP 特点

- 无状态 - 每次请求浏览器并不知道是第几次请求
- 无连接 - 每次请求是基于 TCP 的三次捂手四次挥手和服务重新建立连接，因为无状态所以每次都要重新连接
- 基于请求和响应 - 由客户发起请求，服务器响应
- 简单快速、灵活
- 通信使用明文，请求和响应不会对通信方进行确认、无法保护数据的完整性

#### HTTPS 特点

- 内容加密 - 采用混合加密技术，中间者无法直接查看明文内容
- 验证身份 - 通过证书认证客户端访问自己的服务器
- 保护数据完整性 - 防止传输的内容被中间者模仿和串改

#### TCP/IP 三次握手四次挥手模型

- 三次握手通俗理解

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20201010170518149.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

- 四次挥手通俗理解

  ![四次挥手](https://img-blog.csdnimg.cn/20201010170645691.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

- 为什么握手需要三次而挥手需要四次

  - TCP 建立连接时之所以只需要"三次握手"，是因为在第二次"握手"过程中，服务器端发送给客户端的 TCP 报文是以 SYN 与 ACK 作为标志位的。SYN 是请求连接标志，表示服务器端同意建立连接；ACK 是确认报文，表示告诉客户端，服务器端收到了它的请求报文。
  - 即 SYN 建立连接报文与 ACK 确认接收报文是在同一次"握手"当中传输的，所以"三次握手"不多也不少，正好让双方明确彼此信息互通。
  - TCP 释放连接时之所以需要“四次挥手”,是因为 FIN 释放连接报文与 ACK 确认接收报文是分别由第二次和第三次"握手"传输的。为何建立连接时一起传输，释放连接时却要分开传输？

#### 总结

- http 和 https 都是基于 TCP/IP 传输协议的，再加上 http 协议每次是一种无状态的链接，所以每次发送请求的时候，都会触发三次握手和四次挥手，一来一回的极其的消耗性能，所以性能优化的一个很重要的点就是尽量减少请求的发送。
- https 相比于 http 更加安全，因为套了一个 SSL 协议的壳，所以相对来说也会更加的消耗一些性能，所以不需要特别安全的时候就正常使用 http 即可。
