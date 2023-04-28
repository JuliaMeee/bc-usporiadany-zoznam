from linked_list import Node, LinkedList

class OdsByLl:
    def __init__(self, x):
        self.linked_list = LinkedList()
        self.value_to_node = dict()

        self.value_to_node[x] = Node(x)
        self.linked_list.insert(self.value_to_node[x])
    
    def insert(self, x, y):
        self.value_to_node[y] = Node(y)
        
        self.linked_list.insertAfter(self.value_to_node[x], self.value_to_node[y])
    
    def delete(self, x):
        self.linked_list.remove(self.value_to_node[x])
        
        self.value_to_node.pop(x)
    
    def order(self, x, y):
        x_node = self.value_to_node[x]
        y_node = self.value_to_node[y]

        if x == y:
            return False
        
        for node in self.linked_list:
            if (node is x_node):
                return True
            if (node is y_node):
                return False
        # Error: x, y nodes not found.
        return False
    
    def __repr__(self):
        return "OLByLL: " + str(self.linked_list)
    
