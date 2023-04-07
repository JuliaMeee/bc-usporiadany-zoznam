function initializeButtonClick() {
    console.log("initialize button click");
    if (visualisation.isBusy()) {
        visualisation.logMessageInstantly("!! Visualisation is busy !!", "orange");
        return;
    }

    let x = initializeInput.x.value.trim();
    if (x.length === 0)
    {
        visualisation.logMessageInstantly(" !! Initialize error: invalid (empty) value of x !!", "red", true);
        return;
    }

    showElements(false, initializeInput);

    let olType = initializeInput.olType.value;
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
    if (!ol) {
        visualisation.logMessageInstantly(" !! Insert error: ordered list has not been initialized !!", "red", true);
        return;
    }

    let x = insertInput.x.value.trim();
    let y = insertInput.y.value.trim();
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

    showElements(false, insertInput);
    ol.insert(x, y);
}

function deleteButtonClick() {
    console.log("delete button click");
    if (visualisation.isBusy()) {
        visualisation.logMessageInstantly("!! Visualisation is busy !!", "orange");
        return;
    }
    if (!ol) {
        visualisation.logMessageInstantly(" !! Delete error: ordered list has not been initialized !!", "red", true);
        return;
    }

    let x = deleteInput.x.value.trim();
    if (!ol.contains(x)) {
        visualisation.logMessageInstantly(" !! Delete error: ordered list does not contain '" + x + "' !!", "red", true);
        return;
    }

    if (ol.getNumberOfElements() < 2) {
        visualisation.logMessageInstantly(" !! Delete error: cannot reduce number of elements to 0 !!", "red", true);
        return;
    }

    showElements(false, deleteInput);
    ol.delete(x);
}

function orderButtonClick() {
    console.log("order button click");
    if (visualisation.isBusy()) {
        visualisation.logMessageInstantly("!! Visualisation is busy !!", "orange");
        return;
    }
    if (!ol) {
        visualisation.logMessageInstantly(" !! Order error: ordered list has not been initialized !!", "red", true);
        return;
    }

    let x = orderInput.x.value.trim();
    let y = orderInput.y.value.trim();
    if (!ol.contains(x)) {
        visualisation.logMessageInstantly(" !! Order error: ordered list does not contain '" + x + "' !!", "red", true);
        return;
    }
    if (!ol.contains(y)) {
        visualisation.logMessageInstantly(" !! Order error: ordered list does not contain '" + y + "' !!", "red", true);
        return;
    }

    showElements(false, orderInput);
    ol.order(x, y);
}

function skipButtonClick() {
    console.log("skip button click");
    visualisation.skip();
    // hideGroup(visualisationControls); // TODO
}

function continueButtonClick() {
    console.log("skip button click");
    visualisation.process( false);
}
function treeViewButtonClick() {
    console.log("tree view button click");
    visualisation.treeViewOn = !visualisation.treeViewOn;
    setTreeViewButtonText();

    if (ol) {
        visualisation.addSequence();
        visualisation.refresh(false);
        visualisation.process(true);
    }
}

function setTreeViewButtonText() {
    other.treeView.innerText = "Tree view: " + (visualisation.treeViewOn ? "on" : "off");
}

function generateButtonClick() {
    visualisation.visualisationOn = false;
    ol = generateOl(other.olType.value, other.alphabet.value);
    visualisation.visualisationOn = true;
    visualisation.refresh(false);
    visualisation.logMessageInstantly("Generate tree", "green");
    visualisation.process();

}

function showElement(element, doShow) {
    if (doShow) {
        element.classList.remove('hidden');
    }
    else {
        element.classList.add('hidden');
    }
}

function showElements(idle, actionToShow) {
    for (let op of operationsControls) {
        showElement(op.start, idle);
        showElement(op.continue, false);
        showElement(op.skip, false);
    }

    for (let [key, ele] of Object.entries(other)) {
        showElement(ele, idle);
    }

    if (actionToShow) {
        showElement(actionToShow.continue, true);
        showElement(actionToShow.skip, true);
    }
}

// Globally used variables
var visualisation = new Visualisation();
var ol = null;
var graph = null;

// Bind buttons and input

// initilize
const initializeInput = {x: null, start: null, continue: null, skip: null};
initializeInput.x = document.getElementById("initializeXInput");
initializeInput.olType = document.getElementById("initializeTypeSelect");
initializeInput.start = document.getElementById("initializeButton");
initializeInput.start.addEventListener("click", initializeButtonClick);
initializeInput.continue = document.getElementById("initializeContinueButton");
initializeInput.continue.addEventListener("click", continueButtonClick);
initializeInput.skip = document.getElementById("initializeSkipButton");
initializeInput.skip.addEventListener("click", skipButtonClick);

// insert
const insertInput = {x: null, y: null, start: null, continue: null, skip: null};
insertInput.x = document.getElementById("insertXInput");
insertInput.y = document.getElementById("insertYInput");
insertInput.start = document.getElementById("insertButton");
insertInput.start.addEventListener("click", insertButtonClick);
insertInput.continue = document.getElementById("insertContinueButton");
insertInput.continue.addEventListener("click", continueButtonClick);
insertInput.skip = document.getElementById("insertSkipButton");
insertInput.skip.addEventListener("click", skipButtonClick);

// delete
const deleteInput = {x: null, start: null, continue: null, skip: null};
deleteInput.x = document.getElementById("deleteXInput");
deleteInput.start = document.getElementById("deleteButton");
deleteInput.start.addEventListener("click", deleteButtonClick);
deleteInput.continue = document.getElementById("deleteContinueButton");
deleteInput.continue.addEventListener("click", continueButtonClick);
deleteInput.skip = document.getElementById("deleteSkipButton");
deleteInput.skip.addEventListener("click", skipButtonClick);

// order
const orderInput = {x: null, y: null, start: null, continue: null, skip: null};
orderInput.x = document.getElementById("orderXInput");
orderInput.y = document.getElementById("orderYInput");
orderInput.start = document.getElementById("orderButton");
orderInput.start.addEventListener("click", orderButtonClick);
orderInput.continue = document.getElementById("orderContinueButton");
orderInput.continue.addEventListener("click", continueButtonClick);
orderInput.skip = document.getElementById("orderSkipButton");
orderInput.skip.addEventListener("click", skipButtonClick);

const operationsControls = [
    initializeInput,
    insertInput,
    deleteInput,
    orderInput,
];

other = {treeView: null, olType: null, alphabet: null, generate: null};
other.treeView = document.getElementById("treeViewButton");
other.treeView.addEventListener("click", treeViewButtonClick);
setTreeViewButtonText();
other.olType = document.getElementById("generateTypeSelect");
other.alphabet = document.getElementById("generateAlphabetSelect");
other.generate = document.getElementById("generateButton");
other.generate.addEventListener("click", generateButtonClick);

const olPropertiesText = document.getElementById("olProperties");

const cyContainer = document.getElementById("cy");

showElements(true);