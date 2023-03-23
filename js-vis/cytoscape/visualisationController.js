class VisualisationController {
    sequences = []
    stepTime = 500
    doStepsInstantly = false
    processing = false
    messageIndent = 0
    messagesWindow = document.getElementById("messages")

    highlight(predicate, color, clearHighlight, isNewStep = true) {
        this.addStep( { isNewStep: isNewStep, func: wrapFunction(this._highlight, this, [predicate, color, clearHighlight])} );
    }
    _highlight( predicate, color = 'blue', clearHighlight= false, isNewStep = true) {

    }

    logMessage(text, color='blue', isNewStep = true) {
        this.addStep( { isNewStep: isNewStep, func: wrapFunction(this._logMessage, this, [text, color])} )
    }

    logMessageInstantly(text, color) {
        let savedIndent = this.messageIndent;
        this.messageIndent = 0;
        this._logMessage(text, color);
        this.messageIndent = savedIndent;
    }

    _logMessage(text, color='blue') {
        if (this.messagesWindow.children.length > 0) {
            text = /*"<br>" + */"--".repeat(this.messageIndent) + text;
        }

        this.messagesWindow.insertAdjacentHTML(
            'beforeend',
            "<span style='color: " + color + "'>" + text + "</span>"
        );

        this.messagesWindow.scrollTop = this.messagesWindow.scrollHeight;
    }

    addMessageIndent(n) {
        this.addStep({ isNewStep: false, func: wrapFunction(this._addMessageIndent, this, [n])});
    }

    _addMessageIndent(n) {
        this.messageIndent += n;
    }

    refresh(isNewStep = true) {
        this.addStep({ isNewStep: isNewStep, func: this._refresh});
    }
    _refresh() {

    }

    addSequence() {
        this.sequences.push([])
    }

    addStep(step) {
        this.sequences.at(-1).push(step)
    }

    skip() {
        this.doStepsInstantly = true;
        this.process();
    }

    setStepTime(timeInMs) {
        this.stepTime = timeInMs;
    }

    isBusy() {
        return this.processing;
    }

    async process() {
        if (this.processing) {
            console.log("Error: vis already processing")
            return;
        }

        this.processing = true;

        while (this.sequences.length > 0) {
            let sequence = this.sequences.shift();
            while (sequence.length > 0) {
                let step = sequence.shift();

                if (step.isNewStep) {
                    if (!this.doStepsInstantly){
                        await sleep(this.stepTime);
                    }
                }

                step.func();
            }
        }

        this.processing = false;
        this.doStepsInstantly = false;
    }
}

var visualisation = new VisualisationController();