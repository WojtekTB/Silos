var screenX = window.innerWidth;
var screenY = window.innerHeight - 20;
var player;
var map1;

var images = [];

function preload(){
  images.push(loadImage('assets/brick.png'));
}

function setup() {
  createCanvas(screenX, screenY);
  player = new Player(screenX/2, screenY/2);
  map1 = new Map(images);
}

function draw(){
  // put drawing code here
  background(50);
  map1.show();
  player.show();
  player.update();

}

function keyPressed(){
  if (key == ' '){
    player.jump();
  }
  else if (key == 's' || keyCode == DOWN_ARROW){
    player.crouch();
  }
}
