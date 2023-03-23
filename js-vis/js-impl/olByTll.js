class OlByTll {
    constructor(x) {
        this.linkedList = new DoublyLinkedList();
        this.valueToNode = new Map();
        this.n = 1;
        this.N = 2;
        this.u = OlUtils.calculateU(this.N);
        this.valueToNode.set(x, new TaggedNode(x, 0));
        this.linkedList.insert(this.valueToNode.get(x));
    }

    insert(x, y) {
        let xNode = this.valueToNode.get(x);

        if (OlUtils.violatesInvariant1(this.n + 1, this.N)) {
            this.rebuild();
        }

        if (!OlUtils.availableTagAfter(xNode, this.u)) {
            OlUtils.relabel(xNode, this.n, this.u);
        }

        let yNode = new TaggedNode(y, OlUtils.getNewTagAfter(xNode, this.u));
        this.valueToNode.set(y, yNode);
        this.linkedList.insertAfter(xNode, yNode);
        this.n += 1;
    }

    delete(x) {
        if (OlUtils.violatesInvariant1(this.n - 1, this.N)) {
            this.rebuild();
        }

        let xNode = this.valueToNode.get(x);
        this.valueToNode.delete(x);
        this.linkedList.remove(xNode);
        this.n -= 1;
    }

    order(x, y) {
        let xNode = this.valueToNode.get(x);
        let yNode = this.valueToNode.get(y);
        return xNode.tag < yNode.tag;
    }

    rebuild() {
        console.log("rebuild");
        this.N = this.n;
        this.u = OlUtils.calculateU(this.N);
        OlUtils.assignNewTags(this.linkedList.head, this.n, 0, this.u);
    }

    toString() {
        return "OlByTll N:" + this.N + " u:" + this.u + this.linkedList.toString();
    }

    contains(x) {
        return this.valueToNode.has(x);
    }

}
