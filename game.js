
var lander;
var canvas;
var gameOverPanel;
var fuelGauge;
var explosion;
var flame;

var state;
var shipPosition;
var shipSpeed;
var gravity = .00001;
var thrustPower = .00002;
var thrust = false;
var done = false;

var fuel;

var thrustAudio = new Audio('sounds/thrust.mp3');
thrustAudio.loop = true;

var boomAudio = new Audio('sounds/boom.mp3');
var tadaAudio = new Audio('sounds/tada.mp3');

function initGame() {
    lander = new Lander('ship');
    lander.scaleTo(.5);

    canvas = document.getElementById('canvas');
    gameOverPanel = document.getElementById('gameOver');
    fuelGauge = document.getElementById('fuelGauge');
    explosion = document.getElementById('explosion');
    flame = document.getElementById('flame');

    window.setInterval(loop, 10);


    reset();
}

function loop() {
    if (thrust && fuel > 0) {
        fuel -= .2;
        shipSpeed -= thrustPower;
        flame.classList.remove('flame');
        flame.classList.remove('flame2');
        flame.classList.add("flame" + (Math.random() > .5 ? '2' : ''));
    } else {
        flame.style.display = 'none';
        thrustAudio.pause();
    }

    if (shipPosition > 0 || (thrust && fuel > 0)) {
        shipSpeed += gravity;
        shipPosition -= shipSpeed;
    } else {
        if (!done) {
            if (shipSpeed > 0.0012) {
                crash();
            } else {
                land();
            }

            shipSpeed = 0;
            shipPosition = 0;

            done = true;
        }
    }
    layout();
}

function crash() {
    explosion.style.display = '';
    boomAudio.play();

    gameOver();
}

function land() {
    tadaAudio.play();

    gameOver();
}

function gameOver() {

    gameOverPanel.style.display = '';
}

function reset() {
    shipPosition = 1;
    shipSpeed = 0;
    done = false;
    fuel = 100;

    explosion.style.display = 'none';
    gameOverPanel.style.display = 'none';
    flame.style.display = 'none';

    layout();
}

function startThrust() {
    thrust = true;
    flame.style.display = '';
    if (fuel > 0) {
        thrustAudio.play();
    }
}

function stopThrust() {
    thrust = false;
    flame.style.display = 'none';
    thrustAudio.pause();
}

function layout() {
    var height = canvas.clientHeight - lander.height();
    var distance = height - (height * shipPosition);

    lander.moveTo(canvas.clientWidth/2, lander.height()/2 + distance);
    fuelGauge.value = fuel / 100;

}
