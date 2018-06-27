
var lander;
var canvas;

var state;
var shipPosition;
var shipSpeed;
var gravity = .000005;
var thrustPower = .00005;
var thrust = false;
var fuel=100;
var maxfuel;
var done;
var ship;
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
function displayLandingSuccess(){
document.getElementById('landingsucces').innerHTML='successfully landed...';
}
function loop() {
  
    if (thrust) {
        if(fuel>0){
            fuel-=0.5;
            displayFuel(fuel);
   
        }else if(fuel==0){
            displayEmptyFuel();
            stopThrust();   
        }
        shipSpeed -= thrustPower;
           
    }
    
    if (shipPosition > 0 || thrust&&fuel>0) {
        shipSpeed += gravity;
        shipPosition -= shipSpeed;
        
      
    } 
    else {
        if(!done){

            if(shipSpeed<=0.0012){
                document.getElementById('landingsuccess').innerHTML ='landed successfully..';
               fuel=0;
        
            
            }else {
                    document.getElementById('crash').innerHTML ='your plane crashed... ';
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
    fuel=100;
    document.getElementById('crash').innerHTML ='';
    document.getElementById('landingsuccess').innerHTML ='';
//win.style.display="none";
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



