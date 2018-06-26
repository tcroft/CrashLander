
var lander;
var canvas;

var state;
var shipPosition;
var shipSpeed;
var gravity = .00001;
var thrustPower = .00002;
var thrust = false;
var maxFuel=100;
var fuelmaxFuel;

function initGame() {
    lander = new Lander('ship');
    lander.scaleTo(.5);

    canvas = document.getElementById('canvas');

    window.setInterval(loop, 10);

    reset();
}
function displayFuel(fuel)
{
    document.getElementById('fuel').innerHTML = 'fuel :'+fuel.toFixed(2);
}
function loop() {

    if (thrust) {
        if(fuel>0)
       {
        fuel=fuel-0.5;
        shipSpeed -= thrustPower;
       }
 
    }
    if (shipPosition > 0 || thrust) {
        shipSpeed += gravity;
        shipPosition -= shipSpeed;
    } else {
        shipSpeed = 0;
        shipPosition = 0;
    }
    layout();
}

function reset() {
    shipPosition = 1;
    shipSpeed = 0;
    fuel=maxFuel;    
    layout();
}

function startThrust() {
    thrust = true;  
}

function stopThrust() {
    thrust = false;
}

function layout() {
    var height = canvas.clientHeight - lander.height();
    var distance = height - (height * shipPosition);
    displayFuel(fuel);
    lander.moveTo(canvas.clientWidth/2, lander.height()/2 + distance);
}
