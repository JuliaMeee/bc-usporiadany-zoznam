class OlByLl {
  constructor(x) {
    this.linked_list = new DoublyLinkedList();
    this.value_to_node = {};
    this.value_to_node[x] = new Node(x);
    this.linked_list.insert(this.value_to_node[x]);
  }

  insert(x, y) {
    this.value_to_node[y] = new Node(y);
    this.linked_list.insertAfter(this.value_to_node[x], this.value_to_node[y]);
  }

  delete(x) {
    this.linked_list.remove(this.value_to_node[x]);
    delete this.value_to_node[x];
  }

  order(x, y) {
    let x_node = this.value_to_node[x];
    let y_node = this.value_to_node[y];

    for (let node of this.linked_list) {
      if (Object.is(node, x_node)) {
        return true;
      }

      if (Object.is(node, y_node)) {
        return false;
      }
    }

    return false;
  }

  toString() {
    return "OlByLl " + this.linked_list.toString();
  }

}
