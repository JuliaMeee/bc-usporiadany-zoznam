
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

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    insert(x_node) {
        if (!x_node) {
            return;
        }

        let y_node = this.head;
        this.head = x_node;
        x_node.prev = null;
        x_node.next = y_node;

        if (y_node) {
            y_node.prev = x_node;
        } else {
            this.tail = x_node;
        }

        this.length++;
    }

    append(x_node) {
        if (!x_node) {
            return;
        }

        let y_node = this.tail;
        this.tail = x_node;
        x_node.next = null;
        x_node.prev = y_node;

        if (y_node) {
            y_node.next = x_node;
        } else {
            this.head = x_node;
        }

        this.length++;
    }

    insertAfter(x_node, y_node) {
        if (!x_node || !y_node) {
            return;
        }

        let z_node = x_node.next;
        x_node.next = y_node;
        y_node.prev = x_node;
        y_node.next = z_node;

        if (z_node) {
            z_node.prev = y_node;
        } else {
            this.tail = y_node;
        }

        this.length++;
    }

    remove(x_node) {
        if (!x_node) {
            return;
        }

        let w_node = x_node.prev;
        let y_node = x_node.next;

        if (w_node) {
            w_node.next = y_node;
        } else {
            this.head = y_node;
        }

        if (y_node) {
            y_node.prev = w_node;
        } else {
            this.tail = w_node;
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
