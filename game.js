
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

function initGame() {

    lander = new Lander('ship');
    lander.scaleTo(.5);

    canvas = document.getElementById('canvas');

    window.setInterval(loop, 10);
    
    
    reset();
    
    document.getElementById("mymeter");
    //document.getElementById("demo").innerHTML = "The value of the value attribute was changed from '65' to '50'.";
}

function initDisplay(){
	//diplay= new display('display');
	console.log("game over");
	console.log(display);
	document.getElementById('display').innerHTML = "GAME OVER";
	

}

function loop() {

    if (thrust) {
    	if(fuel>0){
    		fuel-=0.5;
    		shipSpeed -= thrustPower;
    		mymeter.value=fuel;
    	}
        
       // document.Write("Game Over!!!");
    }

    if (shipPosition > 0 || thrust) {
        shipSpeed += gravity;
        shipPosition -= shipSpeed;
    } else {
        shipSpeed = 0;
        shipPosition = 0;
        //console.log("shipPosition=" +shipPosition);
       // console.log("landed=" +landed);
    	 
			
			if(!landed){ 
			    initDisplay();	
			}
		
        landed=true;
        
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
	//var movement = height + (right * shipPosition);
	
	
	
    lander.moveTo(canvas.clientWidth/2, lander.height()/2 + distance);

    
}
