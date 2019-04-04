class Player{
  constructor(startingX, startingY){//initialize object
    //-----position-----
    this.x = startingX;
    this.y = startingY;
    //-----vectors-----
    this.speed = 5;//walking speed
    this.jumpForce = 10;//jumping force
    this.overallVelocity = 0;//total force acting on sprite
    this.gravity = 0.5;//downward pull
    //-----sprite-----
    this.spriteHeight = 50;
    this.spriteWidth = 30;
    //-----player-statuses-----
    this.crouched = 0;//[0 = standing; 1 = crouching] => start off standing
    this.maxJumps = 2;//constant max number of jumps to reset to
    this.jumpNumber = this.maxJumps;//number of jumps before having to touch the ground again
  }

  controlMovement(){//check for key pressed and move if so
    if (keyIsDown(LEFT_ARROW) || keyIsDown("A".charCodeAt(0))) {
      this.x -= this.speed;
    }
    else if (keyIsDown(RIGHT_ARROW) || keyIsDown("D".charCodeAt(0))) {
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
    console.log(this.jumpNumber);
  }

  gravityPull(){
    this.overallVelocity += this.gravity;
  }

  show(){//render
    fill(255);
    rect(this.x - (this.spriteWidth / 2), this.y - (this.spriteHeight / 2), this.spriteWidth, this.spriteHeight);
  }

  update(){//update values
    this.controlMovement();
    this.gravityPull();
    this.y +=this.overallVelocity;
    if(this.y > screenY - this.spriteHeight/1.9){//when character y is at the floor limit
      this.y = screenY - this.spriteHeight/1.9;
      this.overallVelocity = 0;
      this.jumpNumber = this.maxJumps;
    }
    // console.log(this.overallVelocity);
  }
}
