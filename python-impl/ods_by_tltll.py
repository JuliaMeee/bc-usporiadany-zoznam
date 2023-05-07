from ods_by_tll import OdsByTll
from linked_list import LinkedList, TaggedNode, TaggedNodeWithRep
from ods_utils import *
import math

class OdsByTltll(OdsByTll):
    def __init__(self, x):
        self.reps = LinkedList()
        self.value_to_node = dict()
        
        x_node = TaggedNodeWithRep(x, 0)
        self.value_to_node[x] = x_node
        
        x_rep = TaggedNode(LinkedList(), 0)
        x_rep.value.insert(x_node)
        x_node.rep = x_rep
        
        self.reps.insert(x_rep)
        
        self.n = 1
        self.N = 2
    
    def insert(self, x, y):
        x_node = self.value_to_node[x]
        
        x_sublist = x_node.rep.value
        if (violates_invariant_2(len(x_sublist) + 1, self.sublist_N())):
            self.split_in_half(x_sublist)
            x_sublist = x_node.rep.value
        
        sublist_u = self.sublist_u()
        if (not available_tag_after(x_node, sublist_u)):
            relabel(x_node, len(x_sublist), sublist_u)
        
        y_node = TaggedNodeWithRep(y, get_new_tag_after(x_node, sublist_u))
        self.value_to_node[y] = y_node
        x_sublist.insertAfter(x_node, y_node)
        y_node.rep = x_node.rep
        self.n += 1
        
        if (violates_invariant_1(self.n, self.N)):
            self.rebuild()
    
    def delete(self, x):
        x_node = self.value_to_node.pop(x)
            
        x_sublist = x_node.rep.value
        
        if (violates_invariant_2(len(x_sublist) - 1, self.sublist_N())):
            self.reps.remove(x_node.rep)
        
        x_sublist.remove(x_node)
        self.n -= 1
        
        if (violates_invariant_1(self.n, self.N)):
            self.rebuild()
    
    def order(self, x, y):
        x_node = self.value_to_node[x]
        y_node = self.value_to_node[y]
        
        if (x == y):
            return False
        
        if (x_node.rep.tag == y_node.rep.tag):
            return x_node.tag < y_node.tag
        return x_node.rep.tag < y_node.rep.tag
    
    def sublist_N(self):
        if (self.N == 1):
            return 1
        
        return math.floor(math.log2(self.N))
    
    def sublist_u(self):
        return calculate_u(self.N)
    
    def rep_N(self):
        return self.N

    def rep_u(self):
        return calculate_u(self.N)
    
    def split_in_half(self, sublist):
        first_half_rep = sublist.head.rep
        
        if not available_tag_after(first_half_rep, self.rep_u()):
            relabel(first_half_rep, len(self.reps), self.rep_u())
        
        first_half_rep.value = LinkedList()
        second_half_rep = TaggedNode(LinkedList(), 0)
        
        half_count = len(sublist) // 2 # should equal sublist_N
        
        node = sublist.head
        for i in range(0, len(sublist)):
            next_node = node.next
            rep = first_half_rep if i < half_count else second_half_rep
            rep.value.append(node)
            node.rep = rep
            
            node = next_node
        
        sublist_u = self.sublist_u()
        assign_new_tags(first_half_rep.value.head, half_count, 0, sublist_u)
        assign_new_tags(second_half_rep.value.head, half_count, 0, sublist_u)  
        
        second_half_rep.tag = get_new_tag_after(first_half_rep, self.rep_u())
        self.reps.insertAfter(first_half_rep, second_half_rep)
    
    def rebuild(self):
        print("rebuild")
        self.N = self.n
        sublist_N = self.sublist_N()
        
        old_rep = self.reps.head
        node = old_rep.value.head
        self.reps = LinkedList()
        
        while node is not None:
            new_rep = TaggedNode(LinkedList())
            
            for i in range(0, sublist_N):                
                next_node = node.next
                new_rep.value.append(node)
                node.rep = new_rep
                node = next_node
                
                if node is None:
                    old_rep = old_rep.next
                    if old_rep is None:
                        break
                    node = old_rep.value.head
            
            assign_new_tags(new_rep.value.head, len(new_rep.value), 0, self.sublist_N())
            self.reps.append(new_rep)
        
        assign_new_tags(self.reps.head, len(self.reps), 0, self.rep_u())
    
    def __repr__(self):
        sublist_N = self.sublist_N()
        rep_N = self.rep_N()
        sublist_u = self.sublist_u()
        rep_u = self.rep_u()
        text = "OLByTLTLL: N:" + str(self.N) + " n:" + str(self.n) + " subl_N:" + str(sublist_N) + " subl_u:" + str(sublist_u) + " rep_N:" + str(rep_N) + " rep_u:" + str(rep_u)
        for rep in self.reps:
            text += " ->  ((" + "[" + str(rep.tag) + "] n:" + str(len(rep.value)) + "))"
            for node in rep.value:
                text += " -> " + "[" + str(node.tag) + "]" + str(node.value)
        return text
        
        