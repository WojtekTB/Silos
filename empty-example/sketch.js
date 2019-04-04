var screenX = window.innerWidth;
var screenY = window.innerHeight - 20;
var floor = screenY - 30;
var player;


function setup() {
  createCanvas(screenX, screenY);
  player = new Player(screenX/2, screenY/2);
}

function draw(){
  // put drawing code here
  background(50);
  player.show();
  player.update();
}

function keyPressed(){
  if (key == ' '){
    player.jump();
  }
  else if (key == 's'){
    player.crouch();
  }
}
