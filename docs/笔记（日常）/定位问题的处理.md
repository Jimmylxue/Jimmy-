---
title: 定位功能的处理与扩展
date: 2021-02-17
sidebar: auto
categories:
  - 小技巧
tags:
  - 前端
  - 日常
---

## 定位问题的处理

定位问题过去一直都很困扰我，不知道应该怎么解决，但是今天在写毕设的时候我终于是研究出来了，可能说的不够准确的，但是在我的理解和操作下是可以成功的获取定位的。

#### 定位的本质：IP 地址

> 在我的理解中，定位的本质就是根据 ip 地址来进行定位的，要定位就需要联网，联网就一定是有一个 ip 地址，我们就可以根据这个 ip 地址来获取这个 ip 所在的地区。

#### 需要获取的数据

- ip 地址（通过 JS 获取本机的 ip 地址）
- 根据 ip 地址来获取 ip 地址的地理位置（聚合数据又提供免费的接口）

#### JS 获取 ip 地址

我在网上查了很多的方法，大部分的接口都和谐了，亲测搜狐的接口任然是可以使用的

```javascript
<script src="http://pv.sohu.com/cityjson?ie=utf-8"></script>
<script>
    localStorage.setItem('ip', returnCitySN['cip'])
	// returnCitySN['cip'] ip地址
    // returnCitySN["cname"] ip地址的城市
</script>
```

细节：

- 这里我是在 vue 中使用的，vue 的 public 文件夹下又 index.html，我们就在 index.html 中操作即可，将获取的 ip 存到浏览器中。
- 亲测`returnCitySN["cname"]`获取的城市不准确，我在福州，他给我的值是在广州，所以还是老老实实的在聚合数据中获取把

#### 根据 ip 获取城市

到这一步就很简单了，直接访问聚合数据接口就行了

```javascript
// 定位  本质上是根据ip定制进行定位
this.$jsonp(
	`http://apis.juhe.cn/ip/ipNew?ip=${localStorage.getItem(
		// 前面存的IP地址
		'ip'
	)}&key=你申请的key`
	// "http://pv.sohu.com/cityjson?ie=utf-8"
).then(res => {
	if (res.resultcode == 200) {
		// res中就含有数据
	}
})
```

### 扩展

其实 ip 地址和城市我们是可以做很多很多的事情，如：

- 基本的定位
- 打卡系统，指定的 ip 才可以打卡成功， （这个是我公司打卡系统）
