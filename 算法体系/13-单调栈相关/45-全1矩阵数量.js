function numSubmat(mat) {
    if (mat == null || mat.length === 0 || mat[0].length === 0) {
        return 0;
    }
    let nums = 0;
    let height = [];
    for(let i = 0; i < mat[0].length; i++) {
        height[i] = 0;
    }
    for (let i = 0; i < mat.length; i++) {
        for (let j = 0; j < mat[0].length; j++) {
            height[j] = mat[i][j] === 0 ? 0 : height[j] + 1;
        }
        nums += countFromBottom(height);
    }
    return nums;
}
function countFromBottom(height) {
    if (height == null || height.length === 0) {
        return 0;
    }
    let nums = 0;
    let stack = [];
    for(let i = 0; i < height.length; i++) {
        stack[i] = 0;
    }
    let si = -1;
    for (let i = 0; i < height.length; i++) {
        while (si !== -1 && height[stack[si]] >= height[i]) {
            let cur = stack[si--];
            if (height[cur] > height[i]) {
                let left = si === -1 ? -1 : stack[si];
                let n = i - left - 1;
                let down = Math.max(left === -1 ? 0 : height[left], height[i]);
                nums += (height[cur] - down) * num(n);
            }

        }
        stack[++si] = i;
    }
    while (si !== -1) {
        let cur = stack[si--];
        let left = si === -1  ? -1 : stack[si];
        let n = height.length - left - 1;
        let down = left === -1 ? 0 : height[left];
        nums += (height[cur] - down) * num(n);
    }
    return nums;
}
function num(n) {
    return ((n * (1 + n)) >> 1);
}
let arr =  [[1,0,1],[1,1,0],[1,1,0]];
console.log(numSubmat(arr));
