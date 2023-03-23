class OlByLl {
  constructor(x) {
    this.linkedList = new DoublyLinkedList();
    this.valueToNode = new Map();
    this.valueToNode.set(x, new Node(x));
    this.linkedList.insert(this.valueToNode.get(x));
  }

  insert(x, y) {
    visualisation.addSequence();
    visualisation.logMessage("Insert( " + x + ", " + y + " )",'blue');
    visualisation.addMessageIndent(1);

    this.valueToNode.set(y, new Node(y));
    visualisation.highlight(node => node.data.value == x, true, 'blue', false);
    this.linkedList.insertAfter(this.valueToNode.get(x), this.valueToNode.get(y));
    visualisation.refresh(true);
    visualisation.highlight(node => node.data.value == y, true, 'green', false);

    visualisation.logMessage("inserted " + y + " after " + x, 'green');
    visualisation.addMessageIndent(-1);
    visualisation.process();
  }

  delete(x) {
    visualisation.addSequence();
    visualisation.logMessage("Delete( " + x + " )", 'blue');
    visualisation.addMessageIndent(1);

    visualisation.highlight((node => node.data.value === x), 'red', false, false);

    this.linkedList.remove(this.valueToNode.get(x));
    this.valueToNode.delete(x);

    visualisation.refresh(true);
    visualisation.logMessage("deleted " + x, 'green', false);
    visualisation.addMessageIndent(-1);
    visualisation.process();
  }

  order(x, y) {
    visualisation.addSequence();
    visualisation.logMessage("Order( " + x + ", " + y + " )", 'blue');
    visualisation.addMessageIndent(1);

    let xNode = this.valueToNode.get(x);
    let yNode = this.valueToNode.get(y);

    let result = false;

    visualisation.logMessage("traverse list and search for nodes " + x + ", " + y);
    visualisation.addMessageIndent(1);

    for (let node of this.linkedList) {
      visualisation.highlight((n => n.data.value === node.value), 'blue', true, true);
      if (Object.is(node, xNode)) {
        visualisation.logMessage("found node " + x + " before " + y, "blue", false);
        result = true;
        break;
      }

      if (Object.is(node, yNode)) {
        visualisation.logMessage("found node " + y + " before " + x, "blue", false);
        result = false;
        break;
      }
    }
    visualisation.addMessageIndent(-1);
    visualisation.logMessage("order returned: " + result, 'green');
    visualisation.addMessageIndent(-1);
    visualisation.process();
    return result;
  }

  toString() {
    return "OlByLl " + this.linkedList.toString();
  }

  contains(x) {
    return this.valueToNode.has(x);
  }

}
