class OlUtils {
    static assignNewTags(minNode, nodesCount, minTag, maxTag) {
        console.log("assign new tags: ", minNode, nodesCount, minTag, maxTag);
        let tagOffset = (Math.floor((1 + maxTag - minTag) / nodesCount));
        let tag = minTag;
        let node = minNode;

        while (nodesCount > 0 && node !== null) {
            node.tag = tag;
            node = node.next;
            tag += tagOffset;
            nodesCount -= 1;
        }
    }

    static availableTagAfter(xNode, u) {
        let minTag = xNode.tag + 1;
        let maxTag = u - 1;

        if (xNode.next !== null) {
            maxTag = xNode.next.tag - 1;
        }

        return maxTag - minTag >= 0;
    }

    static getNewTagAfter(xNode, u) {
        let minTag = xNode.tag + 1;
        let maxTag = u - 1;

        if (xNode.next !== null) {
            maxTag = xNode.next.tag - 1;
        }

        let newTag = Math.floor((minTag + maxTag) / 2);
        return newTag;
    }

    static relabel(xNode, n, u) {
        console.log("relabel");
        let T = this.calculateT(n, u);
        console.log("T: ", T);
        let interval = new TagInterval(xNode);
        interval.increase();

        while (interval.density() > this.overflowThreshold(T, interval.level)) {
            console.log("interval:", interval.minTag, "-", interval.maxTagExcl, "n:", interval.nodesCount);
            interval.increase();
        }

        console.log("interval:", interval.minTag, "-", interval.maxTagExcl, "n:", interval.nodesCount);

        this.assignNewTags(interval.minNode, interval.nodesCount, interval.minTag, interval.maxTagExcl - 1);
    }

    static calculateT(n, u) {
        console.log("calculateT with: n:", n, " u:", u);
        let treeLevel = this.getVirtualTreeLevel(u);
        let T = Math.max(1.001, Math.exp(Math.log(u / n) / treeLevel) - 0.0001);

        return T;
    }

    static overflowThreshold(T, intervalLevel) {
        if (intervalLevel === 0) {
            return 1;
        }

        return Math.pow(T, -intervalLevel);
    }

    static getVirtualTreeLevel(u) {
        return Math.log2(u);
    }

    static violatesInvariant1(n, N) {
        return !(N / 2 < n && n < 2 * N);
    }

    static calculateU(N) {
        return Math.pow(2, 1 + Math.floor(Math.log2(Math.pow(N, 2))));
    }
}


class TagInterval {
    constructor(xNode) {
        this.level = 0;
        this.minTag = xNode.tag;
        this.maxTagExcl = xNode.tag + 1;
        this.minNode = xNode;
        this.maxNode = xNode;
        this.nodesCount = 1;
    }

    increase() {
        let increaseToTheRight = (Number.parseInt(this.minTag) & Number.parseInt(this.size())) === 0;
        this.level += 1;

        if (increaseToTheRight) {
            this.maxTagExcl = this.minTag + this.size();
            let node = this.maxNode.next;

            while (node !== null && node.tag < this.maxTagExcl) {
                this.maxNode = node;
                node = node.next;
                this.nodesCount += 1;
            }
        } else {
            this.minTag = this.maxTagExcl - this.size();
            let node = this.minNode.prev;

            while (node !== null && node.tag >= this.minTag) {
                this.minNode = node;
                node = node.prev;
                this.nodesCount += 1;
            }
        }
    }

    size() {
        return Math.pow(2, this.level);
    }

    density() {
        return this.nodesCount / this.size();
    }

}