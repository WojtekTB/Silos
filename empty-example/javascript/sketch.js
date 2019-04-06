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
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

function preload(){
  images.brick = loadImage('assets/brick.png');
  images.player = loadImage('assets/yeet.png');
}

function setup() {
  createCanvas(screenX, screenY);
  map1 = new Map(mapTiles, images, mapScale);
  player = new Player(screenX/2, screenY/2, map1, images.player);
}

function draw(){
  // put drawing code here
  background(50);
  map1.show();
  player.update();
  player.show();
  fill(`rgb(255, 0, 0)`);
  rect(player.collisionPointBottom.cpx, player.collisionPointBottom.cpy, 3, 3);//mid
  rect(player.collisionPointBottomRight.cpx, player.collisionPointBottomRight.cpy, 3, 3);//right
  rect(player.collisionPointBottomLeft.cpx, player.collisionPointBottomLeft.cpy, 3, 3);//left

  for(i = 0; i < player.bottomCollisionArrayX.length; i++){
    rect(player.bottomCollisionArrayX[i], player.collisionPointBottom.cpy, 3, 3);
  }
  fill(`rgb(0, 0, 255)`);
  for(i = 0; i < player.rightCollisionArrayY.length; i++){
    rect(player.collisionPointBottomLeft.cpx + player.spriteWidth, player.rightCollisionArrayY[i], 3, 3);
  }
  fill(`rgb(0, 255, 0)`);
  for(i = 0; i < player.leftCollisionArrayY.length; i++){
    rect(player.collisionPointBottomLeft.cpx, player.leftCollisionArrayY[i], 3, 3);
  }

}

function keyPressed(){
  if (key == ' '){
    player.jump();
  }
  else if (key == 's' || keyCode == DOWN_ARROW){
    player.crouch();
  }
}
