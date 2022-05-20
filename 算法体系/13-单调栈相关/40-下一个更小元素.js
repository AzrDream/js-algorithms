function conArr(arr, x, y) {
    for(let i = 0; i < x; i++) {
        arr[i] = [];
        for (let j = 0; j < y; j++) {
            arr[i][j] = 0;
        }
    }
}
function getNearLessNoRepeat(arr) {
    let res = [];
    conArr(res, arr.length, 2);
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
    for(let i = 0; i < arr.length; i++) {   // 当遍历到i位置的数，arr[i]
        while(!stack.isEmpty() && arr[stack.peek()] > arr[i]) {
            let j = stack.pop();
            let leftLessIndex = stack.isEmpty() ? -1 : stack.peek();
            res[j][0] = leftLessIndex;
            res[j][1] = i;
        }
        stack.push(i);
    }
    while(!stack.isEmpty()) {
        let j = stack.pop();
        let leftLessIndex = stack.isEmpty() ? -1 : stack.peek();
        res[j][0] = leftLessIndex;
        res[j][1] = -1;
    }
    return res;
}
let arr = [3,1,2,3];
console.log(getNearLessNoRepeat(arr));
console.log(getNearLess(arr));

function getNearLess(arr) {
    let res = [];
    conArr(res, arr.length, 2);
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
    for(let i = 0; i < arr.length; i++) {   // 当遍历到i位置的数，arr[i]
        while(!stack.isEmpty() && arr[stack.peek()[0]] > arr[i]) {
            let popIs = stack.pop();
            let leftLessIndex = stack.isEmpty() ? -1 : stack.peek()[stack.peek().length - 1];
            for (let popi of popIs) {
                res[popi][0] = leftLessIndex;
                res[popi][1] = i;
            }
        }
        if (!stack.isEmpty() && arr[stack.peek()[0]] === arr[i]) {
            stack.peek().push(i);
        } else {
            let list = [];
            list.push(i);
            stack.push(list);
        }
    }
    while(!stack.isEmpty()) {
        let popIs = stack.pop();
        let leftLessIndex = stack.isEmpty() ? -1 : stack.peek()[stack.peek().length - 1];
        for (let popi of popIs) {
            res[popi][0] = leftLessIndex;
            res[popi][1] = -1;
        }
    }
    return res;
}
