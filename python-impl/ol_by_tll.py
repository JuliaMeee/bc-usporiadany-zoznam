from doubly_linked_list import TaggedNode, DoublyLinkedList
import math

class OLByTLL:
    def __init__(self, x):
        self.linked_list = DoublyLinkedList()
        self.value_to_node = dict()
        self.n = 1
        self.N = 2
        self.u = self.calculate_u(self.N)

        self.value_to_node[x] = TaggedNode(x, 0)
        self.linked_list.insert(self.value_to_node[x])
    
    def insert(self, x, y):        
        x_node = self.value_to_node[x]
        
        if (self.violates_invariant_1(self.n + 1, self.N)):
            self.rebuild()
        
        if (not self.available_tag_after(x_node, self.u)):
            self.relabel(x_node, self.n, self.u)
        
        y_node = TaggedNode(y, self.get_new_tag_after(x_node, self.u))
        self.value_to_node[y] = y_node
        self.linked_list.insertAfter(x_node, y_node)
        self.n += 1
    
    def delete(self, x):
        if (self.violates_invariant_1(self.n - 1, self.N)):
            self.rebuild()
        
        x_node = self.value_to_node.pop(x)
        self.linked_list.remove(x_node)
        self.n -= 1
    
    def order(self, x, y):
        x_node = self.value_to_node[x]
        y_node = self.value_to_node[y]
        
        return x_node.tag < y_node.tag
    
    def calculate_u(self, N):
        return int(math.pow(2, 1 + math.floor(math.log2(math.pow(N, 2)))))
    
    def get_virtual_tree_level(self, u):
        return math.log2(u)
    
    def violates_invariant_1(self, n, N):
        return not (N / 2 < n < 2 * N)
    
    def calculate_T(self, n, u):
        print("calculate_T with: n:", n, " u:", u)
        tree_level = self.get_virtual_tree_level(u)
        root_density = (n / u)
        
        T = max(1.001, math.exp(math.log(u/n)/tree_level) - 0.0001)
        
        assert(root_density <= self.overflow_threshold(T, tree_level))
        
        return T
    
    def overflow_threshold(self, T, interval_level):
        if interval_level == 0:
            return 1
        return math.pow(T, -interval_level)
    
    def relabel(self, x_node, n, u):
        print("relabel")
        T = self.calculate_T(n, u)
        print("T: ", T)
        interval = TagInterval(x_node)
        interval.increase()
        
        while interval.density() > self.overflow_threshold(T, interval.level):
            print("interval:", interval.min_tag, "-", interval.max_tag_excl, "n:", interval.nodes_count)
            interval.increase()
        
        print("interval:", interval.min_tag, "-", interval.max_tag_excl, "n:", interval.nodes_count)
        assert(interval.max_tag_excl <= u)
        
        self.assign_new_tags(interval.min_node, interval.nodes_count, interval.min_tag, interval.max_tag_excl - 1)
    
    def assign_new_tags(self, min_node, nodes_to_retag_count, min_tag, max_tag):
        print("assign new tags: ", min_node, nodes_to_retag_count, min_tag, max_tag)
        tag_offset = ((1 + max_tag - min_tag) // nodes_to_retag_count)
        tag = min_tag
        node = min_node
        
        while nodes_to_retag_count > 0 and node is not None:
            node.tag = tag
            
            node = node.next
            tag += tag_offset
            nodes_to_retag_count -= 1
    
    def available_tag_after(self, x_node, u):
        min_tag = x_node.tag + 1
        if (x_node.next is not None):
            max_tag = x_node.next.tag - 1
        else:
            max_tag = u - 1
        
        return max_tag - min_tag >= 0
    
    def get_new_tag_after(self, x_node, u):
        min_tag = x_node.tag + 1
        if (x_node.next is not None):
            max_tag = x_node.next.tag - 1
        else:
            max_tag = u - 1
        
        new_tag = (min_tag + max_tag) // 2
        
        return new_tag
    
    def rebuild(self):
        print("rebuild")
        self.N = self.n
        self.u = self.calculate_u(self.N)
        
        self.assign_new_tags(self.linked_list.head, self.n, 0, self.u)
    
    def __repr__(self):
        text = "OLByTLL: N:" + str(self.N) + " u:" + str(self.u) + " n:" + str(self.n)
        for node in self.linked_list:
            text += " -> " + "[" + str(node.tag) + "]" + str(node.value)
        return text


class TagInterval:
    def __init__(self, x_node):
        self.level = 0
        self.min_tag = x_node.tag
        self.max_tag_excl = x_node.tag + 1
        self.min_node = x_node
        self.max_node = x_node
        self.nodes_count = 1
    
    def increase(self):
        increase_to_the_right = int(self.min_tag) & int(self.size()) == 0
        self.level += 1
        
        if increase_to_the_right:
            self.max_tag_excl = self.min_tag + self.size()
            node = self.max_node.next
            while node is not None and node.tag < self.max_tag_excl:
                self.max_node = node
                node = node.next
                self.nodes_count += 1
        else:
            self.min_tag = self.max_tag_excl - self.size()
            node = self.min_node.prev
            while node is not None and node.tag >= self.min_tag:
                self.min_node = node
                node = node.prev
                self.nodes_count += 1
    
    def size(self):
        return math.pow(2, self.level)
    
    def density(self):
        return self.nodes_count / self.size()