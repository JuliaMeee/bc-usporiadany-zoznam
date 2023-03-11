let options = {
    name: 'breadthfirst',

    fit: true, // whether to fit the viewport to the graph
    directed: true, // whether the tree is directed downwards (or edges can point in any direction if false)
    padding: 30, // padding on fit
    circle: false, // put depths in concentric circles if true, put depths top down if false
    grid: false, // whether to create an even grid into which the DAG is placed (circle:false only)
    spacingFactor: 1.75, // positive spacing factor, larger => more space between nodes (N.B. n/a if causes overlap)
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
    nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
    roots: undefined, // the roots of the trees
    maximal: false, // whether to shift nodes down their natural BFS depths in order to avoid upwards edges (DAGS only)
    depthSort: undefined, // a sorting function to order nodes at equal depth. e.g. function(a, b){ return a.data('weight') - b.data('weight') }
    animate: false, // whether to transition the node positions
    animationDuration: 500, // duration of animation in ms if enabled
    animationEasing: undefined, // easing of animation if enabled,
    animateFilter: function ( node, i ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
    ready: undefined, // callback on layoutready
    stop: undefined, // callback on layoutstop
    transform: function (node, position ){ return position; } // transform a given node position. Useful for changing flow direction in discrete layouts
};

// var layout = cy.layout( options );



var cy = cytoscape({
    container: document.getElementById("cy"),

    elements: [ // list of graph elements to start with
/*        {data: { id: 10}},
        {data: { id: 11}},
        {data: { id: 'a' , parent: 10}},
        {data: { id: 'b' , parent: 11}},
        {data: { id: 'c' }},
        {data: { id: 'd' }},
        {data: { id: 'e' }},

        {data: { id: 'ab', source: 10, target: 'b' }},
        {data: { id: 'ac', source: 10, target: 'c' }},
        {data: { id: 'ad', source: 10, target: 'd' }},
        {data: { id: 'ae', source: 10, target: 'e' }},*/
    ],

    style: [ // the stylesheet for the graph
        {
            selector: 'node',
            style: {
                'background-color': '#666',
                'label': 'data(id)'
            }
        },

        {
            selector: 'edge',
            style: {
                'width': 3,
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier'
            }
        }
    ],
});



/*function addNode(cy, tag, val)
{
    let parentTag = tag.slice(0, -1)
    console.log("parent tag:", parentTag)
    if (cy.elements['node#parentTag'].length <= 0)
    {
        console.log("parent not found")
        cy.add( { group: 'nodes', data: { id: parentTag} } )
    }
    cy.add( { group: 'nodes', data: { id: tag} } )
    cy.add( { group: 'edges', data: { id: tag + "up", source: parentTag, target: tag } } )
    if (val != null)
    {
        cy.add( { group: 'nodes', data: { id: val, parent: tag } } )
    }
}*/

let level = 5
let root = addTreeNode(cy, level, padLeft("", level, "_"));

// cy.layout(options);

options.roots = [root.data.id];

var layout = cy.elements().layout(options);
layout.run();

cy.elements("node[id != 'mama']").forEach(console.log)

function addTreeNode(diagram, level, tag) {
    let node = { group: 'nodes', data: { id: tag } };
    diagram.add( node );

    if (level > 0) {
        for (let i = 0; i < 2; i++)
        {
            let childTag = replaceAt(tag,tag.length - level - 1, i.toString());
            let child = addTreeNode(diagram, level - 1, childTag);
            diagram.add( { group: 'edges', data: { id: tag + "-" + childTag , source: tag, target: childTag } } );
        }
    }
    else {
        // diagram.add( { group: 'nodes', data: { id: tag + "\nval", parent: tag} })
    }

    return node;
}

function padLeft(str, length, char) {
    return char.repeat(length - str.length) + str;
}

function replaceAt(str, index, char) {
    return str.substring(0, index) + char + str.substring(index + char.length);
}

