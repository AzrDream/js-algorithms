// 方法一
function maxPoint1(arr, L) {
    let res = 1;
    for(let i = 0; i < arr.length; i++) {
        let nearest = nearestIndex(arr, i, arr[i] - L);
        res = Math.max(res, i - nearest + 1);
    }
    return res;
}
function nearestIndex(arr, R, value) {
    let L = 0;
    let index = R;
    while(L <= R) {
        let mid = L + ((R - L) >> 1);
        if(arr[mid] >= value) {
            index = mid;
            R = mid - 1;
        }else {
            L = mid + 1;
        }
    }
    return index;
}
// 方法二
function maxPoint2(arr, L) {
    let left = 0;
    let right = 0;
    let N = arr.length;
    let max = 0;
    while(left < N) {
        while(right < N && arr[right] - arr[left] <= L) {
            right++;
        }
        max = Math.max(max, right-(left++));
    }
    return max;
}

let arr = [1, 3, 7, 8, 9, 11];
let L = 4;
console.log(maxPoint1(arr, L));
console.log(maxPoint2(arr, L));
