function printMatrixZigZag(matrix) {
    let tR = 0;
    let tC = 0;
    let dR = 0;
    let dC = 0;
    let endR = matrix.length - 1;
    let endC = matrix[0].length - 1;
    let fromUp = false;
    while (tR !== endR + 1) {
        printLevel(matrix, tR, tC, dR, dC, fromUp);
        tR = tC === endC ? tR + 1 : tR;
        tC = tC === endC ? tC : tC + 1;
        dC = dR === endR ? dC + 1 : dC;
        dR = dR === endR ? dR : dR + 1;
        fromUp = !fromUp;
    }
}
function printLevel(m, tR, tC, dR, dC, f) {
    if (f) {
        while (tR !== dR + 1) {
            console.log(m[tR++][tC--] + " ");
        }
    } else {
        while (dR !== tR - 1) {
            console.log(m[dR--][dC++] + " ");
        }
    }
}
let arr = [[1,2,3,4],[5,6,7,8],[9,10,11,12]];
printMatrixZigZag(arr);
