class OlByTll {
    constructor(x) {
        this.linked_list = new DoublyLinkedList();
        this.value_to_node = {};
        this.n = 1;
        this.N = 2;
        this.u = OlUtils.calculate_u(this.N);
        this.value_to_node[x] = new TaggedNode(x, 0);
        this.linked_list.insert(this.value_to_node[x]);
    }

    insert(x, y) {
        let x_node = this.value_to_node[x];

        if (OlUtils.violates_invariant_1(this.n + 1, this.N)) {
            this.rebuild();
        }

        if (!OlUtils.available_tag_after(x_node, this.u)) {
            OlUtils.relabel(x_node, this.n, this.u);
        }

        let y_node = new TaggedNode(y, OlUtils.get_new_tag_after(x_node, this.u));
        this.value_to_node[y] = y_node;
        this.linked_list.insertAfter(x_node, y_node);
        this.n += 1;
    }

    delete(x) {
        if (OlUtils.violates_invariant_1(this.n - 1, this.N)) {
            this.rebuild();
        }

        let x_node = this.value_to_node[x];
        delete this.value_to_node[x];
        this.linked_list.remove(x_node);
        this.n -= 1;
    }

    order(x, y) {
        let x_node = this.value_to_node[x];
        let y_node = this.value_to_node[y];
        return x_node.tag < y_node.tag;
    }

    rebuild() {
        console.log("rebuild");
        this.N = this.n;
        this.u = OlUtils.calculate_u(this.N);
        OlUtils.assign_new_tags(this.linked_list.head, this.n, 0, this.u);
    }

    toString() {
        return "OlByTll N:" + this.N + " u:" + this.u + this.linked_list.toString();
    }

}
