class Player{
  constructor(startingX, startingY, map, images){//initialize object
    //-----position-----
    this.x = startingX;
    this.y = startingY;
    this.previousX = this.x;
    this.previousY = this.y;
    //-----vectors-----
    this.speed = 5;//walking speed
    this.jumpForce = 10;//jumping force
    this.overallVelocity = 0;//total force acting on sprite
    this.gravity = 0.5;//downward pull
    //-----sprite-----
    this.spriteHeight = 95;
    this.spriteWidth = 157;

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
    this.collisionPointBottom = {
      cpx: this.x,
      cpy: this.y + this.spriteHeight/2
    }
    this.collisionPointBottomRight = {
      cpx: this.x + this.spriteWidth/2,
      cpy: this.y + this.spriteHeight/2
    }
    this.collisionPointBottomLeft = {
      cpx: this.x - this.spriteWidth/2,
      cpy: this.y + this.spriteHeight/2
    }

    this.collisionPointsOnEachSide = 4;

    this.bottomCollisionArrayX = [];
    for(let i = 0; i < this.collisionPointsOnEachSide; i++){
      this.bottomCollisionArrayX.push((this.x - (this.spriteWidth/2)) + i * (this.spriteWidth/this.collisionPointsOnEachSide));
    }

    this.rightCollisionArrayY = [];
    for(let i = 0; i < this.collisionPointsOnEachSide; i++){
      this.rightCollisionArrayY.push((this.y - (this.spriteHeight/2)) + i * (this.spriteHeight/this.collisionPointsOnEachSide));
    }

    this.leftCollisionArrayY = [];
    for(let i = 0; i < this.collisionPointsOnEachSide; i++){
      this.leftCollisionArrayY.push((this.y - (this.spriteHeight/2)) + i * (this.spriteHeight/this.collisionPointsOnEachSide));
    }



  // this.previousCollisionPoints = {
  //     pcpx: this.collisionPoints.cpx,
  //     pcpy: this.collisionPoints.cpy
  //   }

    this.characterTiles = {
      tileXM: Math.floor(this.collisionPointBottom.cpx / this.mapScale),//Mid
      tileYM: Math.floor(this.collisionPointBottom.cpy / this.mapScale),
        tileXR: Math.floor(this.collisionPointBottom.cpx / this.mapScale),//Right
        tileYR: Math.floor(this.collisionPointBottom.cpy / this.mapScale) - 5,
          tileXL: Math.floor(this.collisionPointBottom.cpx / this.mapScale),//left
          tileYL: Math.floor(this.collisionPointBottom.cpy / this.mapScale)- 5
    }
    // this.previousCharacterTiles = {
    //   tileX: this.characterTiles.tileX,
    //   tileY: this.characterTiles.tileX
    // }
  }

