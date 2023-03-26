const graphTypeLl = "graphTypeLl";
const graphTypeTll = "graphTypeTll";
const graphTypeTllTree = "graphTypeTllTree";
const graphTypeTltll = "graphTypeTltll";
const graphTypeTltllTree = "graphTypeTltllTree";

const nodeTypeTag = 'nodeTypeTag';
const nodeTypeTagValue = 'nodeTypeTagValue';
const nodeTypeValue = 'nodeTypeValue';

class OlToGraph {
    static xOffset = 15;
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
    static createNode(treeId, level, tag, value) {
        let nodeClass;
        let label = '';
        if (tag === null) {
            nodeClass = nodeTypeValue;
            label = "'" + value.toString() + "'";
        }
        else if (value === null) {
            nodeClass = nodeTypeTag;
            label = tag.toString();
        }
        else {
            nodeClass = nodeTypeTagValue;
            label = tag.toString() + "\n'" + value.toString() + "'";
        }

        let height = OlToGraph.ySize * (nodeClass === nodeTypeTagValue ? 1.5 : 1);
        return {
            group: 'nodes',
            data: {
                id: treeId + "-" + level + "-" + (tag? tag : '') + "-" + (value? value : ''),
                treeId: treeId,
                value: value,
                tag: tag,
                tagText: tag,
                level: level,
                // label: label,
                color: (nodeClass !== nodeTypeTag ? '#EAEAEA' : '#fff'),
                highlight: 'none',
                height: height,
                width: Math.max(OlToGraph.xSize, OlToGraph.nodeFontSize * label.length * 0.5 + 20),
                fontSize: OlToGraph.nodeFontSize,
            },
            position: {
                x: 0,
                y: (nodeClass === nodeTypeTagValue ? OlToGraph.ySize/4  : 0),
            },
            classes: nodeClass,
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

    static toGraphTllTree(nodes, u) {
        let graphEles = {
            nodes: [],
            edges: [],
        }

        // create layer0 tags
        let layers = [[]];
        for (let i = 0; i < u; i++) {
            layers[0].push(OlToGraph.createNode("root", 0, i, null));
        }

        // add layer0 values
        for (let node of nodes) {
            layers[0][node.tag] = OlToGraph.createNode("root", 0, node.tag, node.value);;
        }

        // set layer0 positions
        let x = 0;
        for (let i = 0; i < layers[0].length; i++) {
            let graphNode = layers[0][i];
            x += graphNode.data.width / 2;
            graphNode.position.x = x;
            x += OlToGraph.xOffset + graphNode.data.width / 2;
        }

        // add tree layers
        let layerBelow = layers[0];
        while(layerBelow.length > 1) {
            let layer = [];

            for (let i = 0; i < layerBelow.length / 2; i++) {
                let graphNode = OlToGraph.createNode("root", layers.length, i, null);
                let childLeft = layerBelow[i * 2];
                let childRight = layerBelow[i * 2 + 1];
                graphNode.position.x = (childLeft.position.x + childRight.position.x) / 2;
                graphNode.position.y = layers.length * (-OlToGraph.ySize - OlToGraph.yOffset) - OlToGraph.yOffset;
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
            console.log("created new layer: ");
            console.log(layer);
            layerBelow = layer;
        }

        // add nodes and edges to graph
        for (let i = 0; i < layers.length; i++) {
            graphEles.nodes = graphEles.nodes.concat(layers[i]);
        }

        // set node tag to binary
        for (let graphNode of graphEles.nodes) {
            graphNode.data.tagText = OlToGraph.tagToBinaryString(graphNode.data.tag, graphNode.data.level, layers.length - 1);
        }

        return graphEles;
    }

    static toGraphTltll() {
        return null;
    }

    static isGaphNodeTagInInterval(data, intervalMin, intervalMaxExcl) {
        if (data.tag === null || data.tag === undefined) return false;

        let tagMin = data.tag * (Math.pow(2, data.level));
        let tagMax = (data.tag + 1) * (Math.pow(2, data.level)) - 1;

        let result = intervalMin <= tagMin && tagMax < intervalMaxExcl;

        console.log("interval: " + intervalMin + " - " + intervalMaxExcl);
        console.log("tag: " + data.tag + " level: " + data.level + " min: " + tagMin + " max: " + tagMax + "in interval: " + result);

        return result;
    }

    static tagToBinaryString(tag, level, length) {
        if (level == length) return "_".repeat(length);
        return tag.toString(2).padStart(length - level, "0").padEnd(length, "_");
    }

    /*static isGraphOutOfView(graph) {
        let graphExtent = graph.extent();
        console.log("graphExtent:");
        console.log(graphExtent);

        let outOfView = false;
        graph.nodes().forEach(node => outOfView ||
            (node.x < graphExtent.x1) || (node.y < graphExtent.y1) || (node.x > graphExtent.x2) || (node.y > graphExtent.y2));
        return outOfView;
    }*/
}
