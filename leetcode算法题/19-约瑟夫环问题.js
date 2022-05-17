function getLive(n, m) {
    if(n===1){
        return 1;
    }
    return (getLive(n-1, m) + m - 1) % n + 1;
}

function lastRemaining(n, m) {
    return getLive(n, m) - 1;
}

console.log(lastRemaining(5, 3));
