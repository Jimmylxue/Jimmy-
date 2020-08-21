let arr = [3, 44, 13, 1, 8, 9, 7, 1, 2]

/*
  冒泡排序  复杂度 O*N^2
    两两比较，如果和预期不一样就这两个交换一下位置  
*/

for (let i = 0; i < arr.length; i++) {
  for (let j = i + 1; j < arr.length; j++) {
    if (arr[i] > arr[j]) {
      let temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }
  }
}
console.log(arr) // [1, 1,  2,  3, 7,8, 9, 13, 44    ]
