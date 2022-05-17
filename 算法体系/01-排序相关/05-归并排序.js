let arr = [3,5,7,9,10,1,2,3];
function mergeSort(arr) {
    if(arr.length<2){
        return
    }
    sortProcess(arr, 0, arr.length - 1);
}
function sortProcess(arr, L, R) {
    if(L === R){
        return
    }
    let mid = (L + R)/2;
    sortProcess(arr, L, mid);
    sortProcess(arr, mid + 1, R);
    merge(arr, L, mid, R);
}
function merge(arr, L, mid, R) {
    let help = [];
    let i = 0;
    let p1 = L;
    let p2 = mid + 1;
    while(p1 <= mid && p2 <= R){
        help[i++] = arr[p1] < arr[p2] ? arr[p1++]:arr[p2++];
    }
    // 两个必有且只有一个越界
    while(p1 <= mid){
        help[i++] = arr[p1++];
    }
    while(p2 <= R){
        help[i++] = arr[p2++];
    }
    for(i = 0; i < help.length; i++){
        arr[L+i]=help[i];
    }
}
mergeSort(arr);
console.log(arr);
