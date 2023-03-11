# DLL / Doubly Linked List

class Node:
    def __init__(self, value):
        self.prev = None
        self.next = None
        self.value = value
    
    def __repr__(self) -> str:
        return str(self.value)

class TaggedNode(Node):
    def __init__(self, x, tag=0):
        Node.__init__(self, x)
        self.tag = tag
    
    def __repr(self):
        return "[" + str(self.tag) + "]" + str(self.value)

class TaggedNodeWithRep(TaggedNode):
    def __init__(self, x, tag=0, rep=None):
        TaggedNode.__init__(self, x, tag)
        self.rep = rep
    
    def __repr(self):
        return "[" + str(self.tag) + "]" + str(self.value)

class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.length = 0
    
    def __len__(self) -> int:
        return self.length
    
    def insert(self, x_node):
        if (x_node is None):
            return
        # head: y_node ... tail
        # ==> 
        # head: x_node -> y_node ... tail;
        y_node = self.head

        self.head = x_node
        x_node.prev = None
        x_node.next = y_node
        if y_node is not None:
            y_node.prev = x_node
        else:
            self.tail = x_node
        
        self.length += 1
    
    def append(self, x_node):
        if (x_node is None):
            return
        # head ... tail: y_node
        # ==>
        # head ... y_node -> tail: x_node
        y_node = self.tail
        
        self.tail = x_node
        x_node.next = None
        x_node.prev = y_node
        if (y_node is not None):
            y_node.next = x_node
        else:
            self.head = x_node
        
        self.length += 1

    def insertAfter(self, x_node, y_node):
        if (x_node is None or y_node is None):
            return
        # head ... x_node -> z_node ... tail
        # ==>
        # head ... x_node -> y_node -> z_node ... tail
        
        z_node = x_node.next

        x_node.next = y_node
        y_node.prev = x_node

        y_node.next = z_node
        if (z_node is not None):
            z_node.prev = y_node
        else:
            self.tail = y_node
        
        self.length += 1

    def remove(self, x_node):
        if (x_node is None):
            return
        # head ... w_node -> x_node -> y_node ... tail
        # ==>
        # head ... w_node -> y_node ... tail

        w_node = x_node.prev
        y_node = x_node.next

        if (w_node is not None):
            w_node.next = y_node
        else:
            self.head = y_node
        
        if (y_node is not None):
            y_node.prev = w_node
        else:
            self.tail = w_node
        
        self.length -= 1
    
    def __iter__(self):
        return DLLIter(self)
    
    def __repr__(self) -> str:
        text = "DLL [" + str(self.length) + "]:"
        for node in self:
            text += " -> " + str(node)

        return text

class DLLIter:
    def __init__(self, dll):
        self._current_node = dll.head
    def __iter__(self):
        return self
    def __next__(self):
        if self._current_node is not None:
            node = self._current_node
            self._current_node = self._current_node.next
            return node
        raise StopIteration
