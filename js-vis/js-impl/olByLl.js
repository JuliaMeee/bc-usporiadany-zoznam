class OlByLl {
  constructor(x) {
    this.linked_list = new DoublyLinkedList();
    this.value_to_node = {};
    this.value_to_node[x] = new Node(x);
    this.linked_list.insert(this.value_to_node[x]);
  }

  insert(x, y) {
    vis.message("Insert(" + x + ", " + y + ")",'blue');
    this.value_to_node[y] = new Node(y);
    this.linked_list.insertAfter(this.value_to_node[x], this.value_to_node[y]);
    vis.message("DONE", 'green');
  }

  delete(x) {
    vis.message("Delete(" + x + ")", 'blue');
    this.linked_list.remove(this.value_to_node[x]);
    delete this.value_to_node[x];
    vis.message("DONE", 'green');
  }

  order(x, y) {
    vis.message("Order(" + x + ", " + y + ")", 'green');
    vis.addMessageIndent(1);

    let x_node = this.value_to_node[x];
    let y_node = this.value_to_node[y];

    let result = false;

    vis.message("traverse list and search for nodes " + x + ", " + y);

    for (let node of this.linked_list) {
      if (Object.is(node, x_node)) {
        result = true;
        break;
      }

      if (Object.is(node, y_node)) {
        result = false;
        break;
      }
    }
    vis.addMessageIndent(-1);

    vis.message("DONE", 'green');

    return result;
  }

  toString() {
    return "OlByLl " + this.linked_list.toString();
  }

}
