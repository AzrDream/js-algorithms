class IndexTree2D{
    constructor(matrix) {
        this.tree = [];
        this.nums = [];
        this.N = matrix.length;
        this.M = matrix[0].length;
        this.indexTree2D(matrix);
    }
    indexTree2D(matrix) {
        if (matrix.length === 0 || matrix[0].length === 0) {
            return;
        }
        this.conArr(this.tree, this.N + 1, this.M + 1);
        this.conArr(this.nums, this.N, this.M);
        for (let i = 0; i < this.N; i++) {
            for (let j = 0; j < this.M; j++) {
                this.update(i, j, matrix[i][j]);
            }
        }
    }
    sum(row, col) {
        let sum = 0;
        for (let i = row + 1; i > 0; i -= i & (-i)) {
            for (let j = col + 1; j > 0; j -= j & (-j)) {
                sum += this.tree[i][j];
            }
        }
        return sum;
    }
    update(row, col, val) {
        if (this.N === 0 || this.M === 0) {
            return;
        }
        let add = val - this.nums[row][col];
        this.nums[row][col] = val;
        for (let i = row + 1; i <= this.N; i += i & (-i)) {
            for (let j = col + 1; j <= this.M; j += j & (-j)) {
                this.tree[i][j] += add;
            }
        }
    }
    sumRegion(row1, col1, row2, col2) {
        if (this.N === 0 || this.M === 0) {
            return 0;
        }
        return this.sum(row2, col2) + this.sum(row1 - 1, col1 - 1) - this.sum(row1 - 1, col2) - this.sum(row2, col1 - 1);
    }
    conArr(arr, x, y){
        for(let i = 0; i < x; i++) {
            arr[i] = [];
            for(let j = 0; j < y; j++) {
                arr[i][j] = 0;
            }
        }
    }
}

let arr =  [
    [3, 0, 1, 4, 2],
    [5, 6, 3, 2, 1],
    [1, 2, 0, 1, 5],
    [4, 1, 0, 1, 7],
    [1, 0, 3, 0, 5]
];
let seg = new IndexTree2D(arr);
console.log(seg.sumRegion(2, 1, 4, 3)); // 8
seg.update(3, 2, 2);
console.log(seg.sumRegion(2, 1, 4, 3)); // 10
