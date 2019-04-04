class Player{
  constructor(startingX, startingY){//initialize object
    this.x = startingX;
    this.y = startingY;
    this.speed = 5;//walking speed
    this.jumpForce = 10;//jumping force
    this.overallVelocity = 0;//total force acting on sprite
    this.gravity = 0.5;//downward pull
    this.spriteHeight = 50;
    this.spriteWidth = 30;
  }

  controlMovement(){//check for key pressed and move if so
    if (keyIsDown(LEFT_ARROW) || keyIsDown("A".charCodeAt(0))) {
      this.x -= this.speed;
    }
    else if (keyIsDown(RIGHT_ARROW) || keyIsDown("D".charCodeAt(0))) {
      this.x += this.speed;
    }
    else if (keyIsDown(UP_ARROW) || keyIsDown("W".charCodeAt(0))) {
      this.y -= this.speed*3;
    }
    else if (keyIsDown(DOWN_ARROW) || keyIsDown("S".charCodeAt(0))) {
      this.y += this.speed;
    }

  }

  jump(){
    this.overallVelocity -= this.jumpForce;
    console.log(this.overallVelocity);
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
    if(this.y > screenY - this.spriteHeight/1.9){
      this.y = screenY - this.spriteHeight/1.9;
      this.overallVelocity = 0;
    }
    console.log(this.overallVelocity);
  }
}
