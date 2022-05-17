function buildArr(arr,N,M) {
    for(let i = 0; i < N; i++) {
        if(!M){
            arr[i] = 0;
        }else{
            arr[i] = [];
            for(let j = 0; j < M; j++) {
                arr[i][j] = 0;
            }
        }
    }
    return arr;
}
function shortestBridge(m) {
    let N = m.length;
    let M = m[0].length;
    let all = N*M;
    let island = 0;
    let curs = buildArr([],all);
    let nexts = buildArr([],all);
    // 两片1，所以要准备两个辅助空间
    let records = buildArr([],2,all);
    for(let i = 0; i < N; i++) {
        for(let j = 0; j < M; j++) {
            if(m[i][j] === 1) { // 当前位置发现了1
                // 把这一片的1都变成2，同时，得到这一片1组成的初始队列curs
                // 把这一片的1到自己的距离都设置成1，在records
                let queueSize = infect(m,i,j,N,M,curs,0,records[island]);
                let V = 1;
                while(queueSize !== 0) {
                    V++;
                    // curs里面的点，上下左右，records[点]===0,nexts
                    queueSize = bfs(N,M,all,V,curs,queueSize,nexts,records[island]);
                    let tmp = curs; // 由一个数组bfs获得另一个数组，不断的复用，所以交换，为了省空间
                    curs = nexts;
                    nexts = tmp;
                }
                island++;
            }
        }
    }
    let min = Number.MAX_VALUE;
    for(let i = 0; i < all; i++) {
        min = Math.min(min, records[0][i]+records[1][i]);
    }
    return min-3;
}
// 当前来到m[i][j]，总的行数是N，总的列数是M
// m[i][j]感染出去(找到这一片岛所有的1)，把每一个1的坐标，放入到curs队列中
// record这个是二维已经变一维了，是个一维数组
// 返回队列的长度，也就是队列成长到了什么位置
function infect(m,i,j,N,M,curs,index,record) {
    if(i<0||i===N||j<0||j===M||m[i][j]!==1) {
        return index;
    }
    m[i][j] = 2;    // 走过的路都改成2，不走回头路，防止递归不完
    let p = i*M+j;
    record[p] = 1;
    // 收集不同的1
    curs[index++] = p;
    // 上下左右找1
    index = infect(m,i-1,j,N,M,curs,index,record);
    index = infect(m,i+1,j,N,M,curs,index,record);
    index = infect(m,i,j-1,N,M,curs,index,record);
    index = infect(m,i,j+1,N,M,curs,index,record);
    return index;
}
// 二维原始矩阵中，N总行号，M总列数
// all 总 all=N*M
// V 要生成的第几层 curs V-1  nexts V
// record中拿距离
function bfs(N,M,all,V,curs,size,nexts,record) {
    let nexti = 0;  // 我要生成的下一层队列成长到哪了
    for(let i = 0; i < size; i++) {
        // curs[i] -> 一个位置
        let up = curs[i] < M?-1:curs[i]-M;
        let down = curs[i]+M>=all?-1:curs[i]+M;
        let left = curs[i]%M===0?-1:curs[i]-1;
        let right = curs[i]%M===M-1?-1:curs[i]+1;
        if(up !== -1 && record[up] === 0) { // 上方有点并且没有去过
            record[up] = V;
            nexts[nexti++] = up;
        }
        if(down !== -1 && record[down] === 0) {
            record[down] = V;
            nexts[nexti++] = down;
        }
        if(left !== -1 && record[left] === 0) {
            record[left] = V;
            nexts[nexti++] = left;
        }
        if(right !== -1 && record[right] === 0) {
            record[right] = V;
            nexts[nexti++] = right;
        }
    }
    return nexti;
}

let arr = [[1,1,1,1,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,0,1],[1,1,1,1,1]];
console.log(shortestBridge(arr));
