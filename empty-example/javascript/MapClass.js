class Map{
  constructor(mapTiles, assets, scale){
    this.mapTiles = mapTiles;//arrays of arrays of map tiles with 1s and 0s
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

  show(){
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
          this.drawLightParticle(drawnX + this.scale/2, drawnY + this.scale/2, 10, 10);
        }
        this.displayX = this.x + this.xoffset;
      }
    }
  }

  translate(xoffset, yoffset){
    this.xoffset += xoffset;
    this.yoffset += yoffset;
  }

  setXOffset(x){
    this.xoffset = x;
  }

  setYOffset(y){
    this.yoffset = y;
  }

  adjustTo(x, y){
    this.x = x- screenX/4;
    this.y = y - screenY/4;
  }

  drawLightParticle(x, y, r, strength){
    for(let i = 1; i < strength; i++){
      fill(255, 255, 102, 15-(i* (20/strength)));
      circle(x, y, r + (i * r*5));
    }
  }
}
