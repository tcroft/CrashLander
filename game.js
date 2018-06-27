
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
function displayEmptyFuel(){
    document.getElementById('crash').innerHTML ='your fuel is empty youre going to crash.. ';
}
function loop() {
  
    if (thrust) {
        if(fuel>0){
            fuel-=0.5;
            displayFuel(fuel);

                    
        }
        if(fuel==0){
            displayEmptyFuel();
            stopThrust();   
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
    fuel=100;
    document.getElementById('crash').innerHTML ='';
 
    layout();
}

function startThrust() {
    thrust = true;
  }

function stopThrust() {
     thrust = false;
     console.log("trashed");

}
function layout() {
    var height = canvas.clientHeight - lander.height();
    var distance = height - (height * shipPosition);

    lander.moveTo(canvas.clientWidth/2, lander.height()/2 + distance);
 }



