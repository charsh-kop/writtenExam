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

// 链表 start ===============================================================
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

/**
 * 将两个升序链表合并为一个新的升序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成
 * 输入：1->2->4, 1->3->4
 * 输出：1->1->2->3->4->4
 */
var mergeTwoLists = function(l1, l2) {
    if(l1 === null) return l2;
    if(l2 === null) return l1;
    // 递归 如果 l1 小于 l2 ,则下一个节点指向 下一个节点与l2比较后的结果
    if(l1.val < l2.val){
        l1.next = mergeTwoLists(l1.next, l2);
        return l1;
    }else{
        l2.next = mergeTwoLists(l1, l2.next);
        return l2;
    }
}
// 链表 end =========================================================================

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
}

// 最大子序和
/**
 * 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和
 * 输入: [-2,1,-3,4,-1,2,1,-5,4],
 * 输出: 6
 * 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
 */
var maxSubArray = function(nums) {
    let maxsub = nums[0], sum = 0;
    for(let num of nums) {
        // 如果相加大于当前数，说明sum对结果有益，可以加上num
        if(sum + num > num) {
            sum += num
        } else { // 否则，舍弃sum，把sum设为当前num
            sum = num
        }
        // 每次循环都比对得出最大值
        maxsub = Math.max(maxsub, sum)
    }
    return maxsub
};

/**
 * 给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和
 */
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
var hasPathSum = function(root, sum) {
    if(root == null) {
        return false
    }
    // root 为 叶子节点，判断是否相等
    if(root.left == null && root.right == null) {
        return root.val === sum
    }
    // 非叶子节点，继续往下寻找，同时sum动态减去当前节点值
    sum = sum - root.val;
    // 左右两条路径，有一条满足即可
    return hasPathSum(root.left, sum) || hasPathSum(root.right, sum)
};

/**
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
 * 有效字符串需满足：
   左括号必须用相同类型的右括号闭合。
   左括号必须以正确的顺序闭合。
 * 注意空字符串可被认为是有效字符串。
*/
var isValid = function(s) {
    if(s === '') return true
    // 如果为奇数长度，返回false
    if(!s.length%2) return false
    let map = new Map;
    map.set('(',')');
    map.set('[',']');
    map.set('{','}');
    // 存储左括号
    let arr = [];
    for(let letter of s) {
        if(map.has(letter)) {
            arr.push(letter)
        } else {
            // 如果为右括号，判断是否与arr最后一位匹配
            if(letter !== map.get(arr.pop())) {
                return false
            }
        }
    }
    // 防止全部为左括号
    return !arr.length
};

/**
 * 爬楼梯  需要 n 阶你才能到达楼顶  每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶
 * 可以转化为 斐波那契，求斐波那契 n 的值
 */
// 迭代
var climbStairs = function(n) {
    let a=1,
		b=1,
		res;
	if(n<=1){
		res = 1
	}
	for(let i=2;i<=n;i++){
		res = a + b
		a = b
		b = res
	}
	return res
};
// 递归 （执行时间会超时）
var climbStairs = function(n) {
	if(n<=1){
		return 1
	}
	return climbStairs(n-1) + climbStairs(n-2)
};