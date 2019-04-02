var screenX = window.innerWidth;
var screenY = window.innerHeight - 20;


function setup() {
  createCanvas(screenX, screenY);
}

function draw(){
  // put drawing code here
  background(`rgb(255, 255, 0)`);
  rect(10, 10, 30, 30);
}

function keyPressed(){
  if(keyCode = ' ')
  {
    console.log("pressed space");
  }
}
