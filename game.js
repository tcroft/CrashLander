
var lander;
var canvas;
var flame;
var state;
var shipPosition;
var shipSpeed;
var gravity = .00001;
var thrustPower = .00002;
var thrust = false;
var maxFuel=100;
var fuelmaxFuel;
var blowUp;
var win;
var thrustAudio;
function initGame() {
    lander = new Lander('ship');
    lander.scaleTo(.5);
    canvas = document.getElementById('canvas');
    win=document.getElementById('win');
    window.setInterval(loop, 10);
    initFlame();
    initBlowUp();
    thrustAudio= document.getElementById("thrustAudio"); 

    
    reset();
}

function initFlame()
{
    flame = new Flame('flame');
    flame.scaleTo(.2);   
}
function playthrustAudio() { 
    thrustAudio.play(); 
} 

function pausethrustAudio() { 
    thrustAudio.pause(); 
}
function showFlame()
{
    var flame = document.getElementById('flame');
    flame.style.display = 'block';
    playthrustAudio();
}
function hideFlame()
{
var flame = document.getElementById('flame');
    flame.style.display = 'none';
    pausethrustAudio();
}
function initBlowUp()
{
    blowUp= new BlowUp('blowup');
    blowUp.scaleTo(2.0);
}

function startBlowUp()
{
    var blowUp = document.getElementById('blowup');
    blowUp.style.display = 'block';
}
function stopBlowUp()
{
    var blowUp = document.getElementById('blowup');
    blowUp.style.display = 'none';
}
function displayFuel(fuel)
{
    document.getElementById('fuel').innerHTML =fuel.toFixed(2);
}
function loop() {
    if (thrust) {
        if(fuel>0)
       {   
        fuel=fuel-0.1;
        fuelGauge.value=fuel;
        shipSpeed -= thrustPower;
       }
    }
    if (shipPosition > 0 || thrust) {
        shipSpeed += gravity;
        shipPosition -= shipSpeed;
    } else {
        if(shipSpeed>0.0012){   
            startBlowUp();
        }else{
            win.style.display='block'
        }        
        shipSpeed = 0;
        shipPosition = 0;
    }    
        layout(); 
}

function reset() {
    shipPosition = 1;
    shipSpeed = 0;
    fuel=maxFuel;    
    stopBlowUp();
    win.style.display='none';
    fuelGauge.value=maxFuel;
    layout();
}

function startThrust() {
    thrust = true;  
    showFlame();
}

function stopThrust() {
    thrust = false;
    hideFlame();
}
function layout() {
    var height = canvas.clientHeight - lander.height();
    var distance = height - (height * shipPosition);
    displayFuel(fuel);
    lander.moveTo(canvas.clientWidth/2, lander.height()/2 + distance);
  }
function fuelIndicator(){

    return distance;
}
function write(fuel){
    document.getElementById('fuel').innerHTML+=fuel;
    }	



