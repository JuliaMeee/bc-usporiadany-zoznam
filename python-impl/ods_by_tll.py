from linked_list import TaggedNode, LinkedList
from ods_utils import *
import math

class OdsByTll:
    def __init__(self, x):
        self.linked_list = LinkedList()
        self.value_to_node = dict()
        self.n = 1
        self.N = 2
        self.u = calculate_u(self.N)

        self.value_to_node[x] = TaggedNode(x, 0)
        self.linked_list.insert(self.value_to_node[x])
    
    def insert(self, x, y):        
        x_node = self.value_to_node[x]
        
        if (not available_tag_after(x_node, self.u)):
            relabel(x_node, self.n, self.u)
        
        y_node = TaggedNode(y, get_new_tag_after(x_node, self.u))
        self.value_to_node[y] = y_node
        self.linked_list.insertAfter(x_node, y_node)
        self.n += 1
        
        if (violates_invariant_1(self.n, self.N)):
            self.rebuild()
    
    def delete(self, x):
        x_node = self.value_to_node.pop(x)
        self.linked_list.remove(x_node)
        self.n -= 1
        
        if (violates_invariant_1(self.n, self.N)):
            self.rebuild()
    
    def order(self, x, y):
        x_node = self.value_to_node[x]
        y_node = self.value_to_node[y]
        
        if (x == y):
            return False
        
        return x_node.tag < y_node.tag
   
    def rebuild(self):
        print("rebuild")
        self.N = self.n
        self.u = calculate_u(self.N)
        
        assign_new_tags(self.linked_list.head, self.n, 0, self.u)
    
    def __repr__(self):
        text = "OLByTLL: N:" + str(self.N) + " u:" + str(self.u) + " n:" + str(self.n)
        for node in self.linked_list:
            text += " -> " + "[" + str(node.tag) + "]" + str(node.value)
        return text

