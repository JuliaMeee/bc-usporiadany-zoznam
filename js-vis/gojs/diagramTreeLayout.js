// Update the layout from the controls, and then perform the layout again
function layout(diagram) {
    diagram.startTransaction("change Layout");
    var lay = diagram.layout;

    var style = document.getElementById("style").value;
    if (style === "Layered") lay.treeStyle = go.TreeLayout.StyleLayered;
    else if (style === "Alternating") lay.treeStyle = go.TreeLayout.StyleAlternating;
    else if (style === "LastParents") lay.treeStyle = go.TreeLayout.StyleLastParents;
    else if (style === "RootOnly") lay.treeStyle = go.TreeLayout.StyleRootOnly;

    var layerStyle = document.getElementById("layerStyle").value;
    if (layerStyle === "Individual") lay.layerStyle = go.TreeLayout.LayerIndividual;
    else if (layerStyle === "Siblings") lay.layerStyle = go.TreeLayout.LayerSiblings;
    else if (layerStyle === "Uniform") lay.layerStyle = go.TreeLayout.LayerUniform;

    /*var angle = getRadioValue("angle");
    angle = parseFloat(angle, 10);*/
    lay.angle = 90;

    var align = document.getElementById("align").value;
    if (align === "CenterChildren") lay.alignment = go.TreeLayout.AlignmentCenterChildren;
    else if (align === "CenterSubtrees") lay.alignment = go.TreeLayout.AlignmentCenterSubtrees;
    else if (align === "Start") lay.alignment = go.TreeLayout.AlignmentStart;
    else if (align === "End") lay.alignment = go.TreeLayout.AlignmentEnd;
    else if (align === "Bus") lay.alignment = go.TreeLayout.AlignmentBus;
    else if (align === "BusBranching") lay.alignment = go.TreeLayout.AlignmentBusBranching;
    else if (align === "TopLeftBus") lay.alignment = go.TreeLayout.AlignmentTopLeftBus;
    else if (align === "BottomRightBus") lay.alignment = go.TreeLayout.AlignmentBottomRightBus;

    var nodeSpacing = document.getElementById("nodeSpacing").value;
    nodeSpacing = parseFloat(nodeSpacing, 10);
    lay.nodeSpacing = nodeSpacing;

    var nodeIndent = document.getElementById("nodeIndent").value;
    nodeIndent = parseFloat(nodeIndent, 10);
    lay.nodeIndent = nodeIndent;

    var nodeIndentPastParent = document.getElementById("nodeIndentPastParent").value;
    nodeIndentPastParent = parseFloat(nodeIndentPastParent, 10);
    lay.nodeIndentPastParent = nodeIndentPastParent;

    var layerSpacing = document.getElementById("layerSpacing").value;
    layerSpacing = parseFloat(layerSpacing, 10);
    lay.layerSpacing = layerSpacing;

    var layerSpacingParentOverlap = document.getElementById("layerSpacingParentOverlap").value;
    layerSpacingParentOverlap = parseFloat(layerSpacingParentOverlap, 10);
    lay.layerSpacingParentOverlap = layerSpacingParentOverlap;

    var sorting = document.getElementById("sorting").value;
    if (sorting === "Forwards") lay.sorting = go.TreeLayout.SortingForwards;
    else if (sorting === "Reverse") lay.sorting = go.TreeLayout.SortingReverse;
    else if (sorting === "Ascending") lay.sorting = go.TreeLayout.SortingAscending;
    else if (sorting === "Descending") lay.sorting = go.TreeLayout.SortingDescending;

    var compaction = getRadioValue("compaction");
    if (compaction === "Block") lay.compaction = go.TreeLayout.CompactionBlock;
    else if (compaction === "None") lay.compaction = go.TreeLayout.CompactionNone;

    var breadthLimit = document.getElementById("breadthLimit").value;
    breadthLimit = parseFloat(breadthLimit, 10);
    lay.breadthLimit = breadthLimit;

    var rowSpacing = document.getElementById("rowSpacing").value;
    rowSpacing = parseFloat(rowSpacing, 10);
    lay.rowSpacing = rowSpacing;

    var rowIndent = document.getElementById("rowIndent").value;
    rowIndent = parseFloat(rowIndent, 10);
    lay.rowIndent = rowIndent;

    var setsPortSpot = document.getElementById("setsPortSpot").checked;
    lay.setsPortSpot = setsPortSpot;

    var setsChildPortSpot = document.getElementById("setsChildPortSpot").checked;
    lay.setsChildPortSpot = setsChildPortSpot;

    if (style !== "Layered") {
        var altAngle = getRadioValue("altAngle");
        altAngle = parseFloat(altAngle, 10);
        lay.alternateAngle = altAngle;

        var altAlign = document.getElementById("altAlign").value;
        if (altAlign === "CenterChildren") lay.alternateAlignment = go.TreeLayout.AlignmentCenterChildren;
        else if (altAlign === "CenterSubtrees") lay.alternateAlignment = go.TreeLayout.AlignmentCenterSubtrees;
        else if (altAlign === "Start") lay.alternateAlignment = go.TreeLayout.AlignmentStart;
        else if (altAlign === "End") lay.alternateAlignment = go.TreeLayout.AlignmentEnd;
        else if (altAlign === "Bus") lay.alternateAlignment = go.TreeLayout.AlignmentBus;
        else if (altAlign === "BusBranching") lay.alternateAlignment = go.TreeLayout.AlignmentBusBranching;
        else if (altAlign === "TopLeftBus") lay.alternateAlignment = go.TreeLayout.AlignmentTopLeftBus;
        else if (altAlign === "BottomRightBus") lay.alternateAlignment = go.TreeLayout.AlignmentBottomRightBus;

        var altNodeSpacing = document.getElementById("altNodeSpacing").value;
        altNodeSpacing = parseFloat(altNodeSpacing, 10);
        lay.alternateNodeSpacing = altNodeSpacing;

        var altNodeIndent = document.getElementById("altNodeIndent").value;
        altNodeIndent = parseFloat(altNodeIndent, 10);
        lay.alternateNodeIndent = altNodeIndent;

        var altNodeIndentPastParent = document.getElementById("altNodeIndentPastParent").value;
        altNodeIndentPastParent = parseFloat(altNodeIndentPastParent, 10);
        lay.alternateNodeIndentPastParent = altNodeIndentPastParent;

        var altLayerSpacing = document.getElementById("altLayerSpacing").value;
        altLayerSpacing = parseFloat(altLayerSpacing, 10);
        lay.alternateLayerSpacing = altLayerSpacing;

        var altLayerSpacingParentOverlap = document.getElementById("altLayerSpacingParentOverlap").value;
        altLayerSpacingParentOverlap = parseFloat(altLayerSpacingParentOverlap, 10);
        lay.alternateLayerSpacingParentOverlap = altLayerSpacingParentOverlap;

        var altSorting = document.getElementById("altSorting").value;
        if (altSorting === "Forwards") lay.alternateSorting = go.TreeLayout.SortingForwards;
        else if (altSorting === "Reverse") lay.alternateSorting = go.TreeLayout.SortingReverse;
        else if (altSorting === "Ascending") lay.alternateSorting = go.TreeLayout.SortingAscending;
        else if (altSorting === "Descending") lay.alternateSorting = go.TreeLayout.SortingDescending;

        var altCompaction = getRadioValue("altCompaction");
        if (altCompaction === "Block") lay.alternateCompaction = go.TreeLayout.CompactionBlock;
        else if (altCompaction === "None") lay.alternateCompaction = go.TreeLayout.CompactionNone;

        var altBreadthLimit = document.getElementById("altBreadthLimit").value;
        altBreadthLimit = parseFloat(altBreadthLimit, 10);
        lay.alternateBreadthLimit = altBreadthLimit;

        var altRowSpacing = document.getElementById("altRowSpacing").value;
        altRowSpacing = parseFloat(altRowSpacing, 10);
        lay.alternateRowSpacing = altRowSpacing;

        var altRowIndent = document.getElementById("altRowIndent").value;
        altRowIndent = parseFloat(altRowIndent, 10);
        lay.alternateRowIndent = altRowIndent;

        var altSetsPortSpot = document.getElementById("altSetsPortSpot").checked;
        lay.alternateSetsPortSpot = altSetsPortSpot;

        var altSetsChildPortSpot = document.getElementById("altSetsChildPortSpot").checked;
        lay.alternateSetsChildPortSpot = altSetsChildPortSpot;
    }

    diagram.commitTransaction("change Layout");
}