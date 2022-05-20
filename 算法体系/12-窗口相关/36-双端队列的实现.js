/*
addFront(element)：该方法在双端队列前端添加新的元素
addBack(element):该方法在双端队列后端添加新的元素（实现方法和 Queue 类中的enqueue 方法相同）。
removeFront()：该方法会从双端队列前端移除第一个元素
removeBack()：该方法会从双端队列的后端移除第一个元素
peekFront():该方法返回双端队列的第一个元素。
peekBack()):该方法返回双端队列后端的第一个元素。
* */
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
const deque = new Deque();
deque.addFront('John');
deque.addFront('Jack');
deque.addFront('Amy');
deque.addBack('Lisa');
//    deque.removeFront();
//    deque.removeBack();
console.log(deque.size());
console.log(deque.toString());
console.log(deque);
console.log(deque.isEmpty());
deque.clear();
console.log(deque);
