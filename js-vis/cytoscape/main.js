class Vis {
    sequences = []
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

    _logMessage(text, color='blue') {
        let orig = this.messagesWindow.innerText;
        if (orig) {
            orig += "\n";
        }
        this.messagesWindow.innerText = orig + "-".repeat(this.messageIndent) + text;
        this.messagesWindow.scrollTop = this.messagesWindow.scrollHeight;

        this.messagesWindow.style.color = color;
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
                    await sleep(500);
                }

                step.func();
            }
        }

        this.processing = false;
    }
}

var vis = new Vis();

var wrapFunction = function(fn, context, params) {
    return function() {
        fn.apply(context, params);
    };
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}