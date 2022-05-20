function slidingWindowMaxArray(arr, w) {
    if(arr === null || w< 1 || arr.length < w) {
        return [];
    }
    let N = arr.length;
    let res = [];
    let index = 0;
    let L = 0;
    let R = w - 1;
    while(R < N) {
        let max = arr[L];
        for (let i = L + 1; i <= R; i++) {
            max = Math.max(max, arr[i]);

        }
        res[index++] = max;
        L++;
        R++;
    }
    return res;
}
let arr = [1,3,-1,-3,5,3,6,7];
console.log(slidingWindowMaxArray(arr, 3));
console.log(getMaxWindow(arr, 3));


function getMaxWindow(arr, w) {
    if(arr === null || w< 1 || arr.length < w) {
        return [];
    }
    // qmax窗口最大值的更新结构
    // 放下标，可以通过arr将值查出来
    let qmax = new Deque(); // 36-双端队列实现代码
    let res = [];
    let index = 0;
    for(let R = 0; R < arr.length; R++) {
        while(!qmax.isEmpty() && arr[qmax.peekBack()] <= arr[R]) {
            qmax.removeBack();
        }
        qmax.addBack(R);
        if(qmax.peekFront() === R - w) {
            qmax.removeFront();
        }
        if(R >= w-1) {
            res[index++] = arr[qmax.peekFront()];
        }
    }
    return res;
}
