---
title: promise源码实现(宏任务版promise)
date: 2021-07-09
sidebar: auto
categories:
  - javascript
tags:
  - 前端
  - 源码
---

## promise 源码实现

> 这个 promise 的实现还是属于比较阉割版本的，promise 的异步是微任务，这里我为了实现异步的代码只是简单的用`setTimeout`封装了一个宏任务版本的 promise

#### promise 特点

> 我们要自己封装一个 promise，首先要知道 promise 具有什么特性

- promise 有三个状态 准备状态、解决状态、失败状态，默认是准备状态，除此之外还有一个就是 promise 保存的值

  ```javascript
  class XPromise {
    static PENDING = "pending";
    static RESLOVE = "reslove";
    static REJECT = "reject";
    constructor(func) {
      this.status = XPromise.PENDING; // 默认是准备状态
      this.value = null;
    }
  }
  ```

* 状态一旦发生改变，就不能再修改状态

  ```javascript
  class XPromise{
      static PENDING = 'pending';
      static RESLOVE = 'reslove';
      static REJECT = 'reject';
      constructor(func){
          ...
      }
  	reslove(value){
          //只有当状态是准备状态的时候才可以进行更改
          if(this.status === XPromise.PENDING){
              this.value = value
              this.status = XPromise.RESLOVE
          }
      }
  	reject(value){
          if(this.status === XPromise.PENDING){
              this.value = value
              this.status = XPromise.REJECT
          }
      }
  }
  ```

- promise 内部是有错误检查机制的，如果代码有错误的地方会立即将下一个 promise 的状态改成失败的状态，并携带错误信息

  ```javascript
  // 错误检查机制，本质上就是try-catch就可以实现了
  class XPromise{
      ...
      constructor(func){
          ...
      }
  	...
      then(onreslove,onreject){
          // onreslove  onreject 分别代表的是then的两个函数
          try{
              ....
          }catch(err){
            // 有错误直接走到  onreject 函数
              onreject(err.message)
          }
      }
  }
  ```

* promise 有 `reslove`,`reject`,`all`,`race`四个静态方法，后两个传递的 promise 的数组，前两个可以正常的值或者是 promise

* `then`方法的返回值也是一个 promise，同时具有穿透效果（一个空的 then 什么的都不做，后面的 then 可以接受到不操作之前 promise）

* promise 具有链式操作的功能

  ```javascript
  class XPromise{
      ...
      constructor(func){
          ...
      }
  	...
      then(onreslove,onreject){
          return new XPromise((reslove,reject)=>{
              // onreslove  onreject 分别代表的是then的两个函数
              try{
                  ....
              }catch(err){
                // 有错误直接走到  onreject 函数
                  reject(err.message)
              }
          })
      }
  }
  ```

总结：

最重要的还是我们对第一个 promise 的封装，因为第一个实现了，后面的一些静态方法返回的都是这个 promise，无非就是一个不断重复套娃的操作。

上面的代码片段提供了 promise 几个重要的点的涉及思路，真正在写的时候如果全部按照那样写会很夸张代码量会特别巨大，是有很多地方是可以进行封装的

#### 完整代码

