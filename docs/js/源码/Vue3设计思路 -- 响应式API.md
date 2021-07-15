---
title: Vue3设计思路 -- 响应式API
date: 2021-07-15
sidebar: auto
categories:
  - javascript
tags:
  - 前端
  - 源码
---

## Vue3 设计思路 -- 响应式 API

> vue3 基于推出了一套基于 ES6 Proxy 代码的全新`composition API`，这套 API 相比与原来的`option API`更加的规范，但是也是做了一些兼容性的让步

#### `compositionAPI`优势主要体现在:

- `proxy`拥有着更好的性能，因为原来的响应式是通过`Object.defineProperty`来实现的，而这个操作是非常的消耗性能的

- 原来的`optionAPI`是将各个内容块进行分开，如 data(){},method：{}生命周期等等，如果一个组件比较大的情况下，我们通常的逻辑是现在 data 定义数据，可能再去生命周期写事件，然后再去 method 里面写方法，就会面临反复横跳的问题，非常的不利于开发

- `optionAPI`因为将各个块都分开，可能在开发小项目的时候会非常爽，但是实际上有弊端，一方面是前面说的反复横跳不便于维护，另外一方面是对`TS`的支持太弱了，因为开发的时候非常的依赖`this`，而`this`是一个可变的东西，所以在`typeScript`上面就有着天然的劣势。

- `composition API`就是完全的函数式的编程方式，配合上`reactive`响应式，可以非常好的实现逻辑的复用，甚至是不同项目之间的复用。

  ```javascript
  const { createApp, reactive } = Vue
  // useState 就可以写在其他的单文件里面 方便日后复用，这里写在一起主要是为了体现逻辑的抽离
  function useState() {
  	// 状态和方法 等等都写在一起，告别了反复横跳
  	const state = reactive({
  		count: 1,
  	})
  	setInterval(() => {
  		state.count++
  	}, 1000)
  	return state
  }

  const app = createApp({
  	setup() {
  		const state = useState()
  		return { state }
  		console.log('hello world')
  	},
  })

  app.mount('#app')
  ```

- 因为 vue3 的响应式是基于`Proxy`的，所以为了这套更优雅的代码也不得不做出让步，没有办法兼容不支持`Proxy`的浏览器，如果浏览器不支持`Proxy`，就只能使用 Vue2 了

#### 响应式实现的过程及原理

> 首先要明白的是能实现响应式其实靠的就是`Proxy`，其可以让我们知道何时触发了获取和修改事件。

##### 几个关键的名词

- `effect` 副作用函数
- `track` 绑定值与副作用函数
- `trigger`指定值的所有副作用函数执行

##### 逻辑链路

响应式本质上是有在内存中存一种数据结构，类似于`{state:{title:[effect,effect]}}`,其实`efftec`就是一个个的可以触发页面更新的函数，只要当这里的 title 更新了，就去遍历 title 对应的副作用数组，分别去触发即可实现页面的响应式更新

##### 依赖收集与触发

整体思路就是：第一次初始化的时候就会触发第一次的`effect`，`effect`触发页面第一次更新，因为是`proxy`数据第一次更新只要有拿响应式对象的值就会触发`track`（依赖收集），之后我们修改响应式对象的值又会触发`Proxy`的`set`，`set`再触发`trigger`更新页面页面数据

非常的绕，但是多看代码多理解几次就能理解了，要手写下来确实是需要有很深的功力，我是肯定写不下来的，只能跟着视频操作边理解变操作的写下来，确实对依赖收集的概念有了很深的理解

##### 上代码 -- 这里主要要从 reactive 函数开始看

