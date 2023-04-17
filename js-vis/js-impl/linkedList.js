
class Node {
    constructor(value) {
        this.prev = null;
        this.next = null;
        this.value = value;
    }

    toString() {
        return this.value.toString();
    }

}

class TaggedNode extends Node {
    constructor(x, tag = 0) {
        super(x);
        this.tag = tag;
    }

    toString() {
        return "[" + this.tag.toString() + "]" + super.toString();
    }

}

class TaggedNodeWithRep extends TaggedNode {
    constructor(x, tag = 0, rep = null) {
        super(x, tag);

        this.rep = rep;
    }

}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    insert(xNode) {
        if (!xNode) {
            return;
        }

        let yNode = this.head;
        this.head = xNode;
        xNode.prev = null;
        xNode.next = yNode;

        if (yNode) {
            yNode.prev = xNode;
        } else {
            this.tail = xNode;
        }

        this.length++;
    }

    append(xNode) {
        if (!xNode) {
            return;
        }

        let yNode = this.tail;
        this.tail = xNode;
        xNode.next = null;
        xNode.prev = yNode;

        if (yNode) {
            yNode.next = xNode;
        } else {
            this.head = xNode;
        }

        this.length++;
    }

    insertAfter(xNode, yNode) {
        if (!xNode || !yNode) {
            return;
        }

        let zNode = xNode.next;
        xNode.next = yNode;
        yNode.prev = xNode;
        yNode.next = zNode;

        if (zNode) {
            zNode.prev = yNode;
        } else {
            this.tail = yNode;
        }

        this.length++;
    }

    remove(xNode) {
        if (!xNode) {
            return;
        }

        let wNode = xNode.prev;
        let yNode = xNode.next;

        if (wNode) {
            wNode.next = yNode;
        } else {
            this.head = yNode;
        }

        if (yNode) {
            yNode.prev = wNode;
        } else {
            this.tail = wNode;
        }

        this.length--;
    }
    *[Symbol.iterator]() {
        this.iterCurrentNode = this.head;
        while (this.iterCurrentNode) {
            let node = this.iterCurrentNode;
            this.iterCurrentNode = this.iterCurrentNode.next;
            yield node;
        }
    }

    toString() {
        let text = "|" + this.length + "|:";
        for (let n of this) {
            text += " -> " + n.toString();
        }

        return text;
    }
}
