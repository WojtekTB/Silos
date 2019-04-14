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
    this.speed = 8;//walking speed force
    this.jumpForce = 10;//jumping force
    this.overallVelocityY = 0;//total force acting on sprite on Y
    this.overallVelocityX = 0;//total force acting on sprite on X
    this.gravity = 0.5;//downward pull
    this.stepsPerFrame = 5;
    //-------player frictions------
    this.floorFriction = 1;
    this.airFriction = 0.2;
    //-----sprite-----
    this.spriteHeight = 95;
    this.spriteWidth = 157*(2/3);

    this.image = images;
    //-----player-statuses-----
    this.crouched = 0;//[0 = standing; 1 = crouching] => start off standing
    this.inTheAir = false;
    this.inTheAirChannel = [0, 0, 0];
    this.maxJumps = 2;//constant max number of jumps to reset to
    this.jumpNumber = this.maxJumps;//number of jumps before having to touch the ground again
    this.onWall = true;
    this.onRightWall = true;
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
    //-----special collision points-------
    this.isNextToL = false;
    this.isNextToR = false;
    this.isNextToT = false;
    this.isNextToB = false;

    this.playerCheckerPointsTop = [];
    this.playerCheckerPointsBottom = [];
    this.playerCheckerPointsSideR = [];
    this.playerCheckerPointsSideL = [];
    for(let i = 0; i < this.numberOfCollisionPointsOnSide; i++){
      this.playerCheckerPointsTop.push(new CollisionPoint(null, null));
      this.playerCheckerPointsBottom.push(new CollisionPoint(null, null));
      this.playerCheckerPointsSideR.push(new CollisionPoint(null, null));
      this.playerCheckerPointsSideL.push(new CollisionPoint(null, null));
    }
  }

  moveToClick(){
    this.x = mouseX;
    this.y = mouseY;
    console.log(this.x, this.y);
    // this.overallVelocityY = 0;
    this.inTheAir = 1;
  }

  controlMovement(){//check for key pressed and move if so
    if (keyIsDown(LEFT_ARROW) || keyIsDown("A".charCodeAt(0))) {
      this.overallVelocityX -= this.speed/4;
      if(this.overallVelocityX < -this.speed){
        this.overallVelocityX = -this.speed/4;
      }
    }
    else if (keyIsDown(RIGHT_ARROW) || keyIsDown("D".charCodeAt(0))) {
      this.overallVelocityX += this.speed/4;
      if(this.overallVelocityX > this.speed){
        this.overallVelocityX = this.speed/4;
      }
    }
    else if (keyIsDown("L".charCodeAt(0))) {
      console.table({top: this.isNextToT, bottom: this.isNextToB, left: this.isNextToL, right: this.isNextToR});
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
      if(this.isNextToB === false && this.isNextToT === false && this.isNextToL === false && this.isNextToR === true){//if on right wall
        this.wallJump(true);
      }
      else if(this.isNextToB === false && this.isNextToT === false && this.isNextToL === true && this.isNextToR === false){//if on right wall
        this.wallJump(false);
      }
      else{
        this.normalJump();
      }
      this.jumpNumber--;
    }
  }

  normalJump(){
      // this.y -= 20;
      this.overallVelocityY -= this.jumpForce;
    // console.log(this.jumpNumber);
  }

  wallJump(right){
    this.overallVelocityY -= this.jumpForce*1.3;
    if(right){
      this.overallVelocityX -= this.speed*1.3;
    }
    else{
      this.overallVelocityX += this.speed*1.3;
    }
  }

  gravityPull(){
      this.overallVelocityY += this.gravity;
  }


  collisionDetectionSide(){
    let nonBumped = true;
    for(let i = 0; i < this.numberOfCollisionPointsOnSide; i++){//right
      let tileX = Math.floor(this.playerCollisionPointsSideR[i].x / this.mapScale);
      let tileY = Math.floor(this.playerCollisionPointsSideR[i].y / this.mapScale);
      let tilePlayerIsOn = this.mapTiles[tileY][tileX];
      if(tilePlayerIsOn != 0){
        this.x = this.previousX;
        // console.log("tile to the right side!");
        // this.overallVelocityY -= 0.4
        this.jumpNumber = 1;
        nonBumped = true;
        this.overallVelocityX = 0;
        this.onWall = true;
        this.onRightWall = true;
        // this.inTheAir = false;
        break;
      }
    }

    for(let i = 0; i < this.numberOfCollisionPointsOnSide; i++){//left
      let tileX = Math.floor(this.playerCollisionPointsSideL[i].x / this.mapScale);
      let tileY = Math.floor(this.playerCollisionPointsSideL[i].y / this.mapScale);
      let tilePlayerIsOn = this.mapTiles[tileY][tileX];
      if(tilePlayerIsOn != 0){
        this.x = this.previousX;
        // console.log("tile to the left side!");
        this.jumpNumber = 1;
        nonBumped = true;
        this.overallVelocityX = 0;
        this.onWall = true;
        this.onRightWall = false;
        // this.inTheAir = false;
        this.inTheAirChannel[0] = 1;
        break;
      }
    }
    if(nonBumped){
      // console.log("ree");
      this.inTheAirChannel[0] = 0;
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
        this.overallVelocityY = this.gravity;
        // console.log("tile Top!");
        nonBumped = false;
        // this.inTheAir = false;
        this.inTheAirChannel[1] = 1;
        break;
      }
    }
    if(nonBumped){
      this.inTheAirChannel[1] = 0;
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
        this.overallVelocityY = 0;
        this.jumpNumber = this.maxJumps;
        // console.log("tile Under!");
        nonBumped = false;
        // this.inTheAir = false;
        this.onWall = false;
        this.inTheAirChannel[2] = 1;
          // console.log(this.inTheAirChannel);
        break;
      }
    }
    if(nonBumped){
      this.inTheAirChannel[2] = 0;
        // console.log(this.inTheAirChannel);
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

  checkerDetectionSide(){
    let nonBumpedL = true;
    let nonBumpedR = true;
    for(let i = 0; i < this.numberOfCollisionPointsOnSide; i++){//right
      let tileX = Math.floor(this.playerCheckerPointsSideR[i].x / this.mapScale);
      let tileY = Math.floor(this.playerCheckerPointsSideR[i].y / this.mapScale);
      let tilePlayerIsOn = this.mapTiles[tileY][tileX];
      if(tilePlayerIsOn != 0){
        //your code
        this.isNextToR = true;
        nonBumpedR = false;
        break;
      }
    }

    for(let i = 0; i < this.numberOfCollisionPointsOnSide; i++){//left
      let tileX = Math.floor(this.playerCheckerPointsSideL[i].x / this.mapScale);
      let tileY = Math.floor(this.playerCheckerPointsSideL[i].y / this.mapScale);
      let tilePlayerIsOn = this.mapTiles[tileY][tileX];
      if(tilePlayerIsOn != 0){
        //your code
        this.isNextToL = true;
        nonBumpedL = false;
        break;
      }
    }
    if(nonBumpedR){
      //else
      this.isNextToR = false;
    }
    if(nonBumpedL){
      //else
      this.isNextToL = false;
    }
  }

  checkerDetectionTop(){
    let nonBumped = true;
    for(let i = 0; i < this.numberOfCollisionPointsOnSide; i++){
      let tileX = Math.floor(this.playerCheckerPointsTop[i].x / this.mapScale);
      let tileY = Math.floor(this.playerCheckerPointsTop[i].y / this.mapScale);
      let tilePlayerIsOn = this.mapTiles[tileY][tileX];
      if(tilePlayerIsOn != 0){
        //if hit
        this.isNextToT = true;
        nonBumped = false;
        break;
      }
    }
    if(nonBumped){
      //if not hit
      this.isNextToT = false;
    }
  }

  checkerDetectionBottom(){
    let nonBumped = true;
    for(let i = 0; i < this.numberOfCollisionPointsOnSide; i++){
      let tileX = Math.floor(this.playerCheckerPointsBottom[i].x / this.mapScale);
      let tileY = Math.floor(this.playerCheckerPointsBottom[i].y / this.mapScale);
      let tilePlayerIsOn = this.mapTiles[tileY][tileX];
      if(tilePlayerIsOn != 0){
      //your code
      this.isNextToB = true;
        nonBumped = false;
        break;
      }
    }
    if(nonBumped){
      //else
      this.isNextToB = false;
    }
  }

  checkerPointsUpdate(){
    let extraPadding = 5;
    this.playerCheckerPointsSideR[0].x = this.x + this.spriteWidth/2 + this.collisionPointSidePadding + extraPadding;
    this.playerCheckerPointsSideR[0].y = (this.y - this.spriteHeight/2) + (this.collisionPointSidePadding * 5);//right

    this.playerCheckerPointsSideL[0].x = this.x - this.spriteWidth/2 - this.collisionPointSidePadding - extraPadding;
    this.playerCheckerPointsSideL[0].y = (this.y - this.spriteHeight/2) + (this.collisionPointSidePadding * 5);//left

    this.playerCheckerPointsTop[0].x = (this.x - this.spriteWidth/2) + (this.collisionPointSidePadding * 5);
    this.playerCheckerPointsTop[0].y = this.y - this.spriteHeight/2 - extraPadding;

    this.playerCheckerPointsBottom[0].x = (this.x - this.spriteWidth/2) + (this.collisionPointSidePadding * 5);
    this.playerCheckerPointsBottom[0].y = this.y + this.spriteHeight/2 + extraPadding;
    for(let i = 1; i < this.numberOfCollisionPointsOnSide; i++){
      this.playerCheckerPointsTop[i].x = ((this.x - this.spriteWidth/2 + this.collisionPointSidePadding) + i * ((this.spriteWidth-(this.collisionPointSidePadding*5))/(this.numberOfCollisionPointsOnSide-1)));
      this.playerCheckerPointsTop[i].y = this.y - this.spriteHeight/2 - extraPadding;

      this.playerCheckerPointsBottom[i].x = ((this.x - this.spriteWidth/2 + this.collisionPointSidePadding) + i * ((this.spriteWidth-(this.collisionPointSidePadding*5))/(this.numberOfCollisionPointsOnSide-1)));
      this.playerCheckerPointsBottom[i].y = this.y + this.spriteHeight/2 + extraPadding;

      this.playerCheckerPointsSideR[i].x = this.x + this.spriteWidth/2 + this.collisionPointSidePadding + extraPadding;
      this.playerCheckerPointsSideR[i].y = ((this.y - this.spriteHeight/2 + this.collisionPointSidePadding) + i * ((this.spriteHeight-(this.collisionPointSidePadding*5))/(this.numberOfCollisionPointsOnSide-1)));

      this.playerCheckerPointsSideL[i].x = this.x - this.spriteWidth/2 - this.collisionPointSidePadding - extraPadding;
      this.playerCheckerPointsSideL[i].y = ((this.y - this.spriteHeight/2 + this.collisionPointSidePadding) + i * ((this.spriteHeight-(this.collisionPointSidePadding*5))/(this.numberOfCollisionPointsOnSide-1)));
    }

  }


  translate(x, y){
  this.xoffset += x;
  this.yoffset += y;
}

  translateScreen(x, y){
  this.map.translate(x, y);
  this.translate(x, y);
}

  applyFriction(){
  if(this.inTheAir){
    if(this.overallVelocityX < 0){//left
      this.overallVelocityX += this.airFriction;
      if(this.overallVelocityX > 0){
        this.overallVelocityX = 0;
      }
    }
    else if(this.overallVelocityX > 0){//right
      this.overallVelocityX -= this.airFriction;
      if(this.overallVelocityX < 0){
        this.overallVelocityX = 0;
      }
    }
  }
  else{
    if(this.overallVelocityX < 0){//left
      this.overallVelocityX += this.floorFriction;
      if(this.overallVelocityX > 0){
        this.overallVelocityX = 0;
      }
    }
    else if(this.overallVelocityX > 0){//right
      this.overallVelocityX -= this.floorFriction;
      if(this.overallVelocityX < 0){
        this.overallVelocityX = 0;
      }
    }
  }
}
  checkIfInAir(){
    if(this.isNextToB === false && this.isNextToT === false && this.isNextToL === false && this.isNextToR === false){
    this.inTheAir = true;
  }
  else{
    // console.log("false");
    this.inTheAir = false;
  }
}

  centerOnPlayerX(){
    this.map.setXOffset(this.x - screenX/2)
  }

  update(){//update values
    this.controlMovement();
    this.gravityPull();
    this.applyFriction();
    for(let i = 0; i < this.stepsPerFrame; i++){
      this.y += this.overallVelocityY/this.stepsPerFrame;
      this.x += this.overallVelocityX/this.stepsPerFrame;
      this.collisionPointsUpdate();
      this.collisionDetectionBottom();
      this.collisionDetectionTop();
      this.collisionDetectionSide();

      this.checkerPointsUpdate();
      this.checkerDetectionBottom();
      this.checkerDetectionTop();
      this.checkerDetectionSide();
    }
    this.checkIfInAir();
    if(this.y > screenY - this.spriteHeight){//when character y is at the floor limit
      this.y = screenY - this.spriteHeight;
      this.overallVelocityY = 0;
      this.jumpNumber = this.maxJumps;
    }
    // this.centerOnPlayerX();
  }

  show(){//render
    fill(255);
    // rect(this.x - (this.spriteWidth / 2), this.y - (this.spriteHeight / 2), this.spriteWidth, this.spriteHeight);
    image(this.image, (this.x - (this.spriteWidth / 2)) + this.xoffset, (this.y - (this.spriteHeight / 2)) + this.yoffset, this.spriteWidth, this.spriteHeight);
  }
}
