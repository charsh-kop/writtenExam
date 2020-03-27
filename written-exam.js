// 数组去重
var a = [1,2,2,3,1,4];
// 方法1
console.log(Array.from(new Set(a)))
// 方法2
a.reduce((acc, curr) => {
    if(acc.indexOf(curr) === -1) {
        acc.push(curr)
    }
    return acc
}, [])

// 统计数组元素出现次数
var list = ['a','b','c','a','b','a'] 
var res = list.reduce((acc, curr) => {
    if(curr in acc) {
        acc[curr] ++
    } else {
        acc[curr] = 1
    }

    return acc
}, {})
console.log(res);

// 两数之和 start =========================================================================
// 找出数组中相加后等于target的两个元素，输出他们的index
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// 哈希表法
var twoSum = function(nums, target) {
    let targetMap = new Map();
    for(let i=0; i<nums.length; i++) {
        let dif = target - nums[i];
        if(targetMap.has(dif)) {
            return [targetMap.get(dif), i]
        }
        targetMap.set(nums[i], i)
    }
};
// 如果是有序数组  
// 对撞指针法: 在数组左右两侧加一个指针，各自往中间靠拢，相加小于target就左指针往右走，大于target就右指针往左走
var twoSum = function(nums, target) {
    let leftPointer = 0, rightPointer = nums.length-1;
    while(leftPointer < rightPointer) {
        if(nums[leftPointer] + nums[rightPointer] === target) {
            return [leftPointer, rightPointer]
        } else if(nums[leftPointer] + nums[rightPointer] < target) {
            leftPointer ++;
        } else {
            rightPointer --;
        }
    }
    return []
};

// 两数之和 end =========================================================================

/**
 * 按照如下要求实现Person 和 Student 对象
 * a)Student 继承Person
 * b)Person 包含一个实例变量 name， 包含一个方法 printName
 * c)Student 包含一个实例变量 score， 包含一个实例方法printScore
 * d)所有Person和Student对象之间共享一个方法
 */
class Person {
    constructor(name) {
        this.name = name
    }
    printName() {
        console.log(this.name)
    }
    commn() {
        console.log('common func')
    }
}

class Student extends Person{
    constructor(name, score) {
        super(name);
        this.score = score
    }
    printScore() {
        console.log(this.score)
    }
}
let student = new Student('a');
let person = new Person('b');
console.log(student.common === person.common) // true

/**
 * 反转单链表  只有next，没有prev
 * 输入 1 -> 2 -> 3 -> null
 * 输出 3 -> 2 -> 1 -> null
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}
// 利用 栈 先入后出
var reverseList = function(head) {
    let tmp = head;
    let tHead = new ListNode(0);
    let pre = tHead;
    let stack = [];
    while(tmp){
        stack.push(tmp.val);
        tmp = tmp.next;
    }
    while(stack.length != 0){
        pre.next = new ListNode(stack.pop());
        pre = pre.next;
    }
    return tHead.next;
};

// 求数组中任意两元素的最大差值 （买卖股票的最佳时机）
var maxProfit = function(prices) {
    let max = 0;
    let currMin = prices[0];
    let len = prices.length;
    for(let i=0;i<len;i++) {
        if(prices[i] < currMin) {
            currMin = prices[i]
        }
        max = Math.max(prices[i]-currMin, max)
    }
    return max
};