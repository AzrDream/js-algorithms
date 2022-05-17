function countIslands(m) {
    if(m === null || m[0] === null) {
        return 0;
    }
    let N = m.length;
    let M = m[0].length;
    let res = 0;
    for(let i = 0; i < N; i++) {
        for(let j = 0; j < M; j++) {
            if(m[i][j] === 1) {
                res++;
                infect(m, i, j, N, M)
            }
        }
    }
    return res;
}
function infect(m, i, j, N, M) {
    if(i < 0 || i >= N || j < 0 || j >= M || m[i][j] !== 1) {
        return;
    }
    m[i][j] = 2;
    infect(m, i + 1, j, N, M);
    infect(m, i - 1, j, N, M);
    infect(m, i, j + 1, N, M);
    infect(m, i, j - 1, N, M);
}

let m1 = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
           [0, 1, 1, 1, 0, 1, 1, 1, 0],
           [0, 1, 1, 1, 0, 0, 0, 1, 0],
           [0, 1, 1, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 1, 1, 0, 0],
           [0, 0, 0, 0, 1, 1, 1, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0, 0]];
console.log(countIslands(m1));
