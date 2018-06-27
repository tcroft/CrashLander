
var lander;
var canvas;
var landingPlatform;
var state;
var shipPosition;
var shipSpeed;
var gravity = .00001;
var thrustPower = .00002;
var thrust = false;
var fuel=100;
function initGame() {
    lander = new Lander('ship');
    lander.scaleTo(.5);

    canvas = document.getElementById('canvas');
    meter = document.getElementById('fuel')

    window.setInterval(loop, 10);
    showLander();
    reset();
}
function showLander()
{
    landingPlatform = new LandingPlatform('landingPlatform');
    landingPlatform.scaleTo(.5);


}

function loop() {

    if (thrust) {
        if((fuel>0)){
            fuel-=0.25;
            displayFuel(fuel);
        }
        shipSpeed -= thrustPower;
    }

    if (shipPosition > 0 || thrust && fuel > 0) {
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
    meter.value =100;
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

    lander.moveTo(canvas.clientWidth/2, lander.height()/2 + distance);
}
function displayFuel(fuel){
    meter.value=fuel;
}
function crashdown(){
    shipPosition=0;
}
