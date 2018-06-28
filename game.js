
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
var flame;


function initGame() {
	//console.log(display);
    lander = new Lander('ship');
    lander.scaleTo(.5);
    canvas = document.getElementById('canvas');
    console.log(canvas);
   // document.getElementById("mymeter");
    window.setInterval(loop, 10);
	
    reset();

    }

function initDisplay(){
	
	console.log(display);
	console.log("initdisplay");
	if(shipSpeed<0.0012 ){
        	win=true;
        	if(win){
        		document.getElementById('display').innerHTML = "congratulations!! You Win!!";
        		ship.style.background="url('images/youwin.gif')";
        	}
     	
	}else{
	
    	    console.log("over");
    		document.getElementById('display').innerHTML = "GAME OVER";
    		ship.style.background="url('images/explosion-animated-gif-1.gif')";
	
	}

}
function initflame(){
	flame= new Flame('flame');
	flame.scaleTo(.5);
}

function loop() {

    if (thrust) {
    	
          
    	if(fuel>0){
    		fuel-=0.2;
    		console.log("shipSpeed=" +shipSpeed);
    		shipSpeed -= thrustPower;
    		//console.log(ship.style.background="url('images/tenor.gif')");
    		document.getElementById("mymeter");
    		mymeter.value=fuel;
    	}
    }

    if (shipPosition > 0 || (thrust && fuel >0)) {
        shipSpeed += gravity;
        shipPosition -= shipSpeed;
       
    }
        
       // stopThrust();
    else {
    
   		 if(!landed){ 
   				ship.style.background="none";
			    initDisplay();
		}	
			    shipSpeed = 0;
        		shipPosition = 0;
			     landed=true;
		}
			
       
 
    
    layout();
}

function reset() {
 	mymeter.value=100;
 	//gameover=false;
   	document.getElementById('display').innerHTML="";
    console.log(display);
 	ship.style.background="url('images/ship.png')";
    shipPosition = 1;
    shipSpeed = 0;
    landed=false;
 	
    layout();
    
   
}

function startThrust() {
	initflame();
	var fm=document.getElementById('flame');
	fm.style.display='block';
    thrust = true;
}

function stopThrust() {
	var fm=document.getElementById('flame');
	fm.style.display='none';
    thrust = false;
    
}

function layout() {
    var height = canvas.clientHeight - lander.height();
    var distance = height - (height * shipPosition);
    lander.moveTo(canvas.clientWidth/2, lander.height()/2 + distance);
}
