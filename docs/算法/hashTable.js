class hashTable {
  constructor() {
    this.table = []
  }
  // 获取唯一的key值转换的数值， 真正的操作肯定不会这么的简单的 但是原理就是这么一个原理
  calcuteHash(key) {
    let hash = 0
    for (let s of key) {
      hash += s.charCodeAt()
    }
    return hash % 10
  }
  get(key) {
    let hash = this.calcuteHash(key)
    return this.table[hash]
  }
  put(key, value) {
    let index = this.calcuteHash(key)
    this.table[index] = value
  }
}

/*
  因为数组的key值是只能是number类型的  所以我们就只能根据特殊的算法来获取
    将一个字符串转化成唯一的数值，再以这个数值来作为数组的索引
*/
