class Player{
  constructor(startingX, startingY, map, images){//initialize object
    //-----position-----
    this.x = startingX;
    this.y = startingY;
    this.previousX = this.x;
    this.previousY = this.y;
    this.xoffset = 0;
    this.yoffset = 0;
    //-----vectors-----
    this.speed = 5;//walking speed
    this.jumpForce = 10;//jumping force
    this.overallVelocity = 0;//total force acting on sprite
    this.gravity = 0.5;//downward pull
    this.stepsPerFrame = 5;
    //-----sprite-----
    this.spriteHeight = 95;
    this.spriteWidth = 157*(2/3);

    this.image = images;
    //-----player-statuses-----
    this.crouched = 0;//[0 = standing; 1 = crouching] => start off standing
    this.maxJumps = 2;//constant max number of jumps to reset to
    this.inTheAir = 1;
    this.jumpNumber = this.maxJumps;//number of jumps before having to touch the ground again
    //-----map value-----
    this.map = map;//get the map the player is currently running around in
    this.mapScale = map.scale;
    this.mapTiles = map.mapTiles;
    console.log(this.mapScale, this.mapTiles);
    //-----player collision values-----
    this.numberOfCollisionPointsOnSide = 10;
    this.collisionPointSidePadding = 3;
    this.playerCollisionPointsTop = [];
    this.playerCollisionPointsBottom = [];
    this.playerCollisionPointsSideR = [];
    this.playerCollisionPointsSideL = [];
    for(let i = 0; i < this.numberOfCollisionPointsOnSide; i++){
      this.playerCollisionPointsTop.push(new CollisionPoint(null, null));
      this.playerCollisionPointsBottom.push(new CollisionPoint(null, null));
      this.playerCollisionPointsSideR.push(new CollisionPoint(null, null));
      this.playerCollisionPointsSideL.push(new CollisionPoint(null, null));
    }
  }

  moveToClick(){
    this.x = mouseX;
    this.y = mouseY;
    console.log(this.x, this.y);
    this.overallVelocity = 0;
    this.inTheAir = 1;
  }

  controlMovement(){//check for key pressed and move if so
    if (keyIsDown(LEFT_ARROW) || keyIsDown("A".charCodeAt(0))) {
      this.previousX = this.x;
      this.x -= this.speed;

    }
    else if (keyIsDown(RIGHT_ARROW) || keyIsDown("D".charCodeAt(0))) {
      this.previousX = this.x;
      this.x += this.speed;
    }
  }

  crouch(){//changes the state of crouching from 1 to 0 or 0 to 1
    if(this.crouched === 1)
    {
      this.crouched = 0;//change to standing if was crouching
      this.y -= this.spriteHeight;
      this.spriteHeight = this.spriteHeight*2;
      console.log("Standing!");
    }
    else{
      this.crouched = 1;//change to crouching if was standing
      this.spriteHeight = this.spriteHeight/2;
      console.log("Crouching!");
    }
  }

  jump(){//adds upwards force to whatever the value was before
    if(this.jumpNumber != 0)
    {
      // this.y -= 20;
      this.overallVelocity -= this.jumpForce;
      this.jumpNumber--;
    }
    // console.log(this.jumpNumber);
  }

  gravityPull(){
    // if(this.inTheAir === 1)
    // {
      this.overallVelocity += this.gravity;
    // }
  }

  show(){//render
    fill(255);
    // rect(this.x - (this.spriteWidth / 2), this.y - (this.spriteHeight / 2), this.spriteWidth, this.spriteHeight);
    image(this.image, (this.x - (this.spriteWidth / 2)) + this.xoffset, (this.y - (this.spriteHeight / 2)) + this.yoffset, this.spriteWidth, this.spriteHeight);
  }

  collisionDetectionSide(){
    let nonBumped = false;
    for(let i = 0; i < this.numberOfCollisionPointsOnSide; i++){
      let tileX = Math.floor(this.playerCollisionPointsSideR[i].x / this.mapScale);
      let tileY = Math.floor(this.playerCollisionPointsSideR[i].y / this.mapScale);
      let tilePlayerIsOn = this.mapTiles[tileY][tileX];
      if(tilePlayerIsOn != 0){
        this.x = this.previousX;
        console.log("tile to the right side!");
        this.jumpNumber = 1;
        nonBumped = true;
        break;
      }
    }

    for(let i = 0; i < this.numberOfCollisionPointsOnSide; i++){
      let tileX = Math.floor(this.playerCollisionPointsSideL[i].x / this.mapScale);
      let tileY = Math.floor(this.playerCollisionPointsSideL[i].y / this.mapScale);
      let tilePlayerIsOn = this.mapTiles[tileY][tileX];
      if(tilePlayerIsOn != 0){
        this.x = this.previousX;
        console.log("tile to the left side!");
        this.jumpNumber = 1;
        nonBumped = true;
        break;
      }
    }
    if(nonBumped){
      this.previousX = this.x;
    }
  }

