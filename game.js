
var lander;
var canvas;
var landingPlatform;
var state;
var shipPosition;
var shipSpeed;
var gravity = .00001;
var thrustPower = .00002;
var thrust = false;
var maxFuel=100;
var landed=false;
var blast;
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

    if (shipPosition > 0 || (thrust && fuel > 0)) {
        shipSpeed += gravity;
        shipPosition -= shipSpeed;
    } 
    else {
        
        if(!landed){
            console.log("landed");

        if(shipSpeed <=0.0012){
           successful();
            
           // fuel=0;
        }
        else{
            crashdown();
        }
    }
        shipSpeed = 0;
        shipPosition = 0;
       landed=true;
    }

    layout();
}

function reset() {
    shipPosition = 1;
    shipSpeed = 0;
    fuel=maxFuel;
    ship.style.background="url('images/ship.png')"
    document.getElementById("Crashed").innerHTML = "";
    document.getElementById("Successful").innerHTML = "";
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
    ship.style.background="url('images/blast.gif')"
    document.getElementById("Crashed").innerHTML = "Crashed";
}
function successful(){
    document.getElementById("Successful").innerHTML="Landed Safely";
}