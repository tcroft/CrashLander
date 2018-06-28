
var lander;
var canvas;
var flame;
var state;
var fuel=100;
var shipPosition;
var shipSpeed;
var gravity = .00001;
var thrustPower = .00002;
var thrust = false;
var done;

function initGame() {
    lander = new Lander('ship');
    lander.scaleTo(.5);
    canvas = document.getElementById('canvas');
    window.setInterval(loop, 10);
    initFlame();
    reset();
}

function loop() {

    if (thrust) {
           if(fuel>0.2){
           fuel=fuel-0.2;
           dispFuel(fuel);
           shipSpeed-=thrustPower;  
        }
    }
       if(fuel==0){
           //shipPosition=0;
           stopThrust();
           
       }
        
    if (shipPosition > 0 || (thrust&&fuel>0)) {
        shipSpeed += gravity;
        shipPosition -= shipSpeed;
        
    } else {
        if(!done){
            if(shipSpeed>0.0012)
            {
                fail();
            }
            else{
                land();
                
            }
        }
        shipSpeed = 0;
        shipPosition = 0;
       done=true;
        
    }
    layout();
}
function fail()
{

       document.getElementById("fail").innerHTML="Game Over....";  
        ship.style.background="url('images/final.gif') no-repeat";
        removeFlame();
        
        
}
function land()
{
    document.getElementById("success").innerHTML="Landed successfully";

}

function reset() {
    var fuel=100;
    ship.style.background="url('images/ship.png')";
    document.getElementById("fail").innerHTML=" ";  
    document.getElementById("success").innerHTML=" ";
    document.getElementById("fuel").innerHTML=fuel;
    shipPosition = 1;
    shipSpeed = 0;
    done=false;
    initFlame();
    layout();
}

function startThrust() {
    thrust = true;
    displayFlame();
}

function stopThrust() {
    thrust = false;
    removeFlame();
}

function layout() {
    var height = canvas.clientHeight - lander.height();
    var distance = height - (height * shipPosition);

    lander.moveTo(canvas.clientWidth/2, lander.height()/2 + distance);
}

function dispFuel(fuel){
    this.fuel=fuel;
    document.getElementById("fuel").innerHTML=fuel;
   
    
}
function showMsg(fuel)
{
    document.getElementById("msg").innerHTML="fuel is:"+fuel+"plz fill the fuel";

}
function initFlame()
{

    flame = new Flame('flame');
    flame.scaleTo(.4);   
}

function displayFlame()
{
    var flame = document.getElementById('flame');
    flame.style.display = 'block';
}
function removeFlame()
{
var flame = document.getElementById('flame');
    flame.style.display = 'none';
}