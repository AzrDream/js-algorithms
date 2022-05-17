function kthSmalllest2(matrix, k) {
    let N = matrix.length;
    let M = matrix[0].length;
    let left = matrix[0][0];
    let right = matrix[N-1][M-1];
    let ans = 0;
    while(left <= right) {
        let mid = left + ((right - left) >> 1);
        // 小于等于mid有几个，小于等于mid在矩阵中真实出现的数，谁最接近mid
        let info = noMoreNum(matrix, mid);
        if(info.num < k) {
            left = mid + 1;
        }else{
            // 记最接近的数，然后左侧二分
            ans = info.near;
            right = mid - 1;
        }
    }
    return ans;
}
class Info{
    near;
    num;
    constructor(near, num) {
        this.near = near;
        this.num = num;
    }
}
function noMoreNum(matrix, value) {
    let near = Number.MIN_VALUE;
    let num = 0;
    let N = matrix.length;
    let M = matrix[0].length;
    let row = 0;
    let col = M - 1;
    while(row < N && col >= 0) {
        if(matrix[row][col] <= value) {
            near = Math.max(near, matrix[row][col]);
            num += col + 1;
            row++;
        }else{
            col--;
        }
    }
    return new Info(near, num);
}
