class OlByTltll {
    constructor(x) {
        this.reps = new DoublyLinkedList();
        this.value_to_node = {};
        let x_node = new TaggedNodeWithRep(x, 0);
        this.value_to_node[x] = x_node;
        let x_rep = new TaggedNode(new DoublyLinkedList(), 0);
        x_rep.value.insert(x_node);
        x_node.rep = x_rep;
        this.reps.insert(x_rep);
        this.n = 1;
        this.N = 2;
    }

    insert(x, y) {
        let x_node = this.value_to_node[x];

        if (OlUtils.violates_invariant_1(this.n + 1, this.N)) {
            this.rebuild();
        }

        let x_sublist = x_node.rep.value;

        if (this.violates_invariant_2(x_sublist.length + 1, this.sublist_N())) {
            this.split_sublist(x_sublist);
            x_sublist = x_node.rep.value;
        }

        let sublist_u = OlUtils.calculate_u(this.sublist_N());

        if (!OlUtils.available_tag_after(x_node, sublist_u)) {
            OlUtils.relabel(x_node, x_sublist.length, sublist_u);
        }

        let y_node = new TaggedNodeWithRep(y, OlUtils.get_new_tag_after(x_node, sublist_u));
        this.value_to_node[y] = y_node;
        x_sublist.insertAfter(x_node, y_node);
        y_node.rep = x_node.rep;
        this.n += 1;
    }

    delete(x) {
        let x_node = this.value_to_node[x];
        let x_sublist = x_node.rep.value;

        if (OlUtils.violates_invariant_1(this.n - 1, this.N)) {
            this.rebuild();
        }

        if (this.violates_invariant_2(x_sublist.length - 1, this.sublist_N())) {
            this.reps.remove(x_node.rep);
        }

        x_sublist.remove(x_node);
        delete this.value_to_node[x]
        this.n -= 1;
    }

    order(x, y) {
        let x_node = this.value_to_node[x];
        let y_node = this.value_to_node[y];

        if (x_node.rep.tag === y_node.rep.tag) {
            return x_node.tag < y_node.tag;
        }

        return x_node.rep.tag < y_node.rep.tag;
    }

    sublist_N() {
        if (this.N === 1) {
            return 1;
        }

        return Math.log2(this.N);
    }

    rep_N() {
        if (this.N === 1) {
            return 1;
        }

        return this.N / this.sublist_N();
    }

    violates_invariant_2(n_sublist, N_sublist) {
        return !(0 < n_sublist && n_sublist <= 2 * N_sublist);
    }

    split_sublist(sublist) {
        let first_half_rep = sublist.head.rep;
        first_half_rep.value = new DoublyLinkedList();
        let second_half_rep = new TaggedNode(new DoublyLinkedList(), 0);
        let half_count = Math.floor(sublist.length / 2);
        let node = sublist.head;

        for (let i = 0; i < sublist.length; i++) {
            let next_node = node.next;
            let rep = i < half_count ? first_half_rep : second_half_rep;
            rep.value.append(node);
            node.rep = rep;
            node = next_node;
        }

        let sublist_u = OlUtils.calculate_u(this.sublist_N());
        OlUtils.assign_new_tags(first_half_rep.value.head, half_count, 0, sublist_u);
        OlUtils.assign_new_tags(second_half_rep.value.head, half_count, 0, sublist_u);

        if (!OlUtils.available_tag_after(first_half_rep, OlUtils.calculate_u(this.rep_N()))) {
            OlUtils.relabel(first_half_rep, this.reps.length, OlUtils.calculate_u(this.rep_N()));
        }

        second_half_rep.tag = OlUtils.get_new_tag_after(first_half_rep, OlUtils.calculate_u(this.rep_N()));
        this.reps.insertAfter(first_half_rep, second_half_rep);
    }

    rebuild() {
        console.log("rebuild");
        this.N = this.n;
        let sublist_N = this.sublist_N();
        let rep_N = this.rep_N();
        let old_rep = this.reps.head;
        let node = old_rep.value.head;
        this.reps = new DoublyLinkedList();

        while (node) {
            let new_rep = new TaggedNode(new DoublyLinkedList());

            for (let i = 0; i < sublist_N; i++) {
                let next_node = node.next;
                new_rep.value.append(node);
                node.rep = new_rep;
                node = next_node;

                if (!node) {
                    old_rep = old_rep.next;

                    if (!old_rep) {
                        break;
                    }

                    node = old_rep.value.head;
                }
            }

            OlUtils.assign_new_tags(new_rep.value.head, new_rep.value.length, 0, OlUtils.calculate_u(sublist_N));
            this.reps.append(new_rep);
        }

        OlUtils.assign_new_tags(this.reps.head, this.reps.length, 0, OlUtils.calculate_u(rep_N));
    }

    toString() {
        let text = "OlByTltll ";
        for (let rep of this.reps) {
            text += rep.toString();
        }

        return text;
    }

}
