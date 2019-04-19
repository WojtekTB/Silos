class NPC{
  constructor(x, y, animations, moving){
    this.moving = moving;
    this.idleAnimation = animations[0];
    if(this.moving){
      this.walkingAnimation = animations[1];
    }
  }

  show(){
    image(this.idleAnimation[0]);
  }
  update(){

  }

}
