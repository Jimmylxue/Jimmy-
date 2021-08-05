---
title: nodemon核心实现
date: 2021-08-05
sidebar: auto
categories:
  - node
tags:
  - 源码
---

## nodemon 核心实现

> nodemon 是一个非常好用的一个工具，因为 node 命令是不会更新的，每次当我们修改了一些代码，是不会按照的最新的代码去执行的，执行的还是上次执行命令时的代码。nodemon 这个工具最好用的地方就是会实时更新，非常方便于我们在开发阶段的时候

这个也是在 B 站上看一个大佬的视频，然后自己跟着造轮子，记录分享一下心得

这里想说的是，很多人对`node`有理解上的错误，以为`node`就是一个做服务器的，其实这个是不对的，服务器在我眼里只是它的一个很厉害的技能，我觉得更重要的是它为前端开发现在百花齐放的生态的铺路石，各种好用的工具插件等等，都是基于 node，比如现在这个`nodemon`工具！

#### nodemon 做的事情

简单的理解 nodemon 就是监听文件变化，然后重新为我们执行命令，在服务器端体现的就是会重新开启端口监听

- 监听文件的变化
- 自动更新执行命令

#### 实现需要的技术点

##### chokidar

> 这个库我们可以用于监听文件的变化，只要有文件发生改变，我们都可以使用这个库来获取到

其实监听文件变化就 node 的自带的文件系统 fs 库的`watchFile`方法就可以监听，但是因为其有一些兼容性的问题，所以一般监听文件的变化就使用`chokidar`这库即可，API 也非常的简单

```javascript
const chokidar = require("chokidar");
chokidar.watch("main.js").on("all", (event, path) => {
  console.log(event, path);
});
/*
	使用 watch('文件名').on('all',()=>{})的方式就可以监听文件的变化
		只要文件发生了变化就会自动的执行回调函数内部的内容
*/
```

##### child_process

> child_process 是 node 自带的一个子进程的一个库，使用里面的`exec`和`spawn`方法可以创建子进程，基于子进程我们就可以执行 node 命令

- `exec`的 api 更简单，但是性能等等是更不好的 所以更多的是使用 spawn，

  第一个参数：要执行的命令 如这里是 `node main.js`

  第二个参数是回调函数,分别携带的是错误 和 输出

  ```javascript
  // 执行 node main.js 命令
  exec("node main.js", (err, stdout) => {
    console.log(err, stdout);
  });
  ```

- `spawn` 一般都是使用 spawn 创建子进程

  第一个 node 表示 执行 node 命令

  第二个思数组 表示可以执行的具体的文件 这里是 main.js 拼起来就是 node main.js

  第三个参数 设置输入和输出

  ​ `process.stdin`：输入

  ​ `process.stdout`：输出

  ​ `process.stderr`： 错误处理

  ```javascript
  let childProcess = null;
  childProcess("node", ["main.js"], {
    stdio: [process.stdin, process.stdout, process.stderr],
  });

  childProcess && childProcess.kill();
  // 当创建子进程的时候都会返回一个子进程对象，我们要删除责怪子进程可以使用子进程自身的 kill() 方法删除掉这个子进程
  ```

技术点用到的就是上面两个，我们就可以自己实现一个超简单的版本的`nodemon`

#### 详细代码

```javascript
const chokidar = require("chokidar");
const { spawn } = require("child_process");

let childProcess;
let timer = null;

chokidar.watch("main.js").on("all", (event, path) => {
  console.log(event, path);
  debounce();
});

function debounce() {
  // 防抖
  timer && clearTimeout(timer);
  timer = setTimeout(() => {
    console.log("nodemon");
    childProcess && childProcess.kill();
    childProcess = spawn("node", ["main.js"], {
      stdio: [process.stdin, process.stdout, process.stderr],
    });
  }, 800);
}
```

就上述的几行就可以实现了，这里优化还加了防抖特性，这个也是防抖的最佳使用场景，为的就是方式用户疯狂的按保存从而一直创建子进程。

#### 总结

这个轮子也不是自己造的，是看着 B 站的视频之后也学着造的，但是造下来了之后让我对 node 又有了新的理解，node 真的好强大，原来一直在用的工具通过 node 再造出来吗，有种不一样的感觉，真的很棒！之后的目标是打算学习一下 nest.js 和 docker
