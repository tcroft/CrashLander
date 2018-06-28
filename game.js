
var lander;
var canvas;
var state;
var shipPosition;
var shipSpeed;
var gravity = .00001;
var thrustPower = .00002;
var thrust = false;
var landed=false;
var fuel=100;
var animation;
var win= false;
var blaster;

function initGame() {
    lander = new Lander('ship');
    lander.scaleTo(.5);
    canvas = document.getElementById('canvas');
    console.log(canvas);
   // document.getElementById("mymeter");
    window.setInterval(loop, 10);
	
    reset();

    }

function initDisplay(){
	console.log("game over");
	console.log(display);
	document.getElementById('display').innerHTML = "GAME OVER";
	ship.style.background="url('images/explosion-animated-gif-1.gif')";
	blasted();

}

function blasted(){

		blaster = new Blaster('blast');
    	blaster.scaleTo(.5);
    	blast.style.display='block';
    	canvas = document.getElementById('canvas');
    	
}

function loop() {

    if (thrust) {
    	if(fuel>0){
    		fuel-=0.25;
    		console.log("shipSpeed=" +shipSpeed);
    		shipSpeed -= thrustPower;
    		document.getElementById("mymeter");
    		mymeter.value=fuel;
    	}
    }

    if (shipPosition > 0 || (thrust && fuel >0)) {
        shipSpeed += gravity;
        shipPosition -= shipSpeed;
        if(shipSpeed<0.0002 && shipPosition==1){
        	win=true;
        	if(win){
        		document.getElementById('display').innerHTML = "congratulations!! You Win!!";
        	}
    	}
    }
        
       // stopThrust();
    else {
        shipSpeed = 0;
        shipPosition = 0;
        //stopThrust();
   		if(!landed){ 
			    initDisplay();	
			    
		}	
        landed=true;
        
    }
    layout();
}

function reset() {
 	mymeter.value=100;
 	ship.style.background="url('images/ship.png')";
 	lander = new Lander('ship');
    lander.scaleTo(.5);
    blast.style.display='block';
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
