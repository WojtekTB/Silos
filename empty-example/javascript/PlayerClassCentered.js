class Player{
  constructor(startingX, startingY, map, images){//initialize object
    this.x = startingX;
    this.y = startingY;
    this.map = map;
    this.playerImage = images.player;
    this.spriteH = 100;
    this.spriteW = 100;
    this.speed = 3;
    this.gravity = 3;
    this.jumpForce = 10;
    this.overallVelocity = 0;
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
      // this.previousX = this.x;
      this.x -= this.speed;

    }
    else if (keyIsDown(RIGHT_ARROW) || keyIsDown("D".charCodeAt(0))) {
      // this.previousX = this.x;
      this.x += this.speed;
    }
  }

  crouch(){//changes the state of crouching from 1 to 0 or 0 to 1
    if(this.crouched === 1)
    {
      this.crouched = 0;//change to standing if was crouching
      this.y -= this.spriteH;
      this.spriteH = this.spriteH*2;
      console.log("Standing!");
    }
    else{
      this.crouched = 1;//change to crouching if was standing
      this.spriteH = this.spriteH/2;
      console.log("Crouching!");
    }
  }

  jump(){//adds upwards force to whatever the value was before
}

  gravityPull(){

  }

  show(){//render
    rect(this.x, this.y, this.spriteW, this.spriteH);
  }


  update(){//update values
    this.controlMovement();
  }
}
