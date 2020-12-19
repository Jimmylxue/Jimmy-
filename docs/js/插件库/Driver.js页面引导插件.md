---
title: Driver.js 页面导航插件
date: 2020-12-19
sidebar: auto
categories:
  - JavaScript
tags:
  - 前端
  - JavaScript
---

## Driver.js
> [官网](https://kamranahmed.info/driver.js/)
### Driver.js是一个页面引导插件，可以快速的帮我们实现页面引导的这个功能，并且有以下好处
- 封装完美，只需要引入实例化，绑定类名既可以实现
- 多步骤，可以自定下一步上一步文字，弹窗位置等等
- 方法封装完善，可以注册点击下一步上一步之后的事件。

![图例](https://img-blog.csdnimg.cn/20201219210223451.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70)

## 使用方法
### 基本使用
基本使用会实现的就是一个有个overlay 就这个元素是高亮的
```
  const driver = new Driver()
  document.querySelector('.btn1').addEventListener('click',()=>{
    setTimeout(()=>{  // 这里setTimeout() 是必须设置的 为了方式闪烁
      driver.highlight({
        element: '#text1',  // 要高亮的元素
        //  popover 设置 点击反馈
        popover: {
          title: 'Title for the Popover!!', // 这个是支持html显示的 如<em>this is title</em>
          description: 'Description for it!!',
          // position can be left, left-center, left-bottom, top,
          // top-center, top-right, right, right-center, right-bottom,
          // bottom, bottom-center, bottom-right, mid-center
          position: 'bottom',
          showButtons:true,  // 是否显示按钮
          closeBtnText: 'Close it',      // Text on the close button for this step
          nextBtnText: 'Next one',        // Next button text for this step  // 下一步和上一步的按钮文案  注意这个只有在多步骤的时候才会显示 因为多步骤的时候才会有下一步和上一步
          prevBtnText: 'Previous one', 
        },
        onNext:()=>{ // 点击下一步执行的方法
          console.log('进入下一步啦')
        },
        onPrevious:()=>{
          console.log('进入上一步啦')
        }
      })
    },50)
  })
```
- 具体的方法的和属性有很多，具体如下图
![方法图](https://img-blog.csdnimg.cn/20201219211316690.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70)

### 步骤点击
使用步骤是可以讲一个个点击的对象配置成一个效果数组，之后使用`driver.defineSteps(定义的数组)`定义之后，执行`driver.start()`即可
```
  const stepArr = [
    {
      element:'#text3',
      popover:{
        title:'hello Jimmy',
        description:'this is first step',
        closeBtnText: 'Close it',      // Text on the close button for this step
        nextBtnText: 'Next one',        // Next button text for this step  // 下一步和上一步的按钮文案  注意这个只有在多步骤的时候才会显示 因为多步骤的时候才会有下一步和上一步
        prevBtnText: 'Previous one'
      },
      onNext:()=>{
        console.log('进入下一步啦')
      },
      onPrevious:()=>{
        console.log('进入上一步啦')
      }
    },
    {
      element:'#text4',
      popover:{
        title:'hello Jimmy',
        description:'this is second step',
        closeBtnText: 'Close it',      // Text on the close button for this step
        nextBtnText: 'Next one',        // Next button text for this step  // 下一步和上一步的按钮文案  注意这个只有在多步骤的时候才会显示 因为多步骤的时候才会有下一步和上一步
        prevBtnText: 'Previous one'
      }
    },
    {
      element:'#text5',
      popover:{
        title:'hello Jimmy',
        description:'this is last step',
        closeBtnText: 'Close it',      // Text on the close button for this step
        nextBtnText: 'Next one',        // Next button text for this step  // 下一步和上一步的按钮文案  注意这个只有在多步骤的时候才会显示 因为多步骤的时候才会有下一步和上一步
        prevBtnText: 'Previous one'
      }
    },
  ]
  document.querySelector('.btn3').addEventListener('click',()=>{
    setTimeout(() => {
      driver.defineSteps(stepArr)  // 一定要使用这个方法定义才可以使用
      driver.start()
    }, 50);
  })
```

### 总结
这个库可以非常好的让我们实现页面引导的功能！
