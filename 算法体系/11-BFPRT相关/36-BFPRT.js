function minKth3(array, k) {
    let arr = array;
    return bfprt(arr, 0, arr.length - 1, k - 1)
}
// arr[L..R]  如果排序的话，位于index位置的数，是什么，返回
function bfprt(arr, L, R, index) {
    if(L === R) {
        return arr[L];
    }
    // L...R  每五个数一组
    // 每一个小组内部排好序
    // 小组的中位数组成新数组
    // 这个新数组的中位数返回
    let pivot = medianofMedions(arr, L, R);
    let range = partition(arr, L, R, pivot);
    if(index >= range[0] && index <= range[1]) {
        return arr[index];
    }else if(index < range[0]) {
        return bfprt(arr, L, range[0] - 1, index);
    }else {
        return bfprt(arr, range[1] + 1, R, index);
    }
}
// arr[L...R]  五个数一组
// 每个小组内部排序
// 每个小组中位数领出来，组成marr
// marr中的中位数，返回
function medianofMedions(arr, L, R) {
    let size = R - L + 1;
    let offset = size % 5 === 0 ? 0:1;
    let mArr = [];
    mArr.length = size / 5 + offset;
    for(let team = 0; team < mArr.length; team++) {
        let teamFirst = L + team * 5;
        let teamEnd = teamFirst + 4;
        // L ... L + 4
        // L +5 ... L +9
        // L +10....L+14
        mArr[team] = getMedian(arr, teamFirst, Math.min(R, teamEnd));
    }
    // marr中，找到中位数
    // marr(0, marr.len - 1,  mArr.length / 2 )
    return bfprt(mArr, 0, mArr.length - 1, mArr.length / 2);
}
// 获取中位数
function getMedian(arr, L, R) {
    insertionSort(arr, L, R);
    return arr[(L + R) / 2];
}
function insertionSort(arr, L, R) {
    for(let i = L + 1; i <= R; i++) {
        for(let j = i - 1; j >= L && arr[j] > arr[j + 1]; j--) {
            swap(arr, j, j + 1);
        }
    }
}
function partition(arr, L, R, pivot) {
    let less = L - 1;
    let more = R + 1;
    let cur = L;
    while(cur < more) {
        if(arr[cur] < pivot) {
            swap(arr, ++less, cur++);
        } else if(arr[cur] > pivot) {
            swap(arr, cur, --more);
        } else {
            cur++;
        }
    }
    return [less + 1, more - 1];
}
function swap(arr, i , j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
let arr = [5,4,9,8,6,2,1,3];
console.log(minKth3(arr,  5));
