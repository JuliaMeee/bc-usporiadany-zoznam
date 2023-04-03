class VisualisationController {
    sequences = []
    processing = false
    messageIndent = 0
    visualisationOn = true;
    treeViewOn = false;
    messagesWindow = document.getElementById("messages")

    highlight(predicate, color, clearHighlight, isNewStep) {
        if (this.visualisationOn) {
            this.addStep( { isNewStep: isNewStep, func: wrapFunction(this._highlight, this, [predicate, color, clearHighlight])} );
        }
    }
    _highlight( predicate, color, clearHighlight) {
        console.log("highlight step");
        for (let node of graph.nodes()){
            if (predicate(node)) {
                console.log("YES predicate: ");
                console.log(node.data());
                node.data().highlight = color;
            }
            else if (clearHighlight) {
                console.log("clear highlight");
                node.data().highlight = 'none';
            }
        }

        graph.style(OlToGraph.graphStyle);
    }

    logMessage(text, color, isNewStep) {
        if (this.visualisationOn) {
            this.addStep( { isNewStep: isNewStep, func: wrapFunction(this._logMessage, this, [text, color])} );
        }
    }

    logMessageInstantly(text, color) {
        let savedIndent = this.messageIndent;
        this.messageIndent = 0;
        this._logMessage(text, color);
        this.messageIndent = savedIndent;
    }

    _logMessage(text, color) {
        if (this.messagesWindow.children.length > 0) {
            text = /*"<br>" + */"|&nbsp;".repeat(this.messageIndent) + text;
        }

        this.messagesWindow.insertAdjacentHTML(
            'beforeend',
            "<p style='color: " + color + "'>" + text + "</p>"
        );

        this.messagesWindow.scrollTop = this.messagesWindow.scrollHeight;
    }

    clearMessages() {
        this.messagesWindow.innerHTML = "";
    }

    addMessageIndent(n) {
        if (this.visualisationOn) {
            this.addStep({isNewStep: false, func: wrapFunction(this._addMessageIndent, this, [n])});
        }
    }

    _addMessageIndent(n) {
        this.messageIndent += n;
    }

    refresh(isNewStep) {
        if (this.visualisationOn) {
            this.addStep({ isNewStep: isNewStep, func: wrapFunction(this._refresh, this, [ol.getProperties(), ol.toGraph(this.treeViewOn)])});
        }
    }
    _refresh(properties, graphEles) {
        console.log("refresh step");
        this._setOlProperiesText(properties);

        graph = OlToGraph.buildGraph(graphEles.nodes, graphEles.edges);
        graph.nodeHtmlLabel(OlToGraph.htmlLabelStyle);
        graph.style(OlToGraph.graphStyle);

        graph.maxZoom(0.7);
        graph.fit(20);
    }

    addSequence() {
        if (this.visualisationOn) {
            this.sequences.push([]);
        }
    }

    addStep(step) {
        if (this.sequences.length === 0) {
            this.addSequence();
        }
        if (this.visualisationOn) {
            this.sequences.at(-1).push(step);
        }
    }

    skip() {
        this.process(true);
    }

    isBusy() {
        return this.processing;
    }

    process(skip = false) {
        if (!this.visualisationOn) {
            return;
        }
        if (this.processing) {
            console.log("Error: visualisation already processing.");
            return;
        }
        if (!this.sequences || this.sequences.length === 0) {
            console.log("Error: nothing to visualise.");
            return;
        }

        let sequence = this.sequences[0];
        if (sequence.length === 0) {
            this.sequences.shift();
            return;
        }

        this.processing = true;
        sequence[0].isNewStep = false;
        while (sequence.length > 0) {
            let step = sequence[0];

            if (!skip && step.isNewStep) {
                this.processing = false;
                return;
            }

            step.func();
            sequence.shift();

        }

        this.processing = false;
        this.sequences.shift();

        if (this.sequences.length === 0) {
            showElements(true);
        }
    }

    _setOlProperiesText(properties)
    {
        olPropertiesText.innerHTML = "";

        for (let i = 0; i < properties.length; i++) {
            const propertyDiv = document.createElement("div");
            propertyDiv.innerText = properties[i];
            olPropertiesText.appendChild(propertyDiv);
        }
    }
}

var visualisation = new VisualisationController();

var ol = null;

var graph = null;