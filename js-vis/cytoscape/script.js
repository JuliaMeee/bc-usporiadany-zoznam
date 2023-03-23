
var cy = cytoscape({
    container: document.getElementById("cy"),

    style: [ // the stylesheet for the graph
        {
            selector: 'node',
            style: {
                'shape': 'round-rectangle',
                'background-color': 'data(color)',
                'label': 'data(label)',
                'width': '100px',
                'height': '50px',
                'text-wrap': 'wrap',
                'text-valign': 'center',
                'text-halign': 'center',
                'font-size': '24px',
            }
        },

        {
            selector: 'node[!value]',
            style: {
                'font-style': 'italic',
            }
        },

        {
            selector: 'node[value]',
            style: {
                // 'font-weight': 'bold',
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
let root = addTreeNode(cy, level, padLeft("", level - 1, "_"));
root.data.col = 10.5;

// console.log(root.data);

options = LayoutOptions.breadthfirst;

options.roots = [root.data.id];

let layout = cy.elements().layout(options);
layout.run();

// let layout = cy.elements().layout({
//     name:'grid',
//     rows: 5,
//     cols: 32,
//     fit:false});
// layout.run();



// cy.nodes().forEach(node => console.log(node.data()));
// cy.edges().forEach(edge => console.log(edge.data('source')))
function addTreeNode(diagram, level, tag) {
    let node = { group: 'nodes', data: { id: tag , label: tag.toString(), color: 'lightgray'} };
    diagram.add( node );

    if (level > 0) {
        for (let i = 0; i < 2; i++)
        {
            let childTag = replaceAt(tag,tag.length - level, i.toString());
            let child = addTreeNode(diagram, level - 1, childTag);
            diagram.add( { group: 'edges', data: { id: tag + "-" + childTag , source: tag, target: childTag } } );
        }
    }
    else {
        if (Math.random() > 0.6) {
            let childTag = tag + "val";
            let child = { group: 'nodes', data: { id: childTag, /*parent: tag,*/ value: (Math.random() + 1).toString(36).substring(7), color: randomColor()}};
            child.data.label = child.data.value;
            diagram.add(child);
            diagram.add( { group: 'edges', data: { id: tag + "-" + childTag, source: tag, target: childTag}} )


        }
    }

    return node;
}



