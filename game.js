
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
var fire;
var blast;
function initGame() {
    lander = new Lander('ship');
    lander.scaleTo(.5);

    canvas = document.getElementById('canvas');
    meter = document.getElementById('fuel');

    window.setInterval(loop, 10);
    reset();
    initFire();
}
function initFire(){
    fire=new Fire('fire');
    fire.scaleTo(.2);
}
function showFire(){
    var fire=document.getElementById('fire');
    fire.style.display='block';

}
function exitFire(){
    var fire=document.getElementById('fire');
    fire.style.display='none';
}

function loop() {

    if (thrust) {
        if((maxFuel>0)){
            maxFuel-=0.25;
            displayFuel(maxFuel);
            shipSpeed -= thrustPower;

        }
        
    }
   

    if (shipPosition > 0 || (thrust && maxFuel > 0)) {
        shipSpeed += gravity;
        shipPosition -= shipSpeed;
    } 
    else {
        
        if(!landed){
            console.log("landed");

        if(shipSpeed <=0.0012){
           successful();
            
           maxFuel=0;
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
    meter.value=maxFuel;
    shipPosition = 1;
    shipSpeed = 0;
    ship.style.background="url('images/ship.png')"
    document.getElementById("Crashed").innerHTML = "";
    document.getElementById("Successful").innerHTML = "";
    fuel.value=100;
    landed=false;
    layout();
    
}

function startThrust() {
    thrust = true;
    showFire();
}

function stopThrust() {
    thrust = false;
    exitFire();
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
    exitFire();
}
function successful(){
    document.getElementById("Successful").innerHTML="Ship Landed Safely";
}