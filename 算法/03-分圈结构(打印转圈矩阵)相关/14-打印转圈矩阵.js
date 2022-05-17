function spiralOrderPrint(matrix) {
    let tR = 0;
    let tC = 0;
    let dR = matrix.length - 1;
    let dC = matrix[0].length - 1;
    while (tR <= dR && tC <= dC) {
        printEdge(matrix, tR++, tC++, dR--, dC--);
    }
}
function printEdge(m, tR, tC, dR, dC) {
    if (tR === dR) {
        for (let i = tC; i <= dC; i++) {
            console.log(m[tR][i] + " ");
        }
    } else if (tC === dC) {
        for (let i = tR; i <= dR; i++) {
            console.log(m[i][tC] + " ");
        }
    } else {
        let curC = tC;
        let curR = tR;
        while (curC !== dC) {
            console.log(m[tR][curC] + " ");
            curC++;
        }
        while (curR !== dR) {
            console.log(m[curR][dC] + " ");
            curR++;
        }
        while (curC !== tC) {
            console.log(m[dR][curC] + " ");
            curC--;
        }
        while (curR !== tR) {
            console.log(m[curR][tC] + " ");
            curR--;
        }
    }
}
let arr = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]];
spiralOrderPrint(arr);
