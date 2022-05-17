function minPath1(matrix) {
    return process1(matrix, 0, 0);
}
function process1(matrix, i, j) {
    if(i === matrix.length-1 && j === matrix[0].length-1) {
        return matrix[i][j];
    }
    if(i === matrix.length - 1) {
        return matrix[i][j] + process1(matrix, i, j+1);
    }
    if(j === matrix[0].length - 1) {
        return matrix[i][j] + process1(matrix, i+1, j);
    }
    let right = process1(matrix, i, j+1);
    let down = process1(matrix, i+1, j);
    return matrix[i][j] + Math.min(right, down);
}
let m = [[1, 3, 5, 9],
        [8, 1, 3, 4],
        [5, 0, 6, 1],
        [8, 8, 4, 0]];
console.log(minPath1(m));
