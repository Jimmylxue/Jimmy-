## Vue3.0

Vue3.0 和 Vue2.x 之间并不是推翻重来，有很多地方还是集成了 Vue2.x 的，所以学会 Vue3.0 的前提是对 Vue2.x 有一定的了解  
Vue3.0 预计在 2021 年会正式在公司启用，现在就算已经发布了正式版了，但是一些周边环境并没有完全适配，一些库和插件还没有兼容。

### Vue3.0 优势

- diff 算法的优化  
  Vue3.0 优化了 diff 算法，Vue 之所以能够完成双向数据绑定，就是通过前后虚拟 DOM 不断的进行比较，只要一有不同就立即通知 Watcher 进行更新。Vue3 优化的点在于通过算法减少了前后比较的次数，比较次数的减少，就间接的提升了性能。

  1. Vue2.xdiff 算法
     ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200927200826958.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)
  2. Vue3.0diff 算法
     ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200927201028182.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

  可见，两者之间的比较次数就减少了，写死的 dom 在进行 diff 算法的时候是不会进行比较的，并且比较还有分类型，比如类是动态的，text 是动态，点击事件是动态的，只比较前后指定的 flag 类型，就更加进一步的减少了前后比较的次数。提升了性能。

- 静态提升  
  在 Vue2.x 中，一个数据每次刷新的时候都会被重新的渲染到页面上（不管有没有发生变化），Vue3 就是根据这点判断有没有发生改变，如果是静态的数据会直接提升道最前面，等到页面 render 渲染的时候直接拿来用，就不重新创建渲染了

- 监听缓存  
  这个主要是发生在一些点击事件或其他事件上面，如果绑定的函数名是一样的就不用重新的绑定，还是用原来的那个绑定的即可，这个就是通过 diff 算法的 flag 绑定类型来判断的。