```javascript
class XPromise {
  static PENDING = "pending";
  static RESLOVE = "reslove";
  static REJECT = "reject";
  constructor(func) {
    this.status = XPromise.PENDING;
    this.value = null;
    this.callBack = [];
    /*
      函数是拥有bind方法，传递一个新的this对象，返回一个函数的复制，同时这个复制的函数的this是修改了传递对象为上下文的函数对象
    */

    try {
      func(this.reslove.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error.message);
    }
  }

  reslove(value) {
    // console.log('va',this)

    /*
      在外部构造函数调用，这里的this指向的本来应该是window，因为是类 使用的是严格模式 会变成undefined，所以得不到
        我们想要的结果，所以可以使用bind强制修改this的绑定
    */

    if (this.status === XPromise.PENDING) {
      this.value = value;
      this.status = XPromise.RESLOVE;
    }
    /*
      只要是执行到 then方法里面的 onreslove 或者是 onreject 方法 说明一定是异步的
        所以这里也先用 setTimeOut 来处理
    */

    setTimeout(() => {
      this.callBack.map((item) => {
        item.onreslove(this.value);
      });
    });
  }

  reject(reason) {
    if (this.status === XPromise.PENDING) {
      this.value = reason;
      this.status = XPromise.REJECT;
    }
    setTimeout(() => {
      this.callBack.map((item) => {
        item.onreject(this.value);
      });
    });
  }

  then(onreslove, onreject) {
    let xP = new XPromise((reslove, reject) => {
      /*
        如果没有传递函数，就自己封装一个函数，不至于报错种植运行
      */

      if (typeof onreslove !== "function") {
        /* 当没传递 onreslove 的时候，打印onreslove位 undefined  typeof undefined 的结果 也是undefined  所以这里只需要检查 typeof onreslove !== 'function' 就可以排除其他所有的情况了 */
        onreslove = () => this.value;
      }
      if (typeof onreject !== "function") {
        /* 这个是为了解决then的代码穿透问题， 当then没有传递任何参数的时候  只需要把值返回 给下一个then的promise处理即可 */

        onreject = () => this.value;
      }
      if (this.status === XPromise.PENDING) {
        this.callBack.push({
          onreslove: (value) => {
            try {
              this.parse(xP, onreslove(value), reslove, reject);
            } catch (error) {
              this.parse(xP, onreject(error.message), reslove, reject);
            }
          },
          onreject: (reason) => {
            try {
              this.parse(xP, onreject(reason), reslove, reject);
            } catch (error) {
              reject(error.message);
            }
          },
        });
      }
      if (this.status === XPromise.RESLOVE) {
        /*
          then 方法是异步的，我们可以把它封装到 暂时这里就先把它封装到 setTimeout宏任务队列里，后期再改装成微任务队列
        */

        setTimeout(() => {
          this.parse(xP, onreslove(this.value), reslove, reject);
        }, 0);
      } else if (this.status === XPromise.REJECT) {
        setTimeout(() => {
          this.parse(xP, onreject(this.value), reslove, reject);
        }, 0);
      }
    });

    return xP;
  }

  parse(xP, result, reslove, reject) {
    if (xP === result) {
      /*
        在 promise 中 是不允许出现 一个promise 返回的是 自己本身的这个promise
          当返回的是自己本身的时候 就会直接报错
      */
      throw new TypeError("Chaining cycle detected for XPromise");
    }
    try {
      if (result instanceof XPromise) {
        // 在then中返回的是一个 prmise对象
        /*
          promise的用法是 在 then默认返回的是一个primise，但是其实我们是可以手动自己写一个promise返回的
        */

        result.then(
          (res) => {
            reslove(res);
          },
          (err) => {
            reject(err);
          }
        );
      } else {
        reslove(result);
      }
    } catch (error) {
      /*
        只要有错误，就将错误抛给 onreject来处理，就可以捕获到错误了
      */
      /*
        catch的错误就不需要再继续往后走了，因为没有意义，只有用户自己返回的才有必须链式操作下去
      */

      reject(error.message);
    }
  }

  /*
    XPromise 的两个静态方法 无非就是返回两个promise  只要第一个 promise 写好了 之后的都很简单
      类似于套娃
  */
  static reslove(value) {
    return new XPromise((reslove, reject) => {
      if (value instanceof XPromise) {
        value.then(
          (res) => {
            reslove(res);
          },
          (err) => {
            reject(err);
          }
        );
        return;
      }
      reslove(value);
    });
  }

  static reject(value) {
    return new XPromise((reslove, reject) => {
      if (value instanceof XPromise) {
        value.then(
          (res) => {
            reslove(res);
          },
          (err) => {
            reject(err);
          }
        );
        return;
      }
      reject(value);
    });
  }

  static all(promises) {
    /*
      all 方法的逻辑：
        传递多个promise 返回的也是一个promise  只有 全部promise 返回的都是 true 才会是解决状态，否则就会直接走到失败状态
    */
    return new XPromise((reslove, reject) => {
      const success = [];
      Array.prototype.map.call(promises, (promise) => {
        // console.log('pro',promise)
        promise.then(
          (res) => {
            success.push(res);
            if (success.length === promises.length) {
              reslove(success);
            }
          },
          (err) => {
            reject(err);
          }
        );
      });
    });
  }

  static race(promises) {
    /*
      race 方法的逻辑
        传递一个primises数组 哪个promise执行的快就用哪个的状态
    */
    return new XPromise((reslove, reject) => {
      Array.prototype.map.call(promises, (promise) => {
        promise.then(
          (res) => {
            reslove(res);
          },
          (err) => {
            reject(err);
          }
        );
      });
    });
  }
}

export default XPromise;
```

#### 总结：

这个是我上班摸鱼的时候写的，摸鱼不能只是单独的摸鱼吧，其他人都那么努力，你的顿悟可能只是别人的基础，一些大佬肯定很早以前就懂这个了，所以还是要不断努力才行呀~。

写这个的前提是要对 promise 的机制以及运行过程，结果都要了解，否则会不知道自己在写的是什么，这个是我跟着后盾人向军老师视频看完之后自己写的，是以 ES6 的类的形式写的，如果小伙伴们想要检测自己到底是否已经吸收这个知识，可以使用 function 的形式再写一次。
