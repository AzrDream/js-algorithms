class ArrayStack {
    arr = [];
    size = 0;
    initArrayStack(initSize) {
        if (initSize < 0) {
            throw new Error("The init size is less than 0");
        }
        this.arr.length = initSize;
    }
    peek() {
        if(this.size === 0) {
            return null;
        }
        return this.arr[this.size - 1];
    }
    push(obj) {
        if(this.size === this.arr.length) {
            throw new Error("The stack is full");
        }
        this.arr[this.size++] = obj;
    }
    pop() {
        if(this.size === 0) {
            throw new Error("The stack is empty");
        }
        return this.arr[--this.size];
    }
}
let stack = new ArrayStack;
stack.initArrayStack(5);
stack.push(5);
stack.push(10);
stack.push(15);
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());

class ArrayQueue {
    arr = [];
    size = 0;
    first = 0;
    last = 0;
    initArrayQueue(initSize) {
        if(initSize < 0) {
            throw new Error("The init size is less than 0");
        }
        this.arr.length = initSize;
    }
    peek() {
        if(this.size === 0) {
            return null;
        }
        return this.arr[this.first];
    }
    push(obj) {
        if(this.size === this.arr.length) {
            throw new Error("The queue is full");
        }
        this.size++;
        this.arr[this.last] = obj;
        this.last = this.last === this.arr.length - 1 ? 0 : this.last + 1;
    }
    poll() {
        if(this.size === 0) {
            throw new Error("The queue is empty");
        }
        this.size--;
        let temp = this.first;
        this.first = this.first === this.arr.length - 1 ? 0 : this.first + 1;
        return this.arr[temp];
    }
}
let queue = new ArrayQueue;
queue.initArrayQueue(3);
queue.push(1);
queue.push(3);
queue.push(5);
console.log(queue.poll());
console.log(queue.poll());
console.log(queue.poll());

export default ArrayStack;
