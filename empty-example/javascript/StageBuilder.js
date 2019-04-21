class StageBuilder{
  constructor(map){
    this.map = map;
    this.mapTiles = map.mapTiles;
    let assets = this.map.assets;

//--------map stuff -------
    this.columns = this.mapTiles[0].length;//get number of columns that map makes up
    this.rows = this.mapTiles.length;//get number of rows in the map
    this.brickTexture = [assets.brick, 1];//get the brick texture from the
    this.grass1Texture = [assets.grass1, 2];
    this.grass2Texture = [assets.grass2, 3];
    this.grassLeftTexture = [assets.grassLeft, 4];
    this.grassRightTexture = [assets.grassRight, 5];
    this.grassFullTexture = [assets.grassFull, 6];
    this.candle = [assets.candle, 7];

    this.airBlocks = [this.grass1Texture[1],
    this.grass2Texture[1],
     this.grassLeftTexture[1],
      this.grassRightTexture[1],
       this.grassFullTexture[1],
        this.candle[1],
         0]

    this.scale = 50;
    this.y = 0;
    this.x = 0;
    this.previousX = this.x;
    this.previousY = this.y;
    this.xoffset = 0;
    this.yoffset = 0;
    this.displayX = this.x + this.xoffset;
  }


  controlMovement(){//check for key pressed and move if so
    if(keyIsDown("W".charCodeAt(0))){
      this.yoffset += this.scale;
    }
    else if (keyIsDown("A".charCodeAt(0))){
      this.xoffset += this.scale;
    }
    else if (keyIsDown("S".charCodeAt(0))){
      this.yoffset -= this.scale;
    }
    else if (keyIsDown("D".charCodeAt(0))){
      this.xoffset -= this.scale;
    }
    else if (keyIsDown(" ".charCodeAt(0))){
      this.xoffset = 0;
      this.yoffset = 0;
    }
  }

  drawBrush(){
    let tileX = Math.floor(((mouseX) / this.scale) - (this.xoffset/this.scale));
    let tileY = Math.floor(((mouseY) / this.scale) - (this.yoffset/this.scale));
    let displayX = Math.floor(((mouseX) / this.scale));
    let displayY = Math.floor(((mouseY) / this.scale));
    fill(255);
    rect(displayX*this.scale, displayY*this.scale, this.scale, this.scale);
    console.log(displayX, displayY, tileX, tileY);
  }

  show(){
    this.controlMovement();
    for(let columnNumber = 0; columnNumber < this.rows; columnNumber++){
      for(let rowPosition = 0; rowPosition < this.columns; rowPosition++){
        let drawnX = rowPosition*this.scale + this.xoffset;
        let drawnY = columnNumber*this.scale + this.yoffset;
        if(this.mapTiles[columnNumber][rowPosition] === this.brickTexture[1]){
          if(drawnX < screenX && drawnX > -this.scale){
            if(drawnY < screenY && drawnY > -this.scale){
              image(this.brickTexture[0], drawnX, drawnY, this.scale, this.scale);
            }
          }
        }
        if(this.mapTiles[columnNumber][rowPosition] === this.grass1Texture[1]){
          if(drawnX < screenX && drawnX > -this.scale){
            if(drawnY < screenY && drawnY > -this.scale){
              image(this.grass1Texture[0], drawnX, drawnY, this.scale, this.scale);
            }
          }
        }
        if(this.mapTiles[columnNumber][rowPosition] === this.grass2Texture[1]){
          if(drawnX < screenX && drawnX > -this.scale){
            if(drawnY < screenY && drawnY > -this.scale){
              image(this.grass2Texture[0], drawnX, drawnY, this.scale, this.scale);
            }
          }
        }
        if(this.mapTiles[columnNumber][rowPosition] === this.grassLeftTexture[1]){
          if(drawnX < screenX && drawnX > -this.scale){
            if(drawnY < screenY && drawnY > -this.scale){
              image(this.grassLeftTexture[0], drawnX, drawnY, this.scale, this.scale);
            }
          }
        }
        if(this.mapTiles[columnNumber][rowPosition] === this.grassRightTexture[1]){
          if(drawnX < screenX && drawnX > -this.scale){
            if(drawnY < screenY && drawnY > -this.scale){
              image(this.grassRightTexture[0], drawnX, drawnY, this.scale, this.scale);
            }
          }
        }
        if(this.mapTiles[columnNumber][rowPosition] === this.candle[1]){
          if(drawnX < screenX && drawnX > -this.scale){
            if(drawnY < screenY && drawnY > -this.scale){
              image(this.candle[0], drawnX, drawnY, this.scale, this.scale);
            }
          }
          this.map.drawLightParticle(drawnX + this.scale/2, drawnY + this.scale/2, 10, 10);
        }
        this.displayX = this.x + this.xoffset;
      }
    }
    this.drawBrush();
  }
}
