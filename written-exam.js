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
// 当前节点的next 指向上一个节点
var reverseList = function(head) {
    let prev = null;
    let curr = head;
    while(curr != null){
        let next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
};

/**
 * 给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。
 * k 是一个正整数，它的值小于或等于链表的长度。
 * 如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。
 */
var reverseKGroup = function(head, k) {
    let prev = null,
        curr = head,
        p = head;
    // 查找k个
    for(let i=0; i<k; i++) {
        if(p == null) return head
        p = p.next;
    }
    // 对着k个进行反转
    for(let j=0; j<k; j++) {
        let next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    // 反转后，递归  head 已被反转到当前组中最后一个节点，所以应该指向下一个递归的起点
    // 此时 curr就是下一组的第一个节点
    head.next = reverseKGroup(curr, k)
    return prev
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
    let map = new Map();
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

// 防抖
function debonuce(fn, delay) {
    let timer = null;
    return function() {
        clearTimeout(timer)
        timer = setTimeOut(fn, delay)
    }
}
// 节流
function throttle(fn, delay){
    // 标志位
    let valid = true;
    return function() {
        if(!valid) {
            return false 
        }
        valid = false
        setTimeout(() => {
            fn()
            valid = true;
        }, delay)
    }
}
function consoleFunc() {
    console.log('console sth')
}
window.onscroll = debonuce(consoleFunc, 1000)
window.onscroll = throttle(consoleFunc, 1000)

// 找到数组中三个最大数并相乘
function maxThree(arr) {
    if(arr.length <3) return false
    if(arr.length === 3) {
        return arr[0]*arr[1]*arr[2]
    }
    let len = arr.length;
    let min;
    // 升序排序
    for(let i=0; i<len; i++) {
        for(let j=0; j<len; j++) {
            if(arr[i] < arr[j]) {
                min = arr[i]; 
                arr[i]= arr[j];
                arr[j]= min;
            }
        }
    }
    return arr[len-1]*arr[len-2]*arr[len-3]
}
function maxThree(arr) {
    if(arr.length <3) return false
    if(arr.length === 3) {
        return arr[0]*arr[1]*arr[2]
    }
    let len = arr.length;
    // 升序排序
    arr.sort((a, b) => a - b);
    // console.log(arr);
    return arr[len-1]*arr[len-2]*arr[len-3]
}
maxThree([5,2,3,1])

/**
 * 给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = target
 * 找出所有满足条件且不重复的三元组。
*/
function threeSum(nums, target=0) {
    if(!nums || (nums && nums.length < 3)) return []
    let res = [], len = nums.length;
    // 升序排序
    nums.sort((a,b) => a - b);
    for(let i=0; i<len; i++) {
        if(nums[i] > target) break
        // 去重
        if(i>0 && nums[i] === nums[i-1]) continue
        let left = i+1, right = len - 1;
        while(left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if(sum === target) {
                res.push([nums[i], nums[left], nums[right]]);
                while (left<right && nums[left] == nums[left+1]) left++; // left指针与它下一位对比，如果相同，去重
                while (left<right && nums[right] == nums[right-1]) right--; // right指针与它前一位对比，如果相同，去重
                left++;
                right--;
            } else if(sum < target) {
                left++
            } else {
                right--
            }
        }
    }
    return res
}
threeSum([6,0,-1,1,3,5,2], 6)

/**
 * 最长回文
 * 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000
 * 输入： abac  输出： aba
 */
// 方法一： 暴力循环法  会超时。。。
var longestPalindrome = function(s) {
    if(!s) {
        return ''
    }
    let maxlen = 0, len = s.length, res = '';
    for(let i=0; i<len; i++) {
        for(let j=i+1; j<=len; j++) {
            let tempStr = s.substring(i, j);
            // 判断是否是回文
            let reverseStr = tempStr.split('').reverse().join('');
            if((tempStr === reverseStr) && tempStr.length > maxlen) {
                res = tempStr;
                maxlen = tempStr.length;
            }
        }
    }
    return res
};
// 方法二： 动态规划
var longestPalindrome = function(s) {
    if(!s) {
        return ''
    }
    let len = s.length, 
        res = '',
        s_reverse = s.split('').reverse().join('');
    // 创建二维数组
    let arr = Arrat.from(new Array(len), () => new Array(len).fill(0))
    for(let i=0; i<len; i++) {
        for(let j=0; j<len; j++) {
            if(s[i] === s_reverse[j]) {
                // 
            }
        }
    }
    return res
};

// 找到字符串中不重复的最大子字符串
var lengthOfLongestSubstring = function(s) {
    let str = '',
        maxlen = 0,
        currlen = 0;
    for(let n of s) {
        if(str.indexOf(n) === -1) {
            str += n;
            currlen++;
            maxlen = Math.max(maxlen, currlen)
        } else {
            str += n;
            str = str.slice(str.indexOf(n)+1);
            currlen = str.length;
        }
    }
    return maxlen
}

// 红绿灯： 循环 间隔2秒改变红绿灯颜色
function sleep(duration) {
    return new Promise((resolve) => {
        setTimeout(resolve, duration)
    })
}

async function changeColor(duration, color) {
    console.log(color);
    // document.getElementById('circle').style.color = color;
    await sleep(duration)
}

async function main() {
    while(true) {
        await changeColor(2000, 'green')
        await changeColor(2000, 'yellow')
        await changeColor(2000, 'red')
    }
}
main()

// ====================================================== 二叉树 start =============================================================
/**
 * 输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字
 * 前序： 1 2 4 5 3 ； 中序： 4 2 5 1 3
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
var buildTree = function(preorder, inorder) {
    if(!preorder.length|| !inorder.length) return null
    // 前序第一个节点为根节点
    let root = preorder[0];
    let node = new TreeNode(root);
    // 获取root在中序中的位置，分割左右子树
    let idx = inorder.indexOf(root);

    // 递归构建树
    node.left = buildTree(preorder.slice(1, idx+1), inorder.slice(0, idx))
    node.right = buildTree(preorder.slice(idx+1), inorder.slice(idx+1))
    return node
}

/**
 * 二叉树的层序遍历：给你一个二叉树，请你返回其按 层序遍历 得到的节点值
 * 输入 [1,null,2,3]  输出 [1,3,2]
 */
var levelOrder = function(root) {
    if(!root) return []
    let queue = [root], // 队列，用于存放节点，先进先出
        res = [], // 初始化结果数组
        level = 0; // 初始化层数：第 0 层
    while(queue.length) {
        res[level] = [];
        let levelNum = queue.length; // 当前层节点数
        while(levelNum--) {
            // 将当前层的值放进结果数组
            let node = queue.shift();
            res[level].push(node.val);
            // 如果节点存在左右子节点，则放进队列
            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }
        // 遍历下一层
        level++
    }
    return res
};

/**
 * 二叉树的中序遍历
 */
// 递归
var inorderTraversal = function(root) {
    if(root) {
        return [...inorderTraversal(root.left), root.val, ...inorderTraversal(root.right)]
    } else {
        return []
    }
};
// 迭代
/**
 * 当前节点存在左子节点，当前节点入栈，再跳到左子节点
 * 当前节点不存在左子节点: 
 *      不存在右子节点，保存当前节点，当前值指向前一个值，且左子节点置为null
 *      存在右节点，保存当前节点，再跳到右节点
 */
var inorderTraversal = function(root) {
    let res = [], stack = [];
    while(root || stack.length) {
        if(root.left) { // 存在左子节点
            stack.push(root);
            root = root.left;
        } else { // 不存在左子节点
            res.push(root.val);
            if(root.right) { // 存在右子节点
                root = root.right;
            } else { // 不存在右子节点
                // root 指向前一个值，同时把root（即前一个值得左子节点）置为null
                root = stack.pop();
                if(root) root.left = null;
            }
        }
    }
    return res
};

/**
 * 二叉树的前序遍历
 */
// 递归
var preorderTraversal = function(root) {
    if(root) {
        return [root.val, ...preorderTraversal(root.left), ...preorderTraversal(root.right)]
    } else {
        return []
    }
};
// 迭代
/**
 * 利用栈，根节点先保存，然后右节点入栈，再左节点入栈
 * 迭代保存出栈节点
 */
var preorderTraversal = function(root) {
    let res = [];
    if(!root) return []
    // 模拟栈
    let stack = [root];
    while(stack.length > 0) {
        let node = stack.pop()
        // 遇到根节点，保存至结果数组
        res.push(node.val);
        // 栈先进后出，所以先入右节点
        if(node.right) stack.push(node.right)
        if(node.left) stack.push(node.left)
    }
    return res
};

/**
 * 二叉树的后序遍历
 */
// 递归
var postorderTraversal = function(root) {
    if(root) {
        return [...postorderTraversal(root.left), ...postorderTraversal(root.right), root.val]
    } else {
        return []
    }
};
// 迭代
// 前序遍历 倒置版（unshift）
var postorderTraversal = function(root) {
    let res = [];
    if(!root) return []
    // 模拟栈
    let stack = [root];
    while(stack.length > 0) {
        let node = stack.pop()
        // 栈先进后出，所以先入右节点
        if(node.left) stack.push(node.left)
        if(node.right) stack.push(node.right)
        res.unshift(node.val);
    }
    return res
};

/**
 * 判断树是否是对称二叉树
 * 递归 + 双指针
 */
// 如果是对称二叉树，则按照左、中、右顺序把节点存入数组中，得到的数组是对称的
// 比如： 二叉树 [1,2,2,3,4,4,3]，按上述说法执行后得到数组 [3,2,4,1,4,2,3]
var isSymmetric = function (root) {
    if(!root) return true
    let nums = [];
    getArray(nums, root , 1);
    let i = 0, j = nums.length -1;
    // 设置左右指针 判断数组是否为对称数组
    while(i < j) {
        if(nums[i] !== nums[j]) {
            return false
        }
        i++;
        j--;
    }
    return true
}
/**
 * 递归得到对称数组
 * @param n: 节点
 * @param k: 层数，用于区分null节点
 */
function getArray(nums, n, k) {
    // 处理左节点
    if(n.left) {
        // 递归下一层
        getArray(nums, n.left, k+1)
    }
    // 当前节点存进数组
    nums.push(`${n.val}-${k}`);
    // 处理右节点
    if(n.right) {
        // 递归下一层
        getArray(nums, n.right, k+1)
    }
}

// ====================================================== 二叉树 end =============================================================

/**
 * 8*8二维数组，当横向有两个1，或者纵向有两个1时，输出true，否则false
 */
var func = function(arr) {
    let num1 = 0, num2 = 0;
    for(let i=0; i <8; i++) {
        for(let j=0; j<8; j++) {
            if(arr[i][j] === 1) {
                num1 ++;
            }
            if(arr[j][i] === 1) {
                num2 ++;
            }
            if(num1 >= 2) return true
            if(num2 >= 2) return true
        }
    }
    return false
}
let array = [
    [1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]
]
func(array);

/**
 * 数组全排列，数组中元素不重复
 * 递归 + 位置交换
 */
var permute = function(nums) {
    let res = [];
    perm(nums, 0, nums.length-1, res);
    return res
}
// 从数组的第p个数到第q个数，递归进行全排列
function perm(arr, p, q , res) {
    if(p === q) {
        // 排列完成
        res.push([...arr])
    }
    for(let i=p; i<=q; i++) {
        // 将 i 交换到 p，进行全排列
        swap(arr, i, p);
        // 如果放到第0位，就需要对第1位到第最后一位进行全排列
        // 所以从 p+1 到 q 进行递归
        perm(arr, p+1, q, res)
        // 排列完成，将 i 与 p 重置回来，避免重复排列
        swap(arr, i, p)
    }
};
function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
};
/**
 * 数组全排列，数组中元素有重复
 * 递归 + 位置交换 + map去重
 */
var permuteUnique  = function(nums) {
    let res = [];
    perm(nums, 0, nums.length-1, res);
    return res
}
// 从数组的第p个数到第q个数，递归进行全排列
function perm(arr, p, q , res) {
    if(p === q) {
        // 排列完成
        res.push([...arr])
    }
    // 去重
    let map = new Map();
    for(let i=p; i<=q; i++) {
        if(!map.has(arr[i])) {
            map.set(arr[i], true);
            // 将 i 交换到 p，进行全排列
            swap(arr, i, p);
            // 如果放到第0位，就需要对第1位到第最后一位进行全排列
            // 所以从 p+1 到 q 进行递归
            perm(arr, p+1, q, res)
            // 排列完成，将 i 与 p 重置回来，避免重复排列
            swap(arr, i, p)
        }
    }
};
function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
};

// 原生 js 实现 ajax
function AJAX(options, fn) {
    options = options || {};
    options.type = options.type ? options.type : 'GET'; // 默认 GET
    options.dataType = options.dataType ? options.dataType : 'json'; 
    options.data = options.data ? options.data : {};

    let xhr = new XMLHttpRequest();

    if(options.type === 'GET') {
        xhr.open("GET", options.url+"?"+params, true);
        xhr.send(null);
    }
    if(options.type === 'POST') {
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(options.data);
    }

    // 监听服务端响应
    xhr.onreadystatechange=function(){
        // 请求成功返回
        if(xhr.readyState==4){
            let status = xhr.status;
            if(status === 200 || status === 304){
                // 成功后执行回调
              fn.call(this, xhr)
            }
        }
    }
}

/**
 * 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
 * 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
 * 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
 * 输出：7 -> 0 -> 8
 * 原因：342 + 465 = 807
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
var addTwoNumbers = function(l1, l2) {
    // 新建一个链表
    let node = new ListNode('head');
    // sum为总和， 进n位
    let temp = node, sum = 0, n = 0;
    while(l1 || l2) {
        let n1 = l1 ? l1.val : 0;
        let n2 = l2 ? l2.val : 0;
        sum = n1 + n2 + n;
        // sum%10，如果大于10，指向进位后的余数
        temp.next = new ListNode(sum%10);
        temp = temp.next;
        // 进n位
        n = parseInt(sum / 10);
        if(l1) l1 = l1.next;
        if(l2) l2 = l2.next
    }
    // 最后还有进位
    if(n > 0) temp.next = new ListNode(n);
    return node.next
};

/**
 * 实现一个 LRU
 */
/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    // 最大容量
    this.capacity = capacity;
    // 用 Map对象 来管理cache  有序键值对
    this.cache = new Map();
};
/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    let cacheMap = this.cache;
    if(cacheMap.has(key)) {
        // 执行get， 需要更新 key值 顺序
        let value = cacheMap.get(key);
        cacheMap.delete(key);
        cacheMap.set(key, value);
        return value
    } else {
        return -1
    }
};
/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    let cacheMap = this.cache;
    // 不存在， 需要插入
    if(!cacheMap.has(key)) {
        // 判断容量是否达到上限
        if(cacheMap.size >= this.capacity) {
            // 达到上限，需删除
            // Map.keys().next() 按顺序输出key
            cacheMap.delete(cacheMap.keys().next().value);
        }
    } else {
        // 存在，需要更新
        cacheMap.delete(key);
    }
    cacheMap.set(key, value);
};

