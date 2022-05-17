let arr = [3,5,7,9,10,1,2,3];
function heapSort(arr) {
    if(arr.length < 2) {
        return;
    }
    // O(N*logN)
    /*
    for (let i = 0; i < arr.length; i++) {
        heapInsert(arr, i);
    }*/
    // O(N)
    for(let i = arr.length-1; i >= 0; i--) {
        heapify(arr,i,arr.length)
    }
    let size = arr.length;
    swap(arr, 0, --size);
    // O(N*logN)
    while (size > 0) {
        heapify(arr, 0, size);
        swap(arr, 0, --size);
    }
}
function heapInsert(arr, index) {
    while (arr[index] > arr[(index - 1) / 2]) {
        swap(arr, index, (index - 1) / 2);
        index = (index - 1) / 2;
    }
}
function heapify(arr, index, size) {
    let left = index * 2 + 1;
    while (left < size) {
        let largest = left + 1 < size && arr[left + 1] > arr[left] ? left + 1 : left;
        largest = arr[largest] > arr[index] ? largest : index;
        if (largest === index) {
            break;
        }
        swap(arr, largest, index);
        index = largest;
        left = index * 2 + 1;
    }
}
function swap(arr, i , j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
heapSort(arr);
console.log(arr);
