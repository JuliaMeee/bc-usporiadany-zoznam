class OlByLl {
  constructor(x) {
    this.linked_list = new DoublyLinkedList();
    this.value_to_node = {};
    this.value_to_node[x] = new Node(x);
    this.linked_list.insert(this.value_to_node[x]);
  }

  insert(x, y) {
    vis.addSequence();
    vis.logMessage("Insert( " + x + ", " + y + " )",'blue');
    vis.addMessageIndent(1);

    this.value_to_node[y] = new Node(y);
    vis.highlight(node => node.data.value == x, true, 'blue', false);
    this.linked_list.insertAfter(this.value_to_node[x], this.value_to_node[y]);
    vis.refresh(true);
    vis.highlight(node => node.data.value == y, true, 'green', false);

    vis.logMessage("inserted " + y + " after " + x, 'green');
    vis.addMessageIndent(-1);
    vis.process();
  }

  delete(x) {
    vis.addSequence();
    vis.logMessage("Delete( " + x + " )", 'blue');
    vis.addMessageIndent(1);

    vis.highlight((node => node.data.value === x), 'red', false, false);

    this.linked_list.remove(this.value_to_node[x]);
    delete this.value_to_node[x];

    vis.refresh(true);
    vis.logMessage("deleted " + x, 'green', false);
    vis.addMessageIndent(-1);
    vis.process();
  }

  order(x, y) {
    vis.addSequence();
    vis.logMessage("Order( " + x + ", " + y + " )", 'green');
    vis.addMessageIndent(1);

    let x_node = this.value_to_node[x];
    let y_node = this.value_to_node[y];

    let result = false;

    vis.logMessage("traverse list and search for nodes " + x + ", " + y);
    vis.addMessageIndent(1);

    for (let node of this.linked_list) {
      vis.highlight((n => n.data.value === node.value), 'blue', true, true);
      if (Object.is(node, x_node)) {
        vis.logMessage("found node " + x + " before " + y, "blue", false);
        result = true;
        break;
      }

      if (Object.is(node, y_node)) {
        vis.logMessage("found node " + y + " before " + x, "blue", false);
        result = false;
        break;
      }
    }
    vis.addMessageIndent(-1);
    vis.logMessage("order returned: " + result, 'green');
    vis.addMessageIndent(-1);
    vis.process();
    return result;
  }

  toString() {
    return "OlByLl " + this.linked_list.toString();
  }

}
