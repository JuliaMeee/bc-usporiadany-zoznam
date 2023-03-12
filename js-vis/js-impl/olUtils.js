class OlUtils {
    static assign_new_tags(minNode, nodesCount, minTag, maxTag) {
        console.log("assign new tags: ", minNode, nodesCount, minTag, maxTag);
        let tag_offset = (Math.floor((1 + maxTag - minTag) / nodesCount));
        let tag = minTag;
        let node = minNode;

        while (nodesCount > 0 && node !== null) {
            node.tag = tag;
            node = node.next;
            tag += tag_offset;
            nodesCount -= 1;
        }
    }

    static available_tag_after(x_node, u) {
        let min_tag = x_node.tag + 1;
        let max_tag = u - 1;

        if (x_node.next !== null) {
            max_tag = x_node.next.tag - 1;
        }

        return max_tag - min_tag >= 0;
    }

    static get_new_tag_after(x_node, u) {
        let min_tag = x_node.tag + 1;
        let max_tag = u - 1;

        if (x_node.next !== null) {
            max_tag = x_node.next.tag - 1;
        }

        let new_tag = Math.floor((min_tag + max_tag) / 2);
        return new_tag;
    }

    static relabel(x_node, n, u) {
        console.log("relabel");
        let T = this.calculate_T(n, u);
        console.log("T: ", T);
        let interval = new TagInterval(x_node);
        interval.increase();

        while (interval.density() > this.overflow_threshold(T, interval.level)) {
            console.log("interval:", interval.min_tag, "-", interval.max_tag_excl, "n:", interval.nodes_count);
            interval.increase();
        }

        console.log("interval:", interval.min_tag, "-", interval.max_tag_excl, "n:", interval.nodes_count);

        this.assign_new_tags(interval.min_node, interval.nodes_count, interval.min_tag, interval.max_tag_excl - 1);
    }

    static calculate_T(n, u) {
        console.log("calculate_T with: n:", n, " u:", u);
        let tree_level = this.get_virtual_tree_level(u);
        let T = Math.max(1.001, Math.exp(Math.log(u / n) / tree_level) - 0.0001);

        return T;
    }

    static overflow_threshold(T, interval_level) {
        if (interval_level === 0) {
            return 1;
        }

        return Math.pow(T, -interval_level);
    }

    static get_virtual_tree_level(u) {
        return Math.log2(u);
    }

    static violates_invariant_1(n, N) {
        return !(N / 2 < n && n < 2 * N);
    }

    static calculate_u(N) {
        return Math.pow(2, 1 + Math.floor(Math.log2(Math.pow(N, 2))));
    }
}


class TagInterval {
    constructor(x_node) {
        this.level = 0;
        this.min_tag = x_node.tag;
        this.max_tag_excl = x_node.tag + 1;
        this.min_node = x_node;
        this.max_node = x_node;
        this.nodes_count = 1;
    }

    increase() {
        let increase_to_the_right = (Number.parseInt(this.min_tag) & Number.parseInt(this.size())) === 0;
        this.level += 1;

        if (increase_to_the_right) {
            this.max_tag_excl = this.min_tag + this.size();
            let node = this.max_node.next;

            while (node !== null && node.tag < this.max_tag_excl) {
                this.max_node = node;
                node = node.next;
                this.nodes_count += 1;
            }
        } else {
            this.min_tag = this.max_tag_excl - this.size();
            let node = this.min_node.prev;

            while (node !== null && node.tag >= this.min_tag) {
                this.min_node = node;
                node = node.prev;
                this.nodes_count += 1;
            }
        }
    }

    size() {
        return Math.pow(2, this.level);
    }

    density() {
        return this.nodes_count / this.size();
    }

}