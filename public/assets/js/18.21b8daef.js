(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{507:function(s,n,e){"use strict";e.r(n);var a=e(4),t=Object(a.a)({},(function(){var s=this,n=s.$createElement,e=s._self._c||n;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h2",{attrs:{id:"mvvm-架构"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#mvvm-架构"}},[s._v("#")]),s._v(" MVVM 架构")]),s._v(" "),e("p",[s._v("MVVM 架构是现在前端最为主流的架构思想，基本取代了传统的 MVC 架构，使用 MVVM 架构的时候能够让前端程序员在处理前端项目的时候更加专心于代码逻辑方向的思考。减少了 DOM 的一些操作。下面是以 Vue 为例的核心源码实现。")]),s._v(" "),e("p",[s._v("之所有 Vue 能够完成这个操作，核心原理上就是在定义变量的时候 Vue 底层都将数据重新处理了一次，将变量都通过 "),e("code",[s._v("Object.defineReactive()")]),s._v("的方式处理了一遍，这样做的好处就是每次取值或者是设置值的时候都有一个回调函数可以做我们想做的一些逻辑处理。")]),s._v(" "),e("h2",{attrs:{id:"mvvm-的思想"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#mvvm-的思想"}},[s._v("#")]),s._v(" MVVM 的思想")]),s._v(" "),e("p",[s._v("MVVM 架构的思想是在原有的基础上加一个 VM 模型层，模型层和 VIEW 视图层是双向绑定的，只要修改了模型层上的数据，那么视图层的数据也将同步刷新，任何一端修改，另外一端都会同步刷新。这个主要是得意与一个 发布订阅 的模式")]),s._v(" "),e("h3",{attrs:{id:"发布订阅模式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#发布订阅模式"}},[s._v("#")]),s._v(" 发布订阅模式")]),s._v(" "),e("p",[s._v("发布订阅模式也可以叫做观察者和被观察者。观察者会观察模型中的数据是否有变化，一旦有变化，就会发布这个变化的信号，告诉指定的订阅的结点做出更新的操作")]),s._v(" "),e("h2",{attrs:{id:"mvvm-代码实现"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#mvvm-代码实现"}},[s._v("#")]),s._v(" MVVM 代码实现")]),s._v(" "),e("p",[s._v("查看源码，点击"),e("a",{attrs:{href:"https://gitee.com/jimmyxuexue/front_end_architecture/tree/master/MVVM%E5%8E%9F%E7%90%86",target:"_blank",rel:"noopener noreferrer"}},[s._v("这里"),e("OutboundLink")],1)]),s._v(" "),e("ul",[e("li",[e("p",[s._v("实例类")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("  class MVVM {\n    constructor(object) {\n      this.$el = object.el\n      this.$data = object.data\n      this.$computed = object.computed\n      this.$methods = object.methods\n      if (this.$el) {\n        // 将所有的属性都用 Object.defineReactive() 处理一遍 这样的好处是每次取值或者设置值的时候都有一个回调函数可以做一次逻辑处理\n        new Observer(this.$data)\n        this.proxyMVVM(this.$data)\n        this.dealComputed(this.$computed)\n        this.dealMethods(this.$methods)\n\n        new Compile(this.$el, object)\n      }\n    }\n    dealComputed(computed) {\n      for (const key in computed) {\n        Object.defineProperty(this.$data, key, {\n          get: () => {\n            return computed[key].call(this)\n          },\n        })\n      }\n    }\n    dealMethods(methods) {\n      for (const key in methods) {\n        Object.defineProperty(this, key, {\n          get() {\n            return methods[key]\n          },\n        })\n      }\n    }\n    proxyMVVM(data) {\n      // 做一层代理 直接通过 实例.变量 就能访问到原来结构上的  实例.$data.变量\n      for (const key in data) {\n        Object.defineProperty(this, key, {\n          get() {\n            return data[key]\n          },\n          set(newValue) {\n            data[key] = newValue\n          },\n        })\n      }\n    }\n  }\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br"),e("span",{staticClass:"line-number"},[s._v("14")]),e("br"),e("span",{staticClass:"line-number"},[s._v("15")]),e("br"),e("span",{staticClass:"line-number"},[s._v("16")]),e("br"),e("span",{staticClass:"line-number"},[s._v("17")]),e("br"),e("span",{staticClass:"line-number"},[s._v("18")]),e("br"),e("span",{staticClass:"line-number"},[s._v("19")]),e("br"),e("span",{staticClass:"line-number"},[s._v("20")]),e("br"),e("span",{staticClass:"line-number"},[s._v("21")]),e("br"),e("span",{staticClass:"line-number"},[s._v("22")]),e("br"),e("span",{staticClass:"line-number"},[s._v("23")]),e("br"),e("span",{staticClass:"line-number"},[s._v("24")]),e("br"),e("span",{staticClass:"line-number"},[s._v("25")]),e("br"),e("span",{staticClass:"line-number"},[s._v("26")]),e("br"),e("span",{staticClass:"line-number"},[s._v("27")]),e("br"),e("span",{staticClass:"line-number"},[s._v("28")]),e("br"),e("span",{staticClass:"line-number"},[s._v("29")]),e("br"),e("span",{staticClass:"line-number"},[s._v("30")]),e("br"),e("span",{staticClass:"line-number"},[s._v("31")]),e("br"),e("span",{staticClass:"line-number"},[s._v("32")]),e("br"),e("span",{staticClass:"line-number"},[s._v("33")]),e("br"),e("span",{staticClass:"line-number"},[s._v("34")]),e("br"),e("span",{staticClass:"line-number"},[s._v("35")]),e("br"),e("span",{staticClass:"line-number"},[s._v("36")]),e("br"),e("span",{staticClass:"line-number"},[s._v("37")]),e("br"),e("span",{staticClass:"line-number"},[s._v("38")]),e("br"),e("span",{staticClass:"line-number"},[s._v("39")]),e("br"),e("span",{staticClass:"line-number"},[s._v("40")]),e("br"),e("span",{staticClass:"line-number"},[s._v("41")]),e("br"),e("span",{staticClass:"line-number"},[s._v("42")]),e("br"),e("span",{staticClass:"line-number"},[s._v("43")]),e("br"),e("span",{staticClass:"line-number"},[s._v("44")]),e("br"),e("span",{staticClass:"line-number"},[s._v("45")]),e("br"),e("span",{staticClass:"line-number"},[s._v("46")]),e("br"),e("span",{staticClass:"line-number"},[s._v("47")]),e("br"),e("span",{staticClass:"line-number"},[s._v("48")]),e("br")])]),e("p",[s._v("这里有个小知识点就是数据代理的实现，Vue 中如果需要获取 data 中的数据是直接通过 实例.变量如"),e("code",[s._v("this.name")]),s._v("的方式来获取的，而可以不用通过"),e("code",[s._v("this.data.name")]),s._v("这个就是做了一层简单的代理，在访问"),e("code",[s._v("this")]),s._v("层的时候就等于访问的是"),e("code",[s._v("this.data")]),s._v("层，原理就是使用"),e("code",[s._v("Object.defineReactive()")]),s._v("来实现的。如下：")]),s._v(" "),e("div",{staticClass:"language-0 line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("  proxyMVVM(data) {\n    // 做一层代理 直接通过 实例.变量 就能访问到原来结构上的  实例.$data.变量\n    for (const key in data) {\n      Object.defineProperty(this, key, {\n        get() {\n          return data[key]\n        },\n        set(newValue) {\n          data[key] = newValue\n        },\n      })\n    }\n  }\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("数据劫持类")]),s._v(" "),e("blockquote",[e("p",[s._v("主要是做数据劫持，将变量都通过"),e("code",[s._v("Object.defineProperty()处理一遍")])])]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("  class Observer {\n    constructor(data) {\n      this.observe(data)\n    }\n    observe(data) {\n      // 如果是对象才需要观察\n      if (data && typeof data == 'object') {\n        for (let key in data) {\n          this.defineReactive(data, key, data[key])\n        }\n      }\n    }\n    defineReactive(obj, key, value) {\n      this.observe(value) // 深度递归  // student : [watcher] b:[watcher]\n      let dep = new Dep() //给每个实例都加上具有发布和订阅的功能\n      Object.defineProperty(obj, key, {\n        get() {\n          Dep.target && dep.addSub(Dep.target) //Dep.target 就是一个Watcher  这里是十分灵活的运用的类的静态属性\n          return value\n        },\n        set: newValue => {\n          // 当赋值的时候\n          if (newValue != value) {\n            this.observe(newValue) // 新赋值的对象也重新绑定一次\n            value = newValue\n            dep.notify() // 发布新值\n          }\n        },\n      })\n    }\n  }\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br"),e("span",{staticClass:"line-number"},[s._v("14")]),e("br"),e("span",{staticClass:"line-number"},[s._v("15")]),e("br"),e("span",{staticClass:"line-number"},[s._v("16")]),e("br"),e("span",{staticClass:"line-number"},[s._v("17")]),e("br"),e("span",{staticClass:"line-number"},[s._v("18")]),e("br"),e("span",{staticClass:"line-number"},[s._v("19")]),e("br"),e("span",{staticClass:"line-number"},[s._v("20")]),e("br"),e("span",{staticClass:"line-number"},[s._v("21")]),e("br"),e("span",{staticClass:"line-number"},[s._v("22")]),e("br"),e("span",{staticClass:"line-number"},[s._v("23")]),e("br"),e("span",{staticClass:"line-number"},[s._v("24")]),e("br"),e("span",{staticClass:"line-number"},[s._v("25")]),e("br"),e("span",{staticClass:"line-number"},[s._v("26")]),e("br"),e("span",{staticClass:"line-number"},[s._v("27")]),e("br"),e("span",{staticClass:"line-number"},[s._v("28")]),e("br"),e("span",{staticClass:"line-number"},[s._v("29")]),e("br"),e("span",{staticClass:"line-number"},[s._v("30")]),e("br"),e("span",{staticClass:"line-number"},[s._v("31")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("编译类")]),s._v(" "),e("blockquote",[e("p",[s._v("编译类的主要目的就是对一些代码和特殊的指令进行编译，如含有 v- 开头 {{}} 插值表达式等等，都单独的挑出来，做一层处理")])]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("  class Compile {\n    constructor(el, vm) {\n      this.vm = vm\n      this.el = this.isElementNode(el) ? el : document.querySelector(el)\n      // 把当前结点中的元素存放到内存当中\n      let fragment = this.getFragment(this.el)\n      // 把结点进行替换\n      this.compile(fragment)\n\n      // 编译模板 用数据进行编译\n\n      // 把内容重新塞到页面中\n      this.el.appendChild(fragment)\n    }\n    isElementNode(node) {\n      //  判断传递是否是元素结点\n      return node.nodeType == 1\n    }\n    // 将节点移动到内存当中\n    getFragment(node) {\n      // 创建一个文档碎片\n      let fragment = document.createDocumentFragment()\n      let firstChild\n      while ((firstChild = node.firstChild)) {\n        // appendChild() 是就有移动性的  添加到另外一个地方 那么原来的位置就会消失\n        fragment.appendChild(firstChild)\n      }\n      return fragment\n    }\n\n    // 核心编译方法 -- 编译内存中的dom结点\n    compile(fragment) {\n      let childNode = fragment.childNodes\n      ;[...childNode].map(item => {\n        if (this.isElementNode(item)) {\n          this.compileElement(item)\n          // 如果是元素 那就得再往里遍历一层\n          this.compile(item)\n        } else {\n          this.compileText(item)\n        }\n      })\n    }\n    // 编译元素\n    compileElement(node) {\n      let attrs = node.attributes // 获取所有的属性  目的是更好的获取 v- 类型的指令\n      ;[...attrs].map(attr => {\n        let { name, value: expr } = attr // value:expr  相当于是expr = value  重命名的含义\n        if (this.isDirective(name)) {\n          let [, directive] = name.split('-')\n          let [directivaName, eventName] = directive.split(':') //  指令  v-on:click = functionName\n          compileTool[directivaName](node, expr, this.vm, eventName)\n        }\n      })\n    }\n    // 编译文本  -- 判断文本中的内容是否有 {{}}\n    compileText(node) {\n      let text = node.textContent\n      if (/\\{\\{(.+?)\\}\\}/.test(text)) {\n        compileTool['text'](node, text, this.vm)\n      }\n    }\n\n    // 判断是否为指令\n    isDirective(name) {\n      return name.split('-')[0] == 'v'\n    }\n  }\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br"),e("span",{staticClass:"line-number"},[s._v("14")]),e("br"),e("span",{staticClass:"line-number"},[s._v("15")]),e("br"),e("span",{staticClass:"line-number"},[s._v("16")]),e("br"),e("span",{staticClass:"line-number"},[s._v("17")]),e("br"),e("span",{staticClass:"line-number"},[s._v("18")]),e("br"),e("span",{staticClass:"line-number"},[s._v("19")]),e("br"),e("span",{staticClass:"line-number"},[s._v("20")]),e("br"),e("span",{staticClass:"line-number"},[s._v("21")]),e("br"),e("span",{staticClass:"line-number"},[s._v("22")]),e("br"),e("span",{staticClass:"line-number"},[s._v("23")]),e("br"),e("span",{staticClass:"line-number"},[s._v("24")]),e("br"),e("span",{staticClass:"line-number"},[s._v("25")]),e("br"),e("span",{staticClass:"line-number"},[s._v("26")]),e("br"),e("span",{staticClass:"line-number"},[s._v("27")]),e("br"),e("span",{staticClass:"line-number"},[s._v("28")]),e("br"),e("span",{staticClass:"line-number"},[s._v("29")]),e("br"),e("span",{staticClass:"line-number"},[s._v("30")]),e("br"),e("span",{staticClass:"line-number"},[s._v("31")]),e("br"),e("span",{staticClass:"line-number"},[s._v("32")]),e("br"),e("span",{staticClass:"line-number"},[s._v("33")]),e("br"),e("span",{staticClass:"line-number"},[s._v("34")]),e("br"),e("span",{staticClass:"line-number"},[s._v("35")]),e("br"),e("span",{staticClass:"line-number"},[s._v("36")]),e("br"),e("span",{staticClass:"line-number"},[s._v("37")]),e("br"),e("span",{staticClass:"line-number"},[s._v("38")]),e("br"),e("span",{staticClass:"line-number"},[s._v("39")]),e("br"),e("span",{staticClass:"line-number"},[s._v("40")]),e("br"),e("span",{staticClass:"line-number"},[s._v("41")]),e("br"),e("span",{staticClass:"line-number"},[s._v("42")]),e("br"),e("span",{staticClass:"line-number"},[s._v("43")]),e("br"),e("span",{staticClass:"line-number"},[s._v("44")]),e("br"),e("span",{staticClass:"line-number"},[s._v("45")]),e("br"),e("span",{staticClass:"line-number"},[s._v("46")]),e("br"),e("span",{staticClass:"line-number"},[s._v("47")]),e("br"),e("span",{staticClass:"line-number"},[s._v("48")]),e("br"),e("span",{staticClass:"line-number"},[s._v("49")]),e("br"),e("span",{staticClass:"line-number"},[s._v("50")]),e("br"),e("span",{staticClass:"line-number"},[s._v("51")]),e("br"),e("span",{staticClass:"line-number"},[s._v("52")]),e("br"),e("span",{staticClass:"line-number"},[s._v("53")]),e("br"),e("span",{staticClass:"line-number"},[s._v("54")]),e("br"),e("span",{staticClass:"line-number"},[s._v("55")]),e("br"),e("span",{staticClass:"line-number"},[s._v("56")]),e("br"),e("span",{staticClass:"line-number"},[s._v("57")]),e("br"),e("span",{staticClass:"line-number"},[s._v("58")]),e("br"),e("span",{staticClass:"line-number"},[s._v("59")]),e("br"),e("span",{staticClass:"line-number"},[s._v("60")]),e("br"),e("span",{staticClass:"line-number"},[s._v("61")]),e("br"),e("span",{staticClass:"line-number"},[s._v("62")]),e("br"),e("span",{staticClass:"line-number"},[s._v("63")]),e("br"),e("span",{staticClass:"line-number"},[s._v("64")]),e("br"),e("span",{staticClass:"line-number"},[s._v("65")]),e("br"),e("span",{staticClass:"line-number"},[s._v("66")]),e("br"),e("span",{staticClass:"line-number"},[s._v("67")]),e("br"),e("span",{staticClass:"line-number"},[s._v("68")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("工具对象")]),s._v(" "),e("blockquote",[e("p",[s._v("存放一些工具编译方法 工具方法")])]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("  compileTool = {\n    // 根据表达式取出对应的数据\n    getVal(vm, expr) {\n      // 数据有可能是  student.name  student.age\n      return expr.split('.').reduce((data, current) => {\n        return data[current]\n      }, vm.data)\n    },\n    setValue(vm, expr, value) {\n      expr.split('.').reduce((data, current, index, arr) => {\n        if (arr.length - 1 == index) {\n          return (data[current] = value)\n        }\n        return data[current]\n      }, vm.data)\n    },\n    model(node, expr, vm) {\n      let fn = this.updater['modelUpdater']\n      // 给输入框加观察者，  如果数据更新触发了此方法，会拿新值  给输入框赋值\n      new Watcher(vm, expr, newValue => {\n        fn(node, newValue)\n      })\n      node.addEventListener('input', e => {\n        let value = e.target.value // 输入框的值\n        this.setValue(vm, expr, value)\n      })\n      let value = this.getVal(vm, expr)\n      fn(node, value)\n    },\n    html(node, expr, vm) {\n      let fn = this.updater['htmlUpdater']\n      new Watcher(vm, expr, newValue => {\n        fn(node, newValue)\n      })\n      let value = this.getVal(vm, expr)\n      fn(node, value)\n    },\n    getContentValue(vm, expr) {\n      // 遍历表达式  将内容重新替换成完整的内容返回\n      return expr.replace(/\\{\\{(.+?)\\}\\}/g, (...args) => {\n        return this.getVal(vm, args[1])\n      })\n    },\n    text(node, expr, vm) {\n      // expr => {{a}}  {{student.name}}\n      let fn = this.updater['textUpater']\n      let content = expr.replace(/\\{\\{(.+?)\\}\\}/g, (...args) => {\n        // 给表达式每个变量  都加上观察者\n        new Watcher(vm, args[1], () => {\n          fn(node, this.getContentValue(vm, expr)) // 返回全的字符串\n        })\n        return this.getVal(vm, args[1])\n      })\n      fn(node, content)\n    },\n\n    // 点击事件 v-on\n    on(node, expr, vm, eventName) {\n      node.addEventListener(eventName, e => {\n        vm.methods[expr].call(vm, e)\n      })\n    },\n    updater: {\n      // 将数据插入到节点中\n      modelUpdater(node, value) {\n        node.value = value\n      },\n      htmlUpdater(node, value) {\n        node.innerHTML = value\n      },\n      textUpater(node, value) {\n        node.textContent = value\n      },\n    },\n  }\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br"),e("span",{staticClass:"line-number"},[s._v("14")]),e("br"),e("span",{staticClass:"line-number"},[s._v("15")]),e("br"),e("span",{staticClass:"line-number"},[s._v("16")]),e("br"),e("span",{staticClass:"line-number"},[s._v("17")]),e("br"),e("span",{staticClass:"line-number"},[s._v("18")]),e("br"),e("span",{staticClass:"line-number"},[s._v("19")]),e("br"),e("span",{staticClass:"line-number"},[s._v("20")]),e("br"),e("span",{staticClass:"line-number"},[s._v("21")]),e("br"),e("span",{staticClass:"line-number"},[s._v("22")]),e("br"),e("span",{staticClass:"line-number"},[s._v("23")]),e("br"),e("span",{staticClass:"line-number"},[s._v("24")]),e("br"),e("span",{staticClass:"line-number"},[s._v("25")]),e("br"),e("span",{staticClass:"line-number"},[s._v("26")]),e("br"),e("span",{staticClass:"line-number"},[s._v("27")]),e("br"),e("span",{staticClass:"line-number"},[s._v("28")]),e("br"),e("span",{staticClass:"line-number"},[s._v("29")]),e("br"),e("span",{staticClass:"line-number"},[s._v("30")]),e("br"),e("span",{staticClass:"line-number"},[s._v("31")]),e("br"),e("span",{staticClass:"line-number"},[s._v("32")]),e("br"),e("span",{staticClass:"line-number"},[s._v("33")]),e("br"),e("span",{staticClass:"line-number"},[s._v("34")]),e("br"),e("span",{staticClass:"line-number"},[s._v("35")]),e("br"),e("span",{staticClass:"line-number"},[s._v("36")]),e("br"),e("span",{staticClass:"line-number"},[s._v("37")]),e("br"),e("span",{staticClass:"line-number"},[s._v("38")]),e("br"),e("span",{staticClass:"line-number"},[s._v("39")]),e("br"),e("span",{staticClass:"line-number"},[s._v("40")]),e("br"),e("span",{staticClass:"line-number"},[s._v("41")]),e("br"),e("span",{staticClass:"line-number"},[s._v("42")]),e("br"),e("span",{staticClass:"line-number"},[s._v("43")]),e("br"),e("span",{staticClass:"line-number"},[s._v("44")]),e("br"),e("span",{staticClass:"line-number"},[s._v("45")]),e("br"),e("span",{staticClass:"line-number"},[s._v("46")]),e("br"),e("span",{staticClass:"line-number"},[s._v("47")]),e("br"),e("span",{staticClass:"line-number"},[s._v("48")]),e("br"),e("span",{staticClass:"line-number"},[s._v("49")]),e("br"),e("span",{staticClass:"line-number"},[s._v("50")]),e("br"),e("span",{staticClass:"line-number"},[s._v("51")]),e("br"),e("span",{staticClass:"line-number"},[s._v("52")]),e("br"),e("span",{staticClass:"line-number"},[s._v("53")]),e("br"),e("span",{staticClass:"line-number"},[s._v("54")]),e("br"),e("span",{staticClass:"line-number"},[s._v("55")]),e("br"),e("span",{staticClass:"line-number"},[s._v("56")]),e("br"),e("span",{staticClass:"line-number"},[s._v("57")]),e("br"),e("span",{staticClass:"line-number"},[s._v("58")]),e("br"),e("span",{staticClass:"line-number"},[s._v("59")]),e("br"),e("span",{staticClass:"line-number"},[s._v("60")]),e("br"),e("span",{staticClass:"line-number"},[s._v("61")]),e("br"),e("span",{staticClass:"line-number"},[s._v("62")]),e("br"),e("span",{staticClass:"line-number"},[s._v("63")]),e("br"),e("span",{staticClass:"line-number"},[s._v("64")]),e("br"),e("span",{staticClass:"line-number"},[s._v("65")]),e("br"),e("span",{staticClass:"line-number"},[s._v("66")]),e("br"),e("span",{staticClass:"line-number"},[s._v("67")]),e("br"),e("span",{staticClass:"line-number"},[s._v("68")]),e("br"),e("span",{staticClass:"line-number"},[s._v("69")]),e("br"),e("span",{staticClass:"line-number"},[s._v("70")]),e("br"),e("span",{staticClass:"line-number"},[s._v("71")]),e("br"),e("span",{staticClass:"line-number"},[s._v("72")]),e("br"),e("span",{staticClass:"line-number"},[s._v("73")]),e("br"),e("span",{staticClass:"line-number"},[s._v("74")]),e("br"),e("span",{staticClass:"line-number"},[s._v("75")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("发布订阅模块 - 核心")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("  class Watcher {\n    constructor(vm, expr, cb) {\n      this.vm = vm\n      this.expr = expr\n      this.cb = cb\n      // 默认先存放老值  新老值不一样再更新\n      this.oldValue = this.getValue(this.vm, this.expr)\n    }\n    getValue(vm, expr) {\n      Dep.target = this\n      let value = compileTool.getVal(vm, expr) // 执行这步的时候 这个观察者就被添加了 添加完了之后就可以清空\n      Dep.target = null\n      return value\n    }\n    // 数据变化之后会调用update方法\n    update() {\n      let newValue = compileTool.getVal(this.vm, this.expr)\n      if (newValue !== this.oldValue) {\n        this.cb(newValue)\n      }\n    }\n  }\n  class Dep {\n    constructor() {\n      this.subs = [] // 用于存放watcher\n    }\n    // 订阅\n    addSub(watcher) {\n      this.subs.push(watcher)\n    }\n    // 发布\n    notify() {\n      this.subs.forEach(watcher => {\n        watcher.update()\n      })\n    }\n  }\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br"),e("span",{staticClass:"line-number"},[s._v("14")]),e("br"),e("span",{staticClass:"line-number"},[s._v("15")]),e("br"),e("span",{staticClass:"line-number"},[s._v("16")]),e("br"),e("span",{staticClass:"line-number"},[s._v("17")]),e("br"),e("span",{staticClass:"line-number"},[s._v("18")]),e("br"),e("span",{staticClass:"line-number"},[s._v("19")]),e("br"),e("span",{staticClass:"line-number"},[s._v("20")]),e("br"),e("span",{staticClass:"line-number"},[s._v("21")]),e("br"),e("span",{staticClass:"line-number"},[s._v("22")]),e("br"),e("span",{staticClass:"line-number"},[s._v("23")]),e("br"),e("span",{staticClass:"line-number"},[s._v("24")]),e("br"),e("span",{staticClass:"line-number"},[s._v("25")]),e("br"),e("span",{staticClass:"line-number"},[s._v("26")]),e("br"),e("span",{staticClass:"line-number"},[s._v("27")]),e("br"),e("span",{staticClass:"line-number"},[s._v("28")]),e("br"),e("span",{staticClass:"line-number"},[s._v("29")]),e("br"),e("span",{staticClass:"line-number"},[s._v("30")]),e("br"),e("span",{staticClass:"line-number"},[s._v("31")]),e("br"),e("span",{staticClass:"line-number"},[s._v("32")]),e("br"),e("span",{staticClass:"line-number"},[s._v("33")]),e("br"),e("span",{staticClass:"line-number"},[s._v("34")]),e("br"),e("span",{staticClass:"line-number"},[s._v("35")]),e("br"),e("span",{staticClass:"line-number"},[s._v("36")]),e("br"),e("span",{staticClass:"line-number"},[s._v("37")]),e("br")])])])]),s._v(" "),e("h3",{attrs:{id:"总结"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[s._v("#")]),s._v(" 总结")]),s._v(" "),e("p",[s._v("mvvm 架构和传统 mvc 相比真的是进步太大了，能最先想到这个架构并且实现的真的是大佬，源码还是需要多敲几遍才能完整的记录下来的。"),e("br"),s._v("\nmvvm 的概念在面试中还是比较经常会被问到了，如果能将源码自己实现一遍，那么面试官问这个方向的大部门问题应该都是会回答了。")])])}),[],!1,null,null,null);n.default=t.exports}}]);