let arr = [3,5,7,9,10,1,2,3];
function InsertionSort(arr) {
    if(arr.length < 2){
        return
    }
    for(let i = 1; i < arr.length; i++){
        for(let j = i-1;j >= 0 && arr[j] > arr[j+1]; j--){
            swap(arr, j, j + 1);
        }
    }
}
function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
InsertionSort(arr);
console.log(arr);
