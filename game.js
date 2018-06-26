
var lander;
var canvas;

var state;
var shipPosition;
var shipSpeed;
var gravity = .00001;

function initGame() {
    lander = new Lander('ship');
    lander.scaleTo(.5);

    canvas = document.getElementById('canvas');

    window.setInterval(loop, 10);

    reset();
}

function loop() {

    shipSpeed += gravity;
    shipPosition -= shipSpeed;
    if (shipPosition < 0) {
        shipPosition = 0;
    }
    layout();
}

function reset() {
    shipPosition = 1;
    shipSpeed = 0;

    layout();
}

function layout() {
    var height = canvas.clientHeight - lander.height();
    var distance = height - (height * shipPosition);

    lander.moveTo(canvas.clientWidth/2, lander.height()/2 + distance);
}
