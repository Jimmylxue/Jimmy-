---
title: Vitel工作原理与手写
date: 2021-07-11
sidebar: auto
categories:
  - 前端
tags:
  - 架构
  - 源码
---

## Vite 的理解与手写一个 Vite

> Vite 是和 vue3 一起发布的一个重磅工具，也是尤大大扬言可能会取代 webpack 的一个强大的工具。所以是前端的小伙伴们一定要学习和了解的一个东西

### Vite 的原理和工作模式

对我个人来说，vite 给我的第一感觉就是 -- 快！！相比于传统的 webpack，少了一段打包的过程，基本是属于一个秒开的状态的。我们再来对比一下使用 webpack 和 vite 相比两者控制台（network）的区别。

- webpack![在这里插入图片描述](https://img-blog.csdnimg.cn/20210711183342584.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70)似乎只有一个 app.js 是和打包相关的，点开可以看到这个是一个巨长无比的 js 文件代码，我大胆猜测可能打包之后行程的代码就是这个 app.js

- vite

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20210711183521374.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70)

  可以看到，vite 发起了多次请求，分别去加载各个文件，从 main.js 开始，需要什么就加载了什么。

再看 vue3 的 index.html 代码，他的引入了一个`type = module`的 main.js 文件，这个就是 vite 的关键，浏览器现在已经支持了`type=module`方式来实现模块话，这样的好处是：

- 在 main.js 里面写代码可以直接以 es-module 的形式去写 且不需要打包
- 开发阶段不需要打包,不管项目多大 速度都是最快的

当然除此之外 vite 还有做的就是会处理裸模块，就像`import xx from 'vue'` vue 这里没有给路径，所以是个裸模块，vite 就会处理将这个路径改成`node_modules`里面或者是 vite 服务器里面的文件路径，还有就是在请求如`app.vue`这样文件的时候，将 vue 文件解析和转换成 js 文件返回给前端，就能正确的处理了。

### 手写一个 Vite 服务器

> 写之前我们需要知道两个库，这两个库在下载 vue 的时候就会一起下载的，分别是：
>
> - `@vue/compiler-sfc`:用于解析 vue 文件中的 script 部分
> - `@vue/compiler-dom`:用于解析 vue 文件中的 template 部分

#### 处理裸模块

> 创建一个工具函数，方便复用. 主要就是为了处理裸模块，当遇到像 from 'vue' 这样的裸模块的时候，就重写一下路径

```javascript
function rewriteFileName(filename) {
	// 这个 filename 就是请求的 路径全称 如： import {createApp} from 'vue'
	return filename.replace(/ from ['"](.*)['"]/g, (s1, s2) => {
		// s1表示进入匹配的原字符 s2表示原子组的字符
		if (s2.startsWith('/') || s2.startsWith('./') || s2.startsWith('../')) {
			return s1
		} else {
			// 裸模块  就是像 vue 这样的模块 我们重新 然后让到 node_modules 里面去找
			return ` from '/@modules/${s2}'`
		}
	})
}
```

#### 简单封装异步读文件方法

> 这里可以直接选择使用 `fs.readFileSync` 这个同步方法，但是文件如果比较大会造成阻塞，所以还是封装个异步方法比较好

```javascript
const path = require('path')
function getFile(url) {
	return new Promise((reslove, reject) => {
		fs.readFile(path.join(__dirname, url), 'utf-8', (err, data) => {
			reslove(data)
		})
	})
}
```

#### 在路由判断中处理.vue 文件

> .vue 文件是是核心我们需要处理的地方，就需要用到前面提到的两个库了

