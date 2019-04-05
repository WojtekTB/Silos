class Player{
  constructor(startingX, startingY, map){//initialize object
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
    this.spriteHeight = 100;
    this.spriteWidth = 50;
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
    this.collisionPoints = {
      cpx: this.x,
      cpy: this.y + this.spriteHeight/2
    }
    this.previousCollisionPoints = {
      pcpx: this.collisionPoints.cpx,
      pcpy: this.collisionPoints.cpy
    }
    this.characterTiles = {
      tileX: Math.floor(this.collisionPoints.cpx / this.mapScale),
      tileY: Math.floor(this.collisionPoints.cpy / this.mapScale)
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
    rect(this.x - (this.spriteWidth / 2), this.y - (this.spriteHeight / 2), this.spriteWidth, this.spriteHeight);
  }

  collisionDetection(){
    this.previousCollisionPoints = {
      pcpx: this.collisionPoints.cpx,
      pcpy: this.collisionPoints.cpy
    }
    this.collisionPoints = {
      cpx: this.x,
      cpy: this.y + this.spriteHeight/2
    }
    this.characterTiles = {
      tileX: Math.floor(this.collisionPoints.cpx / this.mapScale),
      tileY: Math.floor(this.collisionPoints.cpy / this.mapScale)
    }
    console.log("Character X tile: " + this.characterTiles.tileX + "  Character Y tile: " +  this.characterTiles.tileY);
    console.log("Collision point X tile: " + this.collisionPoints.cpx + "  Collision point Y tile: " +  this.collisionPoints.cpy);

    console.log(this.previousCollisionPoints.previousX, this.previousCollisionPoints.previousY);
    if(this.mapTiles[this.characterTiles.tileY][this.characterTiles.tileX] === 1){
      console.log(1);
      this.x = this.previousX;
      this.y = this.previousY;
      this.overallVelocity = 0;
    }
    else{
      console.log(0);
    }






    // let column = this.mapTiles[this.characterTiles.tileY-1];
    // // console.log(column);
    // // console.log("this number is " + column[Math.floor(this.collisionPoints.cpx / this.mapScale)]);
    // if (column[this.characterTiles.tileX] === 1)
    // {
    //   // this.y = this.previousY;
    //   // this.overallVelocity = 0;
    //   // console.log("inside the block");
    //   this.inTheAir = 0;
    //   this.y = (this.mapTiles[this.characterTiles.tileY][this.characterTiles.tileX])*this.mapScale*2;
    // }
    // else{
    //   this.inTheAir = 1;
    // }
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
    // console.log(this.overallVelocity);
  }
}
