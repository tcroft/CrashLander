
var lander;
var canvas;

var state;
var shipPosition;
var shipSpeed;
var gravity = .00001;
var thrustPower = .00002;
var thrust = false;
var fuel=100;
var maxfuel;
function initGame() {
    lander = new Lander('ship');
    lander.scaleTo(.5);

    canvas = document.getElementById('canvas');

    window.setInterval(loop, 10);

    reset();
}
function displayFuel(fuel){

    document.getElementById('fuel').innerHTML ='Fuel is : '+fuel;
    }	

function loop() {
  
    if (thrust) {
        if(fuel>0){
            fuel-=1;
            displayFuel(fuel);

                    
        }
        if(fuel==0){
            crash();
        }
        shipSpeed -= thrustPower;
        
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
function fuelIndicator(){

    return distance;
}
function crash(){
    shipPosition=0;
   }



