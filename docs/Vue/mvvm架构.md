---
title: MVVM架构源码实现(Vue源码)
date: 2020-08-16
sidebar: auto
sticky:
  - 置顶
  - 3
categories:
  - Vue源码
tags:
  - 架构
  - 源码
---

## MVVM 架构

MVVM 架构是现在前端最为主流的架构思想，基本取代了传统的 MVC 架构，使用 MVVM 架构的时候能够让前端程序员在处理前端项目的时候更加专心于代码逻辑方向的思考。减少了 DOM 的一些操作。下面是以 Vue 为例的核心源码实现。

之所有 Vue 能够完成这个操作，核心原理上就是在定义变量的时候 Vue 底层都将数据重新处理了一次，将变量都通过 `Object.defineReactive()`的方式处理了一遍，这样做的好处就是每次取值或者是设置值的时候都有一个回调函数可以做我们想做的一些逻辑处理。

<!-- more -->

## MVVM 的思想

MVVM 架构的思想是在原有的基础上加一个 VM 模型层，模型层和 VIEW 视图层是双向绑定的，只要修改了模型层上的数据，那么视图层的数据也将同步刷新，任何一端修改，另外一端都会同步刷新。这个主要是得意与一个 发布订阅 的模式

### 发布订阅模式

发布订阅模式也可以叫做观察者和被观察者。观察者会观察模型中的数据是否有变化，一旦有变化，就会发布这个变化的信号，告诉指定的订阅的结点做出更新的操作

## MVVM 代码实现

