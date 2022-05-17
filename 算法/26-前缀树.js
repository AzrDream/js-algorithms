class TrieNode {
    constructor() {
        this.path = null;
        this.end = null;
        this.nexts = null;
    }
    TrieNode() {
        this.path = 0;
        this.end = 0;
        this.nexts = [];
    }
}
class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    insert(word) {
        if(word === null) {
            return;
        }
        let chs = [];
        let node = this.root;
        let index = 0;
        for(let i = 0; i < chs.length; i++) {
            index = chs[i]
        }
    }
}
