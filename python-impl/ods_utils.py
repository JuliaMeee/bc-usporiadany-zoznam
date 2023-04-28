import math

def assign_new_tags(min_node, nodes_to_retag_count, min_tag, max_tag):
    print("assign new tags: ", min_node, nodes_to_retag_count, min_tag, max_tag)
    tag_offset = ((1 + max_tag - min_tag) // nodes_to_retag_count)
    tag = min_tag
    node = min_node
    
    while nodes_to_retag_count > 0 and node is not None:
        node.tag = tag
        
        node = node.next
        tag += tag_offset
        nodes_to_retag_count -= 1

def available_tag_after(x_node, u):
    min_tag = x_node.tag + 1
    if (x_node.next is not None):
        max_tag = x_node.next.tag - 1
    else:
        max_tag = u - 1
    
    return max_tag - min_tag >= 0

def get_new_tag_after(x_node, u):
    min_tag = x_node.tag + 1
    if (x_node.next is not None):
        max_tag = x_node.next.tag - 1
    else:
        max_tag = u - 1
    
    new_tag = (min_tag + max_tag) // 2
    
    return new_tag

def relabel(x_node, n, u):
    print("relabel")
    T = calculate_T(n, u)
    print("T: ", T)
    interval = TagInterval(x_node)
    interval.increase()
    
    while interval.density() > overflow_threshold(T, interval.level):
        print("interval:", interval.min_tag, "-", interval.max_tag_excl, "n:", interval.nodes_count)
        interval.increase()
    
    print("interval:", interval.min_tag, "-", interval.max_tag_excl, "n:", interval.nodes_count)
    assert(interval.max_tag_excl <= u)
    
    assign_new_tags(interval.min_node, interval.nodes_count, interval.min_tag, interval.max_tag_excl - 1)
    
def calculate_u(N):
    return max(int(math.pow(2, math.ceil(math.log2(math.pow(N, 2))))), 4 * N);
    
def get_virtual_tree_level(u):
    return math.log2(u)
    
def violates_invariant_1(n, N):
    return not (N / 2 <= n <= 2 * N)

def violates_invariant_2(n_sublist, N_sublist):
    return not (0 < n_sublist <= 2 * N_sublist)
    
def calculate_T(n, u):
    print("calculate_T with: n:", n, " u:", u)
    tree_level = get_virtual_tree_level(u)
    root_density = (n / u)
    
    T = max(1.001, math.exp(math.log(u/n)/tree_level) - 0.0001)
    
    assert(root_density <= overflow_threshold(T, tree_level))
    
    return T
    
def overflow_threshold(T, interval_level):
    if interval_level == 0:
        return 1
    return math.pow(T, -interval_level)


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