查看源码，点击[这里](https://gitee.com/jimmyxuexue/front_end_architecture/tree/master/MVVM%E5%8E%9F%E7%90%86)

- 实例类

  ```
    class MVVM {
      constructor(object) {
        this.$el = object.el
        this.$data = object.data
        this.$computed = object.computed
        this.$methods = object.methods
        if (this.$el) {
          // 将所有的属性都用 Object.defineReactive() 处理一遍 这样的好处是每次取值或者设置值的时候都有一个回调函数可以做一次逻辑处理
          new Observer(this.$data)
          this.proxyMVVM(this.$data)
          this.dealComputed(this.$computed)
          this.dealMethods(this.$methods)

          new Compile(this.$el, object)
        }
      }
      dealComputed(computed) {
        for (const key in computed) {
          Object.defineProperty(this.$data, key, {
            get: () => {
              return computed[key].call(this)
            },
          })
        }
      }
      dealMethods(methods) {
        for (const key in methods) {
          Object.defineProperty(this, key, {
            get() {
              return methods[key]
            },
          })
        }
      }
      proxyMVVM(data) {
        // 做一层代理 直接通过 实例.变量 就能访问到原来结构上的  实例.$data.变量
        for (const key in data) {
          Object.defineProperty(this, key, {
            get() {
              return data[key]
            },
            set(newValue) {
              data[key] = newValue
            },
          })
        }
      }
    }
  ```

  这里有个小知识点就是数据代理的实现，Vue 中如果需要获取 data 中的数据是直接通过 实例.变量如`this.name`的方式来获取的，而可以不用通过`this.data.name`这个就是做了一层简单的代理，在访问`this`层的时候就等于访问的是`this.data`层，原理就是使用`Object.defineReactive()`来实现的。如下：

  ```0
    proxyMVVM(data) {
      // 做一层代理 直接通过 实例.变量 就能访问到原来结构上的  实例.$data.变量
      for (const key in data) {
        Object.defineProperty(this, key, {
          get() {
            return data[key]
          },
          set(newValue) {
            data[key] = newValue
          },
        })
      }
    }
  ```

- 数据劫持类

  > 主要是做数据劫持，将变量都通过`Object.defineProperty()处理一遍`

  ```
    class Observer {
      constructor(data) {
        this.observe(data)
      }
      observe(data) {
        // 如果是对象才需要观察
        if (data && typeof data == 'object') {
          for (let key in data) {
            this.defineReactive(data, key, data[key])
          }
        }
      }
      defineReactive(obj, key, value) {
        this.observe(value) // 深度递归  // student : [watcher] b:[watcher]
        let dep = new Dep() //给每个实例都加上具有发布和订阅的功能
        Object.defineProperty(obj, key, {
          get() {
            Dep.target && dep.addSub(Dep.target) //Dep.target 就是一个Watcher  这里是十分灵活的运用的类的静态属性
            return value
          },
          set: newValue => {
            // 当赋值的时候
            if (newValue != value) {
              this.observe(newValue) // 新赋值的对象也重新绑定一次
              value = newValue
              dep.notify() // 发布新值
            }
          },
        })
      }
    }
  ```

- 编译类

  > 编译类的主要目的就是对一些代码和特殊的指令进行编译，如含有 v- 开头 {{}} 插值表达式等等，都单独的挑出来，做一层处理

  ```
    class Compile {
      constructor(el, vm) {
        this.vm = vm
        this.el = this.isElementNode(el) ? el : document.querySelector(el)
        // 把当前结点中的元素存放到内存当中
        let fragment = this.getFragment(this.el)
        // 把结点进行替换
        this.compile(fragment)

        // 编译模板 用数据进行编译

        // 把内容重新塞到页面中
        this.el.appendChild(fragment)
      }
      isElementNode(node) {
        //  判断传递是否是元素结点
        return node.nodeType == 1
      }
      // 将节点移动到内存当中
      getFragment(node) {
        // 创建一个文档碎片
        let fragment = document.createDocumentFragment()
        let firstChild
        while ((firstChild = node.firstChild)) {
          // appendChild() 是就有移动性的  添加到另外一个地方 那么原来的位置就会消失
          fragment.appendChild(firstChild)
        }
        return fragment
      }

      // 核心编译方法 -- 编译内存中的dom结点
      compile(fragment) {
        let childNode = fragment.childNodes
        ;[...childNode].map(item => {
          if (this.isElementNode(item)) {
            this.compileElement(item)
            // 如果是元素 那就得再往里遍历一层
            this.compile(item)
          } else {
            this.compileText(item)
          }
        })
      }
      // 编译元素
      compileElement(node) {
        let attrs = node.attributes // 获取所有的属性  目的是更好的获取 v- 类型的指令
        ;[...attrs].map(attr => {
          let { name, value: expr } = attr // value:expr  相当于是expr = value  重命名的含义
          if (this.isDirective(name)) {
            let [, directive] = name.split('-')
            let [directivaName, eventName] = directive.split(':') //  指令  v-on:click = functionName
            compileTool[directivaName](node, expr, this.vm, eventName)
          }
        })
      }
      // 编译文本  -- 判断文本中的内容是否有 {{}}
      compileText(node) {
        let text = node.textContent
        if (/\{\{(.+?)\}\}/.test(text)) {
          compileTool['text'](node, text, this.vm)
        }
      }

      // 判断是否为指令
      isDirective(name) {
        return name.split('-')[0] == 'v'
      }
    }
  ```

- 工具对象

  > 存放一些工具编译方法 工具方法

  ```
    compileTool = {
      // 根据表达式取出对应的数据
      getVal(vm, expr) {
        // 数据有可能是  student.name  student.age
        return expr.split('.').reduce((data, current) => {
          return data[current]
        }, vm.data)
      },
      setValue(vm, expr, value) {
        expr.split('.').reduce((data, current, index, arr) => {
          if (arr.length - 1 == index) {
            return (data[current] = value)
          }
          return data[current]
        }, vm.data)
      },
      model(node, expr, vm) {
        let fn = this.updater['modelUpdater']
        // 给输入框加观察者，  如果数据更新触发了此方法，会拿新值  给输入框赋值
        new Watcher(vm, expr, newValue => {
          fn(node, newValue)
        })
        node.addEventListener('input', e => {
          let value = e.target.value // 输入框的值
          this.setValue(vm, expr, value)
        })
        let value = this.getVal(vm, expr)
        fn(node, value)
      },
      html(node, expr, vm) {
        let fn = this.updater['htmlUpdater']
        new Watcher(vm, expr, newValue => {
          fn(node, newValue)
        })
        let value = this.getVal(vm, expr)
        fn(node, value)
      },
      getContentValue(vm, expr) {
        // 遍历表达式  将内容重新替换成完整的内容返回
        return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
          return this.getVal(vm, args[1])
        })
      },
      text(node, expr, vm) {
        // expr => {{a}}  {{student.name}}
        let fn = this.updater['textUpater']
        let content = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
          // 给表达式每个变量  都加上观察者
          new Watcher(vm, args[1], () => {
            fn(node, this.getContentValue(vm, expr)) // 返回全的字符串
          })
          return this.getVal(vm, args[1])
        })
        fn(node, content)
      },

      // 点击事件 v-on
      on(node, expr, vm, eventName) {
        node.addEventListener(eventName, e => {
          vm.methods[expr].call(vm, e)
        })
      },
      updater: {
        // 将数据插入到节点中
        modelUpdater(node, value) {
          node.value = value
        },
        htmlUpdater(node, value) {
          node.innerHTML = value
        },
        textUpater(node, value) {
          node.textContent = value
        },
      },
    }
  ```

- 发布订阅模块 - 核心

  ```
    class Watcher {
      constructor(vm, expr, cb) {
        this.vm = vm
        this.expr = expr
        this.cb = cb
        // 默认先存放老值  新老值不一样再更新
        this.oldValue = this.getValue(this.vm, this.expr)
      }
      getValue(vm, expr) {
        Dep.target = this
        let value = compileTool.getVal(vm, expr) // 执行这步的时候 这个观察者就被添加了 添加完了之后就可以清空
        Dep.target = null
        return value
      }
      // 数据变化之后会调用update方法
      update() {
        let newValue = compileTool.getVal(this.vm, this.expr)
        if (newValue !== this.oldValue) {
          this.cb(newValue)
        }
      }
    }
    class Dep {
      constructor() {
        this.subs = [] // 用于存放watcher
      }
      // 订阅
      addSub(watcher) {
        this.subs.push(watcher)
      }
      // 发布
      notify() {
        this.subs.forEach(watcher => {
          watcher.update()
        })
      }
    }
  ```

### 总结

mvvm 架构和传统 mvc 相比真的是进步太大了，能最先想到这个架构并且实现的真的是大佬，源码还是需要多敲几遍才能完整的记录下来的。  
mvvm 的概念在面试中还是比较经常会被问到了，如果能将源码自己实现一遍，那么面试官问这个方向的大部门问题应该都是会回答了。
