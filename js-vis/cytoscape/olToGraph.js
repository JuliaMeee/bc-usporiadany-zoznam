const graphTypeLl = "graphTypeLl";
const graphTypeTll = "graphTypeTll";
const graphTypeTllTree = "graphTypeTllTree";
const graphTypeTltll = "graphTypeTltll";
const graphTypeTltllTree = "graphTypeTltllTree";

class OlToGraph {
    static xOffset = 20;
    static xSize = 100;
    static yOffset = 20;
    static ySize = 50;
    static nodeFontSize = 24;

    static graphStyle = [ // the stylesheet for the graph
        {
            selector: 'node',
            style: {
                'shape': 'round-rectangle',
                'background-color': 'data(color)',
                'label': 'data(label)',
                'width': 'data(width)',
                'height': 'data(height)',
                'text-wrap': 'wrap',
                'text-valign': 'center',
                'text-halign': 'center',
                'font-size': 'data(fontSize)',
                'font-family': 'Inconsolata, monospace',
            }
        },

        {
            selector: "node[highlight!='none']",
            style: {
                'border-style': 'solid',
                'border-width': '4px',
                'border-color': 'data(highlight)',
            }
        },

        {
            selector: 'edge',
            style: {
                'width': 3,
                'line-color': '#000000',
                'target-arrow-color': '#000000',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier'
            }
        }
    ];

    static buildGraph(nodes, edges) {
        let cy = cytoscape({
            container: cyContainer,
        });

        // TODO set node.data.label;

        nodes.forEach(n => cy.add(n));
        edges.forEach(e => cy.add(e));

        return cy;
    }
    static createNode(treeId, level, tag, value) {
        let label = "";
        let lines = 1;
        if (tag !== null && value !== null) {
            label = tag.toString() + "\n" + value.toString();
            lines = 1.5;
        }
        else if (tag !== null) {
            label = tag.toString();
        }
        else if (value !== null) {
            label = value.toString();
        }

        return {
            group: 'nodes',
            data: {
                id: treeId + level + tag + value,
                treeId: treeId,
                value: value,
                tag: tag,
                label: label,
                color: 'lightgrey',
                highlight: 'none',
                height: OlToGraph.ySize * lines,
                width: Math.max(OlToGraph.xSize, OlToGraph.nodeFontSize * label.length * 0.5 + 20),
                fontSize: OlToGraph.nodeFontSize,
            },
            position: {
                x: 0,
                y: 0,
            }
        };
    }

    static createTagNode(tag, level = 0) {
        return {
            group: 'nodes',
            data: {
                id: level + "-" + tag,
                value: tag,
                tag: tag,
                type: "tag",
                color: "lightgrey",
            },
        };
    }

    static createRepNode(node, sublistTreeLevel) {
        return {
            group: 'nodes',
            data: {
                id: "rep-" + node.tag,
                value: "rep",
                sublist: null, // TODO
                type: "rep",
                color: randomColor(),
            }
        };
    }

    static toGraphLl(nodes) {
        let graphEles = {
            nodes: [],
            edges: [],
        }

        let x = 0;
        let lastNode = null;

        for (let node of nodes) {
            let graphNode = OlToGraph.createNode("root", 0, null, node.value);
            x += graphNode.data.width / 2;
            graphNode.position.x = x;
            x += OlToGraph.xOffset + graphNode.data.width / 2;

            graphEles.nodes.push(graphNode);

            if (lastNode) {
                graphEles.edges.push({
                    group: 'edges',
                    data: {
                        id: lastNode.data.id + "-" + graphNode.data.id,
                        source: lastNode.data.id,
                        target: graphNode.data.id,
                    }
                })
            }
            lastNode = graphNode;
        }

        return graphEles;
    }

    static toGraphTll(nodes) {
        let graphEles = {
            nodes: [],
            edges: [],
        }

        let x = 0;
        let lastNode = null;

        for (let node of nodes) {
            let graphNode = OlToGraph.createNode("root", 0, node.tag, node.value);
            x += graphNode.data.width / 2;
            graphNode.position.x = x;
            x += OlToGraph.xOffset + graphNode.data.width / 2;

            graphEles.nodes.push(graphNode);

            if (lastNode) {
                graphEles.edges.push({
                    group: 'edges',
                    data: {
                        id: lastNode.data.id + "-" + graphNode.data.id,
                        source: lastNode.data.id,
                        target: graphNode.data.id,
                    }
                })
            }
            lastNode = graphNode;
        }

        return graphEles;
    }

    static toGraphTltll() {
        return null;
    }
}