  collisionDetectionTop(){
    let nonBumped = true;
    for(let i = 0; i < this.numberOfCollisionPointsOnSide; i++){
      let tileX = Math.floor(this.playerCollisionPointsTop[i].x / this.mapScale);
      let tileY = Math.floor(this.playerCollisionPointsTop[i].y / this.mapScale);
      let tilePlayerIsOn = this.mapTiles[tileY][tileX];
      if(tilePlayerIsOn != 0){
        this.y = this.previousY;
        this.overallVelocity = this.gravity;
        console.log("tile Top!");
        nonBumped = false;
        break;
      }
    }
    if(nonBumped){
      this.previousY = this.y;
    }
  }

  collisionDetectionBottom(){
    let nonBumped = true;
    for(let i = 0; i < this.numberOfCollisionPointsOnSide; i++){
      let tileX = Math.floor(this.playerCollisionPointsBottom[i].x / this.mapScale);
      let tileY = Math.floor(this.playerCollisionPointsBottom[i].y / this.mapScale);
      let tilePlayerIsOn = this.mapTiles[tileY][tileX];
      if(tilePlayerIsOn != 0){
        this.y = this.previousY;
        this.overallVelocity = 0;
        this.jumpNumber = this.maxJumps;
        console.log("tile Under!");
        nonBumped = false;
        break;
      }
    }
    if(nonBumped){
      this.previousY = this.y;
    }
  }

  collisionPointsUpdate(){
    this.playerCollisionPointsSideR[0].x = this.x + this.spriteWidth/2 + this.collisionPointSidePadding;
    this.playerCollisionPointsSideR[0].y = (this.y - this.spriteHeight/2) + this.collisionPointSidePadding;//right

    this.playerCollisionPointsSideL[0].x = this.x - this.spriteWidth/2 - this.collisionPointSidePadding;
    this.playerCollisionPointsSideL[0].y = (this.y - this.spriteHeight/2) + this.collisionPointSidePadding;//left

    this.playerCollisionPointsTop[0].x = (this.x - this.spriteWidth/2) + this.collisionPointSidePadding;
    this.playerCollisionPointsTop[0].y = this.y - this.spriteHeight/2;

    this.playerCollisionPointsBottom[0].x = (this.x - this.spriteWidth/2) + this.collisionPointSidePadding;
    this.playerCollisionPointsBottom[0].y = this.y + this.spriteHeight/2;
    for(let i = 1; i < this.numberOfCollisionPointsOnSide; i++){
      this.playerCollisionPointsTop[i].x = ((this.x - this.spriteWidth/2 + this.collisionPointSidePadding) + i * ((this.spriteWidth-(this.collisionPointSidePadding*2))/(this.numberOfCollisionPointsOnSide-1)));
      this.playerCollisionPointsTop[i].y = this.y - this.spriteHeight/2;

      this.playerCollisionPointsBottom[i].x = ((this.x - this.spriteWidth/2 + this.collisionPointSidePadding) + i * ((this.spriteWidth-(this.collisionPointSidePadding*2))/(this.numberOfCollisionPointsOnSide-1)));
      this.playerCollisionPointsBottom[i].y = this.y + this.spriteHeight/2;

      this.playerCollisionPointsSideR[i].x = this.x + this.spriteWidth/2 + this.collisionPointSidePadding;
      this.playerCollisionPointsSideR[i].y = ((this.y - this.spriteHeight/2 + this.collisionPointSidePadding) + i * ((this.spriteHeight-(this.collisionPointSidePadding*2))/(this.numberOfCollisionPointsOnSide-1)));

      this.playerCollisionPointsSideL[i].x = this.x - this.spriteWidth/2 - this.collisionPointSidePadding;
      this.playerCollisionPointsSideL[i].y = ((this.y - this.spriteHeight/2 + this.collisionPointSidePadding) + i * ((this.spriteHeight-(this.collisionPointSidePadding*2))/(this.numberOfCollisionPointsOnSide-1)));
    }
  }
    // this.playerCollisionPointsBottom.x = this.x,
    // this.playerCollisionPointsBottom.y = this.y + this.spriteHeight/2
translate(x, y){
  this.xoffset += x;
  this.yoffset += y;
}

translateScreen(x, y){
  this.map.translate(x, y);
  this.translate(x, y);
}


  update(){//update values
    this.controlMovement();
    this.gravityPull();
    for(let i = 0; i < this.stepsPerFrame; i++){
      this.y += this.overallVelocity/this.stepsPerFrame;
      this.collisionPointsUpdate();
      this.collisionDetectionBottom();
      this.collisionDetectionTop();
      this.collisionDetectionSide();
    }
    // this.map.adjustTo(-this.x, this.y);

    // this.y += this.overallVelocity;
    // this.collisionPointsUpdate();
    // this.collisionDetectionBottom();
    // this.collisionDetectionSide();
    if(this.y > screenY - this.spriteHeight){//when character y is at the floor limit
      this.y = screenY - this.spriteHeight;
      this.overallVelocity = 0;
      this.jumpNumber = this.maxJumps;
    }
    // console.log("overallVelocity: " + this.overallVelocity);
    // console.log("jumps: "+this.jumpNumber);
  }
}
