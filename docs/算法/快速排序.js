let arr1 = [3, 44, 13, 1, 8, 9, 7, 1, 2]
let t = 0

// 快速排序 复杂度是 O*lgN
//  我们可以理解 O*n的复杂度增长非常非常快 那么 O*lgN复杂度增长的就非常非常的慢

/*
  缺点：  空间占用的多 占用了很多的变量 
*/

function quickSort(arr) {
  if (arr.length < 1) {
    return arr
  }
  let flag = arr[0]
  let left = []
  let right = []
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < flag) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }

  return [...quickSort(left), flag, ...quickSort(right)]
}

console.log(quickSort(arr1))
