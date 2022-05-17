class Program{
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}
function comparator(o1, o2) {
    return o1.end - o2.end;
}
function bestArrange(programs, start) {
    programs.sort(comparator);
    let result = 0;
    for(let i = 0; i < programs.length; i++) {
        if(start <= programs[i].start) {
            result++;
            start = programs[i].end;
        }
    }
    return result;
}
