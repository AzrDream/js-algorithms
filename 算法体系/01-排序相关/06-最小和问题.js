let arr = [3,5,7,9,10,1,2,3];
function smallSum(arr) {
    if(arr.length<2){
        return
    }
    mergeSort(arr, 0, arr.length - 1);
}
function mergeSort(arr, l, r) {
    if(l === r){
        return 0;
    }
    let mid = (l + r)/2;
    return mergeSort(arr, 1, mid)
            + mergeSort(arr, mid+1, r)
            + merge(arr, l, mid, r)
}
function merge(arr, l, m, r) {
    let help = [];
    let i = 0;
    let p1 = l;
    let p2 = m + 1;
    let res = 0;
    while(p1 <= m && p2 <= r){
        res += arr[p1] < arr[p2] ? (r - p2 + 1) * arr[p1] : 0;
        help[i++] = arr[p1] < arr[p2] ? arr[p1++]:arr[p2++];
    }
    // 两个必有且只有一个越界
    while(p1 <= m){
        help[i++] = arr[p1++];
    }
    while(p2 <= r){
        help[i++] = arr[p2++];
    }
    for(i = 0; i < help.length; i++){
        arr[l+i]=help[i];
    }
    return res;
}
smallSum(arr);
