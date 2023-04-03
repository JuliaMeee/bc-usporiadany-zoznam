class OlByTll {
    constructor(x) {
        ol = this;
        visualisation.clearMessages();
        visualisation.addSequence();
        visualisation.logMessage("Initialize(" + x + ")", "blue", false);
        visualisation.addMessageIndent(1);

        this.linkedList = new DoublyLinkedList();
        this.valueToNode = new Map();
        this.n = 1;
        this.N = 2;
        this.u = OlUtils.calculateU(this.N);
        this.valueToNode.set(x, new TaggedNode(x, 0));
        this.linkedList.insert(this.valueToNode.get(x));

        visualisation.refresh(false);
        visualisation.logMessage("initialized new ordered list with value " + x, 'green', false);
        visualisation.addMessageIndent(-1);
        visualisation.process();
    }

    insert(x, y) {
        visualisation.addSequence();
        visualisation.logMessage("Insert(" + x + ", " + y + ")","blue", false);
        visualisation.addMessageIndent(1);

        let xNode = this.valueToNode.get(x);
        visualisation.highlight(node => node.data().value === x, "blue", true, false);

        if (OlUtils.violatesInvariant1(this.n + 1, this.N)) {
            visualisation.logMessage("rebuild (n = " + this.n + ", N = " + this.N + ", n + 1 > 2 * N, violating invariant 1)", "blue", true);
            visualisation.addMessageIndent(1);
            this.rebuild();
            visualisation.addMessageIndent(-1);
            visualisation.highlight(node => node.data().value === x, "blue", true, false);
        }

        if (!OlUtils.availableTagAfter(xNode, this.u)) {
            visualisation.logMessage("relabel (no available tag after " + x + ")", "blue", true);
            visualisation.addMessageIndent(1);
            OlUtils.relabel(xNode, this.n, this.u);
            visualisation.addMessageIndent(-1);
            visualisation.highlight(node => node.data().value === x, "blue", true,true);
        }

        let yNode = new TaggedNode(y, OlUtils.getNewTagAfter(xNode, this.u));
        this.valueToNode.set(y, yNode);
        this.linkedList.insertAfter(xNode, yNode);
        this.n += 1;

        visualisation.refresh(true);
        visualisation.highlight(node => node.data().value === y, "green", false, false);
        visualisation.logMessage("inserted " + y + " after " + x, "green", false);
        visualisation.addMessageIndent(-1);
        visualisation.process();
    }

    delete(x) {
        visualisation.addSequence();
        visualisation.logMessage("Delete(" + x + ")", "blue", false);
        visualisation.addMessageIndent(1);
        visualisation.highlight((node => node.data().value === x), "red", true, false);
        if (OlUtils.violatesInvariant1(this.n - 1, this.N)) {
            visualisation.logMessage("rebuild (n = " + this.n + ", N = " + this.N + ", N / 2 < n - 1, violating invariant 1)", "blue", true);
            visualisation.addMessageIndent(1);
            this.rebuild();
            visualisation.addMessageIndent(-1);
            visualisation.highlight((node => node.data().value === x), "red", false, false);
        }

        let xNode = this.valueToNode.get(x);
        this.valueToNode.delete(x);
        this.linkedList.remove(xNode);
        this.n -= 1;

        visualisation.refresh(true);
        visualisation.logMessage("deleted " + x, "green", false);
        visualisation.addMessageIndent(-1);
        visualisation.process();
    }

    order(x, y) {
        visualisation.addSequence();
        visualisation.logMessage("Order(" + x + ", " + y + ")", "blue", false);
        visualisation.addMessageIndent(1);
        visualisation.highlight((node => node.data().value === x), "blue", true, false);
        visualisation.highlight((node => node.data().value === y), "blue", false, false);

        let xNode = this.valueToNode.get(x);
        let yNode = this.valueToNode.get(y);

        let result = xNode.tag < yNode.tag;
        visualisation.logMessage(x + ".tag " + (result ? "<" : ">") + " " + y + ".tag", "blue", true);

        visualisation.logMessage("order returned: " + result + ", " + x + (result? " < " : " > ") + y, "green", true);
        visualisation.addMessageIndent(-1);
        visualisation.process();
        return result;
    }

    rebuild() {
        this.N = this.n;
        this.u = OlUtils.calculateU(this.N);
        visualisation.logMessage("set new N = n = " + this.N, "blue", true);
        visualisation.logMessage("set new u = max(N * 4, N ^ 2) = " + this.u, "blue", false);
        OlUtils.assignNewTags(this.linkedList.head, this.n, 0, this.u);
        visualisation.refresh(false);
        visualisation.logMessage("set new (evenly distributed) tags for all nodes", "blue", false);
    }

    toString() {
        return "OlByTll N:" + this.N + " u:" + this.u + this.linkedList.toString();
    }

    contains(x) {
        return this.valueToNode.has(x);
    }

    getNumberOfElements() {
        return this.n;
    }

    getProperties() {
        let properties = [
            "Ordered list by tagged linked list",
            "n: " + this.n,
            "N: " + this.N,
            "u: " + this.u,
        ]

        return properties;
    }

    toGraph(treeViewOn) {
        if (treeViewOn) {
            return OlToGraph.toGraphTllTree(this.linkedList, this.u);
        }

        return OlToGraph.toGraphTll(this.linkedList);
    }

}
