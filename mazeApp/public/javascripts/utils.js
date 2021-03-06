function isValidHex(hex) {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test(hex.trim());
}

function replaceAt(str, index, replacement) {
    if (index > str.length - 1) {
        return str;
    }
    return str.substr(0, index) + replacement + str.substr(index + 1);
}

function stringVal(str, index) {
    return parseInt(str.charAt(index), 10);
}

function getInputIntVal(id, defaultValue) {
    const el = document.getElementById(id);
    if (el) {
        let el_value = parseInt(el.value, 10);
        el_value = (0 < el_value) ? el_value : defaultValue;
        el.value = el_value;
        return el_value;
    }

    el.value = defaultValue;
    return defaultValue;
}

function removeFromArray(arr, element) {
    const index = arr.indexOf(element);
    if (-1 !== index) {
        arr.splice(index, 1);
    }
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function checkAround() {

    var counter = 0;

    //UP
    if (Mymatrix[Math.floor(myGamePiece.y / 10) - 1][Math.floor(myGamePiece.x / 10)] == 0) {
        counter++;
    }

    //LEFT
    if (Mymatrix[Math.floor(myGamePiece.y / 10)][Math.floor(myGamePiece.x / 10) - 1] == 0) {
        counter++;
    }

    //RIGHT
    if (Mymatrix[Math.floor(myGamePiece.y / 10)][Math.floor(myGamePiece.x / 10) + 1] == 0) {
        counter++;
    }

    //DOWN
    if (Mymatrix[Math.floor(myGamePiece.y / 10) + 1][Math.floor(myGamePiece.x / 10)] == 0) {
        counter++;
    }

    return counter;
}

function up() {
    myGamePiece.speedY = -10;
    myGamePiece.speedX = 0;
    myGamePiece.prevSpeedX = myGamePiece.speedX;
    myGamePiece.prevSpeedY = myGamePiece.speedY;
}

function down() {
    myGamePiece.speedY = 10;
    myGamePiece.speedX = 0;
    myGamePiece.prevSpeedX = myGamePiece.speedX;
    myGamePiece.prevSpeedY = myGamePiece.speedY;
}

function left() {
    myGamePiece.speedX = -10;
    myGamePiece.speedY = 0;
    myGamePiece.prevSpeedX = myGamePiece.speedX;
    myGamePiece.prevSpeedY = myGamePiece.speedY;
}

function right() {
    myGamePiece.speedX = 10;
    myGamePiece.speedY = 0;
    myGamePiece.prevSpeedX = myGamePiece.speedX;
    myGamePiece.prevSpeedY = myGamePiece.speedY;
}