class OlByTltll {
    constructor(x) {
        this.reps = new DoublyLinkedList();
        this.valueToNode = new Map();
        let xNode = new TaggedNodeWithRep(x, 0);
        this.valueToNode.set(x, xNode);
        let xRep = new TaggedNode(new DoublyLinkedList(), 0);
        xRep.value.insert(xNode);
        xNode.rep = xRep;
        this.reps.insert(xRep);
        this.n = 1;
        this.N = 2;
    }

    insert(x, y) {
        let xNode = this.valueToNode.get(x);

        if (OlUtils.violatesInvariant1(this.n + 1, this.N)) {
            this.rebuild();
        }

        let xSublist = xNode.rep.value;

        if (this.violatesInvariant2(xSublist.length + 1, this.sublistN())) {
            this.splitSublist(xSublist);
            xSublist = xNode.rep.value;
        }

        let sublistU = OlUtils.calculateU(this.sublistN());

        if (!OlUtils.availableTagAfter(xNode, sublistU)) {
            OlUtils.relabel(xNode, xSublist.length, sublistU);
        }

        let yNode = new TaggedNodeWithRep(y, OlUtils.getNewTagAfter(xNode, sublistU));
        this.valueToNode.set(y, yNode);
        xSublist.insertAfter(xNode, yNode);
        yNode.rep = xNode.rep;
        this.n += 1;
    }

    delete(x) {
        let xNode = this.valueToNode.get(x);
        let xSublist = xNode.rep.value;

        if (OlUtils.violatesInvariant1(this.n - 1, this.N)) {
            this.rebuild();
        }

        if (this.violatesInvariant2(xSublist.length - 1, this.sublistN())) {
            this.reps.remove(xNode.rep);
        }

        xSublist.remove(xNode);
        this.valueToNode.delete(x);
        this.n -= 1;
    }

    order(x, y) {
        let xNode = this.valueToNode.get(x);
        let yNode = this.valueToNode.get(y);

        if (xNode.rep.tag === yNode.rep.tag) {
            return xNode.tag < yNode.tag;
        }

        return xNode.rep.tag < yNode.rep.tag;
    }

    sublistN() {
        if (this.N === 1) {
            return 1;
        }

        return Math.log2(this.N);
    }

    repN() {
        if (this.N === 1) {
            return 1;
        }

        return this.N / this.sublistN();
    }

    violatesInvariant2(nSublist, NSublist) {
        return !(0 < nSublist && nSublist <= 2 * NSublist);
    }

    splitSublist(sublist) {
        let firstHalfRep = sublist.head.rep;
        firstHalfRep.value = new DoublyLinkedList();
        let secondHalfRep = new TaggedNode(new DoublyLinkedList(), 0);
        let halfCount = Math.floor(sublist.length / 2);
        let node = sublist.head;

        for (let i = 0; i < sublist.length; i++) {
            let nextNode = node.next;
            let rep = i < halfCount ? firstHalfRep : secondHalfRep;
            rep.value.append(node);
            node.rep = rep;
            node = nextNode;
        }

        let sublistU = OlUtils.calculateU(this.sublistN());
        OlUtils.assignNewTags(firstHalfRep.value.head, halfCount, 0, sublistU);
        OlUtils.assignNewTags(secondHalfRep.value.head, halfCount, 0, sublistU);

        if (!OlUtils.availableTagAfter(firstHalfRep, OlUtils.calculateU(this.repN()))) {
            OlUtils.relabel(firstHalfRep, this.reps.length, OlUtils.calculateU(this.repN()));
        }

        secondHalfRep.tag = OlUtils.getNewTagAfter(firstHalfRep, OlUtils.calculateU(this.repN()));
        this.reps.insertAfter(firstHalfRep, secondHalfRep);
    }

    rebuild() {
        console.log("rebuild");
        this.N = this.n;
        let sublistN = this.sublistN();
        let repN = this.repN();
        let oldRep = this.reps.head;
        let node = oldRep.value.head;
        this.reps = new DoublyLinkedList();

        while (node) {
            let newRep = new TaggedNode(new DoublyLinkedList());

            for (let i = 0; i < sublistN; i++) {
                let nextNode = node.next;
                newRep.value.append(node);
                node.rep = newRep;
                node = nextNode;

                if (!node) {
                    oldRep = oldRep.next;

                    if (!oldRep) {
                        break;
                    }

                    node = oldRep.value.head;
                }
            }

            OlUtils.assignNewTags(newRep.value.head, newRep.value.length, 0, OlUtils.calculateU(sublistN));
            this.reps.append(newRep);
        }

        OlUtils.assignNewTags(this.reps.head, this.reps.length, 0, OlUtils.calculateU(repN));
    }

    toString() {
        let text = "OlByTltll ";
        for (let rep of this.reps) {
            text += rep.toString() + "  ";
        }

        return text;
    }

    contains(x) {
        return this.valueToNode.has(x);
    }
}
