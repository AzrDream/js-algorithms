function getNum(arr, sum) {
    if(arr === null || arr.length === 0|| sum < 0) {
        return 0;
    }
    class Deque {
        constructor() {
            this.items = {};
            this.count = 0;
            this.lowestCount = 0;
        }
        // 在双端队列前端添加新元素
        addFront(element) {
            if (this.isEmpty()) {
                this.addBack(element);
            } else if (this.lowestCount > 0) {
                this.lowestCount--;
                this.items[this.lowestCount] = element;
            } else {
                for (let i = this.count; i > 0; i--) {
                    this.items[i] = this.items[i - 1];
                }
                this.lowestCount = 0;
                this.items[this.lowestCount] = element;
                this.count++;
            }
        };
        addBack(element) {
            this.count++;
            this.items[this.count - 1] = element;
        };
        removeFront() {
            if (this.isEmpty()) {
                return undefined;
            }
            const result = this.items[this.lowestCount];
            delete this.items[this.lowestCount];
            this.lowestCount++;
            return result;
        };
        removeBack() {
            if (this.isEmpty()) {
                return undefined;
            }
            const result = this.items[this.count - 1];
            delete this.items[this.count - 1];
            this.count--;
            return result;
        };
        peekFront() {
            if (this.isEmpty()) {
                return null;
            }
            return this.items[this.lowestCount];
        };
        peekBack() {
            if (this.isEmpty()) {
                return null;
            }
            return this.items[this.count - 1];
        };
        isEmpty() {
            return this.count - this.lowestCount === 0;
        }
        size() {
            return this.count - this.lowestCount;
        }
        toString() {
            if (this.isEmpty()) {
                return '';
            }
            let objString = `${this.items[this.lowestCount]}`;
            for (var i = this.lowestCount + 1; i < this.count; i++) {
                objString = `${objString},${this.items[i]}`;
            }
            return objString;
        }
        clear() {
            this.items = {};
            this.count = 0;
            this.lowestCount = 0;
        }
    }
    let N = arr.length;
    let count = 0;
    let maxWindow = new Deque();
    let minWindow = new Deque();
    let R = 0;
    for(let L = 0; L < N; L++) {
        while(R < N) {
            while (!maxWindow.isEmpty() && arr[maxWindow.peekBack()] <= arr[R]) {
                maxWindow.removeBack();
            }
            maxWindow.addBack(R);
            while (!minWindow.isEmpty() && arr[minWindow.peekBack()] >= arr[R]) {
                minWindow.removeBack();
            }
            minWindow.addBack(R);
            if (arr[maxWindow.peekFront()] - arr[minWindow.peekFront()] > sum) {
                break;
            } else {
                R++;
            }
        }
        count += R - L;
        if (maxWindow.peekFront() === L) {
            maxWindow.removeFront();
        }
        if (minWindow.peekFront() === L) {
            minWindow.removeFront();
        }
    }
    return count;
}
let arr = [1,2,3,4,5];
console.log(getNum(arr, 2));
