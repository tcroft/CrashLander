
var lander;
var canvas;
//var flaming;
var state;
var shipPosition;
var shipSpeed;
var gravity = .00001;
var thrustPower = .00002;
var fuel=100;
//var speed;
var thrust = false;
var meter;
var done;

function initFlaming()
{
    flaming = new flaming('flaming');
    flaming.scaleTo(.2);   
}

function showFlaming()
{
    var flaming = document.getElementById('flaming');
    flaming.style.display = 'block';
}
function hideFlaming()
{
var flaming = document.getElementById('flaming');
    flaming.style.display = 'none';
}

function initGame() {
    lander = new Lander('ship');
    lander.scaleTo(.5);
    canvas = document.getElementById('canvas');
    meter=document.getElementById("fuel");
    window.setInterval(loop, 10);
    initFlaming();
    reset();
}

function loop() {
    if (thrust) {
        if((fuel>0)){
            fuel-=0.25;
            display(fuel);
            shipSpeed -= thrustPower; 
        } 
        
    }

    if (shipPosition > 0 || (thrust&&fuel>0)) {
        shipSpeed += gravity;
        shipPosition -= shipSpeed;
        
    } else {
        if(!done){
        if(shipSpeed<0.0012){
            displaysuccessmessage();
        }
        else{
            displaycrashedmessage();
            done=true;
        }
        
    }

        shipSpeed = 0;
        shipPosition = 0;
    }
    layout();
}

function reset() {
    shipPosition = 1;
    shipSpeed = 0;
    meter.value=100;
    done=false;
    fuel=100;
    ship.style.background="url('images/ship.png')";
    document.getElementById("landed").innerHTML=" ";
    document.getElementById("crashed").innerHTML=" ";
    layout();
}

function startThrust() {
    thrust = true;
     showFlaming();
}

function stopThrust() {
    thrust = false;
    hideFlaming();
}

function layout() {
    var height = canvas.clientHeight - lander.height();
    var distance = height - (height * shipPosition);

    lander.moveTo(canvas.clientWidth/2, lander.height()/2 + distance);
}

function display(fuel){
    meter.value=fuel;
    meter.speed=shipSpeed;
}

function displaysuccessmessage(){
    document.getElementById("landed").innerHTML="!!! Landed Successfully !!!";
    ship.style.background="url('images/successlanded.gif') no-repeat";
    document.getElementById("tryagain").innerHTML="Try Again";
}

function displaycrashedmessage(){
    document.getElementById("crashed").innerHTML="!!! Game Over !!!";
    ship.style.background="url('images/explosion.png') no-repeat";
    document.getElementById("tryagain").innerHTML="Try Again";
 
}

function refreshPage(){
    window.location.reload();
} 

