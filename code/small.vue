<template>
  <div class="small"></div>
</template>

<script>
// 背景画布
let background = {
  width: 5,
  height: 5,
}

let arr = new Array()
// 玩家初始位置
let userY = 2

// 打印出画布数组
for (let i = 0; i < background.height; i++) {
  let col = new Array()
  for (let j = 0; j < background.width; j++) {
    col[j] = '🚥'
  }
  arr[i] = col
}

arr[background.height - 1][userY] = '😁'

window.start = function () {
  console.log('请先点击一下浏览器页面，2秒之后开始游戏')
  setTimeout(() => {
    console.clear()
    let starFlash = setInterval(() => {
      arr.pop() // 清楚最顶端的一行
      if (arr[arr.length - 1][userY] == '😂') {
        // 判断是否已经 两个图标是否撞在一起
        arr[arr.length - 1][userY] = '🎇'
        new Audio('https://img.lookroot.cn/music/12233.wav').play()
        setTimeout(() => {
          clearInterval(starFlash)
          console.clear()
          console.log('%cOVER', 'color: red;font-size:48px')
        }, 100)
      } else {
        arr[arr.length - 1][userY] = '😁'
        arr.unshift(new Array(background.width).fill('🚥')) //  在最顶端创建一行无障碍的空背景画布
        arr[0][parseInt(Math.random() * background.width)] = '😂' // 随机创建一个障碍物
        // 打印出画布
        let endString = ''
        for (let i = 0; i < arr.length; i++) {
          let str = ''
          for (let j = 0; j < arr[i].length; j++) {
            str += arr[i][j]
          }
          endString += str + '\n'
        }
        console.clear()
        console.log(endString)
      }
    }, 200)
  }, 2000)
}

window.onkeydown = (e) => {
  if (e.keyCode == 37 && userY > 0) {
    userY--
  } else if (e.keyCode == 39 && userY < background.width - 1) {
    userY++
  }
}
export default {
  mounted() {
    console.log(`输入 start() 即可开始游戏`)
  },
}
</script>

<style>
</style>