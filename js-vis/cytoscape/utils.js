var wrapFunction = function(fn, context, params) {
    return function() {
        fn.apply(context, params);
    };
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function padLeft(str, length, char) {
    return char.repeat(length - str.length) + str;
}

function replaceAt(str, index, char) {
    return str.substring(0, index) + char + str.substring(index + char.length);
}

function randomColor() {
    return hslToHex(Math.random() * 1000, 50, 80);
    // return Math.floor(Math.random()*(16777215 - 4473924) + 4473924).toString(16);
}

// https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex
function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}