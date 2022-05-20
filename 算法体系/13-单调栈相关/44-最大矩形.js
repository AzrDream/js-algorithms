function maximalRectangle(map) {
    if (map == null || map.length === 0 || map[0].length === 0) {
        return 0;
    }
    let maxArea = 0;
    let height = [];
    for(let i = 0; i < map[0].length; i++) {
        height[i] = 0;
    }
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            height[j] = map[i][j] === '0' ? 0 : height[j] + 1;
        }
        maxArea = Math.max(maxRecFromBottom(height), maxArea);
    }
    return maxArea;
}
// 直方图代码
function maxRecFromBottom(height) {
    if (height == null || height.length === 0) {
        return 0;
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
let arr = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"]];
console.log(maximalRectangle(["1"]));
