function allTimesMinToMax(arr) {
    let size = arr.length;
    let sums = [];
    sums[0] = arr[0];
    for (let i = 1; i < size; i++) {
        sums[i] = sums[i - 1] + arr[i];
    }
    let max = Number.MIN_VALUE;
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
    for (let i = 0; i < size; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] >= arr[i]) {
            let j = stack.pop();
            max = Math.max(max, (stack.isEmpty() ? sums[i - 1] : (sums[i - 1] - sums[stack.peek()])) * arr[j]);
        }
        stack.push(i);
    }
    while (!stack.isEmpty()) {
        let j = stack.pop();
        max = Math.max(max, (stack.isEmpty() ? sums[size - 1] : (sums[size - 1] - sums[stack.peek()])) * arr[j]);
    }
    return max;
}
let arr = [3,4,3,4,3,1];
console.log(allTimesMinToMax(arr));
