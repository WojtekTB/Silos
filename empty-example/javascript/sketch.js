var screenX = window.innerWidth;
var screenY = window.innerHeight - 20;
var player;
var map1;
var mapScale = screenY;

var images = {
  brick: null,
  stone: null,
  player: null
};

var mapTiles = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

function preload(){
  images.brick = loadImage('assets/brick.png');
  images.player = loadImage('assets/yeet.png');
}

function setup() {
  createCanvas(screenX, screenY);
  map1 = new Map(mapTiles, images, mapScale);
  player = new Player(180, 700, map1, images.player);
  frameRate(60);
}

function draw(){
  // put drawing code here
  background(50);
  map1.show();
  player.update();
  player.show();
  noStroke();


  for(let i = 0; i < player.numberOfCollisionPointsOnSide; i++){
    fill(`rgb(255, 0, 0)`);
    rect(player.playerCollisionPointsBottom[i].x, player.playerCollisionPointsBottom[i].y, 2, 2);
    fill(`rgb(255, 0, 255)`);
    rect(player.playerCollisionPointsSideR[i].x, player.playerCollisionPointsSideR[i].y, 2, 2);
    fill(`rgb(0, 255, 0)`);
    rect(player.playerCollisionPointsSideL[i].x, player.playerCollisionPointsSideL[i].y, 2, 2);
  }

  // rect(player.x - player.spriteWidth/2, player.y, player.spriteWidth, 2);

}

function keyPressed(){
  if (key == ' '){
    player.jump();
  }
  if (key == 's' || keyCode == DOWN_ARROW){
    player.crouch();
  }
  if(key == 'z')
  {
    player.moveToClick();
  }
}
