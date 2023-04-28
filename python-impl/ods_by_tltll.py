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
        
        if (violates_invariant_1(self.n + 1, self.N)):
            self.rebuild()
        
        x_sublist = x_node.rep.value
        if (violates_invariant_2(len(x_sublist) + 1, self.sublist_N())):
            self.split_sublist(x_sublist)
            x_sublist = x_node.rep.value
        
        sublist_u = calculate_u(self.sublist_N())
        if (not available_tag_after(x_node, sublist_u)):
            relabel(x_node, len(x_sublist), sublist_u)
        
        y_node = TaggedNodeWithRep(y, get_new_tag_after(x_node, sublist_u))
        self.value_to_node[y] = y_node
        x_sublist.insertAfter(x_node, y_node)
        y_node.rep = x_node.rep
        self.n += 1
    
    def delete(self, x):
        x_node = self.value_to_node.pop(x)
        
        if (violates_invariant_1(self.n - 1, self.N)):
            self.rebuild()
            
        x_sublist = x_node.rep.value
        
        if (violates_invariant_2(len(x_sublist) - 1, self.sublist_N())):
            self.reps.remove(x_node.rep)
        
        x_sublist.remove(x_node)
        self.n -= 1
    
    def order(self, x, y):
        x_node = self.value_to_node[x]
        y_node = self.value_to_node[y]
        
        if (x == y):
            return False
        
        if (x_node.rep.tag == y_node.rep.tag):
            return x_node.tag < y_node.tag
        return x_node.rep.tag < y_node.rep.tag
    
    def sublist_N(self):
        # sublist_N = (log2(N)) rounded up to the closest power of two
        if (self.N == 1):
            return 1
        
        logN = math.log2(self.N)
        
        if (math.log2(logN) % 1 == 0): # is a power of 2
            return int(logN)
        
        return int(math.pow(2, math.ceil(math.log2(logN))));
    
    def rep_N(self):
        return self.N;
    
    def split_sublist(self, sublist):
        first_half_rep = sublist.head.rep
        
        if not available_tag_after(first_half_rep, calculate_u(self.rep_N())):
            relabel(first_half_rep, len(self.reps), calculate_u(self.rep_N()))
        
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
        
        sublist_u = calculate_u(self.sublist_N())
        assign_new_tags(first_half_rep.value.head, half_count, 0, sublist_u)
        assign_new_tags(second_half_rep.value.head, half_count, 0, sublist_u)  
        
        second_half_rep.tag = get_new_tag_after(first_half_rep, calculate_u(self.rep_N()))
        self.reps.insertAfter(first_half_rep, second_half_rep)
    
    def rebuild(self):
        print("rebuild")
        self.N = self.n
        sublist_N = self.sublist_N()
        rep_N = self.rep_N()
        
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
            
            assign_new_tags(new_rep.value.head, len(new_rep.value), 0, calculate_u(sublist_N))
            self.reps.append(new_rep)
        
        assign_new_tags(self.reps.head, len(self.reps), 0, calculate_u(rep_N))
    
    def __repr__(self):
        sublist_N = self.sublist_N()
        rep_N = self.rep_N()
        sublist_u = calculate_u(sublist_N)
        rep_u = calculate_u(rep_N)
        text = "OLByTLTLL: N:" + str(self.N) + " n:" + str(self.n) + " subl_N:" + str(sublist_N) + " subl_u:" + str(sublist_u) + " rep_N:" + str(rep_N) + " rep_u:" + str(rep_u)
        for rep in self.reps:
            text += " ->  ((" + "[" + str(rep.tag) + "] n:" + str(len(rep.value)) + "))"
            for node in rep.value:
                text += " -> " + "[" + str(node.tag) + "]" + str(node.value)
        return text
        
        