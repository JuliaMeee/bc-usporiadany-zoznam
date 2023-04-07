const nodeTypeTag = 'nodeTypeTag';
const nodeTypeTagValue = 'nodeTypeTagValue';
const nodeTypeValue = 'nodeTypeValue';

const rootTreeId = -1;

const xOffset = 20;
const xSize = 100;
const yOffset = 30;
const ySize = 50;
const nodeFontSize = 24;

class OlToGraph {
    static graphStyle = [ // the stylesheet for the graph
        {
            selector: 'node',
            style: {
                'shape': 'round-rectangle',
                'background-color': 'data(color)',
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
            selector: "node[highlight='none']",
            style: {
                'border-style': 'solid',
                'border-width': '2px',
                'border-color': 'black',
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
                'width': 2,
                'line-color': '#000000',
                'target-arrow-color': '#000000',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier',


            }
        },

        {
            selector: 'edge[label]',
            style: {
                'label': 'data(label)',
                "text-background-opacity": 1,
                "color": "#000",
                "text-background-color": "#fff",
                "font-size": '24px',
            }
        }
    ];

    static htmlLabelStyle = [
        {
            query: "." + nodeTypeTagValue,
            tpl: function(data) {
                return "<p class='nodeTag'>" + data.tagText + "<span class='nodeValue'><br>" + data.value + "</span>" + "</p>";
            }
        },
        {
            query: "." + nodeTypeTag,
            tpl: function(data) {
                return "<span class='nodeTag'>" + data.tagText + "</span>"
            }
        },
        {
            query: "." + nodeTypeValue,
            tpl: function(data) {
                return "<span class='nodeValue'>" + data.value + "</span>"
            }
        }

    ]

    static buildGraph(nodes, edges) {
        let cy = cytoscape({
            container: cyContainer,
        });

        nodes.forEach(n => cy.add(n));
        edges.forEach(e => cy.add(e));

        return cy;
    }
    static createNode(treeId, level, tag, value, binaryTagText = false, binaryTagLength = 0) {
        let nodeClass;
        if (tag === null) {
            nodeClass = nodeTypeValue;
        }
        else if (value === null) {
            nodeClass = nodeTypeTag;
        }
        else {
            nodeClass = nodeTypeTagValue;
        }

        if (value instanceof DoublyLinkedList) {
            value = "sublistRep";
        }

        let height = ySize * (nodeClass === nodeTypeTagValue ? 1.5 : 1);
        let graphNode = {
            group: 'nodes',
            data: {
                treeId: treeId,
                value: value,
                tag: tag,
                tagText: (binaryTagText ? OlToGraph.tagToBinaryString(tag, level, binaryTagLength) : (tag === null ? '' : tag)),
                level: level,
                color: (nodeClass !== nodeTypeTag ? '#EAEAEA' : '#fff'),
                highlight: 'none',
                height: height,
                fontSize: nodeFontSize,
            },
            position: {
                x: 0,
                y: (nodeClass === nodeTypeTagValue ? ySize/4  : 0),
            },
            classes: nodeClass,
        };

        OlToGraph.assignNodeId(graphNode.data);
        graphNode.data.width = OlToGraph.calculateNodeWidth(graphNode.data);

        return graphNode;
    }

    static toGraphLl(nodes, treeId = rootTreeId) {
        let graphEles = {
            nodes: [],
            edges: [],
        }

        let x = 0;
        let lastNode = null;

        for (let node of nodes) {
            let graphNode = OlToGraph.createNode(treeId, 0, null, node.value, false, 0);
            x += graphNode.data.width / 2;
            graphNode.position.x = x;
            x += xOffset + graphNode.data.width / 2;

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

    static toGraphTll(nodes, treeId = rootTreeId) {
        let graphEles = {
            nodes: [],
            edges: [],
        }

        let x = 0;
        let lastNode = null;

        for (let node of nodes) {
            let graphNode = OlToGraph.createNode(treeId, 0, node.tag, node.value, false, 0);
            x += graphNode.data.width / 2;
            graphNode.position.x = x;
            x += xOffset + graphNode.data.width / 2;

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

    static toGraphTllTree(nodes, u, treeId = rootTreeId) {
        let graphEles = {
            nodes: [],
            edges: [],
        }

        // create layer0 tags
        let layers = [[]];
        for (let i = 0; i < u; i++) {
            layers[0].push(OlToGraph.createNode(treeId, 0, i, null, true, Math.log2(u)));
        }

        // add layer0 values
        for (let node of nodes) {
            layers[0][node.tag] = OlToGraph.createNode(treeId, 0, node.tag, node.value, true, Math.log2(u));;
        }

        // set layer0 positions
        let x = 0;
        for (let i = 0; i < layers[0].length; i++) {
            let graphNode = layers[0][i];
            x += graphNode.data.width / 2;
            graphNode.position.x = x;
            x += xOffset + graphNode.data.width / 2;
        }


        // add tree layers
        let layerBelow = layers[0];
        while(layerBelow.length > 1) {
            let layer = [];

            for (let i = 0; i < layerBelow.length / 2; i++) {
                let graphNode = OlToGraph.createNode(treeId, layers.length, i, null, true, Math.log2(u));
                let childLeft = layerBelow[i * 2];
                let childRight = layerBelow[i * 2 + 1];
                graphNode.position.x = (childLeft.position.x + childRight.position.x) / 2;
                graphNode.position.y = layers.length * (-ySize - yOffset) - yOffset;
                layer.push(graphNode);
                graphEles.edges.push({
                    group: 'edges',
                    data: {
                        id: graphNode.data.id + "-" + childLeft.data.id,
                        source: graphNode.data.id,
                        target: childLeft.data.id,
                        label: '0',
                    }
                })
                graphEles.edges.push({
                    group: 'edges',
                    data: {
                        id: graphNode.data.id + "-" + childRight.data.id,
                        source: graphNode.data.id,
                        target: childRight.data.id,
                        label: '1',
                    }
                })
            }

            layers.push(layer);
            layerBelow = layer;
        }

        // add nodes and edges to graph
        for (let i = 0; i < layers.length; i++) {
            graphEles.nodes = graphEles.nodes.concat(layers[i]);
        }

        return graphEles;
    }

    static toGraphTltll(reps, treeId = rootTreeId) {
        // make sublist nodes and edges
        let sublistGraphs = [];
        for (let rep of reps) {
            sublistGraphs.push(OlToGraph.toGraphTll(rep.value, rep.tag));
        }

        // make reps nodes and edges
        let repToSublistEdges = [];
        let repsGraph = OlToGraph.toGraphTll(reps, treeId);

        for (let i = 0; i < repsGraph.nodes.length; i++) {
            let repGraphNode = repsGraph.nodes[i];
            repGraphNode.data.value = "sublistRep";
            repGraphNode.data.width = this.calculateNodeWidth(repGraphNode.data);

            // connect to sublist
            repToSublistEdges.push({
                group: 'edges',
                data: {
                    id: repGraphNode.data.id + "-" + sublistGraphs[i].nodes[0].data.id,
                    source: repGraphNode.data.id,
                    target: sublistGraphs[i].nodes[0].data.id,
                }
            })
            for (let sublisGraphNode of sublistGraphs[i].nodes) {
                sublisGraphNode.data.treeId = repGraphNode.data.tag;
            }
        }


        // set rep nodes width
        for (let i = 0; i < repsGraph.nodes.length; i++) {
            let repGraphNode = repsGraph.nodes[i];
            let sublistGraph = sublistGraphs[i];
            let minXNode = sublistGraph.nodes[0];
            let maxXNode = sublistGraph.nodes[sublistGraph.nodes.length - 1];
            repGraphNode.data.width = Math.max(repGraphNode.data.width, (maxXNode.position.x + maxXNode.data.width / 2) - (minXNode.position.x - minXNode.data.width / 2));
        }

        // position sublists and reps
        let xShift = 0;
        for (let i = 0; i < repsGraph.nodes.length; i++) {
            let repGraphNode = repsGraph.nodes[i];
            repGraphNode.position.x = xShift + repGraphNode.data.width / 2;
            repGraphNode.position.y = - yOffset * 2 - ySize;
            for (let graphNode of sublistGraphs[i].nodes) {
                graphNode.position.x += xShift;
            }

            xShift += repGraphNode.data.width + xOffset * 2;
        }

        // put everything into one graph
        let graph = {
            nodes: [],
            edges: [],
        }

        graph.nodes = graph.nodes.concat(repsGraph.nodes);
        graph.edges = graph.edges.concat(repsGraph.edges);
        graph.edges = graph.edges.concat(repToSublistEdges);
        for (let i = 0; i < sublistGraphs.length; i++) {
            graph.nodes = graph.nodes.concat(sublistGraphs[i].nodes);
            graph.edges = graph.edges.concat(sublistGraphs[i].edges);
        }

        return graph;
    }

    static toGraphTltllTree(reps, repsU, sublistU, treeId = rootTreeId) {
        // make sublist tree nodes and edges
        let sublistGraphs = [];
        for (let rep of reps) {
            sublistGraphs.push(OlToGraph.toGraphTllTree(rep.value, sublistU, rep.tag));
        }

        let repsGraph = OlToGraph.toGraphTllTree(reps, repsU, treeId);

        // link reps to sublist trees (add edges)
        let repToSublistEdges = [];
        let repGraphNodesFiltered = repsGraph.nodes.filter(node => node.data.value);
        for (let i = 0; i < sublistGraphs.length; i++) {
            let sublistGraphNodes = sublistGraphs[i].nodes;
            let repGraphNode = repGraphNodesFiltered[i];
            let sublistGraphRootNode = sublistGraphNodes.find(node => node.data.level === Math.log2(sublistU));
            repToSublistEdges.push({
                group: 'edges',
                data: {
                    id: repGraphNode.data.id + "-" + sublistGraphRootNode.data.id,
                    source: repGraphNode.data.id,
                    target: sublistGraphRootNode.data.id,
                }
            });
        }

        // set rep nodes width
        for (let repGraphNode of repsGraph.nodes.filter(node => node.data.level === 0)) {
            let sublistGraph = sublistGraphs.find(graph => graph.nodes[0].data.treeId === repGraphNode.data.tag);

            if (sublistGraph) {
                let firstSublistNode = sublistGraph.nodes.find(node => node.data.level === 0 && node.data.tag === 0);
                let lastSublistNode = sublistGraph.nodes.find(node => node.data.level === 0 && node.data.tag === sublistU - 1);
                repGraphNode.data.width = (lastSublistNode.position.x + lastSublistNode.data.width) - (firstSublistNode.position.x - firstSublistNode.data.width / 2);
            }
        }

        // set positions for rep tree layer0 + sublist trees
        let yShift = (1 + Math.log2(sublistU)) * (yOffset + ySize) + 2 * yOffset;
        let x = 0;
        for (let repGraphNode of repsGraph.nodes.filter(node => node.data.level === 0)) {
            x += repGraphNode.data.width / 2;
            repGraphNode.position.x = x;

            let sublistGraph = sublistGraphs.find(graph => graph.nodes[0].data.treeId === repGraphNode.data.tag);
            if (sublistGraph) {
                let root = sublistGraph.nodes.find(node => node.data.level === Math.log2(sublistU));
                let xShift = x - root.position.x;
                sublistGraph.nodes.forEach(node => {
                    node.position.x += xShift;
                    node.position.y += yShift;
                });
            }

            x += xOffset + repGraphNode.data.width / 2;
        }

        // set positions for higher rep tree layers
        OlToGraph.setHigherLevelNodesPositions(repsGraph.nodes, Math.log2(repsU) + 1)

        // put everything into one graph
        let graph = {
            nodes: [],
            edges: [],
        }
        graph.nodes = graph.nodes.concat(repsGraph.nodes);
        graph.edges = graph.edges.concat(repsGraph.edges);
        graph.edges = graph.edges.concat(repToSublistEdges);
        for (let i = 0; i < sublistGraphs.length; i++) {
            graph.nodes = graph.nodes.concat(sublistGraphs[i].nodes);
            graph.edges = graph.edges.concat(sublistGraphs[i].edges);
        }

        return graph;
    }

    static setHigherLevelNodesPositions(graphNodes, totalLevelsCount) {
        for (let i = 1; i < totalLevelsCount; i++) {
            for (let graphNode of graphNodes.filter(node => node.data.level === i)) {
                let childLeft = graphNodes.find(node => node.data.level === i - 1 && node.data.tag === graphNode.data.tag * 2);
                let childRight = graphNodes.find(node => node.data.level === i - 1 && node.data.tag === graphNode.data.tag * 2 + 1);
                graphNode.position.x = (childLeft.position.x + childRight.position.x) / 2;
                graphNode.position.y = i * (-ySize - yOffset) - yOffset;
            }
        }
    }

    static isGaphNodeTagInInterval(data, intervalMin, intervalMaxExcl, treeId = rootTreeId) {
        if (data.tag === null || data.tag === undefined) return false;

        if (data.treeId !== treeId) return false;

        let tagMin = data.tag * (Math.pow(2, data.level));
        let tagMax = (data.tag + 1) * (Math.pow(2, data.level)) - 1;

        let result = intervalMin <= tagMin && tagMax < intervalMaxExcl;

        return result;
    }

    static tagToBinaryString(tag, level, length) {
        if (level === length) return "_".repeat(length);
        return tag.toString(2).padStart(length - level, "0").padEnd(length, "_");
    }

    static calculateNodeWidth(data) {
        let labelLength = Math.max((data.value === null ? 0 : data.value.toString().length), data.tagText.toString().length);
        return Math.max(xSize, nodeFontSize * labelLength * 0.63 + 20);
    }

    static assignNodeId(data) {
        data.id = data.treeId + "-" + data.level + "-" + data.tagText + "-" + (data.value === null ? '' : data.value);
    }
}
