var screenX = window.innerWidth;
var screenY = window.innerHeight - 20;
var player;
var map1;
var mapScale = screenY;
var animationsAndInstructions = [[], []];

var images = {
  brick: null,
  stone: null,
  player: null
};

var mapTiles = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

function preload(){
  images.brick = loadImage('assets/brick.png');
  images.player = loadImage('assets/yeet.png');
  for(let i = 1;  i < 12; i++){
    if(i > 9){
      animationsAndInstructions[0].push(loadImage("assets/idle.sprite/idle00" + i + ".png"));
    }
    else{
      animationsAndInstructions[0].push(loadImage("assets/idle.sprite/idle000" + i + ".png"));
    }
  }
  animationsAndInstructions[1] = [0, 11, "idle"];
}

function setup() {
  createCanvas(screenX, screenY);
  map1 = new Map(mapTiles, images, mapScale);
  player = new Player(screenX/2, 700, map1, images.player, animationsAndInstructions);
  // frameRate(60);
}

function draw(){
  // put drawing code here
  background(100);
  map1.show();
  player.update();
  player.show();
  noStroke();


  for(let i = 0; i < player.numberOfCollisionPointsOnSide; i++){
    fill(`rgb(255, 0, 0)`);
    rect(player.playerCollisionPointsBottom[i].x + player.xoffset, player.playerCollisionPointsBottom[i].y + player.yoffset, 2, 2);
    fill(`rgb(30, 30, 255)`);
    rect(player.playerCollisionPointsTop[i].x + player.xoffset, player.playerCollisionPointsTop[i].y + player.yoffset, 2, 2);
    fill(`rgb(255, 0, 255)`);
    rect(player.playerCollisionPointsSideR[i].x + player.xoffset, player.playerCollisionPointsSideR[i].y + player.yoffset, 2, 2);
    fill(`rgb(0, 255, 0)`);
    rect(player.playerCollisionPointsSideL[i].x + player.xoffset, player.playerCollisionPointsSideL[i].y + player.yoffset, 2, 2);
  }
  for(let i = 0; i < player.numberOfCollisionPointsOnSide; i++){
    fill(`rgb(255, 0, 0)`);
    rect(player.playerCheckerPointsBottom[i].x + player.xoffset, player.playerCheckerPointsBottom[i].y + player.yoffset, 2, 2);
    fill(`rgb(30, 30, 255)`);
    rect(player.playerCheckerPointsTop[i].x + player.xoffset, player.playerCheckerPointsTop[i].y + player.yoffset, 2, 2);
    fill(`rgb(255, 0, 255)`);
    rect(player.playerCheckerPointsSideR[i].x + player.xoffset, player.playerCheckerPointsSideR[i].y + player.yoffset, 2, 2);
    fill(`rgb(0, 255, 0)`);
    rect(player.playerCheckerPointsSideL[i].x + player.xoffset, player.playerCheckerPointsSideL[i].y + player.yoffset, 2, 2);
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
  if(key == 'p')
  {
    player.translate(-100, 0);
    map1.translate(-100, 0);
  }
  else if(key == 'o')
  {
    player.translate(100, 0);
    map1.translate(100, 0);
  }
}
