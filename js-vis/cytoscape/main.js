class Vis {
    steps = []
    messageIndent = 0
    messagesWindow = document.getElementById("messages")
    highlight( predicate, clearHighlight=false) {

    }

    message(text, color='blue') {
        let orig = this.messagesWindow.innerText;
        if (orig) {
            orig += "\n";
        }
        this.messagesWindow.innerText = orig + "-".repeat(this.messageIndent) + text;
        this.messagesWindow.scrollTop = this.messagesWindow.scrollHeight;

        this.messagesWindow.style.color = color;
    }

    addMessageIndent(n) {
        this.messageIndent += n;
    }
}

var vis = new Vis();