/**
 * 查找两个有序数组的中位数
 */
var findMedianSortedArrays = function(nums1, nums2) {
    let arr = [...nums1, ...nums2];
    // 排序
    arr.sort((a, b) => a - b);
    let len = arr.length;
    return len%2 > 0 ? arr[(len-1) / 2] : (arr[len/2] + arr[(len/2) - 1]) / 2
};

// js实现二分查找
function binarySearch(arr, value) {
    let max = arr.length-1,
        min = 0;
    while(min < max) {
        let mid = Math.floor((max - min)/2);
        if(value === arr[mid]) {
            return arr[mid]
        } else if(value < arr[mid]) {
            max = mid-1;
        } else if(value > arr[mid]) {
            min = mid+1;
        }
    }
    return -1
}

/**
 * 字典序第 k 小的数字
 * 给定整数 n 和 k，找到 1 到 n 中字典序第 k 小的数字。
 * https://leetcode-cn.com/problems/k-th-smallest-in-lexicographical-order/
 */
var findKthNumber = function(n, k) {
    let p = 1, // 指针，确定当前位置，当p === k时，即找到k
        prefix = 1; // 初始前缀
    while(p < k) {
        let count = getCount(prefix, n);
        // 判断第 k 个数 是否在当前前缀下
        if(p + count > k) { // 在当前前缀下
            // 此时需要往子前缀中查找
            prefix *= 10;
            p++; // 指针后移
        } else { // 不在当前前缀下
            // 前缀后移
            prefix ++
            // 指针需要指向下一前缀的起点
            p += count;
        }
    }
    return prefix
}
// 获取n个数中， 当前前缀prefix下的所有子节点总数
// 总数count = 下一个前缀起点 next - 当前前缀起点 prefix
// 比如 prefix 为 10， 那下一个前缀起点就为20， count 即为 1 10 11 12 13 14 15 16 17 18 19 总10个数
function getCount(prefix, n) {
    let curr = prefix,
        next = prefix + 1,
        count = 0;
    // 不能超过n
    // Math.min(next, n+1) ： next会大于n，所以应取next和n中较小值；n+1是为了将n算进去总数中
    while(curr <= n) {
        count += Math.min(next, n+1) - curr;
        curr *= 10;
        next *= 10;
    }
    return count
}