```javascript
if (url.indexOf('.vue') > -1) {
	// SFC 请求
	// url 有可能是单纯的 .vue  也有可能是 .vue?type=xxx 带有查询参
	let file = await getFile(url.split('?')[0])
	let ret = compilerSFC.parse(file)
	if (!query.type) {
		// 没有查询参
		// 获取脚本部分的内容
		let scriptContent = ret.descriptor.script.content
		// 替换迷人导出为常量,方便日后修改
		let script = scriptContent.replace('export default ', 'const __script = ')
		ctx.type = 'application/javascript'
		ctx.body = `
            ${rewriteFileName(script)}
            // 解析template
            import {render as __render} from '${url}?type=template'
            __script.render = __render
            export default __script`
	} else if (query.type === 'template') {
		// 有查询参
		const tpl = ret.descriptor.template.content
		// console.log('tpllllllll', tpl)
		// console.log(compilerDOM.compile(tpl))
		const render = compilerDOM.compile(tpl, { mode: 'module' }).code
		ctx.type = 'application/javascript'
		ctx.body = rewriteFileName(render)
	}
}
```

#### 完整代码

```javascript
const koa = require('koa')
const fs = require('fs')
const path = require('path')
const compilerSFC = require('@vue/compiler-sfc') // 用于解析 vue文件的 script 部分
const compilerDOM = require('@vue/compiler-dom') // 用于接续 vue文件中的 template 部分

const app = new koa()

app.use(async ctx => {
	const { url, query } = ctx.request
	if (url === '/') {
		// 处理的是首页
		let res = await getFile('./index.html')
		// console.log(res)
		ctx.type = 'text/html'
		ctx.body = res
	} else if (url.endsWith('.js')) {
		// 以js文件结尾 处理js文件加载
		ctx.type = 'application/javascript'
		let res = await getFile(url)
		ctx.body = rewriteFileName(res)
	} else if (url.startsWith('/@modules/')) {
		// 裸模块架子啊处
		let modeName = url.replace('/@modules/', '') // 重新获取裸模块名字 如 vue
		let search = path.join(__dirname, '../../../node_modules', modeName)
		let suffix = require(path.join(search, '/package.json')).module
		ctx.type = 'application/javascript'
		let files = fs.readFileSync(path.join(search, suffix), 'utf8')
		ctx.body = rewriteFileName(files)
	} else if (url.indexOf('.vue') > -1) {
		// SFC 请求
		// url 有可能是单纯的 .vue  也有可能是 .vue?type=xxx 带有查询参
		let file = await getFile(url.split('?')[0])
		let ret = compilerSFC.parse(file)
		if (!query.type) {
			// 没有查询参
			// 获取脚本部分的内容
			let scriptContent = ret.descriptor.script.content
			// 替换迷人导出为常量,方便日后修改
			let script = scriptContent.replace('export default ', 'const __script = ')
			ctx.type = 'application/javascript'
			ctx.body = `
                ${rewriteFileName(script)}
                // 解析template
                import {render as __render} from '${url}?type=template'
                __script.render = __render
                export default __script
            `
			console.log(compilerSFC.parse(file))
		} else if (query.type === 'template') {
			// 有查询参
			const tpl = ret.descriptor.template.content
			const render = compilerDOM.compile(tpl, { mode: 'module' }).code
			ctx.type = 'application/javascript'
			ctx.body = rewriteFileName(render)
		}
	}
})

function rewriteFileName(filename) {
	return filename.replace(/ from ['"](.*)['"]/g, (s1, s2) => {
		// s1表示进入匹配的原字符 s2表示原子组的字符
		if (s2.startsWith('/') || s2.startsWith('./') || s2.startsWith('../')) {
			return s1
		} else {
			// 裸模块  就是像 vue 这样的模块 我们重新 然后让到 node_modules 里面去找
			return ` from '/@modules/${s2}'`
		}
	})
}

function getFile(url) {
	return new Promise((reslove, reject) => {
		fs.readFile(path.join(__dirname, url), 'utf-8', (err, data) => {
			reslove(data)
		})
	})
}

app.listen(666, () => {
	console.log('server is running on port 666!')
})
```

### 总结

Vite 的主要工作原理就是使用`type=module`的 script 标签，这个 script 标签使用 es6 Import 的方式引入文件是可以发起请求的，所以不断的按需向服务器发起请求即可，这种方式是无论如何都比 webpack 打包的方式要快很多很多的。

当然代码我也是跟着村长老师打下来的，自己算是理解了核心思想了，很有收获，多打几遍直到完全理解思想了之后就会更有进步！ 加油！打工人！
