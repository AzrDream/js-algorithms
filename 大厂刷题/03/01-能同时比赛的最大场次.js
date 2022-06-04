// 方法1：暴力，全排列
function maxPairNum1(arr, k) {
    if(k < 0) {
        return -1;
    }
    return process1(arr, 0, k);
}
function process1(arr, index, k) {
    let ans = 0;
    if(index === arr.length) {
        for(let i = 1; i < arr.length; i+=2) {
            if(arr[i] - arr[i - 1] === k) {
                ans++;
            }
        }
    }else {
        for(let r = index; r < arr.length; r++) {
            swap(arr, index, r);
            ans = Math.max(ans, process1(arr, index + 1, k));
            swap(arr, index, r);
        }
    }
    return ans;
}
function swap(arr, i, j) {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

// 贪心算法
function maxPairNum2(arr, k) {
    if(k < 0 || arr === null || arr.length < 2) {
        return 0;
    }
    arr.sort();
    let ans = 0;
    let N = arr.length;
    let L = 0;
    let R = 0;
    let usedR = [];
    while(L < N && R < N) {
        if(usedR[L]) {
            L++;
        }else if(L >= R) {
            R++;
        }else {
            let distance = arr[R] - arr[L];
            if(distance === k) {
                ans++;
                usedR[R++] = true;
                L++;
            }else if(distance < k) {
                R++;
            }else {
                L++;
            }
        }
    }
    return ans;
}

console.log(maxPairNum1([3, 3, 1, 1, 5, 5, 7, 7], 2));
console.log(maxPairNum2([3, 3, 1, 1, 5, 5, 7, 7], 2));
