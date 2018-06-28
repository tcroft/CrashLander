
var lander;
var canvas;

var state;
var shipPosition;
var shipSpeed;
var gravity = .000005;
var thrustPower = .00003;
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
    document.getElementById('crash').innerHTML ='landed successfully..';
    document.getElementById("ship").style.backgroundImage="url('images/land2.gif')" ;
             
 
//    document.getElementById('landingsucces').innerHTML='successfully landed...';
}
var sound = new Howl({
    urls: ['sounds.mp3', 'sounds.ogg'],
    sprite: {
      blast: [0, 2000],
      winner: [5000, 9000]
    }
  });
function loop() {
  
    if (thrust) {
        if((fuel>0)){
            fuel-=0.5;
            displayFuel(fuel);
            shipSpeed -= thrustPower;
              }
           
    }
    if (shipPosition > 0 || (thrust&&fuel>0) )
    {
        shipSpeed += gravity;
        shipPosition -= shipSpeed;
        
      
    }else {
        if(!done){
           if(shipSpeed<=0.0014){
               displayLandingSuccess();
             }
            else {
                    document.getElementById('crash').innerHTML ='your plane crashed... ';
               document.getElementById("ship").style.backgroundImage="url('images/crash.gif')" ;
               
               sound.play('blast');
               document.getElementById("linkmsg").innerHTML='Try Again..';
               done=true; 
                }
                }
        shipSpeed = 0;
        shipPosition = 0;
    }
     
layout();
}

function reset() {
    document.getElementById('crash').innerHTML ='';
    document.getElementById('landingsuccess').innerHTML ='';
//ship.style.background="url('images/ship.png')"

    shipPosition = 1;
    shipSpeed = 0;
    fuel=100;

   win.style.display="none";
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



