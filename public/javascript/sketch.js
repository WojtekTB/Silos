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

//socket.io script
var multiplayer = true;
var socket;
var uniqueUserId;
var playerList = [];

var mapTiles = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
  [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
  [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
  [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
  [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
  [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
  [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
  [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
  [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
  [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
  [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 7, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
  [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
  [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
  [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
  [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
  [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];


function preload() {
  blockImages.brick = { image: loadImage('assets/blocks/brick.png'), solid: true, lightStrength: 0 };
  blockImages.grass1 = { image: loadImage('assets/blocks/grass1.png'), solid: false, lightStrength: 0 };
  blockImages.grass2 = { image: loadImage('assets/blocks/grass2.png'), solid: false, lightStrength: 0 };
  blockImages.grassLeft = { image: loadImage('assets/blocks/grassLeft.png'), solid: false, lightStrength: 0 };
  blockImages.grassRight = { image: loadImage('assets/blocks/grassRight.png'), solid: false, lightStrength: 0 };
  blockImages.grassFull = { image: loadImage('assets/blocks/grassFull.png'), solid: false, lightStrength: 0 };
  blockImages.schoolDesk = { image: loadImage('assets/blocks/chair.png'), solid: false, lightStrength: 0 };
  blockImages.candle = { image: loadImage('assets/blocks/candle.png'), solid: false, lightStrength: 5 };

  animations.standing = [];
  animations.walking = [];
  animations.crouching = [];
  animations.jumping_up = [];
  animations.jumping_mid = [];
  animations.jumping_down = [];
  animations.attack = [];
  for (let i = 1; i < 12; i++) {//load idle anim
    if (i > 9) {
      animations.standing.push(loadImage("assets/idle.sprite/idle00" + i + ".png"));
    }
    else {
      animations.standing.push(loadImage("assets/idle.sprite/idle000" + i + ".png"));
    }
  }
  for (let i = 1; i < 17; i++) {//load walking anim
    if (i > 9) {
      animations.walking.push(loadImage("assets/walk.sprite/walking00" + i + ".png"));
    }
    else {
      animations.walking.push(loadImage("assets/walk.sprite/walking000" + i + ".png"));
    }
  }
  animations.crouching = [loadImage("assets/crouch.sprite/crouch.png")];
  animations.jumping_up = [loadImage("assets/jump.sprite/jump_up.png")];
  animations.jumping_mid = [loadImage("assets/jump.sprite/jump_middle.png")];
  animations.jumping_down = [loadImage("assets/jump.sprite/jump_down.png")];
  animations.attack = [loadImage("assets/basic_attack.sprite/basic_attack.png")];

  for (let i = 1; i < 10; i++) {
    //load walking anim
    shieldAnimation.push(
      loadImage("assets/shield.sprite/shieldO000" + i + ".png")
    );
  }
  // animationsAndInstructions[3] = shieldAnimation;
  // animationsAndInstructions[4] = loadImage("assets/textboxes/textbox_main.png");

}

function setup() {
  createCanvas(screenX, screenY);
  map2 = new Map(mapTiles, blockImages, mapScale);
  player = new Player(map2.scale, map2.scale * 2, map2);
  player.addAnimation("standing", animations.standing, 0.3);
  player.addAnimation("walking", animations.walking, 0.5);
  player.addAnimation("crouching", animations.crouching, 1);
  player.addAnimation("jumping_up", animations.jumping_up, 1);
  player.addAnimation("jumping_mid", animations.jumping_mid, 1);
  player.addAnimation("jumping_down", animations.jumping_down, 1);
  player.setAnimation("standing");
  playerHud = new PlayerHud(player);
  if (StageBuilderMode) {
    stageBuilder = new StageBuilder(map2);
  }

  if (multiplayer) {
    //socket.io code
    uniqueUserId = Math.random().toString(36).substring(7);//generate a 7 character random id
    socket = io.connect("http://" + window.location.host);
    socket.emit("newPlayer", {
      id: uniqueUserId,
      x: player.x,
      y: player.y,
      animationState: player.animationState,
      facingRight: player.facingRight
    });//making the server aware that a new player has connected
    window.onbeforeunload = tellServerYouDisconnected;//set a disconnect function to page unloading
    socket.on("playerList", (data) => { playerList = data.playerList });//recieve a new player list
    socket.on("removePlayer", (data) => {//remove a player that disconnected from the server from this local list
      for (let i = 0; i < playerList.length; i++) {
        if (playerList[i].id === data.id) {
          playerList.splice(i, 1);
        }
      }
    });
  }

}

function draw() {
  background(70);
  map2.show();
  if (multiplayer) {
    for (let player of playerList) {
      if (player.id === uniqueUserId) {
        continue;
      }
      fill(255, 0, 0);
      rect(player.x + map2.xoffset, player.y + map2.yoffset, 100, 100);
    }
  }
  player.show();
  map2.showEffects();
  showDebug();
  if (multiplayer) {
    sendStateToServer();
  }
}

function keyPressed() {
  // if (key == ' ') {
  //   player.jump();
  // }
  if (key == "z") {
    testNPC = new NPC(player.x, player.y - 10, [], [], player);
  }
  if (key == "p") {
    player.translate(-100, 0);
    map1.translate(-100, 0);
  } else if (key == "o") {
    player.translate(100, 0);
    map1.translate(100, 0);
  }
}

function showDebug() {
  stroke(0);
  fill(255, 255, 255);
  text(`
  X: ${player.x}
  Y: ${player.y}
  VX: ${player.vx}
  VY: ${player.vy}
  Animation: ${player.animationState}
  Blocks shown: ${map2.numOfBlocksShow}
  User id: ${uniqueUserId}
  `, 0, 0, 200, 200);
  // rect(0, 0, 200, 200);
}

//communication with server functions
function sendStateToServer() {
  let data = {
    id: uniqueUserId,
    x: player.x,
    y: player.y,
    animationState: player.animationState,
    facingRight: player.facingRight
  }
  socket.emit("playerUpdate", data);
}

function tellServerYouDisconnected(e) {
  // Tell server you are disconnecting before closing the page
  noLoop();
  e.returnValue = " ";
  socket.emit("disconnectPlayer", { id: uniqueUserId });
}

