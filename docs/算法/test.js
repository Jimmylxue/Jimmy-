let nums = [3, 2, 4]
let target = 6
let obj = {}
var twoSum = function(nums, target) {
  let temp = []
  nums.forEach((item, index) => {
    if (String(item) in obj) {
      temp.push(obj[item])
      temp.push(index)
    }
    obj[target - item] = index
  })
  let arr = []
  for (let i = 0; i < temp.length; i++) {
    let twoNum = 0
    for (let j = i + 1; j < temp.length; j++) {
      if (twoNum == temp[j]) {
        twoNum++
      }
    }
    if (twoNum == 0) {
      arr.push(temp[i])
    }
  }
  return arr
}

let res = twoSum(nums, target)

do {} while (condition)

console.log(res)
