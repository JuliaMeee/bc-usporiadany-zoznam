from doubly_linked_list import Node, DoublyLinkedList
from ol_by_ll import OLByLL
from ol_by_tll import OLByTLL
from ol_by_tltll import OLByTLTLL
import random

def test_DLL():
    nodes = [Node(i) for i in range(0, 5)]
    list = DoublyLinkedList()
    list.insert(nodes[1])
    list.insertAfter(nodes[1], nodes[4])
    list.insertAfter(nodes[1], nodes[2])
    list.insertAfter(nodes[2], nodes[3])
    # print(list)
    list.insertAfter(nodes[1], nodes[0])
    # print(list)
    list.remove(nodes[0])
    # print(list)
    assert(list.head == nodes[1])
    assert(list.tail == nodes[4])
    assert(len(list) == 4)
    
    print("test_DLL done")

def test_OLByLL():
    ol = OLByLL(0)
    ol.insert(0, 3)
    ol.insert(0, 1)
    ol.insert(1, 2)
    ol.insert(3, 4)
    print(ol)
    assert(ol.order(0, 1))
    assert(ol.order(1, 2))
    assert(ol.order(2, 3))
    assert(ol.order(3, 4))
    assert(not ol.order(4, 3))
    
    print("test_OLByLL done")

def test_OLByTLL():
    ol = OLByTLL(0)
    print(ol)
    ol.insert(0, 3)
    print(ol)
    ol.insert(0, 1)
    print(ol)
    ol.insert(1, 2)
    print(ol)
    ol.insert(3, 4)
    print(ol)
    assert(ol.order(0, 1))
    assert(ol.order(1, 2))
    assert(ol.order(2, 3))
    assert(ol.order(3, 4))
    assert(not ol.order(4, 3))
    
    ol.insert(3, 3.5)
    print(ol)
    ol.insert(3, 3.2)
    print(ol)
    
    ol.delete(3.2)
    print(ol)
    ol.delete(3.5)
    print(ol)
    ol.delete(3)
    print(ol)
    ol.delete(1)
    print(ol)
    ol.delete(4)
    print(ol)
    
    ol.insert(0, 1)
    print(ol)
    ol.insert(0, 0.5)
    print(ol)
    ol.insert(0, 0.4)
    print(ol)
    ol.insert(0, 0.3)
    print(ol)
    ol.insert(0, 0.2)
    print(ol)
    ol.insert(0, 0.1)
    print(ol)
    
    print("test_OLByTLL done")

def test_OLByTLTLL():
    ol = OLByTLTLL(0)
    print(ol)
    ol.insert(0, 3)
    print(ol)
    ol.insert(0, 1)
    print(ol)
    ol.insert(1, 2)
    print(ol)
    ol.insert(3, 4)
    print(ol)
    assert(ol.order(0, 1))
    assert(ol.order(1, 2))
    assert(ol.order(2, 3))
    assert(ol.order(3, 4))
    assert(not ol.order(4, 3))
    
    ol.insert(3, 3.5)
    print(ol)
    ol.insert(3, 3.2)
    print(ol)
    
    ol.delete(3.2)
    print(ol)
    ol.delete(3.5)
    print(ol)
    ol.delete(3)
    print(ol)
    ol.delete(1)
    print(ol)
    ol.delete(4)
    print(ol)
    
    ol.insert(0, 1)
    print(ol)
    ol.insert(0, 0.5)
    print(ol)
    ol.insert(0, 0.4)
    print(ol)
    ol.insert(0, 0.3)
    print(ol)
    ol.insert(0, 0.2)
    print(ol)
    ol.insert(0, 0.1)
    print(ol)
    
    print("test_OLByTLTLL done")

def generic_ol_test1():
    for ol in [OLByLL(0), OLByTLL(0), OLByTLTLL(0)]:
        valuesOut = [i for i in range(1, 1000)]
        valuesIn = [0]
        
        for i in range(0, 100):
            insert = len(valuesIn) <= 1 or (len(valuesOut) > 0 and random.random() < 0.7)
            print(insert)

            if insert:
                val = valuesOut.pop(random.randrange(0, len(valuesOut)))
                can_insert = False
                for v in valuesIn:
                    if v < val:
                        val_before = v
                        can_insert = True
                    else:
                        break
                if can_insert:
                    ol.insert(val_before, val)
                    valuesIn.append(val)
                    valuesIn.sort()
                    print("inserted: ", val)
                else:
                    valuesOut.append(val)
                    break

            else:
                val = valuesIn.pop(random.randrange(0, len(valuesIn)))
                ol.delete(val)
                valuesOut.append(val)
                print("deleted: ", val)
        
            print(ol)
            # check
            for i in range(1, len(valuesIn)):
                x = valuesIn[i-1]
                y = valuesIn[i]
                test = ol.order(x, y)
                assert(test)
    
    print("generic test finished")
    

def main():
    # test_DLL()
    # test_OLByLL()
    # test_OLByTLL()
    # test_OLByTLTLL()
    generic_ol_test1()
    

if __name__ == "__main__":
    main()