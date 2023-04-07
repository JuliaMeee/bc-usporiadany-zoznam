var wrapFunction = function(fn, context, params) {
    return function() {
        fn.apply(context, params);
    };
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/*function padLeft(str, length, char) {
    return char.repeat(length - str.length) + str;
}*/

function replaceAt(str, index, char) {
    return str.substring(0, index) + char + str.substring(index + char.length);
}

/*function randomColor() {
    return hslToHex(Math.random() * 1000, 50, 80);
    // return Math.floor(Math.random()*(16777215 - 4473924) + 4473924).toString(16);
}*/


// credits: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}