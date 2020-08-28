---
title: canvas详细使用手册
date: 2020-08-28
sidebar: auto
categories:
  - javascript
tags:
  - html5
---

## Canvas 的使用

canvas 是 HTML5 所提供的一个标签，是画布的意思，我们可以在这个画布上画出我们想要的内容。现在 canvas 的兼容性也越来越好了，所以前端是必须要会掌握的一个技能。现在主流的`echart.js`等等一些图标类型库也都是基础 canvas 标签才能实现的

- canvas 兼容性判断

  canvas 标签内写上文字，如果浏览器不支持 canvas 就会直接将字给打印出来，如果浏览器支持则不会显示文字

  初次之外还可以使用 js 来判断是否支持`canvas.getContext`属性可以用来判断

  ```
    // 可以直接在标签上写上宽和高
    <canvas width="300" height="150">
      我是canvas
    </canvas>

    <script>
      let canvas = document.getElementById('canvas')
      /*
        使用 canvas.getContext 属性可以用来判断浏览器是否支持
      */
      if (canvas.getContext) {
        console.log('浏览器支持')
        let ctx = canvas.getContext('2d') // 可以理解成画笔
      } else {
        alert('您的浏览器太low了，需要更新~~')
      }
    </script>
  ```

- canvas 的基本模板

  在使用 canvas 的时候如果这个模板使用了之后页面其实就会有效果了，剩下的就在这个基础上修修改改就行。

  ```
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>canvas模板</title>
      <style>
        body {
          text-align: center;
          padding-top: 20px;
        }
        canvas {
          box-shadow: 0 0 10px #ccc;
          margin: 0 auto;
        }
      </style>
    </head>
    <body onload="drow()">
      <!-- 在页面都加载完毕之后会加载 drow 方法 -->
      <canvas id="canvas" width="800" height="600"></canvas>

      <script>
        // 基本的模板
        function drow() {
          let canvas = document.getElementById('canvas')
          if (canvas.getContext) {
            let ctx = canvas.getContext('2d')
          }
        }
      </script>
    </body>
  </html>

  ```

  ![canvas模板](https://img-blog.csdnimg.cn/20200824153538250.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

## canvas 基本使用

canvas 只是一个画布，我们需要通过 js 才能进行绘画,首先是通过 js 获取画笔`let ctx = canvas.getContext('2d')`这时候 ctx 对象就是我们的画笔

- 背景填充 （填充整个背景和填充边框）

  - ctx.fillStyle = 'rgb(200,0,0)' 填充背景色  
    ctx.fillRect(0,0,300,300) 填充区域 需要传递四个值，分别是起始的 x,y 坐标和结束的 xy 坐标围成的一个矩形
  - ctx.strokeStyle = 'rgb(200,0,0)' 填充边框颜色  
    ctx.strokeRect(500, 310, 600, 400) 填充边框
  - 注意点:
    1. fillRect() 和 strokeRect() 是最后一步，所以填充颜色的代码是要写在这句之前的，这个是有顺序之分的
    2. 可以一次性画多个矩形

  ![填充背景](https://img-blog.csdnimg.cn/2020082416165940.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

- 清空背景

  - ctx.clearRect(x,y,width,height) 可以清空掉指定区域内部的填充的矩形  
    可以实现如下的效果

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200824180547247.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

  逻辑就是先填充上黑色的背景，再清空掉黑色背景中间的白色区域，再在白色区域内部填充指定颜色的边框

- 绘制路径

  我们默认使用`fillRect()`或者是`strokeRect()`画出来的图形都是矩形的图形，如果我们想要一些自定义的图形，如三角形等等就需要 一步一步 绘制路径，再将路径填充颜色即可

  使用 canvas 绘制自定义的图形需要完成以下几步

  1. 创建起始路径 -- `ctx.beginPath`
  2. 使用画图命令画出路径 -- `ctx.moveTo()`&&`ctx.lineTo()`
  3. 把路径闭合 -- `ctx.closePath()`
  4. 通过描边或者填充绘制图形 -- `ctx.fill()` || `ctx.stroke()`

  ```
    let canvas = document.getElementById('canvas')
    if (canvas.getContext) {
      let ctx = canvas.getContext('2d')
      // 1. 开始描边指令
      ctx.beginPath()
      // 第一个起始点
      ctx.moveTo(75, 50)
      // 第二个点
      ctx.lineTo(100, 75)
      // 第三个点
      ctx.lineTo(100, 25)

      // 闭合路径 原理是再创建一条路径  路径的终点是起始点
      ctx.closePath()

      ctx.fill() // 填充背景
      ctx.stroke() // 填充边框

    }
  ```

  总结：

  - 话路径也是一样的 只有当路径都画好了之后再填充背景或者颜色 否则可能会达不到我们想要的效果
  - 闭合路径 原理是再创建一条路径 路径的终点是起始点
  - `ctx.fill()` // 填充背景 `ctx.stroke()` // 填充边框

- 绘制圆

  圆形在所有的基本图形里面算是比较复杂的一个图形了，他有比较多的参数需要知道，分别是 圆心(x,y) 半径 起始角度 结束角度 顺/逆时针方向  
  在画的时候需要使用`ctx.arc()`方法来画圆，分别按顺序填上上线的关键参数的值

  ```
    let canvas = document.getElementById('canvas')
    if (canvas.getContext) {
      let ctx = canvas.getContext('2d')
      ctx.strokeStyle = 'rgb(100,100,100)'
      ctx.lineWidth = 10  //  线的宽度
      ctx.arc(400, 300, 150, 0, Math.PI * 1.5)
      ctx.stroke()
    }
  ```

  3/4 圆  
  `ctx.arc(400, 300, 150, 0, Math.PI * 1.5)`
  ![3/4圆](https://img-blog.csdnimg.cn/2020082420191223.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

  完整的圆  
  `ctx.arc(400, 300, 150, 0, Math.PI * 2)`

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/2020082420232522.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

  注意点：

  - 其实`ctx.arc()`还可以在最末尾的位置再传递一个布尔值，这个布尔值表示的是画笔画的方向，表示的是以顺时针方向画还是以逆时针方向画，默认是 false 逆时针方法画

- 小 Demo -- 一次画出多个圆

  这个 demo 主要是复习一下圆的使用

  ```
    let canvas = document.getElementById('canvas')
    if (canvas.getContext) {
      let ctx = canvas.getContext('2d')
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
          let x = 25 + j * 50
          let y = 25 + i * 50
          let radius = 20
          let startAngel = 0
          let endAngel = Math.PI + (Math.PI / 2) * j
          let angleWise = i % 2 == 0 ? false : true
          ctx.beginPath()
          console.log('comm', x, y)
          ctx.arc(x, y, radius, startAngel, endAngel, angleWise)
          i < 2 ? ctx.stroke() : ctx.fill()
          // ctx.stroke()
        }
      }
    }
  ```

  ![多个圆](https://img-blog.csdnimg.cn/20200824223914716.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

- 绘制笑脸

  绘制笑脸也就是全部都是用画圆来完成的，就当是一个复习的小 Demo

  ```
    <script>
      let canvas = document.getElementById('canvas')
      if (canvas.getContext) {
        let ctx = canvas.getContext('2d')
        ctx.beginPath()
        ctx.arc(150, 150, 100, 0, Math.PI * 2, false)
        // moveTo()是设置画笔开始画的起始位置  设置了之后就不会造成不同的图形连在一起
        ctx.moveTo(230, 150)
        ctx.arc(150, 150, 80, 0, Math.PI, false)
        ctx.moveTo(130, 110)
        ctx.arc(110, 110, 20, 0, Math.PI * 2, false)
        ctx.moveTo(210, 110)
        ctx.arc(190, 110, 20, 0, Math.PI * 2, false)
        ctx.stroke()
      }
    </script>
  ```

  注意点：

  moveTo()是设置画笔开始画的起始位置 设置了之后就不会造成不同的图形连在一起

  ![画笑脸](https://img-blog.csdnimg.cn/20200825133153316.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

## 绘制渐变

canvas 是也可以画出渐变的效果的，和 CSS3 一样 也可以画出 线性渐变和 径向渐变

- 线性渐变  
  使用`ctx.createLinearGradient()`创建一个线性渐变的方向 需要的参数

  1. 起点 x1
  2. 起点 y1
  3. 终点 x2
  4. 终点 y2

  使用`ctx.addColorStop()`设置渐变的颜色

  1. 参数 1 必须是 0.0 - 1.0 之间的数值，数值标志颜色所在的相对位置
  2. 参数 2 颜色 thite #fff #ffffff rgb rgba 都可以

  Demo：

  ```
    <script>
      let canvas = document.getElementById('canvas')
      if (canvas.getContext) {
        let ctx = canvas.getContext('2d')
        /*
          canvas 是也可以画出渐变的效果的，和CSS3一样 也可以画出 线性渐变和 径向渐变
            线性渐变 需要的参数
              1. 起点x1
              2. 起点y1
              3. 终点x2
              4. 终点y2
        */
        let lineGradient = ctx.createLinearGradient(0, 0, 0, 150) // 相当于是从(0,0)到(0,150) 方向向下的渐变
        /*
          设置颜色 使用 addColorStop()方法
            参数1 必须是0.0 - 1.0 之间的数值，数值标志颜色所在的相对位置
            参数2 颜色 thite #fff #ffffff rgb rgba都可以
        */
        lineGradient.addColorStop(0, '#3498db')
        lineGradient.addColorStop(0.5, '#2ecc71')
        lineGradient.addColorStop(1, '#e67e22')

        ctx.fillStyle = lineGradient

        ctx.fillRect(0, 0, 150, 150)
      }
    </script>
  ```

  ![线性渐变](https://img-blog.csdnimg.cn/2020082514173218.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

- 径向渐变  
  使用`ctx.createRadialGradient()` 创建一个径向渐变的对象，并传递以下的参数

  1. x1 轴
  2. y1 轴
  3. r1 半径 参数 1 和参数 2 表示的是第一个圆的圆心
  4. x2 轴
  5. y2 轴
  6. r2 半径 参数 4 和参数 5 表示的是第二个圆的圆心

  使用`ctx.addColorStop()`设置渐变的颜色

  1. 参数 1 必须是 0.0 - 1.0 之间的数值，数值标志颜色所在的相对位置
  2. 参数 2 颜色 thite #fff #ffffff rgb rgba 都可以

  Demo:

  ```
    let canvas = document.getElementById('canvas')
    if (canvas.getContext) {
      let ctx = canvas.getContext('2d')
      /*
      径向渐变和线性渐变其实是差不多的，只是一个是类似于直线变化，一个是类型于圆的变化，所以参数上回有一些不同
        参数1 x1轴
        参数2 y1轴
        参数3 r1半径  参数1和参数2表示的是第一个圆的圆心
        参数4 x2轴
        参数5 y2轴
        参数6 r2半径  参数4和参数5表示的是第二个圆的圆心
    */
      let radialGradient = ctx.createRadialGradient(
        150,
        150,
        150,
        150,
        150,
        100
      )
      radialGradient.addColorStop(0, '#3498db')
      radialGradient.addColorStop(0.5, '#2ecc71')
      radialGradient.addColorStop(1, '#e67e22')
      ctx.fillStyle = radialGradient
      ctx.fillRect(0, 0, 300, 300)
    }
  ```

  ![径向渐变](https://img-blog.csdnimg.cn/20200825145412813.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

- 绘制图片  
  绘制图片 我们就得先创建一个 image 对象 然后再将这个对象挂载在画布中 最后画出来  
  使用`ctx.createPattern()`方法创建一个画布识别的图片对象，传递两个参数

  1. 传递一个 JS 的 image 对象
  2. 传递一个图片的重叠属性，这个歌 css 是一样的属性 可以传递 no-repeat repeat-x repeat-y 等等，具体的可以参数 css 的属性值

  ```
    <script>
      let canvas = document.getElementById('canvas')
      if (canvas.getContext) {
        let ctx = canvas.getContext('2d')
        /*
          渲染图片 我们就得先创建一个image对象 然后再将这个对象挂载在画布中 最后画出来
        */
        let img = new Image()
        img.src = 'http://39.96.42.170/bg.jpg'
        // 这一步是很重要的，必须要保证图片加载完成之后才做之后的操作，否则实惠报错的
        img.onload = function() {
          let ptrn = ctx.createPattern(img, 'no-repeat')
          ctx.fillStyle = ptrn
          ctx.fillRect(0, 0, 800, 600)
        }
      }
    </script>
  ```

  知识点：
  在我们渲染图片的时候，不管是在开发的时候还是在练习的时候都应该是先判断图片是否加载完成之后再完成之后的操作，否则一旦图片加载失败，后面渲染的环节又继续执行就会造成报错

  ![渲染图片](https://img-blog.csdnimg.cn/20200825152206914.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

- 绘制文字（文字阴影）  
  这个其实 CSS 是可以相对更加方便的完成单，但是 canvas 也是可以让我们画出绚丽的效果的

  使用`ctx.font = ""`设置文字的属性，这是一个符合属性，分别输入 css 中的`font-weight`,`font-style`,`font-size`,`font-family`的值，如`ctx.font = 'bold italic 160px arial'`  
  使用`ctx.shadowColor`设置阴影颜色，`ctx.shadowBlur`设置模糊度，`ctx.shadowOffsetX`和`ctx.shadowOffsetY`设置阴影的水平和垂直的偏移量  
  使用`ctx.fillText('Jimmy', 100, 200)`设置文字，其中第二个和第三个参数会拼成一个坐标，表示的是从这个坐标开始画。  
  在画文字阴影的时候可以配合上线性变化的操作来使得效果更佳的绚丽。

  Demo:

  ```
    <script>
      let canvas = document.getElementById('canvas')
      if (canvas.getContext) {
        let ctx = canvas.getContext('2d')
        let lineGradient = ctx.createLinearGradient(100, 200, 200, 200)
        lineGradient.addColorStop(0, '#f1c40f')
        lineGradient.addColorStop(1, '#e67e22')
        console.log('123456')
        ctx.font = 'bold italic 160px arial'
        ctx.shadowColor = '#2ecc71'
        ctx.shadowBlur = 10
        ctx.shadowOffsetX = 20
        ctx.shadowOffsetY = 20
        ctx.fillStyle = lineGradient
        ctx.fillText('Jimmy', 100, 200) // 后面两个数值表示从哪里开始画 如这里是从x = 100 y = 200开始画
      }
    </script>
  ```

  ![文字6阴影效果](https://img-blog.csdnimg.cn/20200825180521465.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

- drawImage  
  Drawimage() 和 createPattern() 性质差不多 都是可以用来渲染图片的  
  但是 Drawimage() 的功能更加强大， 不仅可以操作图片 也可以操作我们画好的图等等 所以 Drawimage()会更加重要一点  
  Drawimage() 最多可以传递 9 个参数

  1. 最常使用 传递 5 个参数

  传递 5 个参数时 是最经常使用的 分别表示 数据源 从哪个位置开始 然后图片的宽高

  ```
    let img = new Image()
    img.src = 'http://39.96.42.170/bg.jpg'
    img.onload = function() {
      let drawimage = ctx.drawImage(img, 0, 0, 300, 200)
    }
  ```

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200825223628410.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

  2. 传递 9 个参数 -- 裁切功能

  多传递四个参数表示在那个原有的 5 个参数的图形的基础上进行裁切 如下的例子也就是代表在 (150,50)的位置为起点 x 裁切 100 y 裁切 50

  ```
    let img = new Image()
    img.src = 'http://39.96.42.170/bg.jpg'
    img.onload = function() {
      let drawimage = ctx.drawImage(img, 0, 0, 300, 200, 150, 50, 100, 50)
    }
  ```

- clip()  
  `ctx.clip()`方法，可以裁切出一个圆形，那既然要裁切出一个圆形，我们就先得画一个圆，之后再裁切即可

  ```
    <script>
      let canvas = document.getElementById('canvas')

      if (canvas.getContext) {
        let ctx = canvas.getContext('2d')
        /*
          ctx.clip()可以让我们裁切出一个圆形的型组昂出来
        */
        let img = new Image()
        img.src = 'http://39.96.42.170/bg.jpg'
        ctx.beginPath()
        img.onload = () => {
          ctx.arc(60, 60, 30, 0, Math.PI * 2, false)  // 画圆
          ctx.clip()  // 裁切
          ctx.fill()  // 画出圆
          ctx.drawImage(img, 0, 0, 200, 150) // 上背景图片
        }
      }
    </script>
  ```

  ![clip()裁切圆形](https://img-blog.csdnimg.cn/20200825233435197.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

- 图像组合  
  图像组合涉及的 api 就有很多了，主要是用于，两个图像重叠时的处理，主要是通过`ctx.globalCompositeOperation`来设置，属性值有很多。下面一一介绍  
  在学习这个之前先要明白两个概念 就是目标图像和源图像，可以简单的理解，目标图像就是已经存在再画布上的图像，源图像是我们即将要画的图像

  1. `destination-over`和`source-over`  
     `destination-ove`:目标图像覆盖源图像  
     `source-over`: 源图像覆盖目标图像  
     ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200826152511511.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)
  2. `destination-atop`和`source-atop`  
     `destination-atop`重叠部分 只限制目标图像  
     `source-atop`只显示与目标图像重叠的部分  
     ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200826152701794.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)
  3. `source-in`和`destination-in`  
     `source-in` 只显示与目标图像重叠部分的源图像 目标图像不显示  
     `destination-in` 只显示目标图像重叠部门的目标图像 源图像不显示  
     ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200826152828895.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)
  4. `destination-out`和`source-out`  
     `destination-out` 只显示与目标图像不重叠的部分，重叠部分不显示  
     `source-out` 只显示与源图像不重叠的部分 显示不重叠的源图像  
     刮刮卡使用的就是这个  
     ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200826152952609.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

     ```
       let canvas4 = document.getElementById('canvas4')
       let ctx4 = canvas4.getContext('2d')
       ctx4.fillStyle = 'green'
       ctx4.fillRect(50, 50, 50, 50)
       ctx4.globalCompositeOperation = 'source-out'
       ctx4.fillStyle = 'red'
       ctx4.arc(100, 100, 30, 0, Math.PI * 2)
       ctx4.fill()
     ```

## 动画

canvas 一样也可以绘制出动画，甚至可以达到更加绚丽的动画，动画的原理就是让重新画一个图像，然后擦去原有的图像，不断的循环这个过程，所以可以使用`setInterval()`来做.

### 直线动画

```
  <script>
    let canvas = document.getElementById('canvas')
    if (canvas.getContext) {
      let ctx = canvas.getContext('2d')
      ctx.fillStyle = 'skyblue'
      let x = (y = 0)
      let width = (height = 100)
      let speedX = (speedY = 2)
      ctx.fillRect(x, y, width, height)
      setInterval(() => {
        // console.log(1234)
        ctx.clearRect(0, 0, canvas.width, canvas.height)  // 清楚图像
        x += speedX
        y += speedY
        if (x > canvas.width - width) {  // 最多能位移的空间
          speedX = speedX * -1
        } else if (x < 0) {
          speedX = speedX * -1
        }

        if (y > canvas.height - height) {
          speedY *= -1
        } else if (y < 0) {
          speedY *= -1
        }
        ctx.fillRect(x, y, width, height)  //  重新绘制图像
      }, 10)
    }
  </script>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200826162857843.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200826162922841.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

- `window.requestAnimationFrame()`  
  这个方法可以实现`setInterval()`每个一段时间就重复执行代码块内的代码的功能，并且他的性能还更好，`setInterval()`有时候如果我们时间设置的不合理会出现失帧的情况，然而`requestAnimationFrame()`不会，它会去计算电脑的性能已经浏览器的性能，最终得出一个性能效果最好的时间去反复执行，唯一的遗憾就是不能自己设置间隔时间.但是性能好，这个方法在轮播图的时候可以使用

  ```
    function move() {
      ctx.clearRect(x, y, width, height)
      x += speedX
      y += speedY
      if (x > canvas.width - width) {
        speedX *= -1
      } else if (x <= 0) {
        speedX *= -1
      }

      if (y > canvas.height - height) {
        speedY *= -1
      } else if (y <= 0) {
        speedY *= -1
      }
      ctx.fillRect(x, y, width, height)
      window.requestAnimationFrame(move)  //  会反复执行move函数
    }
    move()
  ```

- 水平全景滚动原理  
  水平方向的全景滚动其实就是差不多类似于轮播图的原理了，其实看似好像是只有一张但是其实实际上是放两张照片的，头尾相连即可，在 canvas 里面如果要实现这个效果需要知道三个新的 API

  1. `ctx.save()`  
     保存当前的状态 可以保存颜色，位置，偏移量等等信息
  2. `ctx.restore()`  
     更新状态，从保存栈中更新
  3. `ctx.translate()`  
     和 css 一样 设置偏移量，可以传递两个值 分别是水平的和垂直的偏移量

  注意点：  
   这个保存和更新的存储方式是类似于栈数据类型的存储方式，也就是先进后出，后进先出的的形式。

## 案例

- 涂鸦小 Demo  
  这个小 Demo 就是可以实现画画的功能，是个最最基础的，当然如果牛逼的话后期还可以通过 js 其他设置，设置画笔颜色，画笔的粗细等等等等，变成一个真正很强的画板工具

  ```
    <script>
      let canvas = document.getElementById('canvas')
      if (canvas.getContext) {
        let ctx = canvas.getContext('2d')
        canvas.addEventListener('mousedown', e => {
          // console.log('hello world')
          let x = e.clientX - canvas.offsetLeft
          let y = e.clientY - canvas.offsetTop
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.strokeStyle = 'green'
          canvas.onmousemove = e => {
            let x = e.clientX - canvas.offsetLeft
            let y = e.clientY - canvas.offsetTop
            ctx.lineTo(x, y)
            ctx.stroke()
          }
          canvas.onmouseup = () => {
            canvas.onmousemove = null
          }
        })
      }
      /*
        在有需要清除默认事件的时候  最好是使用onmousemove之类直接绑定函数
          而不要使用 addEventLinstener方法，因为前者更加的容器清除默认事件
      */
    </script>
  ```

  `let x = e.clientX - canvas.offsetLeft` 表示的是获取鼠标的位置减去画布的距离屏幕的位置，得到的值就是在画布内的值  
  在需要取消默认事件的时候，我们为 DOM 添加事件最好是使用`onmousemove`之类的方式绑定事件，而不要使用`addEventListener`的方式来添加。

  ![涂鸦demo](https://img-blog.csdnimg.cn/20200826134408776.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

- 刮刮乐  
  刮刮乐用到的最重要的一个属性是`ctx.globalCompositeOperation = 'destination-out'` 意思理解起来就是鼠标滑过的区域会透明处理，所以要实现刮刮乐的思路就是先绝对定位一个画布在图片上，只要设置了这个属性之后鼠标移动过就会透明显示出后面的图像信息

  ```
    <script>
      let canvas = document.getElementById('canvas')
      if (canvas.getContext) {
        let ctx = canvas.getContext('2d')
        ctx.fillStyle = 'gray'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.globalCompositeOperation = 'destination-out' //  设置鼠标滑过的区域透明处理。所以就会显示出后面的图形

        ctx.lineWidth = 30 //  画笔宽度
        ctx.lineCap = 'round' // 圆形

        canvas.addEventListener('mousedown', e => {
          ctx.beginPath()
          let x = e.clientX
          let y = e.clientY
          ctx.moveTo(x, y)
          canvas.onmousemove = e => {
            let x = e.clientX
            let y = e.clientY
            ctx.lineTo(x, y)
            ctx.stroke()
          }
          canvas.onmouseup = () => {
            canvas.onmousemove = null
          }
        })
      }
    </script>
  ```

  ![刮刮乐](https://img-blog.csdnimg.cn/20200826142636432.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)
