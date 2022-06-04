function largest1BorderedSquare(m) {
    let right = [];
    let down = [];
    conArr(right, m.length, m[0].length);
    conArr(down, m.length, m[0].length);
    setBorderMap(m, right, down);
    for (let size = Math.min(m.length, m[0].length); size !== 0; size--) {
        if (hasSizeOfBorder(size, right, down)) {
            return size * size;
        }
    }
    return 0;
}
function conArr(arr, a, b) {
    for(let i = 0; i < a; i++) {
        arr[i] = [];
        for(let j = 0; j < b; j++) {
            arr[i][j] = 0;
        }
    }
}
// 设置右信息与下信息
function setBorderMap(m, right, down) {
    let r = m.length;
    let c = m[0].length;
    if (m[r - 1][c - 1] === 1) {
        right[r - 1][c - 1] = 1;
        down[r - 1][c - 1] = 1;
    }
    for (let i = r - 2; i !== -1; i--) {
        if (m[i][c - 1] === 1) {
            right[i][c - 1] = 1;
            down[i][c - 1] = down[i + 1][c - 1] + 1;
        }
    }
    for (let i = c - 2; i !== -1; i--) {
        if (m[r - 1][i] === 1) {
            right[r - 1][i] = right[r - 1][i + 1] + 1;
            down[r - 1][i] = 1;
        }
    }
    for (let i = r - 2; i !== -1; i--) {
        for (let j = c - 2; j !== -1; j--) {
            if (m[i][j] === 1) {
                right[i][j] = right[i][j + 1] + 1;
                down[i][j] = down[i + 1][j] + 1;
            }
        }
    }
}
// 验证正方形
function hasSizeOfBorder(size, right, down) {
    for (let i = 0; i !== right.length - size + 1; i++) {
        for (let j = 0; j !== right[0].length - size + 1; j++) {
            if (right[i][j] >= size && down[i][j] >= size && right[i + size - 1][j] >= size
                && down[i][j + size - 1] >= size) {
                return true;
            }
        }
    }
    return false;
}
let grid = [[1,1,1],[1,0,1],[1,1,1]];
console.log(largest1BorderedSquare(grid));
