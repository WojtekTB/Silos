var screenX = innerWidth;
var screenY = innerHeight;
var paused = false;

var player;
var playerHud;
var map1;
var map2;
var mapScale = 50;
var animations = {};
var testNPC;
var stageBuilder;
// var shield;
var shieldAnimation = [];
var playerDialogueBoxImage;
var StageBuilderMode = false;


var blockImages = {
  brick: null,
  grass1: null,
  grass2: null,
  grassLeft: null,
  grassRight: null,
  grassFull: null,
  candle: null
};

var mapTiles = [
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 0],
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 0],
  [ 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
  [ 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
  [ 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
  [ 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
  [ 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
  [ 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
  [ 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
  [ 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
  [ 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
  [ 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
  [ 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  6,  7,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
  [ 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
  [ 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
  [ 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
  [ 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
  [ 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 0],
];


function preload(){
  blockImages.brick = {image: loadImage('assets/blocks/brick.png'), solid: true, lightStrength: 0};
  blockImages.grass1 = {image: loadImage('assets/blocks/grass1.png'), solid: false, lightStrength: 0};
  blockImages.grass2 = {image: loadImage('assets/blocks/grass2.png'), solid: false, lightStrength: 0};
  blockImages.grassLeft = {image: loadImage('assets/blocks/grassLeft.png'), solid: false, lightStrength: 0};
  blockImages.grassRight = {image: loadImage('assets/blocks/grassRight.png'), solid: false, lightStrength: 0};
  blockImages.grassFull = {image: loadImage('assets/blocks/grassFull.png'), solid: false, lightStrength: 0};
  blockImages.schoolDesk = {image: loadImage('assets/blocks/chair.png'), solid: false, lightStrength: 0};
  blockImages.candle = {image: loadImage('assets/blocks/candle.png'), solid: false, lightStrength: 5};

  animations.standing = [];
  animations.walking = [];
  animations.crouching = [];
  animations.jumping_up = [];
  animations.jumping_mid = [];
  animations.jumping_down = [];
  animations.attack = [];
  for(let i = 1;  i < 12; i++){//load idle anim
    if(i > 9){
      animations.standing.push(loadImage("assets/idle.sprite/idle00" + i + ".png"));
    }
    else{
      animations.standing.push(loadImage("assets/idle.sprite/idle000" + i + ".png"));
    }
  }
  for(let i = 1;  i < 17; i++){//load walking anim
    if(i > 9){
      animations.walking.push(loadImage("assets/walk.sprite/walking00" + i + ".png"));
    }
    else{
      animations.walking.push(loadImage("assets/walk.sprite/walking000" + i + ".png"));
    }
  }
  animations.crouching = [loadImage("assets/crouch.sprite/crouch.png")];
  animations.jumping_up = [loadImage("assets/jump.sprite/jump_up.png")];
  animations.jumping_mid = [loadImage("assets/jump.sprite/jump_middle.png")];
  animations.jumping_down = [loadImage("assets/jump.sprite/jump_down.png")];
  animations.attack = [loadImage("assets/basic_attack.sprite/basic_attack.png")];

  for(let i = 1;  i < 10; i++){//load walking anim
      shieldAnimation.push(loadImage("assets/shield.sprite/shieldO000" + i + ".png"));
  }
  // animationsAndInstructions[3] = shieldAnimation;
  // animationsAndInstructions[4] = loadImage("assets/textboxes/textbox_main.png");

}

function setup() {
  createCanvas(screenX, screenY);
  map2 = new Map(mapTiles, blockImages, mapScale);
  player = new Player(map2.scale, map2.scale*2, map2);
  player.addAnimation("standing", animations.standing, 0.3);
  player.addAnimation("walking", animations.walking, 0.5);
  player.addAnimation("crouching", animations.crouching, 1);
  player.addAnimation("jumping_up", animations.jumping_up, 1);
  player.addAnimation("jumping_mid", animations.jumping_mid, 1);
  player.addAnimation("jumping_down", animations.jumping_down, 1);
  player.setAnimation("standing");
  playerHud = new PlayerHud(player);
  if(StageBuilderMode){
    stageBuilder = new StageBuilder(map2);
  }
  // console.log(innerWidth, innerHeight);
  // map2.show()
  // shield = new Shield(mouseX, mouseY, shieldAnimation);
  // frameRate(60);
}

function draw(){
  background(70);
  map2.show()
  player.show();
  map2.showEffects();
  showDebug();
}

function showDebug(){
  stroke(0);
  fill(255, 255, 255);
  text(`X: ${player.x}\nY: ${player.y}\nVX: ${player.vx}\nVY: ${player.vy}\nAnimation: ${player.animationKey}\nBlocks shown: ${map2.numOfBlocksShow}`, 0, 0, 200, 200);
  // rect(0, 0, 200, 200);
}

// function draw(){
//   // put drawing code here
//   if(paused === false){
//     background(100);
//     noStroke();
//     if(StageBuilderMode){
//       stageBuilder.show();
//     }
//     else{
//       player.update();
//       player.show();
//       map2.show();
//       noStroke();
//       playerHud.show();
//       playerHud.update();
//       if(testNPC != null){
//         testNPC.run();
//       }
//       player.inspection();
//       let fps = frameRate();
//   fill(255);
//   // stroke(0);
//   text("FPS: " + fps.toFixed(2), 5, height - 10);
//     }
//   }
//   // showDebug();
//   // shield.run();
// }


function keyPressed(){
  if (key == ' '){
    player.jump();
  }
  // if (key == 's' || keyCode == DOWN_ARROW){
  //   player.transition();
  // }
  if(key == 'z')
  {
    // console.log(player.x + player.xoffset, player.y + player.yoffset);
    testNPC = new NPC(player.x, player.y-10, [], [], player);
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

// function showDebug(){
//   for(let i = 0; i < player.numberOfCollisionPointsOnSide; i++){
//     fill(`rgb(255, 0, 0)`);
//     rect(player.playerCollisionPointsBottom[i].x + player.xoffset, player.playerCollisionPointsBottom[i].y + player.yoffset, 2, 2);
//     fill(`rgb(30, 30, 255)`);
//     rect(player.playerCollisionPointsTop[i].x + player.xoffset, player.playerCollisionPointsTop[i].y + player.yoffset, 2, 2);
//     fill(`rgb(255, 0, 255)`);
//     rect(player.playerCollisionPointsSideR[i].x + player.xoffset, player.playerCollisionPointsSideR[i].y + player.yoffset, 2, 2);
//     fill(`rgb(0, 255, 0)`);
//     rect(player.playerCollisionPointsSideL[i].x + player.xoffset, player.playerCollisionPointsSideL[i].y + player.yoffset, 2, 2);
//   }
//   for(let i = 0; i < player.numberOfCollisionPointsOnSide; i++){
//     fill(`rgb(255, 0, 0)`);
//     rect(player.playerCheckerPointsBottom[i].x + player.xoffset, player.playerCheckerPointsBottom[i].y + player.yoffset, 2, 2);
//     fill(`rgb(30, 30, 255)`);
//     rect(player.playerCheckerPointsTop[i].x + player.xoffset, player.playerCheckerPointsTop[i].y + player.yoffset, 2, 2);
//     fill(`rgb(255, 0, 255)`);
//     rect(player.playerCheckerPointsSideR[i].x + player.xoffset, player.playerCheckerPointsSideR[i].y + player.yoffset, 2, 2);
//     fill(`rgb(0, 255, 0)`);
//     rect(player.playerCheckerPointsSideL[i].x + player.xoffset, player.playerCheckerPointsSideL[i].y + player.yoffset, 2, 2);
//   }
// }
