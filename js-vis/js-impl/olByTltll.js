class OlByTltll {
    constructor(x) {
        ol = this;
        visualisation.clearMessages();
        visualisation.addSequence();
        visualisation.logMessage("Initialize(" + x + ")", "blue", false);
        visualisation.addMessageIndent(1);

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
            visualisation.highlight(node => node.data().value === x, "blue",true,  false);
        }

        let xSublist = xNode.rep.value;

        if (OlUtils.violatesInvariant2(xSublist.length + 1, this.sublistN())) {
            visualisation.logMessage("split sublist in half (n_s = " + xSublist.length + ", N_s = " + this.sublistN() + ", n_s + 1 > 2 * N_s, violating invariant 2)", "blue", true);
            visualisation.addMessageIndent(1);
            this.splitSublist(xSublist);
            xSublist = xNode.rep.value;
            visualisation.addMessageIndent(-1);
            visualisation.highlight(node => node.data().value === x,"blue",  true, false);
        }

        let sublistU = OlUtils.calculateU(this.sublistN());

        if (!OlUtils.availableTagAfter(xNode, sublistU)) {
            visualisation.logMessage("relabel (no available tag after " + x, "blue", true);
            visualisation.addMessageIndent(1);
            OlUtils.relabel(xNode, xSublist.length, sublistU, xNode.rep.tag);
            visualisation.addMessageIndent(-1);
            visualisation.highlight(node => node.data().value === x, "blue",true,  true);
        }

        let yNode = new TaggedNodeWithRep(y, OlUtils.getNewTagAfter(xNode, sublistU));
        this.valueToNode.set(y, yNode);
        xSublist.insertAfter(xNode, yNode);
        yNode.rep = xNode.rep;
        this.n += 1;

        visualisation.refresh(true);
        visualisation.highlight(node => node.data().value === y, "green", false, false);
        visualisation.logMessage("inserted " + y + " after " + x , "green", false);
        visualisation.addMessageIndent(-1);
        visualisation.process();
    }

    delete(x) {
        visualisation.addSequence();
        visualisation.logMessage("Delete(" + x + ")", "blue", false);
        visualisation.addMessageIndent(1);
        visualisation.highlight((node => node.data().value === x), "red", true, false);
        let xNode = this.valueToNode.get(x);

        if (OlUtils.violatesInvariant1(this.n - 1, this.N)) {
            visualisation.logMessage("rebuild (n = " + this.n + ", N = " + this.N + ", N / 2 < n - 1, violating invariant 1)", "blue", true);
            visualisation.addMessageIndent(1);
            this.rebuild();
            visualisation.addMessageIndent(-1);
            visualisation.highlight((node => node.data().value === x), "red", false, false);
        }

        let xSublist = xNode.rep.value;

        if (OlUtils.violatesInvariant2(xSublist.length - 1, this.sublistN())) {
            visualisation.logMessage("also delete sublist rep (sublist is empty, violating invariant 2)", "blue", true);
            visualisation.highlight((node => node.data().tag === xNode.rep.tag && node.data().value === "sublistRep"), "red", false, false);
            this.reps.remove(xNode.rep);
        }

        xSublist.remove(xNode);
        this.valueToNode.delete(x);
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
        let result = false;

        if (xNode.rep.tag === yNode.rep.tag) {
            visualisation.logMessage(x + ".rep.tag == " + y + ".rep.tag", "blue", true);
            visualisation.addMessageIndent(1);
            result = xNode.tag < yNode.tag;
            visualisation.logMessage(x + ".tag " + (result ? "<" : ">") + " " + y + ".tag", "blue", true);
            visualisation.addMessageIndent(-1);
        }

        else {
            result = xNode.rep.tag < yNode.rep.tag;
            visualisation.logMessage(x + ".rep.tag " + (result ? "<" : ">") + " " + y + ".rep.tag", "blue", true);
        }

        visualisation.logMessage("order returned: " + result + ", " + x + (result? " < " : " > ") + y, "green", true);
        visualisation.addMessageIndent(-1);
        visualisation.process();
        return result;
    }

    sublistN() {
        if (this.N === 1) {
            return 1;
        }

        return Math.ceil(Math.log2(this.N));
    }

    repN() {
        if (this.N === 1) {
            return 1;
        }

        return Math.ceil(this.N / this.sublistN());
    }

    splitSublist(sublist) {
        let firstHalfRep = sublist.head.rep;

        if (!OlUtils.availableTagAfter(firstHalfRep, OlUtils.calculateU(this.repN()))) {
            visualisation.logMessage("relabel reps (no available tag for new sublist rep)", "blue", true);
            OlUtils.relabel(firstHalfRep, this.reps.length, OlUtils.calculateU(this.repN()));
            // visualisation.refresh(true);
        }

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

        secondHalfRep.tag = OlUtils.getNewTagAfter(firstHalfRep, OlUtils.calculateU(this.repN()));
        this.reps.insertAfter(firstHalfRep, secondHalfRep);

        visualisation.logMessage("split sublist into 2", "blue", true);
        visualisation.refresh(false);
    }

    rebuild() {
        this.N = this.n;
        visualisation.logMessage("set new N = n =" + this.N, "blue", true);
        visualisation.logMessage("set new N_s = log(N) = " + this.sublistN(), "blue", false);
        visualisation.logMessage("set new u_s = 2 * N_s ^ 2 = " + OlUtils.calculateU(this.sublistN()), "blue", false);
        visualisation.logMessage("set new N_r = N / N_s = " + this.repN(), "blue", false);
        visualisation.logMessage("set new u_r = 2 * N_r ^ 2 = " + OlUtils.calculateU(this.repN()), "blue", false);

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

        visualisation.refresh(false);
        visualisation.logMessage("evenly distributed nodes into " + this.reps.length + " sublists", "blue", false);
        visualisation.logMessage("set new (evenly distributed) tags for all reps", "blue", false);
        visualisation.logMessage("set new (evenly distributed) tags for all sublist nodes", "blue", false);
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

    getNumberOfElements() {
        return this.n;
    }

    getProperties() {
        let properties = [
            "Ordered list by tagged linked list",
            "n: " + this.n,
            "N: " + this.N,
            "N_s: " + this.sublistN(),
            "u_s: " + OlUtils.calculateU(this.sublistN()),
            "N_r: " + this.repN(),
            "u_r: " + OlUtils.calculateU(this.repN()),
        ]

        return properties;
    }

    toGraph(treeViewOn) {
        if (treeViewOn) {
            return OlToGraph.toGraphTltllTree(this.reps, OlUtils.calculateU(this.repN()), OlUtils.calculateU(this.sublistN()));
        }
        return OlToGraph.toGraphTltll(this.reps);
    }
}