  collisionPointsUpdate(){
    for(let i = 0; i < this.collisionPointsOnEachSide; i++){
      this.bottomCollisionArrayX[i] = this.x - (this.spriteWidth/2) + i * (this.spriteWidth/this.collisionPointsOnEachSide);
    }
    for(let i = 0; i < this.collisionPointsOnEachSide; i++){
      this.rightCollisionArrayY[i] = (this.y - (this.spriteHeight/2)) + i * (this.spriteHeight/this.collisionPointsOnEachSide) - 2;
    }
    for(let i = 0; i < this.collisionPointsOnEachSide; i++){
      this.leftCollisionArrayY[i] = (this.y - (this.spriteHeight/2)) + i * (this.spriteHeight/this.collisionPointsOnEachSide) - 2;
    }
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
      console.log("Standing!");
    }
    else{
      this.crouched = 1;//change to crouching if was standing
      console.log("Crouching!");
    }
  }

  jump(){//adds upwards force to whatever the value was before
    if(this.jumpNumber != 0)
    {
      this.overallVelocity -= this.jumpForce;
      this.jumpNumber--;
    }
    // console.log(this.jumpNumber);
  }

  gravityPull(){
    if(this.inTheAir === 1)
    {
      this.overallVelocity += this.gravity;
    }
  }

  show(){//render
    fill(255);
    // rect(this.x - (this.spriteWidth / 2), this.y - (this.spriteHeight / 2), this.spriteWidth, this.spriteHeight);
    image(this.image, this.x - (this.spriteWidth / 2), this.y - (this.spriteHeight / 2), this.spriteWidth, this.spriteHeight);
  }

  collisionDetection(){
    // let movedUp = false;
    // let movedDown = false;
    // let movedLeft = false;
    // let movedRight = false;

    // this.previousCollisionPoints = {
    //   pcpx: this.collisionPoints.cpx,
    //   pcpy: this.collisionPoints.cpy
    // }

    let bumpMid = false;
    let bumpRight = false;
    let bumpLeft = false;
    this.collisionPointBottom = {
      cpx: this.x,
      cpy: this.y + this.spriteHeight/2
    }
    this.collisionPointBottomRight = {
      cpx: this.x + this.spriteWidth/2,
      cpy: this.y + this.spriteHeight/2-5
    }
    this.collisionPointBottomLeft = {
      cpx: this.x - this.spriteWidth/2,
      cpy: this.y + this.spriteHeight/2 - 5
    }
    // this.previousCharacterTiles = {
    //   tileX: this.characterTiles.tileX,
    //   tileY: this.characterTiles.tileY
    // }

    this.characterTiles = {
      tileXM: Math.floor(this.collisionPointBottom.cpx / this.mapScale),//Mid
      tileYM: Math.floor(this.collisionPointBottom.cpy / this.mapScale),
        tileXR: Math.floor(this.collisionPointBottomRight.cpx / this.mapScale),//Right
        tileYR: Math.floor(this.collisionPointBottomRight.cpy / this.mapScale) ,
          tileXL: Math.floor(this.collisionPointBottomLeft.cpx / this.mapScale),//left
          tileYL: Math.floor(this.collisionPointBottomLeft.cpy / this.mapScale)
    }

    console.log([this.mapTiles[this.characterTiles.tileYL][this.characterTiles.tileXL], this.mapTiles[this.characterTiles.tileYM][this.characterTiles.tileXM], this.mapTiles[this.characterTiles.tileYR][this.characterTiles.tileXR]]);
    if(this.mapTiles[this.characterTiles.tileYL][this.characterTiles.tileXL] === 1){//left bump
      this.x += 5;

    }
    if(this.mapTiles[this.characterTiles.tileYM][this.characterTiles.tileXM] === 1){//mid bump
      this.y = this.previousY;
      this.jumpNumber = this.maxJumps;
      this.overallVelocity = 0;
    }
    if(this.mapTiles[this.characterTiles.tileYR][this.characterTiles.tileXR] === 1){//right bump
      this.x -= 5;
    }

    // if(this.x > this.previousX){
    //   this.movedRight = true;
    // }
    // else if(this.x < this.previousX){
    //   this.movedLeft = true;
    // }
    // else if(this.y > this.previousY){
    //   this.movedDown = true;
    // }
    // else if(this.y > this.previousY){
    //   this.movedUp = true;
    // }
    //
    //   console.log("-----v--------v------");
    // if(this.mapTiles[this.characterTiles.tileY][this.characterTiles.tileX] === 1)//up and down
    // {
    //   if(this.movedDown)
    //   {
    //     console.log("Down");
    //     this.y = this.previousY;
    //     this.overallVelocity = 0;
    //     this.jumpNumber = this.maxJumps;
    //   }
    //   else if(this.movedUp)
    //   {
    //     console.log("Up");
    //     this.y = this.previousY;
    //     this.overallVelocity = 0;
    //   }
    //   if(this.movedLeft)
    //   {
    //     console.log("Left");
    //     this.x += 100;
    //   }
    //   else if(this.movedRight)
    //   {
    //     console.log("Right");
    //     this.x -= 100;
    //   }
    //   this.inTheAir = 0;
    // }
    // else{
    //   console.log("IN AIR");
    //   this.inTheAir = 1;
    // }
    // console.log(this.characterTiles.tileY, this.characterTiles.tileX);

    // if(this.previousCharacterTiles.tileX != Math.floor(this.collisionPoints.cpx / this.mapScale))//if moved on x
    // {
    //   // console.log("moved on X");
    //   // console.log("was: " +this.previousCharacterTiles.tileX + "  now is:" + Math.floor(this.collisionPoints.cpx / this.mapScale));
    //
    //   let lastX = this.previousCharacterTiles.tileX;
    //   let newX = Math.floor(this.collisionPoints.cpx / this.mapScale);
    //   //-----if moved to the right-----
    //   if(lastX < newX){
    //     console.log("Moved Right");
    //     movedRight = true;
    //   }
    //   //-----if moved to the left-----
    //   if(lastX > newX){
    //     console.log("Moved Left");
    //     movedRight = true;
    //   }
    // }
    // if(this.previousCharacterTiles.tileY != Math.floor(this.collisionPoints.cpy / this.mapScale))//if moved on y
    // {
    //   // console.log("moved on Y");
    //   // console.log("was: " + this.previousCharacterTiles.tileX + "  now is:" + Math.floor(this.collisionPoints.cpy / this.mapScale));
    //
    //   let lastY = this.previousCharacterTiles.tileY;
    //   let newY = Math.floor(this.collisionPoints.cpy / this.mapScale);
    //   //-----if moved down-----
    //   if(lastY < newY){
    //     console.log("Moved Down");
    //     movedDown = true;
    //   }
    //   //-----if moved UP-----
    //   if(lastY > newY){
    //     console.log("Moved UP");
    //     movedUp = true;
    //   }
    // }
    // this.previousCharacterTiles = {
    //   tileX: this.characterTiles.tileX,
    //   tileY: this.characterTiles.tileY
    // }
    // this.characterTiles = {
    //   tileX: Math.floor(this.collisionPoints.cpx / this.mapScale),
    //   tileY: Math.floor(this.collisionPoints.cpy / this.mapScale)
    // }
    // // console.log("Character X tile: " + this.characterTiles.tileX + "  Character Y tile: " +  this.characterTiles.tileY);
    // // console.log("Collision point X tile: " + this.collisionPoints.cpx + "  Collision point Y tile: " +  this.collisionPoints.cpy);
    // //
    // // console.log(this.previousCollisionPoints.previousX, this.previousCollisionPoints.previousY);
    // if(this.mapTiles[this.characterTiles.tileY][this.characterTiles.tileX] === 1){//if landed on tile
    //   // console.log(1);
    //   if(movedUp){
    //
    //     this.y = this.previousY - 1;
    //     this.overallVelocity = 0;
    //   }
    //   if(movedDown){
    //     this.y = this.previousY - 1;
    //     this.overallVelocity = 0;
    //   }
    //   if(movedLeft){
    //     this.x = this.previousX;
    //     this.overallVelocity = 0;
    //   }
    //   this.jumpNumber = this.maxJumps;
    //   }
    //   if(movedRight){
    //     this.y = this.previousY;
    //     this.overallVelocity = 0;
    //   }
    //   else{
    //   movedLeft = false;
    //   movedRight = false;
    //   movedUp = false;
    //   movedDown = false;
    //     // console.log(0);
    //   }
    //
    //
    //
    // // let column = this.mapTiles[this.characterTiles.tileY-1];
    // // // console.log(column);
    // // // console.log("this number is " + column[Math.floor(this.collisionPoints.cpx / this.mapScale)]);
    // // if (column[this.characterTiles.tileX] === 1)
    // // {
    // //   // this.y = this.previousY;
    // //   // this.overallVelocity = 0;
    // //   // console.log("inside the block");
    // //   this.inTheAir = 0;
    // //   this.y = (this.mapTiles[this.characterTiles.tileY][this.characterTiles.tileX])*this.mapScale*2;
    // // }
    // // else{
    // //   this.inTheAir = 1;
    // // }
  }

  update(){//update values
    this.controlMovement();
    this.gravityPull();
    this.previousY = this.y;
    this.y +=this.overallVelocity;
    this.collisionDetection();
    if(this.y > screenY - this.spriteHeight){//when character y is at the floor limit
      this.y = screenY - this.spriteHeight;
      this.overallVelocity = 0;
      this.jumpNumber = this.maxJumps;
    }
    this.collisionPointsUpdate();
    // console.log(this.overallVelocity);
  }
}
