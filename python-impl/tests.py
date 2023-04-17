from linked_list import Node, LinkedList
from ods_by_ll import OdsByLl
from ods_by_tll import OdsByTll
from ods_by_tltll import OdsByTltll
import random

def test_Ll():
    nodes = [Node(i) for i in range(0, 5)]
    list = LinkedList()
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

def test_OdsByLl():
    ods = OdsByLl(0)
    ods.insert(0, 3)
    ods.insert(0, 1)
    ods.insert(1, 2)
    ods.insert(3, 4)
    print(ods)
    assert(ods.order(0, 1))
    assert(ods.order(1, 2))
    assert(ods.order(2, 3))
    assert(ods.order(3, 4))
    assert(not ods.order(4, 3))
    
    print("test_OdsByLl done")

def test_OdsByTll():
    ods = OdsByTll(0)
    print(ods)
    ods.insert(0, 3)
    print(ods)
    ods.insert(0, 1)
    print(ods)
    ods.insert(1, 2)
    print(ods)
    ods.insert(3, 4)
    print(ods)
    assert(ods.order(0, 1))
    assert(ods.order(1, 2))
    assert(ods.order(2, 3))
    assert(ods.order(3, 4))
    assert(not ods.order(4, 3))
    
    ods.insert(3, 3.5)
    print(ods)
    ods.insert(3, 3.2)
    print(ods)
    
    ods.delete(3.2)
    print(ods)
    ods.delete(3.5)
    print(ods)
    ods.delete(3)
    print(ods)
    ods.delete(1)
    print(ods)
    ods.delete(4)
    print(ods)
    
    ods.insert(0, 1)
    print(ods)
    ods.insert(0, 0.5)
    print(ods)
    ods.insert(0, 0.4)
    print(ods)
    ods.insert(0, 0.3)
    print(ods)
    ods.insert(0, 0.2)
    print(ods)
    ods.insert(0, 0.1)
    print(ods)
    
    print("test_OdsByTll done")

def test_OdsByTltll():
    ods = OdsByTltll(0)
    print(ods)
    ods.insert(0, 3)
    print(ods)
    ods.insert(0, 1)
    print(ods)
    ods.insert(1, 2)
    print(ods)
    ods.insert(3, 4)
    print(ods)
    assert(ods.order(0, 1))
    assert(ods.order(1, 2))
    assert(ods.order(2, 3))
    assert(ods.order(3, 4))
    assert(not ods.order(4, 3))
    
    ods.insert(3, 3.5)
    print(ods)
    ods.insert(3, 3.2)
    print(ods)
    
    ods.delete(3.2)
    print(ods)
    ods.delete(3.5)
    print(ods)
    ods.delete(3)
    print(ods)
    ods.delete(1)
    print(ods)
    ods.delete(4)
    print(ods)
    
    ods.insert(0, 1)
    print(ods)
    ods.insert(0, 0.5)
    print(ods)
    ods.insert(0, 0.4)
    print(ods)
    ods.insert(0, 0.3)
    print(ods)
    ods.insert(0, 0.2)
    print(ods)
    ods.insert(0, 0.1)
    print(ods)
    
    print("test_OdsByTltll done")

def genericOdsTest():
    for ods in [OdsByLl(0), OdsByTll(0), OdsByTltll(0)]:
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
                    ods.insert(val_before, val)
                    valuesIn.append(val)
                    valuesIn.sort()
                    print("inserted: ", val)
                else:
                    valuesOut.append(val)
                    break

            else:
                val = valuesIn.pop(random.randrange(0, len(valuesIn)))
                ods.delete(val)
                valuesOut.append(val)
                print("deleted: ", val)
        
            print(ods)
            # check
            for i in range(1, len(valuesIn)):
                x = valuesIn[i-1]
                y = valuesIn[i]
                test = ods.order(x, y)
                assert(test)
    
    print("generic test finished")
    

def main():
    test_Ll()
    test_OdsByLl()
    test_OdsByTll()
    test_OdsByTltll()
    genericOdsTest()
    

if __name__ == "__main__":
    main()