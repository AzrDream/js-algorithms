function candy1(arr) {
    if(arr === null || arr.length === 0) {
        return 0;
    }
    let N = arr.length;
    let left = [];
    for(let i = 0; i < N; i++) {
        left[i] = 1;
    }
    for(let i = 1; i < N; i++) {
        if(arr[i-1] < arr[i]) {
            left[i] = left[i-1] + 1;
        }
    }
    let right = [];
    for(let i = 0; i < N; i++) {
        right[i] = 1;
    }
    for(let i = N-2; i >= 0; i--) {
        if(arr[i] > arr[i+1]) {
            right[i] = right[i+1] + 1
        }
    }
    let ans = 0;
    for(let i = 0; i < N; i++) {
        ans+=Math.max(left[i],right[i]);
    }
    return ans;
}

function candy2(arr) {
    if(arr === null || arr.length === 0) {
        return 0;
    }
    let N = arr.length;
    let left = [];
    for(let i = 0; i < N; i++) {
        left[i] = 1;
    }
    for(let i = 1; i < N; i++) {
        if(arr[i-1] < arr[i]) {
            left[i] = left[i-1] + 1;
        }else if(arr[i] === arr[i]) {
            left[i] = left[i-1]
        }
    }
    let right = [];
    for(let i = 0; i < N; i++) {
        right[i] = 1;
    }
    for(let i = N-2; i >= 0; i--) {
        if(arr[i] > arr[i+1]) {
            right[i] = right[i+1] + 1;
        }else if(arr[i] === arr[i]) {
            right[i] = right[i-1];
        }
    }
    let ans = 0;
    for(let i = 0; i < N; i++) {
        ans+=Math.max(left[i],right[i]);
    }
    return ans;
}

let arr = [1,2,3,4,2,2,1,1];
console.log(candy1(arr));
console.log(candy2(arr));
