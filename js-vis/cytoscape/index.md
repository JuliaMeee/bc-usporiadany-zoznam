<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="style.css">
        <link rel="icon" type="image/x-icon" href="../asstes/images/ol-favicon.png">

        <script src="https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.15.2/cytoscape.min.js"></script>
<!--        <script src="http://cytoscape.github.io/cytoscape.js/api/cytoscape.js-latest/cytoscape.min.js"></script>-->
<!--        <script src="cytoscape-node-html-label.js"></script>-->

    </head>
    <body>
        <main>
            <div class="controlPanel">
                <div class="operationsInput">
                    <div>
                        <label for="initializeButton">Initialize</label>
                        <input id="initializeXInput" type="text" placeholder="x">
                        <select id="initializeTypeSelect">
                            <option value="olByLl">linked list</option>
                            <option value="olByTll">tagged linked list</option>
                            <option value="olByTltll">two-level tagged linked list</option>
                        </select>
                        <button id="initializeButton" type="button">Start</button>
                    </div>
                    <div>
                        <label for="insertButton">Insert</label>
                        <input id="insertXInput" type="text" placeholder="x">
                        <input id="insertYInput" type="text" placeholder="y">
                        <button id="insertButton" type="button">Start</button>
                    </div>
                    <div>
                        <label for="deleteButton">Delete</label>
                        <input id="deleteXInput" type="text" placeholder="x">
                        <div></div>
                        <button id="deleteButton" type="button">Start</button>
                    </div>
                    <div>
                        <label for="orderButton">Order</label>
                        <input id="orderXInput" type="text" placeholder="x">
                        <input id="orderYInput" type="text" placeholder="y">
                        <button id="orderButton" type="button">Start</button>
                    </div>
                </div>
                <div class="visualisationInput">
                    <div>
                        <button id="treeViewButton" type="button">Tree view: on</button>
                    </div>
                    <div>
                        <button id="continueButton" type="button">Continue</button>
                    </div>
                    <div>
                        <button id="skipButton" type="button">Finish</button>
                    </div>
                </div>
                <div id="messages" class="menu"></div>
            </div>
            <div id="olProperties">
            </div>
            <div class="container" id="cy">
            </div>

        </main>

        <script src="../cytoscape-node-html-label-master/cytoscape-node-html-label-master/dist/cytoscape-node-html-label.js"></script>
        <!-- credits https://github.com/kaluginserg/cytoscape-node-html-label -->

        <script src="utils.js"></script>
        <script src="layoutOptions.js"></script>
        <script src="olToGraph.js"></script>
        <script src="visualisationController.js"></script>
        <script src="main.js"></script>

        <script src="../js-impl/doublyLinkedList.js"></script>
        <script src="../js-impl/olByLl.js"></script>
        <script src="../js-impl/olByTll.js"></script>
        <script src="../js-impl/olByTltll.js"></script>
        <script src="../js-impl/olUtils.js"></script>
        <script src="../js-impl/test.js"></script>
    </body>
</html>