function initializeButtonClick() {
    console.log("initialize button click");
    if (visualisation.isBusy()) {
        visualisation.logMessageInstantly("!! Visualisation is busy !!", "orange");
        return;
    }

    let x = initializeXInput.value.trim();
    if (x.length === 0)
    {
        visualisation.logMessage(" !! Initialize error: invalid (empty) value of x !!", "red", true);
        return;
    }


    hideGroup(operationsControls);
    let olType = initializeTypeSelect.value;
    switch (olType) {
        case "olByLl":
            ol = new OlByLl(x);
            break;
        case "olByTll":
            ol = new OlByTll(x);
            break;
        case "olByTltll":
            ol = new OlByTltll(x);
            break;
    }
}

function insertButtonClick() {
    console.log("insert button click");
    if (visualisation.isBusy()) {
        visualisation.logMessageInstantly("!! Visualisation is busy !!", "orange");
        return;
    }

    let x = insertXInput.value.trim();
    let y = insertYInput.value.trim();
    if (!ol.contains(x)) {
        visualisation.logMessageInstantly(" !! Insert error: ordered list does not contain '" + x + "' !!", "red", true);
        return;
    }
    if (y.length === 0) {
        visualisation.logMessageInstantly(" !! Insert error: invalid (empty) value of y !!", "red", true);
        return;
    }
    if (ol.contains(y)) {
        visualisation.logMessageInstantly(" !! Insert error: ordered list already contains '" + y + "' !!", "red", true);
        return;
    }

    hideGroup(operationsControls);
    ol.insert(x, y);
}

function deleteButtonClick() {
    console.log("delete button click");
    if (visualisation.isBusy()) {
        visualisation.logMessageInstantly("!! Visualisation is busy !!", "orange");
        return;
    }

    let x = deleteXInput.value.trim();
    if (!ol.contains(x)) {
        visualisation.logMessageInstantly(" !! Delete error: ordered list does not contain '" + x + "' !!", "red", true);
        return;
    }

    if (ol.getNumberOfElements() < 2) {
        visualisation.logMessageInstantly(" !! Delete error: cannot reduce number of elements to 0 !!", "red", true);
        return;
    }

    hideGroup(operationsControls);
    ol.delete(x);
}

function orderButtonClick() {
    console.log("order button click");
    if (visualisation.isBusy()) {
        visualisation.logMessageInstantly("!! Visualisation is busy !!", "orange");
        return;
    }

    let x = orderXInput.value.trim();
    let y = orderYInput.value.trim();
    if (!ol.contains(x)) {
        visualisation.logMessageInstantly(" !! Order error: ordered list does not contain '" + x + "' !!", "red", true);
        return;
    }
    if (!ol.contains(y)) {
        visualisation.logMessageInstantly(" !! Order error: ordered list does not contain '" + y + "' !!", "red", true);
        return;
    }

    hideGroup(operationsControls);
    ol.order(x, y);
}

function skipButtonClick() {
    console.log("skip button click");
    visualisation.skip();
    hideGroup(visualisationControls);
}

function continueButtonClick() {
    console.log("skip button click");
    visualisation.process( false);
}
function treeViewButtonClick() {
    console.log("tree view checkbox click");
    visualisation.treeViewOn = !visualisation.treeViewOn;
    setTreeViewButtonText();

    if (ol) {
        visualisation.addSequence();
        visualisation.refresh(false);
        visualisation.process(true);
    }
}

function setTreeViewButtonText() {
    treeViewButton.innerText = "Tree view: " + (visualisation.treeViewOn ? "on" : "off");
}

function hideGroup(group) {
    if (group === operationsControls) {
        visualisationControls.forEach(item => item.classList.remove('hidden'));
        operationsControls.forEach(item => item.classList.add('hidden'));
    }

    else {
        operationsControls.forEach(item => item.classList.remove('hidden'));
        visualisationControls.forEach(item => item.classList.add('hidden'));
    }
}

// Bind buttons
var initializeButton = document.getElementById("initializeButton");
initializeButton.addEventListener("click", initializeButtonClick);
var insertButton = document.getElementById("insertButton");
insertButton.addEventListener("click", insertButtonClick);
var deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener("click", deleteButtonClick);
var orderButton = document.getElementById("orderButton");
orderButton.addEventListener("click", orderButtonClick);

var skipButton = document.getElementById("skipButton");
skipButton.addEventListener("click", skipButtonClick);
var continueButton = document.getElementById("continueButton");
continueButton.addEventListener("click", continueButtonClick);

var treeViewButton = document.getElementById("treeViewButton");
treeViewButton.addEventListener("click", treeViewButtonClick);
setTreeViewButtonText();

var initializeXInput = document.getElementById("initializeXInput");
var initializeTypeSelect = document.getElementById("initializeTypeSelect");
var insertXInput = document.getElementById("insertXInput");
var insertYInput = document.getElementById("insertYInput");
var deleteXInput = document.getElementById("deleteXInput");
var orderXInput = document.getElementById("orderXInput");
var orderYInput = document.getElementById("orderYInput");


var olPropertiesText = document.getElementById("olProperties");

var cyContainer = document.getElementById("cy");


var visualisationControls = [
    continueButton,
    skipButton,
]
var operationsControls = [
    initializeButton,
    insertButton,
    deleteButton,
    orderButton,
    treeViewButton,
]

hideGroup(visualisationControls);