```javascript
function reactive(obj) {
	const proxy = new Proxy(obj, {
		get(target, key) {
			/*
        render函数第一次渲染的时候会获取引用的值 所以第一次渲染就会走到这个 get 方便我们开始做依赖收集
      */
			track(target, key) // 触发依赖收集
			return target[key]
		},
		set(target, key, value) {
			target[key] = value
			console.log('proxy', key)
			/*
        修改的时候，去依赖收集的数据结构中 找到对应的key 把 key 对应的 更新函数都执行一遍，这就触发了页面的响应式
      */
			trigger(target, key)
			// app.update()
		},
		/*
      proxy 的优势出了可以监听get 和 set之外 还是可以监听另外十多种情况，这个Object.defineProperty()做不到的
        这个是语言层面上的升级
    */
	})
	return proxy
}

// 副作用函数 -- 这里是为了暂时的存放每一个副作用函数，当副作用函数已经和依赖关系建立好了之后再清除空间
const effectStack = []

function effect(fn) {
	const eff = function() {
		try {
			effectStack.push(eff)
			fn() // 执行 最重要的 render函数 页面才更新
		} finally {
			effectStack.pop()
		}
	}
	eff()
	return eff
}

// 依赖收集函数
/*
  依赖收集的数据结构是这样的
  {
    state:{
      title:[effect,effect] // effect 对应的就是一个个的更新函数，每个响应式对象的值都是存着更新函数的数组，当这个值变化的时候遍历执行数组里面的一个个effect函数
    }
  }
*/
const trackMap = {}

function track(target, key) {
	/* 
    effectStack 是临时存放副作用函数的地方，每次关系建立完成之后就会再清空掉，所以获取数组的最后一个元素即可
  */
	const effect = effectStack[effectStack.length - 1]
	if (effect) {
		let map = trackMap[target]
		if (!map) {
			map = trackMap[target] = {}
		}

		let deps = map[key]
		if (!deps) {
			deps = map[key] = []
		}

		// 将副作用函数放入 deps
		if (deps.indexOf(effect) === -1) {
			deps.push(effect)
		}
	}
}

// 触发 指定的 target 下指定的key 下所有的 副作用函数都执行一遍
function trigger(target, key) {
	// 数据结构类似 {state:{title:[effect,effect]}}
	const map = trackMap[target]
	if (map) {
		const effects = map[key]
		effects.forEach(effect => effect())
	}
}

function createApp(config) {
	let app = {}
	app.mount = function(id) {
		this.rootDOM = document.getElementById(id)

		if (!config.render) {
			config.render = this.compile(this.rootDOM.innerHTML)
		}

		if (config.setup) {
			this.setupCtx = config.setup()
		} else {
			this.dataCtx = config.data()
		}

		this.proxy = new Proxy(this, {
			get(target, key) {
				if (key in target.setupCtx) {
					return target.setupCtx[key]
				} else {
					return target.dataCtx[key]
				}
			},
			set(target, key, value) {
				if (key in target.setupCtx) {
					target.setupCtx[key] = value
				} else {
					target.dataCtx[key] = value
				}
			},
		})

		// update 函数就是指定的 副作用函数
		this.update = effect(() => {
			// 这里会去 proxy 拿值 拿值就会触发 get get触发 收集依赖 这样就将整个环节顺滑的串联起来了
			const el = config.render.call(this.proxy)
			this.rootDOM.innerHTML = ''
			this.rootDOM.appendChild(el)
		})

		this.update()

		return this
	}
	app.compile = function(template) {
		return function() {
			const h3 = document.createElement('h3')
			h3.textContent = this.title
			return h3
		}
	}
	return app
}
```

#### 总结

##### vue2 的响应式和 vue3 的响应式的区别

- 底层使用的 API 不用，vue2 是使用`Object.definePorperty()`，vue3 使用的是`Proxy`
- vue2 的`Object.definePorperty()`首先是会先去遍历这个对象当前的 key，导致对象如果很深很大，速度就比较慢。`Proxy`是个懒处理，如果用户不去读，就永远不做处理，这个是比较聪明的，不会浪费性能。
- vue2 是依赖关系是通过很多的`watcher`，`dep`等等额外的东西，导致内存占用会比较大，vue3 则是使用一个更优雅的数据结构。vue3 没有 wather
- vue3 支持`map`、`set`这样的数据类型

`reactive`响应式就是通过`proxy`实现的，第一次 render 的时候有涉及到响应式的数据就会进入`proxy`的`get`函数，接着触发收集依赖，之后修改会触发`set`函数，再触发执行副作用函数，整个过程还是相对比较丝滑的。

当然，真正的尤大大的`reactive`做的事情可是非常非常多的，这个例子只是一个极其简单的一个阉割版，阉割版虽然不全但是思路上还是很有助于我们理解的，可以很好的方便我们应对面试官了。
