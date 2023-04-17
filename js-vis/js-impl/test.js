var allTestOk = true;
function assert(value) {
    console.log(value);
    allTestOk = allTestOk && value;

    if (!value) {
        throw new Error();
    }
}

function testLl() {
    let nodes = [];
    for (let i = 0; i < 5; i++) {
        nodes.push(new Node(i))
    }

    let list = new LinkedList();
    list.insert(nodes[1]);
    list.insertAfter(nodes[1], nodes[4]);
    list.insertAfter(nodes[1], nodes[2]);
    list.insertAfter(nodes[2], nodes[3]);
    list.insertAfter(nodes[1], nodes[0]);
    list.remove(nodes[0]);

    assert(Object.is(list.head, nodes[1]));

    assert(Object.is(list.tail, nodes[4]));

    assert(list.length === 4);

    console.log("testLl done");
}

function testOdsByLl() {
    let ods = new OdsByLl(0);
    ods.insert(0, 3);
    ods.insert(0, 1);
    ods.insert(1, 2);
    ods.insert(3, 4);
    console.log(ods);

    assert(ods.order(0, 1));

    assert(ods.order(1, 2));

    assert(ods.order(2, 3));

    assert(ods.order(3, 4));

    assert(!ods.order(4, 3));

    ods.delete(0);
    ods.delete(2);
    ods.delete(4);

    assert(ods.order(1, 3));

    console.log("testOdsByLl done");
}

function testOdsByTll() {
    let ods = new OdsByTll(0);
    console.log(ods);
    ods.insert(0, 3);
    console.log(ods);
    ods.insert(0, 1);
    console.log(ods);
    ods.insert(1, 2);
    console.log(ods);
    ods.insert(3, 4);
    console.log(ods);

    assert(ods.order(0, 1));

    assert(ods.order(1, 2));

    assert(ods.order(2, 3));

    assert(ods.order(3, 4));

    assert(!ods.order(4, 3));

    ods.insert(3, 3.5);
    console.log(ods);
    ods.insert(3, 3.2);
    console.log(ods);
    ods.delete(3.2);
    console.log(ods);
    ods.delete(3.5);
    console.log(ods);
    ods.delete(3);
    console.log(ods);
    ods.delete(1);
    console.log(ods);
    ods.delete(4);
    console.log(ods);
    ods.insert(0, 1);
    console.log(ods);
    ods.insert(0, 0.5);
    console.log(ods);
    ods.insert(0, 0.4);
    console.log(ods);
    ods.insert(0, 0.3);
    console.log(ods);
    ods.insert(0, 0.2);
    console.log(ods);
    ods.insert(0, 0.1);
    console.log(ods);
    console.log("testOdsByTll done");
}

function testOdsByTltll() {
    let ods = new OdsByTltll(0);
    console.log(ods);
    ods.insert(0, 3);
    console.log(ods);
    ods.insert(0, 1);
    console.log(ods);
    ods.insert(1, 2);
    console.log(ods);
    ods.insert(3, 4);
    console.log(ods);

    assert(ods.order(0, 1));

    assert(ods.order(1, 2));

    assert(ods.order(2, 3));

    assert(ods.order(3, 4));

    assert(!ods.order(4, 3));

    ods.insert(3, 3.5);
    console.log(ods);
    ods.insert(3, 3.2);
    console.log(ods);
    ods.delete(3.2);
    console.log(ods);
    ods.delete(3.5);
    console.log(ods);
    ods.delete(3);
    console.log(ods);
    ods.delete(1);
    console.log(ods);
    ods.delete(4);
    console.log(ods);
    ods.insert(0, 1);
    console.log(ods);
    ods.insert(0, 0.5);
    console.log(ods);
    ods.insert(0, 0.4);
    console.log(ods);
    ods.insert(0, 0.3);
    console.log(ods);
    ods.insert(0, 0.2);
    console.log(ods);
    ods.insert(0, 0.1);
    console.log(ods);
    console.log("testOdsByTltll done");
}

function genericOdsTest() {

    for (let ods of [new OdsByLl(0), new OdsByTll(0), new OdsByTltll(0)]) {
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

                let canInsert = false;
                let valBefore = 0;

                for (let vi in valuesIn) {
                    let v = valuesIn[vi];
                    if (v < val) {
                        valBefore = v;
                        canInsert = true;
                    } else {
                        break;
                    }
                }

                if (canInsert) {
                    ods.insert(valBefore, val);
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
                ods.delete(val);
                valuesOut.push(val);
                console.log("deleted: ", val);
            }

            console.log(ods.toString());
            console.log(ods);
            valuesIn = valuesIn.sort((a, b) => a - b);

            for (let j = 1; j < valuesIn.length; j++) {
                let x = valuesIn[j - 1];
                let y = valuesIn[j];
                let test = ods.order(x, y);

                console.log("test: " + x + " " + y);
                assert(test);
            }
        }
    }

    console.log("generic test finished");
}
visualisation.visualisationOn = false;
console.log("tests:");
// Note: Uncomment following lines to start tests on page refresh
// testLl();
// testOdsByLl();
// testOdsByTll();
// testOdsByTltll();
// genericOdsTest();
console.log("finished testing");
console.log("allTestsOk: " + allTestOk);
visualisation.visualisationOn = true;
