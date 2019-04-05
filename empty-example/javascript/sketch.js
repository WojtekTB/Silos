var screenX = window.innerWidth;
var screenY = window.innerHeight - 20;
var player;
var map1;
var mapScale = screenY;

var images = {
  brick: null,
  stone: null
};

var mapTiles = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

function preload(){
  images.brick = loadImage('assets/brick.png');
}

function setup() {
  createCanvas(screenX, screenY);
  map1 = new Map(mapTiles, images, mapScale);
  player = new Player(screenX/2, screenY/2, map1);
}

function draw(){
  // put drawing code here
  background(50);
  map1.show();
  player.update();
  player.show();
  fill(`rgb(255, 0, 0)`);
  rect(player.collisionPoints.cpx, player.collisionPoints.cpy, 3, 3);

}

function keyPressed(){
  if (key == ' '){
    player.jump();
  }
  else if (key == 's' || keyCode == DOWN_ARROW){
    player.crouch();
  }
}
