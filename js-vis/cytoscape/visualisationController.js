class VisualisationController {
    sequences = []
    processing = false
    messageIndent = 0
    messagesWindow = document.getElementById("messages")

    highlight(predicate, color, clearHighlight, isNewStep) {
        this.addStep( { isNewStep: isNewStep, func: wrapFunction(this._highlight, this, [predicate, color, clearHighlight])} );
    }
    _highlight( predicate, color, clearHighlight) {
        for (let node of graph.nodes()){
            if (predicate(node)) {
                node.data().highlight = color;
            }
            else if (clearHighlight) {
                node.data().highlight = 'none';
            }
        };

        graph.style(OlToGraph.graphStyle);
    }

    logMessage(text, color, isNewStep) {
        this.addStep( { isNewStep: isNewStep, func: wrapFunction(this._logMessage, this, [text, color])} )
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
            "<span style='color: " + color + "'>" + text + "</span>"
        );

        this.messagesWindow.scrollTop = this.messagesWindow.scrollHeight;
    }

    clearMessages() {
        this.messagesWindow.innerHTML = "";
    }

    addMessageIndent(n) {
        this.addStep({ isNewStep: false, func: wrapFunction(this._addMessageIndent, this, [n])});
    }

    _addMessageIndent(n) {
        this.messageIndent += n;
    }

    refresh(isNewStep) {
        this.addStep({ isNewStep: isNewStep, func: wrapFunction(this._refresh, this, [ol.getProperties(), ol.toGraph()])});
        console.log("refresh staged");
    }
    _refresh(properties, graphEles) {
        console.log("refresh start");
        this._setOlProperiesText(properties);

        graph = OlToGraph.buildGraph(graphEles.nodes, graphEles.edges);
        graph.style(OlToGraph.graphStyle);
        graph.nodeHtmlLabel(OlToGraph.htmlLabelStyle);

        graph.maxZoom(0.9);
        graph.fit(20);

        console.log("refresh end");
    }

    addSequence() {
        this.sequences.push([])
    }

    addStep(step) {
        this.sequences.at(-1).push(step)
    }

    skip() {
        this.process(true, true);
    }

    isBusy() {
        return this.processing;
    }

    process(userInduced = false, skip = false) {
        // if (!userInduced) {
        //     return;
        // }
        if (this.processing) {
            console.log("Error: visualisation already processing.");
            return;
        }
        if (!this.sequences) {
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
            hideGroup(visualisationControls);
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