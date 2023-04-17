class OdsByLl {
  constructor(x) {
    ods = this;
    visualisation.clearMessages();
    visualisation.addSequence();
    visualisation.logMessage("Initialize(" + x + ")", "blue", false);
    visualisation.addMessageIndent(1);
    this.linkedList = new LinkedList();
    this.valueToNode = new Map();
    this.valueToNode.set(x, new Node(x));
    this.linkedList.insert(this.valueToNode.get(x));
    visualisation.refresh(false);
    visualisation.logMessage("initialized new ODS with value " + x, "green", false);
    visualisation.addMessageIndent(-1);
    visualisation.process();
  }

  insert(x, y) {
    visualisation.addSequence();
    visualisation.refresh(false);
    visualisation.logMessage("Insert(" + x + ", " + y + ")","blue", false);
    visualisation.addMessageIndent(1);

    this.valueToNode.set(y, new Node(y));
    visualisation.highlight(node => node.data().value === x, "blue",true, false);
    this.linkedList.insertAfter(this.valueToNode.get(x), this.valueToNode.get(y));

    visualisation.refresh(true);
    // visualisation.highlight(node => node.data().value === x, "blue",false, false);
    visualisation.highlight(node => node.data().value === y, "green", false, false);
    visualisation.logMessage("inserted " + y + " after " + x, "green", false);
    // visualisation.refresh(false);
    visualisation.addMessageIndent(-1);
    visualisation.process();
  }

  delete(x) {
    visualisation.addSequence();
    visualisation.logMessage("Delete(" + x + ")", "blue", false);
    visualisation.refresh(false);
    visualisation.addMessageIndent(1);

    visualisation.highlight((node => node.data().value === x), "red", false, false);

    this.linkedList.remove(this.valueToNode.get(x));
    this.valueToNode.delete(x);

    visualisation.refresh(true);
    visualisation.logMessage("deleted " + x, "green", false);
    visualisation.addMessageIndent(-1);
    visualisation.process();
  }

  order(x, y) {
    visualisation.addSequence();
    visualisation.logMessage("Order(" + x + ", " + y + ")", "blue", false);
    visualisation.refresh(false);
    visualisation.addMessageIndent(1);

    let xNode = this.valueToNode.get(x);
    let yNode = this.valueToNode.get(y);

    visualisation.highlight((n => n.data().value === x), "blue", true, false);
    visualisation.highlight((n => n.data().value === y), "blue", false, false);

    let result = false;

    visualisation.logMessage("traverse list and search for " + x + " or " + y, "blue", true);
    visualisation.addMessageIndent(1);

    for (let node of this.linkedList) {
      visualisation.highlight((n => n.data().value === node.value), "blue", true, true);
      if (Object.is(node, xNode)) {
        visualisation.logMessage("found " + x + " before " + y, "blue", false);
        result = true;
        break;
      }

      if (Object.is(node, yNode)) {
        visualisation.logMessage("found " + y + " before " + x, "blue", false);
        result = false;
        break;
      }
    }
    visualisation.addMessageIndent(-1);
    visualisation.logMessage("order returned: " + result + ", " + x + (result? " < " : " > ") + y, "green", true);
    visualisation.refresh(false);
    visualisation.addMessageIndent(-1);
    visualisation.process();
    return result;
  }

  toString() {
    return "OdsByLl " + this.linkedList.toString();
  }

  contains(x) {
    return this.valueToNode.has(x);
  }

  getNumberOfElements() {
    return this.linkedList.length;
  }

  getProperties() {
    let properties = [
        "ODS by linked list",
        "n: " + this.linkedList.length,
    ]

    return properties;
  }

  toGraph() {
    return OdsToGraph.toGraphLl(this.linkedList);
  }

}
