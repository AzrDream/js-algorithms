class List{
    constructor() {
        this.dataSouce = [];
        this.listSize = 0; // 列表的大小
        this.pos = 0;     // 列表中当前的位置
    }
    /**
     * 在列表的末尾添加新元素
     * @param {*} element 要添加的元素
     */
    append(element) {
        this.dataSouce[this.listSize++] = element;
    }

    /**
     * 在列表中插入一个元素
     * @param {*} element
     * @param {*} after
     */
    insert(element) {
        this.dataSouce.push(element);
        this.listSize++;
    }

    /**
     * 在列表中移除一个元素
     * @param {*} element 要删除的元素
     */
    remove(element) {
        // 查找当前元素的索引
        const index = this.dataSouce.indexOf(element);
        if (index >= 0) {
            this.dataSouce.splice(index, 1);
            this.listSize--;
            return true;
        }
        return false;
    }

    /**
     * 判断给定的值是否在列表中
     */
    contains(element) {
        return this.dataSouce.indexOf(element) > -1;
    }

    /**
     * 将列表的当前位置设移动到第一个元素
     */
    front() {
        this.pos = 0;
    }

    /**
     * 将列表的当前位置移动到最后一个元素
     */
    end() {
        this.pos = this.listSize - 1;
    }

    /**
     * 将当前位置前移一位
     */
    prev() {
        if (this.pos > 0) {
            --this.pos;
        }
    }

    /**
     * 将当前位置向后移一位
     */
    next() {
        if (this.pos <= (this.listSize - 1)) {
            ++this.pos;
        }
    }

    /**
     * 返回列表的当前位置
     */
    currPos() {
        return this.pos;
    }

    /**
     * 将当前位置移动到指定位置
     * @param {*} position
     */
    moveTo(position) {
        this.pos = position;
    }

    /**
     * 返回当前位置的元素
     */
    getElement() {
        return this.dataSouce[this.pos];
    }

    /**
     * 清楚列表中的元素
     */
    clear() {
        delete this.dataSouce;
        this.dataSouce = [];
        tihs.listSize = 0;
        this.pos = 0;
    }

    /**
     * 列表的长度
     */
    length() {
        return this.listSize;
    }

    /**
     * 显示当前列表的元素
     */
    toString() {
        return this.dataSouce;
    }
}

function fun(s) {
    return remove(s, [],0,0,['(',')']);
}

function remove(s, ans, checkIndex, deleteIndex, par) {
    for(let count=0,i = checkIndex; i < s.length; i++) {
        if(s[i] === par[0]) {
            count++;
        }
        if(s[i] === par[1]) {
            count--;
        }
        // i check计数<0的第一个位置
        if(count < 0) {
            for(let j = deleteIndex; j <= i; ++j) {
                // 比如
                if(s[j] === par[1] && (j === deleteIndex || s[j-1] !== par[1])) {
                    remove(s.substring(0, j) + s.substring(j+1, s.length), ans, i, j, par);
                }
            }
            return;
        }
    }
    // 逆序执行一遍函数，但是防止无穷尽的执行，如果0位置是左括号就执行函数，否则就已经执行过来，直接输结果
    let reversed = s.split('').reverse().join('');
    if(par[0] === '(') {
        remove(reversed, ans, 0, 0, [')','(']);
    }else{
        ans.push(reversed);
    }
}

let s = "()())()";
console.log(fun(s));
