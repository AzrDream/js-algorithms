function largestRectangleArea1(height) {
    if (height == null || height.length === 0) {
        return 0;
    }
    let maxArea = 0;
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
    for (let i = 0; i < height.length; i++) {
        while (!stack.isEmpty() && height[i] <= height[stack.peek()]) {
            let j = stack.pop();
            let k = stack.isEmpty() ? -1 : stack.peek();
            let curArea = (i - k - 1) * height[j];
            maxArea = Math.max(maxArea, curArea);
        }
        stack.push(i);
    }
    while (!stack.isEmpty()) {
        let j = stack.pop();
        let k = stack.isEmpty() ? -1 : stack.peek();
        let curArea = (height.length - k - 1) * height[j];
        maxArea = Math.max(maxArea, curArea);
    }
    return maxArea;
}
let arr = [2,1,5,6,2,3];
console.log(largestRectangleArea1(arr));
console.log(largestRectangleArea2(arr));

function largestRectangleArea2(height) {
    if (height == null || height.length === 0) {
        return 0;
    }
    let N = height.length;
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
    let si = -1;
    let maxArea = 0;
    for (let i = 0; i < height.length; i++) {
        while (si !== -1 && height[i] <= height[stack[si]]) {
            let j = stack[si--];
            let k = si === -1 ? -1 : stack[si];
            let curArea = (i - k - 1) * height[j];
            maxArea = Math.max(maxArea, curArea);
        }
        stack[++si] = i;
    }
    while (si !== -1) {
        let j = stack[si--];
        let k = si === -1 ? -1 : stack[si];
        let curArea = (height.length - k - 1) * height[j];
        maxArea = Math.max(maxArea, curArea);
    }
    return maxArea;
}
