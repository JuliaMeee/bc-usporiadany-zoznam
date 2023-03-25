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

    ol.order(x, y);
}

function setStepTime() {
    let stepTime = parseFloat(stepTimeInput.value) * 1000; // convert sec to milisec
    visualisation.setStepTime(stepTime);
    console.log("changed step time to " + stepTime);
}

function playButtonClick() {
    console.log("play button click");
    visualisation.process();
}

function stopButtonClick() {
    console.log("stop button click");
}

function skipButtonClick() {
    visualisation.skip();
    console.log("skip button click");
}

function switchTagBaseButtonClick() {
    console.log("switch tag base button click");
}

function switchTreeViewButtonClick() {
    console.log("switch tree view button click");
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
var playButton = document.getElementById("playButton");
playButton.addEventListener("click", playButtonClick);
var stopButton = document.getElementById("stopButton");
stopButton.addEventListener("click", stopButtonClick);
var skipButton = document.getElementById("skipButton");
skipButton.addEventListener("click", skipButtonClick);
var switchTagBaseButton = document.getElementById("switchTagBaseButton");
switchTagBaseButton.addEventListener("click", switchTagBaseButtonClick);
var switchTreeViewButton = document.getElementById("switchTreeViewButton");
switchTreeViewButton.addEventListener("click", switchTreeViewButtonClick);

var initializeXInput = document.getElementById("initializeXInput");
var initializeTypeSelect = document.getElementById("initializeTypeSelect");
var insertXInput = document.getElementById("insertXInput");
var insertYInput = document.getElementById("insertYInput");
var deleteXInput = document.getElementById("deleteXInput");
var orderXInput = document.getElementById("orderXInput");
var orderYInput = document.getElementById("orderYInput");
var stepTimeInput = document.getElementById("stepTimeInput");
stepTimeInput.addEventListener("change", (event) => {setStepTime();});
setStepTime();


var olPropertiesText = document.getElementById("olProperties");

var cyContainer = document.getElementById("cy");