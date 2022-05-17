function bfprt(arr, begin, end, i) {
    if(begin === end) {
        return arr[begin];
    }
    // 求中位数
    let pivot = medianofMedions(arr, begin, end);
    let pivotRange = partition(arr, begin, end, pivot);
    if(i >= pivotRange[0] && i <= pivotRange[1]) {
        return arr[i];
    }else if(i < pivotRange[0]) {
        return bfprt(arr, begin, pivotRange[0] - 1, i);
    }else {
        return bfprt(arr, pivotRange[1] + 1, end, i);
    }
}
function medianofMedions(arr, begin, end) {
    let num = end - begin + 1;
    let offset = num % 5 === 0 ? 0:1;
    let mArr = [];
    mArr.length = num / 5 + offset;
    for(let i = 0; i < mArr.length; i++) {
        let beginI = begin + i * 5;
        let endI = beginI + 4;
        mArr[i] = getMedian(arr, beginI, Math.min(end, endI));
    }
    return bfprt(mArr, 0, mArr.length - 1, mArr.length / 2);
}
function partition(arr, begin, end, pivotValue) {
    let small = begin - 1;
    let cur = begin;
    let big = end + 1;
    while(cur !== big) {
        if(arr[cur] < pivotValue) {
            swap(arr, ++small, cur++);
        } else if(arr[cur] > pivotValue) {
            swap(arr, cur, --big);
        } else {
            cur++;
        }
    }
    let range = [];
    range[0] = small + 1;
    range[1] = big - 1;
    return range;
}
function getMedian(arr, begin, end) {
    insertionSort(arr, begin, end);
    let sum = end + begin;
    let mid = (sum / 2) + (sum % 2);
    return arr[mid];
}
function swap(arr, i , j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
function insertionSort(arr, begin, end) {
    for(let i = begin + 1; i !== end + 1; i++) {
        for(let j = i; j !== begin; j--) {
            if(arr[j - 1] > arr[j]) {
                swap(arr, j - 1, j);
            }else {
                break;
            }
        }
    }
}
let arr = [5,4,9,8,6,2,1,3];
console.log(bfprt(arr, 0, arr.length - 1, 5));
