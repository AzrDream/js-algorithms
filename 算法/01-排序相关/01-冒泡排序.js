let arr = [3,5,7,9,10,1,2,3];
function bubbleSort(arr) {
    if(arr.length < 2) {
        return;
    }
    for(let end = arr.length - 1; end > 0; end--){
        for(let i = 0; i < end; i++){
            if(arr[i] > arr[i+1]){
                swap(arr,i,i+1);
            }
        }
    }
}
function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
bubbleSort(arr);
console.log(arr);
