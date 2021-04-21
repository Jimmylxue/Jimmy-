(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{501:function(e,s,a){"use strict";a.r(s);var t=a(4),n=Object(t.a)({},(function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h2",{attrs:{id:"vue3-0"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vue3-0"}},[e._v("#")]),e._v(" Vue3.0")]),e._v(" "),a("p",[e._v("Vue3.0 和 Vue2.x 之间并不是推翻重来，有很多地方还是集成了 Vue2.x 的，所以学会 Vue3.0 的前提是对 Vue2.x 有一定的了解"),a("br"),e._v("\nVue3.0 预计在 2021 年会正式在公司启用，现在就算已经发布了正式版了，但是一些周边环境并没有完全适配，一些库和插件还没有兼容。")]),e._v(" "),a("h2",{attrs:{id:"vue3-0-优势"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vue3-0-优势"}},[e._v("#")]),e._v(" Vue3.0 优势")]),e._v(" "),a("ul",[a("li",[a("p",[e._v("diff 算法的优化"),a("br"),e._v("\nVue3.0 优化了 diff 算法，Vue 之所以能够完成双向数据绑定，就是通过前后虚拟 DOM 不断的进行比较，只要一有不同就立即通知 Watcher 进行更新。Vue3 优化的点在于通过算法减少了前后比较的次数，比较次数的减少，就间接的提升了性能。")]),e._v(" "),a("ol",[a("li",[a("p",[e._v("Vue2.xdiff 算法")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/20200927200826958.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center",alt:"在这里插入图片描述"}})])]),e._v(" "),a("li",[a("p",[e._v("Vue3.0diff 算法")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/20200927201028182.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center",alt:"在这里插入图片描述"}})])])]),e._v(" "),a("p",[e._v("可见，两者之间的比较次数就减少了，写死的 dom 在进行 diff 算法的时候是不会进行比较的，并且比较还有分类型，比如类是动态的，text 是动态，点击事件是动态的，只比较前后指定的 flag 类型，就更加进一步的减少了前后比较的次数。提升了性能。")])]),e._v(" "),a("li",[a("p",[e._v("静态提升"),a("br"),e._v("\n在 Vue2.x 中，一个数据每次刷新的时候都会被重新的渲染到页面上（不管有没有发生变化），Vue3 就是根据这点判断有没有发生改变，如果是静态的数据会直接提升道最前面，等到页面 render 渲染的时候直接拿来用，就不重新创建渲染了")])]),e._v(" "),a("li",[a("p",[e._v("监听缓存"),a("br"),e._v("\n这个主要是发生在一些点击事件或其他事件上面，如果绑定的函数名是一样的就不用重新的绑定，还是用原来的那个绑定的即可，这个就是通过 diff 算法的 flag 绑定类型来判断的。")])])]),e._v(" "),a("h2",{attrs:{id:"vue3-0-项目创建方式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vue3-0-项目创建方式"}},[e._v("#")]),e._v(" Vue3.0 项目创建方式")]),e._v(" "),a("ul",[a("li",[e._v("Vue-cli")]),e._v(" "),a("li",[e._v("Webpack")]),e._v(" "),a("li",[e._v("Vite （最推荐使用）")])]),e._v(" "),a("h3",{attrs:{id:"vite"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vite"}},[e._v("#")]),e._v(" Vite")]),e._v(" "),a("blockquote",[a("p",[e._v("Vue 作者开发的一款意图取代 webpack 的工具,实现的原理是通过 ES6 的 import 会发送请求加载文件的特性，拦截这些请求，做一些预编译。极大的省去了 webpack 的打包时间")])]),e._v(" "),a("p",[e._v("安装")]),e._v(" "),a("p",[a("code",[e._v("npm install -g create-vite-app")])]),e._v(" "),a("p",[e._v("创建 vue3 项目")]),e._v(" "),a("p",[a("code",[e._v("create-vite-app 项目名")])]),e._v(" "),a("p",[e._v("总结")]),e._v(" "),a("p",[e._v("最直观的感受就是创建项目极快。")]),e._v(" "),a("h3",{attrs:{id:"vue2-x-存在的问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vue2-x-存在的问题"}},[e._v("#")]),e._v(" Vue2.x 存在的问题")]),e._v(" "),a("blockquote",[a("p",[e._v("Vue2.x 是将所有的内容都通过组件化的形式来开发，这个组件化是比较鸡肋的组件化，逻辑的代码没有办法抽离出来，这个也就是为什么 Vue2.x 不适合用于开发大型项目的原因")])]),e._v(" "),a("ul",[a("li",[e._v("一个属性对应的一个方法")]),e._v(" "),a("li",[e._v("有可能在 method 中 有可能在 computed 中 有可能在 filter 中 有可能在 watch 中。过于复杂")]),e._v(" "),a("li",[e._v("功能逻辑不能抽离，不利于维护")])]),e._v(" "),a("h3",{attrs:{id:"vue3-（componsition）组合-api"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vue3-（componsition）组合-api"}},[e._v("#")]),e._v(" Vue3 （Componsition）组合 API")]),e._v(" "),a("blockquote",[a("p",[e._v("Vue3 的组合 API 的好处在于我们可以将一些单独的功能模块给隔离开,这个就在开发大型应用的时候更加的便于维护了")])]),e._v(" "),a("p",[e._v("Componsition API（Vue3）和 Option API（Vue2.x）的区别：\nVue2.x 的 API 是要写很多的配置项 如"),a("code",[e._v("data")]),e._v(" "),a("code",[e._v("method")]),e._v(" "),a("code",[e._v("computed")]),e._v("等等.")]),e._v(" "),a("p",[e._v("Componsition API 本质：Componsition API 又称注入 API，意思就是在编译的过程中，会将 Componsition API 中 return 暴露出来的一些对象分别注入到 Option API 中，这个就是 Componsition API 的本质")]),e._v(" "),a("p",[e._v("对比：")]),e._v(" "),a("ul",[a("li",[a("p",[e._v("Vue2.x")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/20201004234921622.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center",alt:"Vue2.x"}})])]),e._v(" "),a("li",[a("p",[e._v("Vue3")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/20201004235108407.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center",alt:"Vue3"}})])]),e._v(" "),a("li",[a("p",[e._v("组合 API 好处缩略图")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/20201004235455876.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center",alt:"缩略对比图"}})])])]),e._v(" "),a("h3",{attrs:{id:"setup-函数"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#setup-函数"}},[e._v("#")]),e._v(" setup()函数")]),e._v(" "),a("blockquote",[a("p",[e._v("setup()函数是 Componsition API 的入口函数")])]),e._v(" "),a("ul",[a("li",[e._v("setup() 入口函数的执行时机是在 beforeCreate() 和 created()之间")]),e._v(" "),a("li",[e._v("setup()函数只能是同步的 不能是异步的")]),e._v(" "),a("li",[e._v("setup()函数中无法使用"),a("code",[e._v("data")]),e._v("和"),a("code",[e._v("methods")]),e._v("，也没有 this")]),e._v(" "),a("li",[e._v("复习："),a("br"),e._v("\nbeforeCreate() 组件将要被创建 此时是还没有 data 和 methods"),a("br"),e._v("\ncreated() 组件创建完成 含有 data 和 methods"),a("br"),e._v("\n间接证明 setup() 注入 API setup 的时候会将里面的组合 API 注入到 Option API 当中")])]),e._v(" "),a("h3",{attrs:{id:"reactive"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#reactive"}},[e._v("#")]),e._v(" reactive")]),e._v(" "),a("blockquote",[a("p",[e._v("reactive 是 Vue3 中提供实现响应式数据的方法")]),e._v(" "),a("ul",[a("li",[e._v("在 Vue2.x 中的响应式数据是通过"),a("code",[e._v("Object.defineProperty()")]),e._v("实现的")]),e._v(" "),a("li",[e._v("Vue3 中的响应式数据通过 ES6 的"),a("code",[e._v("Proxy()")]),e._v("实现的，也就是说响应式的数据本质上是一个 Proxy 对象")])])]),e._v(" "),a("p",[e._v("reactive 注意点：")]),e._v(" "),a("ul",[a("li",[e._v("reactive 的参数必须是对象（json/arr）")]),e._v(" "),a("li",[e._v("如果 reactive 传递了其他对象，则默认下修改对象，页面是不会自动更新的，如果想要更新可以使用重新赋值的方式")])]),e._v(" "),a("h3",{attrs:{id:"ref"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ref"}},[e._v("#")]),e._v(" ref")]),e._v(" "),a("blockquote",[a("p",[e._v("ref 和 reactive 一样也是用来实现响应式数据的方法\n由于 reactive 必须要传递一个对象，所以导致企业开发中如果只想监听一个单独的变量就变得十分的麻烦，所以 vue3 提供了 ref 方法")])]),e._v(" "),a("p",[e._v("ref 本质：")]),e._v(" "),a("ul",[a("li",[e._v("ref 的本质实现其实还是 reactive")]),e._v(" "),a("li",[e._v("系统会自动的将 ref 传入的值改成对象形式，形如：ref(xx) -> reactive({value:xx})")])]),e._v(" "),a("p",[e._v("注意点：")]),e._v(" "),a("ul",[a("li",[e._v("JS 中使用 ref 的值必须使用.value")]),e._v(" "),a("li",[e._v("template 中使用 ref 的值不需要加.value。可以简单的理解在 template 中 vue 自动的帮我们加了.value")])]),e._v(" "),a("h3",{attrs:{id:"isref-isreactive"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#isref-isreactive"}},[e._v("#")]),e._v(" isRef() isReactive()")]),e._v(" "),a("blockquote",[a("p",[e._v("isRef() isReactive()是 vue 向我们提供的两个判断响应式对象的类型的方法，返回值都是布尔类型")])]),e._v(" "),a("ul",[a("li",[a("p",[e._v("isRef() 判断响应式数据是否是 ref 对象")])]),e._v(" "),a("li",[a("p",[e._v("isReactive() 判断响应式数据是否是 reactive 对象")])]),e._v(" "),a("li",[a("p",[e._v("Vue 系统就是通过对象是否含有这个属性 并且值为 true 来判断一个对象是否是 ref 对象")])]),e._v(" "),a("li",[a("p",[e._v("我们自己可以使用 vue 向我们提供的 isRef(), isReactive() 这种 API 来判断一个对象是什么类型的响应式对象")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('  setup() {\n    const name = ref(\'Jimmy\')\n    const age = reactive({\n      value: 20,\n    })\n\n    function show() {\n      console.log(name)\n      /*\n        RefImpl {_rawValue: "Jimmy", _shallow: false, __v_isRef: true, _value: "Jimmy"}\n          __v_isRef: true   //  是否是ref对象   Vue系统就是通过对象是否含有这个属性 并且值为true 来判断一个对象是否是ref对象\n          _rawValue: "Jimmy"\n          _shallow: false\n          _value: "Jimmy"\n          value: (...)\n      */\n      console.log(name.value) // jimmy\n      console.log(age) //  Proxy {value: 20}\n      console.log(isRef(name), isRef(age)) //   true false\n      console.log(isReactive(name), isReactive(age)) //  false true\n    }\n\n    return { name, age, show }\n  },\n')])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br"),a("span",{staticClass:"line-number"},[e._v("10")]),a("br"),a("span",{staticClass:"line-number"},[e._v("11")]),a("br"),a("span",{staticClass:"line-number"},[e._v("12")]),a("br"),a("span",{staticClass:"line-number"},[e._v("13")]),a("br"),a("span",{staticClass:"line-number"},[e._v("14")]),a("br"),a("span",{staticClass:"line-number"},[e._v("15")]),a("br"),a("span",{staticClass:"line-number"},[e._v("16")]),a("br"),a("span",{staticClass:"line-number"},[e._v("17")]),a("br"),a("span",{staticClass:"line-number"},[e._v("18")]),a("br"),a("span",{staticClass:"line-number"},[e._v("19")]),a("br"),a("span",{staticClass:"line-number"},[e._v("20")]),a("br"),a("span",{staticClass:"line-number"},[e._v("21")]),a("br"),a("span",{staticClass:"line-number"},[e._v("22")]),a("br"),a("span",{staticClass:"line-number"},[e._v("23")]),a("br"),a("span",{staticClass:"line-number"},[e._v("24")]),a("br")])])])]),e._v(" "),a("h3",{attrs:{id:"递归监听与非递归监听"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#递归监听与非递归监听"}},[e._v("#")]),e._v(" 递归监听与非递归监听")]),e._v(" "),a("blockquote",[a("p",[e._v("当我们使用 ref()和 reactive()创建的对象都是属于递归监听的，也就是说会递归子元素，给子元素也包装成一个"),a("code",[e._v("Proxy")]),e._v("对象")])]),e._v(" "),a("p",[e._v("递归监听存在的问题")]),e._v(" "),a("ul",[a("li",[e._v("如果数据量比较庞大（层次深），是非常的消耗性能的（因为要一直递归）")])]),e._v(" "),a("p",[e._v("非递归监听")]),e._v(" "),a("p",[a("code",[e._v("shallowRef")]),e._v("/"),a("code",[e._v("shallowReactive")]),e._v(",这两个是 vue 提供的创建非递归监听的 API 方法")]),e._v(" "),a("ul",[a("li",[a("code",[e._v("shallowRef")]),e._v("顾明思议是创建 ref 的非递归函数，它只会监听到 ref 值.value 的变化，如果改变了 ref 内层的变化是不会重新刷新 UI 的，这时候可使用"),a("code",[e._v("triggerRef")]),e._v("来实现手动控制刷新 UI。")]),e._v(" "),a("li",[a("code",[e._v("shallowReactive")]),e._v("是创建 reactive 的非递归函数，它只会监听第一层数据的改变， -- 只要第一层有改变，就会重新刷新渲染 UI.如果第一层没变，第二三层改变是不会渲染 UI 的.\nshallowReactive 只会监听第一层数据的修改，也就是它其实没有做递归监听.但实际上还是有细节的 只有第一层修改的数据有在 UI 上的时候 修改才会触发重新刷新 UI")]),e._v(" "),a("li",[e._v("只有"),a("code",[e._v("triggerRef")]),e._v(",没有"),a("code",[e._v("triggerReactive")])]),e._v(" "),a("li",[a("code",[e._v("triggerRef(state)")]),e._v("， state 是通过 shallowRef 创建的对象")])]),e._v(" "),a("p",[e._v("shallowRef 本质")]),e._v(" "),a("ul",[a("li",[a("p",[e._v("ref 的本质 是通过讲 ref 转换为 reactive 加了一个.value 的对象形式"),a("br"),e._v("\n如： ref(10) = reactive({value:10})")])]),e._v(" "),a("li",[a("p",[e._v("shallowRef 本质上也是将 shallowRef 转换成 shallowReactive"),a("br"),e._v("\n如： shallowRef(10) = shallowReactive({value:10})")])]),e._v(" "),a("li",[a("p",[e._v("shallowReactive 只能监听第一层的数据的变化 所以这里就是只能监听到 .value 这第一层的变化")])])]),e._v(" "),a("p",[e._v("应用场景")]),e._v(" "),a("ul",[a("li",[e._v("一般情况下我们使用 ref 和 reactive 即可")]),e._v(" "),a("li",[e._v("只有在需要监听数据量比较大（层次深）的时候，我们才使用 shallowRef/shallowReactive")])]),e._v(" "),a("h3",{attrs:{id:"toraw"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#toraw"}},[e._v("#")]),e._v(" toRaw")]),e._v(" "),a("blockquote",[a("p",[e._v("找到引用的初始数据，主要是为了提升性能")])]),e._v(" "),a("p",[e._v("使用和不使用的区别")]),e._v(" "),a("ul",[a("li",[e._v("使用 reactive 创建的对象 默认是会创建成一个 Proxy  对象 自带监听功能")]),e._v(" "),a("li",[e._v("使用 toRaw(proxy 对象) 传递一个 proxy 对象 可以将 proxy 对象引用的原始数据导出来 我们修改原始数据， proxy 数据也会修改 是不会造成页面的重新渲染的")]),e._v(" "),a("li",[e._v("正常情况下，我们使用 reactive 创建的数据 一旦是发生改变，就会默认开启监听 去自动的修改 UI 界面， 单这个也是属于极其消耗性能的")])]),e._v(" "),a("p",[e._v("demo")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('  const state = reactive({ name: \'Jimmy\', age: 22 })\n  const refss = ref({ name: \'jack\' })\n  const obj = toRaw(state)\n  const obj2 = toRaw(refss)\n  console.log(state) // Proxy {name: "Jimmy", age: 22}\n  console.log(obj) //{name: "Jimmy", age: 22}\n  console.log(refss) // RefImpl {_rawValue: {…}, _shallow: false, __v_isRef: true, _value: Proxy}\n    console.log(obj2) // RefImpl {_rawValue: {…}, _shallow: false, __v_isRef: true, _value: Proxy}\n    console.log(obj3)  //  {name: "jack"}\n  两个对象数据是一样的，区别在于是不是Proxy 对象  是不是具有响应式功能\n')])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br"),a("span",{staticClass:"line-number"},[e._v("10")]),a("br")])]),a("p",[e._v("注意点：")]),e._v(" "),a("ul",[a("li",[e._v("如果是 toRaw()获取的是 ref 创建出来的响应式数据，那么直接 toRaw(ref 对象)是没有用的，原因是因为 ref 对象本质是包装成 reactive 对象，所以想要获取 ref 的原始数据，就要加上.value，如"),a("code",[e._v("toRaw(ref对象.value)")])])]),e._v(" "),a("h3",{attrs:{id:"markraw"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#markraw"}},[e._v("#")]),e._v(" markRaw")]),e._v(" "),a("blockquote",[a("p",[e._v("永远不会被追踪，markRaw()的返回值是经过处理的原对象")])]),e._v(" "),a("p",[e._v("一个对象只要被 markRaw()方法修饰过一次之后，及时再经历 ref(),或者 reactive()的处理，也是不会变成响应式的数据的。")]),e._v(" "),a("p",[e._v("原理")]),e._v(" "),a("ul",[a("li",[e._v("markRaw()方法会给对象加上一个 "),a("code",[e._v("__v_skip: true")]),e._v(" 属性，加了这个之后就不会成为响应式的数据了。")])]),e._v(" "),a("p",[e._v("demo")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("  setup() {\n    let obj = { name: 'Jimmy', age: 22 }\n    console.log(obj) // {name: \"Jimmy\", age: 22}\n    obj = markRaw(obj)\n    console.log(obj) //  {name: \"Jimmy\", age: 22, __v_skip: true}\n    let state = reactive(obj)\n    function change() {\n      state.name = 'xuexue'\n    }\n    return { state, change }\n  },\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br"),a("span",{staticClass:"line-number"},[e._v("10")]),a("br"),a("span",{staticClass:"line-number"},[e._v("11")]),a("br")])]),a("h3",{attrs:{id:"toref"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#toref"}},[e._v("#")]),e._v(" toRef")]),e._v(" "),a("blockquote",[a("p",[e._v("和 ref 一样，也是创建响应式数据，不同点在于这个是引用原始数据")])]),e._v(" "),a("p",[e._v("demo")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("  setup(){\n    const obj = { name:'Jimmy',age:22 }\n    const obj1 = {name:'kangkang',age:18}\n    const state = ref(obj.name)\n    const state1 = toRef(obj1,'name')\n\n    function change(){\n      state.value = 'hello world'\n      state1.value = 'Jack'\n      console.log(obj,state)  //{name: \"Jimmy\", age: 22} RefImpl {_rawValue: \"hello world\", _shallow: false, __v_isRef: true, _value: \"hello world\"}\n      console.log(obj1,state1) //{name: \"Jack\", age: 18} ObjectRefImpl {_object: {…}, _key: \"name\", __v_isRef: true}\n    }\n\n    return {state,state1,change}\n  }\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br"),a("span",{staticClass:"line-number"},[e._v("10")]),a("br"),a("span",{staticClass:"line-number"},[e._v("11")]),a("br"),a("span",{staticClass:"line-number"},[e._v("12")]),a("br"),a("span",{staticClass:"line-number"},[e._v("13")]),a("br"),a("span",{staticClass:"line-number"},[e._v("14")]),a("br"),a("span",{staticClass:"line-number"},[e._v("15")]),a("br")])]),a("p",[e._v("注意点")]),e._v(" "),a("ul",[a("li",[e._v("toRef 创建对象的方式是 "),a("code",[e._v("const state = toRef(obj,key)")]),e._v(",此处的 obj 是引用的对象，key 是引用对象的某个属性，是可以监听某个属性，然后将这个属性创建成一个响应式对象的。")]),e._v(" "),a("li",[e._v("toRef 只能写两个参数，如果 toRef 想设置一个对象的多个属性为响应式数据的话，那就只能多写几遍 toRef，修改一下第二个参数"),a("code",[e._v("const state = toRef(obj,'name')")]),e._v(","),a("code",[e._v("const state = toRef(obj,'age')")])]),e._v(" "),a("li",[e._v("当需要修改的数据属性比较多的时候，可以使用"),a("code",[e._v("toRefs")]),e._v("方法")])]),e._v(" "),a("p",[e._v("toRef 和 ref 的区别")]),e._v(" "),a("ul",[a("li",[e._v("ref 本质上是复制了一份原始数据，将复制的那个对象修饰为一个响应式的对象，对响应式对象的修改不会影响到原始的数据")]),e._v(" "),a("li",[e._v("toRef 本质上是对原始数据地址的引用，对使用 toRef 创建的对象进行修改是会直接影响到原始数据的。")])]),e._v(" "),a("h3",{attrs:{id:"torefs"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#torefs"}},[e._v("#")]),e._v(" toRefs")]),e._v(" "),a("blockquote",[a("p",[e._v("使用 toRefs 和 toRef 一样都是引用类型的响应式数据")])]),e._v(" "),a("p",[e._v("使用 toRefs 只需要传递一个参数，就是需要变成响应式对象的原始对象，这样就会默认的将这个对象的所有属性都变成响应式对象")]),e._v(" "),a("p",[e._v("demo")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("  const obj = {name:'Henry',age:22}\n  const state = toRefs(obj)\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br")])]),a("p",[e._v("toRefs、ref、toRef 的区别")]),e._v(" "),a("ul",[a("li",[e._v("toRefs 相对于 toRef 可以更方便的将一个对象的所有属性都变成引用类型的响应式数据")]),e._v(" "),a("li",[e._v("toRefs 和 ref 一样都是将一个对象变成响应式数据，区别在于对于原始数据而言 toRefs 是引用原始数据，ref 是复制原始数据。")]),e._v(" "),a("li",[e._v("使用 toRef，和 toRefs 的目的都是为了性能优化，真正企业开发中使用的最多的还是 ref 和 reactive")])]),e._v(" "),a("h3",{attrs:{id:"customref"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#customref"}},[e._v("#")]),e._v(" customRef")]),e._v(" "),a("blockquote",[a("p",[e._v("自定义 Ref 接口函数，我们可以自动以哪些数据需要响应式，哪些数据的变化会触发界面的更新")])]),e._v(" "),a("p",[e._v("具有两个形参，"),a("code",[e._v("track")]),e._v("和"),a("code",[e._v("trigger")])]),e._v(" "),a("ul",[a("li",[e._v("track"),a("br"),e._v("\n告诉 Vue 这个参数是需要追踪的")]),e._v(" "),a("li",[e._v("trigger"),a("br"),e._v("\n告诉 Vue 触发界面的更新")])]),e._v(" "),a("p",[e._v("demo")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("  function myRef(value){\n    return customRef((track, trigger)=>{\n      return {\n        get:()=>{\n          track()  // 追踪数据，即这个数据的变化会影响原始的数据\n          return value\n        },\n        set:(newVal)=>{\n          value = newVal\n          trigger() //  触发界面UI的更新\n          return value\n        }\n      }\n    })\n  }\n  export default {\n    setup(){\n      const state = myRef(18)\n      function change(){\n        state.value++\n      }\n      return {state,change}\n    }\n  }\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br"),a("span",{staticClass:"line-number"},[e._v("10")]),a("br"),a("span",{staticClass:"line-number"},[e._v("11")]),a("br"),a("span",{staticClass:"line-number"},[e._v("12")]),a("br"),a("span",{staticClass:"line-number"},[e._v("13")]),a("br"),a("span",{staticClass:"line-number"},[e._v("14")]),a("br"),a("span",{staticClass:"line-number"},[e._v("15")]),a("br"),a("span",{staticClass:"line-number"},[e._v("16")]),a("br"),a("span",{staticClass:"line-number"},[e._v("17")]),a("br"),a("span",{staticClass:"line-number"},[e._v("18")]),a("br"),a("span",{staticClass:"line-number"},[e._v("19")]),a("br"),a("span",{staticClass:"line-number"},[e._v("20")]),a("br"),a("span",{staticClass:"line-number"},[e._v("21")]),a("br"),a("span",{staticClass:"line-number"},[e._v("22")]),a("br"),a("span",{staticClass:"line-number"},[e._v("23")]),a("br"),a("span",{staticClass:"line-number"},[e._v("24")]),a("br")])]),a("h3",{attrs:{id:"ref-获取元素"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ref-获取元素"}},[e._v("#")]),e._v(" ref 获取元素")]),e._v(" "),a("blockquote",[a("p",[e._v("Vue2.x 是可以通过$refs.元素的 ref 值来获取一个 DOM 元素的，Vue3 也可以使用 ref 来获取元素")])]),e._v(" "),a("p",[e._v("Vue3.x 和 Vue2.x 使用 ref 的不同")]),e._v(" "),a("ul",[a("li",[a("p",[e._v("Vue2.x"),a("br"),e._v("\nDOM 元素设置一个 ref 属性值，然后通过$ref.refname 可以获取到指定的 DOM 元素")])]),e._v(" "),a("li",[a("p",[e._v("Vue3.x\nDOM 元素设置一个 ref 属性值，在 setup()函数设置一个 ref 变量，变量名和 ref 绑定的值名字一致，且 ref 的值为 null")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("  <template>\n    <div class=\"refs\">\n      <h3 ref=\"box\">Ref获取元素</h3>\n    </div>\n  </template>\n\n  export default {\n    /*\n      Vue的 ComponsitionApi 将生命周期函数也给抽离出来了  抽离出来的名字都是以onMountend onCreated这样\n        生命周期函数传递一个回调函数，  回调函数里面写的内容会在ComponsitionAPI转成Option Api的过程中注入到各自的生命周期内部\n    */\n    setup(){\n      /*\n        ref和Vue2.x一样也是可以用来获取页面的HTML元素，  需要注意两点：\n          ref的变量名要和html的ref属性值是同一个名字\n          ref在设置值的时候要给 值为 null\n      */\n      const box = ref(null)\n      onMounted(()=>{\n        console.log('mounted',box.value)  //  mounted <h3 data-v-f9d94688>​Ref获取元素​</h3>​\n      })\n      console.log('componsition',box.value)  // null\n      return {box}\n    }\n  }\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br"),a("span",{staticClass:"line-number"},[e._v("10")]),a("br"),a("span",{staticClass:"line-number"},[e._v("11")]),a("br"),a("span",{staticClass:"line-number"},[e._v("12")]),a("br"),a("span",{staticClass:"line-number"},[e._v("13")]),a("br"),a("span",{staticClass:"line-number"},[e._v("14")]),a("br"),a("span",{staticClass:"line-number"},[e._v("15")]),a("br"),a("span",{staticClass:"line-number"},[e._v("16")]),a("br"),a("span",{staticClass:"line-number"},[e._v("17")]),a("br"),a("span",{staticClass:"line-number"},[e._v("18")]),a("br"),a("span",{staticClass:"line-number"},[e._v("19")]),a("br"),a("span",{staticClass:"line-number"},[e._v("20")]),a("br"),a("span",{staticClass:"line-number"},[e._v("21")]),a("br"),a("span",{staticClass:"line-number"},[e._v("22")]),a("br"),a("span",{staticClass:"line-number"},[e._v("23")]),a("br"),a("span",{staticClass:"line-number"},[e._v("24")]),a("br"),a("span",{staticClass:"line-number"},[e._v("25")]),a("br")])])])]),e._v(" "),a("h3",{attrs:{id:"声明周期函数"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#声明周期函数"}},[e._v("#")]),e._v(" 声明周期函数")]),e._v(" "),a("blockquote",[a("p",[e._v("setup 函数，是在 beforecreate 钩子之前完成的，所以我们要写其他的生命周期函数需要通过 vue3 给的声明周期 API 来复写一下")])]),e._v(" "),a("p",[e._v("demo")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("  import {ref,onMounted} from 'vue'\n  export default {\n    setup(){\n      const box = ref(null)\n      onMounted(()=>{\n        console.log('mounted',box.value)  //  mounted <h3 data-v-f9d94688>​Ref获取元素​</h3>​\n      })\n      console.log('componsition',box.value)  // null\n      return {box}\n    }\n  }\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br"),a("span",{staticClass:"line-number"},[e._v("10")]),a("br"),a("span",{staticClass:"line-number"},[e._v("11")]),a("br")])]),a("p",[e._v("vue3 为我们提供了完整的生命周期函数（类似于生命周期钩子），如：onMounted 等等，传递一个回调函数")]),e._v(" "),a("p",[e._v("原理：")]),e._v(" "),a("ul",[a("li",[e._v("通过这些钩子函数，会在 Componsition API 注入 Option API 的过程中分别一一对应的注入 mounted、created 等等生命周期内部去")]),e._v(" "),a("li",[e._v("可以简单的理解是 ComponsitionAPI 将生命周期函数抽离出来了")])])])}),[],!1,null,null,null);s.default=n.exports}}]);