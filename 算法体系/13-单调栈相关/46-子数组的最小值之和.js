// 没有使用单调栈
function subArrayMinSum2(arr) {
    // left[i] = x : arr[i]左边，离arr[i]最近，<=arr[i]，位置在x
    let left = leftNearLessEqual2(arr);
    // right[i] = y : arr[i]右边，离arr[i]最近，< arr[i],的数，位置在y
    let right = rightNearLess2(arr);
    let ans = 0;
    for (let i = 0; i < arr.length; i++) {
        let start = i - left[i];
        let end = right[i] - i;
        ans += start * end * arr[i];
        ans %= 1000000007;
    }
    return ans;
}
function leftNearLessEqual2(arr) {
    let N = arr.length;
    let left = [];
    for (let i = 0; i < N; i++) {
        let ans = -1;
        for (let j = i - 1; j >= 0; j--) {
            if (arr[j] <= arr[i]) {
                ans = j;
                break;
            }
        }
        left[i] = ans;
    }
    return left;
}
function rightNearLess2(arr) {
    let N = arr.length;
    let right = [];
    for (let i = 0; i < N; i++) {
        let ans = N;
        for (let j = i + 1; j < N; j++) {
            if (arr[i] > arr[j]) {
                ans = j;
                break;
            }
        }
        right[i] = ans;
    }
    return right;
}
let arr = [3,1,2,4];
console.log(subArrayMinSum2(arr));
console.log(subArrayMinSum(arr));

// 使用单调栈
function subArrayMinSum(arr) {
    // left[i] = x : arr[i]左边，离arr[i]最近，<=arr[i]，位置在x
    let left = leftNearLessEqual(arr);
    // right[i] = y : arr[i]右边，离arr[i]最近，< arr[i],的数，位置在y
    let right = nearLessRight(arr);
    let ans = 0;
    for (let i = 0; i < arr.length; i++) {
        let start = i - left[i];
        let end = right[i] - i;
        ans += start * end * arr[i];
        ans %= 1000000007;
    }
    return ans;
}
function leftNearLessEqual(arr) {
    let N = arr.length;
    let left = [];
    for(let i = 0; i < N; i++) {
        left[i] = 0;
    }
    class Stack {
        arr = [];
        size = 0;
        isEmpty() {
            return this.size === 0;
        }
        peek() {
            if(this.size === 0) {
                return null;
            }
            return this.arr[this.size - 1];
        }
        push(obj) {
            this.arr[this.size++] = obj;
        }
        pop() {
            if(this.size === 0) {
                throw new Error("The stack is empty");
            }
            return this.arr[--this.size];
        }
    }
    let stack = new Stack();
    for (let i = N - 1; i >= 0; i--) {
        while (!stack.isEmpty() && arr[i] <= arr[stack.peek()]) {
            left[stack.pop()] = i;
        }
        stack.push(i);
    }
    while (!stack.isEmpty()) {
        left[stack.pop()] = -1;
    }
    return left;
}
function nearLessRight(arr) {
    let N = arr.length;
    let right = [];
    for(let i = 0; i < N; i++) {
        right[i] = 0;
    }
    class Stack {
        arr = [];
        size = 0;
        isEmpty() {
            return this.size === 0;
        }
        peek() {
            if(this.size === 0) {
                return null;
            }
            return this.arr[this.size - 1];
        }
        push(obj) {
            this.arr[this.size++] = obj;
        }
        pop() {
            if(this.size === 0) {
                throw new Error("The stack is empty");
            }
            return this.arr[--this.size];
        }
    }
    let stack = new Stack();
    for (let i = 0; i < N; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] > arr[i]) {
            right[stack.pop()] = i;
        }
        stack.push(i);
    }
    while (!stack.isEmpty()) {
        right[stack.pop()] = N;
    }
    return right;
}
