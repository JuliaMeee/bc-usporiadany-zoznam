var allTestOk = true;
function assert(value) {
    console.log(value);
    allTestOk = allTestOk && value;

    if (!value) {
        throw new Error();
    }
}

function test_Dll() {
    let nodes = [];
    for (let i = 0; i < 5; i++) {
        nodes.push(new Node(i))
    }

    let list = new DoublyLinkedList();
    list.insert(nodes[1]);
    list.insertAfter(nodes[1], nodes[4]);
    list.insertAfter(nodes[1], nodes[2]);
    list.insertAfter(nodes[2], nodes[3]);
    list.insertAfter(nodes[1], nodes[0]);
    list.remove(nodes[0]);

    assert(Object.is(list.head, nodes[1]));

    assert(Object.is(list.tail, nodes[4]));

    assert(list.length === 4);

    console.log("test_Dll done");
}

function test_OlByLl() {
    let ol = new OlByLl(0);
    ol.insert(0, 3);
    ol.insert(0, 1);
    ol.insert(1, 2);
    ol.insert(3, 4);
    console.log(ol);

    assert(ol.order(0, 1));

    assert(ol.order(1, 2));

    assert(ol.order(2, 3));

    assert(ol.order(3, 4));

    assert(!ol.order(4, 3));

    ol.delete(0);
    ol.delete(2);
    ol.delete(4);

    assert(ol.order(1, 3));

    console.log("test_OlByLl done");
}

function test_OlByTll() {
    let ol = new OlByTll(0);
    console.log(ol);
    ol.insert(0, 3);
    console.log(ol);
    ol.insert(0, 1);
    console.log(ol);
    ol.insert(1, 2);
    console.log(ol);
    ol.insert(3, 4);
    console.log(ol);

    assert(ol.order(0, 1));

    assert(ol.order(1, 2));

    assert(ol.order(2, 3));

    assert(ol.order(3, 4));

    assert(!ol.order(4, 3));

    ol.insert(3, 3.5);
    console.log(ol);
    ol.insert(3, 3.2);
    console.log(ol);
    ol.delete(3.2);
    console.log(ol);
    ol.delete(3.5);
    console.log(ol);
    ol.delete(3);
    console.log(ol);
    ol.delete(1);
    console.log(ol);
    ol.delete(4);
    console.log(ol);
    ol.insert(0, 1);
    console.log(ol);
    ol.insert(0, 0.5);
    console.log(ol);
    ol.insert(0, 0.4);
    console.log(ol);
    ol.insert(0, 0.3);
    console.log(ol);
    ol.insert(0, 0.2);
    console.log(ol);
    ol.insert(0, 0.1);
    console.log(ol);
    console.log("test_OlByTll done");
}

function test_OlByTltll() {
    let ol = new OlByTltll(0);
    console.log(ol);
    ol.insert(0, 3);
    console.log(ol);
    ol.insert(0, 1);
    console.log(ol);
    ol.insert(1, 2);
    console.log(ol);
    ol.insert(3, 4);
    console.log(ol);

    assert(ol.order(0, 1));

    assert(ol.order(1, 2));

    assert(ol.order(2, 3));

    assert(ol.order(3, 4));

    assert(!ol.order(4, 3));

    ol.insert(3, 3.5);
    console.log(ol);
    ol.insert(3, 3.2);
    console.log(ol);
    ol.delete(3.2);
    console.log(ol);
    ol.delete(3.5);
    console.log(ol);
    ol.delete(3);
    console.log(ol);
    ol.delete(1);
    console.log(ol);
    ol.delete(4);
    console.log(ol);
    ol.insert(0, 1);
    console.log(ol);
    ol.insert(0, 0.5);
    console.log(ol);
    ol.insert(0, 0.4);
    console.log(ol);
    ol.insert(0, 0.3);
    console.log(ol);
    ol.insert(0, 0.2);
    console.log(ol);
    ol.insert(0, 0.1);
    console.log(ol);
    console.log("test_OlByTltll done");
}

function generic_ol_test1() {

    for (let ol of [new OlByLl(0), new OlByTll(0), new OlByTltll(0)]) {
        let valuesOut = [];
        for (let i = 0; i < 1000; i++) {
            valuesOut.push(i)
        }
        let valuesIn = [0];

        for (let i = 0; i < 100; i ++) {
            let insert = valuesIn.length <= 1 || (valuesOut.length > 0 && Math.random() < 0.7);

            if (insert) {
                let index = Math.floor(Math.random() * valuesOut.length);
                let val = valuesOut[index];
                valuesOut.splice(index, 1);

                let can_insert = false;
                let val_before = 0;

                for (let vi in valuesIn) {
                    let v = valuesIn[vi];
                    if (v < val) {
                        val_before = v;
                        can_insert = true;
                    } else {
                        break;
                    }
                }

                if (can_insert) {
                    ol.insert(val_before, val);
                    valuesIn.push(val);
                    console.log("inserted: ", val);
                } else {
                    valuesOut.push(val);
                    break;
                }
            } else {
                let index = Math.floor(Math.random() * valuesIn.length);
                let val = valuesIn[index];
                valuesIn.splice(index, 1);
                ol.delete(val);
                valuesOut.push(val);
                console.log("deleted: ", val);
            }

            console.log(ol.toString());
            console.log(ol);
            valuesIn = valuesIn.sort((a, b) => a - b);

            for (let j = 1; j < valuesIn.length; j++) {
                let x = valuesIn[j - 1];
                let y = valuesIn[j];
                let test = ol.order(x, y);

                console.log("test: " + x + " " + y);
                assert(test);
            }
        }
    }

    console.log("generic test finished");
}
visualisation.visualisationOn = false;
console.log("started testing");

// test_Dll();
// test_OlByLl();
// test_OlByTll();
// test_OlByTltll();
// generic_ol_test1();
console.log("finished testing");
console.log("allTestsOk: " + allTestOk);
visualisation.visualisationOn = true;
