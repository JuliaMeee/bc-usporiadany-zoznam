function theirInit() {

    // Since 2.2 you can also author concise templates with method chaining instead of GraphObject.make
    // For details, see https://gojs.net/latest/intro/buildingObjects.html
    const $ = go.GraphObject.make;  // for conciseness in defining templates

    theirDiagram =
        $(go.Diagram, "theirDiagramDiv",  // must be the ID or reference to div
            {
                initialAutoScale: go.Diagram.UniformToFill,
                layout: $(go.TreeLayout,
                    { comparer: go.LayoutVertex.smartComparer }) // have the comparer sort by numbers as well as letters
                // other properties are set by the layout function, defined below
            });

    // define the Node template
    theirDiagram.nodeTemplate =
        $(
            go.Node, "Spot",
            { locationSpot: go.Spot.Center },
            new go.Binding("text", "text"),  // for sorting
            $(go.Shape, "Ellipse",
                {
                    fill: "lightgray",  // the initial value, but data binding may provide different value
                    stroke: null,
                    desiredSize: new go.Size(30, 30)
                },
                new go.Binding("desiredSize", "size"),
                new go.Binding("fill", "fill")),
            $(go.TextBlock,
                new go.Binding("text", "text"))
        );

    // define the Link template
    theirDiagram.linkTemplate =
        $(go.Link,
            {
                routing: go.Link.Orthogonal,
                selectable: false
            },
            $(go.Shape,
                { strokeWidth: 3, stroke: "#333" }));

    // generate a tree with the default values
    rebuildGraph();
}

function rebuildGraph() {
    var minNodes = document.getElementById("minNodes").value;
    minNodes = parseInt(minNodes, 10);

    var maxNodes = document.getElementById("maxNodes").value;
    maxNodes = parseInt(maxNodes, 10);

    var minChil = document.getElementById("minChil").value;
    minChil = parseInt(minChil, 10);

    var maxChil = document.getElementById("maxChil").value;
    maxChil = parseInt(maxChil, 10);

    var hasRandomSizes = document.getElementById("randomSizes").checked;

    // create and assign a new model
    var nodeDataArray = generateNodeData(minNodes, maxNodes, minChil, maxChil, hasRandomSizes);
    theirDiagram.model = new go.TreeModel(nodeDataArray);

    // update the diagram layout customized by the various control values
    layout(theirDiagram);
}

// Creates a random number (between MIN and MAX) of randomly colored nodes.
function generateNodeData(minNodes, maxNodes, minChil, maxChil, hasRandomSizes) {
    var nodeArray = [];
    if (minNodes === undefined || isNaN(minNodes) || minNodes < 1) minNodes = 1;
    if (maxNodes === undefined || isNaN(maxNodes) || maxNodes < minNodes) maxNodes = minNodes;

    // Create a bunch of node data
    var numNodes = Math.floor(Math.random() * (maxNodes - minNodes + 1)) + minNodes;
    for (var i = 0; i < numNodes; i++) {
        nodeArray.push({
            key: i,  // the unique identifier
            // "parent" is set by code below that assigns children
            text: i.toString(),  // some text to be shown by the node template
            fill: go.Brush.randomColor(),  // a color to be shown by the node template
            size: (hasRandomSizes) ? new go.Size(Math.random() * 50 + 20, Math.random() * 50 + 20) : new go.Size(30, 30)
        });
    }

    // Randomize the node data
    for (i = 0; i < nodeArray.length; i++) {
        var swap = Math.floor(Math.random() * nodeArray.length);
        var temp = nodeArray[swap];
        nodeArray[swap] = nodeArray[i];
        nodeArray[i] = temp;
    }

    // Takes the random collection of node data and creates a random tree with them.
    // Respects the minimum and maximum number of links from each node.
    // The minimum can be disregarded if we run out of nodes to link to.
    if (nodeArray.length > 1) {
        if (minChil === undefined || isNaN(minChil) || minChil < 0) minChil = 0;
        if (maxChil === undefined || isNaN(maxChil) || maxChil < minChil) maxChil = minChil;

        // keep the Set of node data that do not yet have a parent
        var available = new go.Set();
        available.addAll(nodeArray);
        for (var i = 0; i < nodeArray.length; i++) {
            var parent = nodeArray[i];
            available.remove(parent);

            // assign some number of node data as children of this parent node data
            var children = Math.floor(Math.random() * (maxChil - minChil + 1)) + minChil;
            for (var j = 0; j < children; j++) {
                var child = available.first();
                if (child === null) break;  // oops, ran out already
                available.remove(child);
                // have the child node data refer to the parent node data by its key
                child.parent = parent.key;
            }
            if (available.count === 0) break;  // nothing left?
        }
    }
    return nodeArray;
}

function getRadioValue(name) {
    var radio = document.getElementsByName(name);
    for (var i = 0; i < radio.length; i++)
        if (radio[i].checked) return radio[i].value;
}
window.addEventListener('DOMContentLoaded', theirInit);

window.addEventListener('DOMContentLoaded', init);

function init() {
    initTllTree()
}

function initTllTree() {
    const $ = go.GraphObject.make;

    tllTreeDiagram =
        $(go.Diagram, "myDiagramDiv",  // must be the ID or reference to div
            {
                initialAutoScale: go.Diagram.UniformToFill,
                layout: $(go.TreeLayout,
                    { comparer: go.LayoutVertex.smartComparer }) // have the comparer sort by numbers as well as letters
                // other properties are set by the layout function, defined below
            });

    // define the Node template
    tllTreeDiagram.nodeTemplate =
        $(
            go.Node, "Spot",
            { locationSpot: go.Spot.Center },
            new go.Binding("text", "text"),  // for sorting
            $(go.Shape, "RoundedRectangle",
                {
                    fill: "lightgray",  // the initial value, but data binding may provide different value

                    desiredSize: new go.Size(50, 30)
                },
                new go.Binding("desiredSize", "size"),
                new go.Binding("fill", "fill")),
            $(go.TextBlock,
                new go.Binding("text", "text")),
        );

    // define the Link template
    tllTreeDiagram.linkTemplate =
        $(go.Link,
            {
                routing: go.Link.Bezier,
                selectable: false
            },
            $(go.Shape,
                { strokeWidth: 3, stroke: "#333" }));

    // generate a tree with the default values


    let treeLevel = 5;
    buildTree(tllTreeDiagram, treeLevel);
}

function buildTree(diagram, level) {
    nodes = [];
    addTreeNode(nodes, level, "");

    diagram.model = new go.TreeModel(nodes);

    diagram.nodes.each(n => console.log(n.key))

    layout(tllTreeDiagram);
}

function addTreeNode(nodes, level, key) {
    let node = {
        key: key,  // the unique identifier
        text: key.toString(),  // some text to be shown by the node template
        size: new go.Size(60, 30),
    };
    nodes.push(node);

    if (level > 0) {
        for (let i = 0; i < 2; i++)
        {
            child = addTreeNode(nodes, level - 1, key + i.toString());
            child.parent = node.key;
        }
    }
    else {
        nodes.push({
            key: node.key + "val",  // the unique identifier
            text: key.toString() + "\nval",  // some text to be shown by the node template
            fill: go.Brush.randomColor(),  // a color to be shown by the node template
            size: new go.Size(60, 40),
            parent: node.key,
        })
    }

    return node;
}