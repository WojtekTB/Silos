class Map{
  constructor(mapLayout, tileImages, scale){
    this.mapLayout = mapLayout;
    this.columns = this.mapLayout[0].length;//get number of columns that map makes up
    this.rows = this.mapLayout.length;//get number of rows in the map
    this.tileImages = tileImages;
    this.scale = scale;
    this.map = [];

    let tileKeys = Object.keys(tileImages);
    for(let y = 0; y < this.rows; y++){
      let row = [];
      for(let x = 0; x < this.columns; x++){
        let tileLayoutId = this.mapLayout[y][x];
        if(tileLayoutId >= 0){
          row.push(this.tileImages[tileKeys[tileLayoutId]]);
        }else{
          row.push(-1);
        }
      } 
      this.map.push(row);
    }
    console.log(this.map);

    // this.brickTexture = [assets.brick, 1, "brick: 1"];//get the brick texture from the
    // this.grass1Texture = [assets.grass1, 2, "grass1: 2"];
    // this.grass2Texture = [assets.grass2, 3, "grass2: 3"];
    // this.grassLeftTexture = [assets.grassLeft, 4, "grassLeft: 4"];
    // this.grassRightTexture = [assets.grassRight, 5, "grassRight: 5"];
    // this.grassFullTexture = [assets.grassFull, 6, "grassFull: 6"];
    // // this.desk = [assets.schoolDesk, 8, "candle: 7"];
    // this.candle = [assets.candle, 7, "candle: 7"];

    // this.airBlocks = [this.grass1Texture[1],
    // this.grass2Texture[1],
    // this.grassLeftTexture[1],
    //   this.grassRightTexture[1],
    //   this.grassFullTexture[1],
    //     this.candle[1],
    //     0];

    // this.allBlocks = [];
    // // this.allBlocks[0] = [0, 0]
    // let assetsToArray = Object.values(assets);
    // for(let i = 0; i < assetsToArray.length; i++){
    //   this.allBlocks[i] = [assetsToArray[i], i];
    // }
    //  console.log(this.allBlocks);
    // this.y = 0;
    // this.x = 0;
    // this.previousX = this.x;
    // this.previousY = this.y;

    this.xoffset = 0;
    this.yoffset = 0;
  }

  show(){
    // for(let columnNumber = 0; columnNumber < this.rows; columnNumber++){
    //   for(let rowPosition = 0; rowPosition < this.columns; rowPosition++){
    //     let drawnX = rowPosition*this.scale + this.xoffset;
    //     let drawnY = columnNumber*this.scale + this.yoffset;

    //     if(this.map[columnNumber][rowPosition] === this.candle[1]){
    //       if(drawnX < screenX && drawnX > -this.scale){
    //         if(drawnY < screenY && drawnY > -this.scale){
    //           image(this.candle[0], drawnX, drawnY, this.scale, this.scale);
    //         }
    //       }
    //       this.drawLightParticle(drawnX + this.scale/2, drawnY + this.scale/2, 10, 10);
    //     }
    //     else if(this.map[columnNumber][rowPosition] === 0){
    //     }
    //     else{
    //       for(let i = 0; i < this.allBlocks.length; i++){
    //         if(this.map[columnNumber][rowPosition] === this.allBlocks[i][1]){
    //           if(drawnX < screenX && drawnX > -this.scale){
    //             if(drawnY < screenY && drawnY > -this.scale){
    //               image(this.allBlocks[i-1][0], drawnX, drawnY, this.scale, this.scale);
    //               break;
    //             }
    //           }
    //         }
    //       }
    //     }
    //     this.displayX = this.x + this.xoffset;
    //   }
    // }


    for(let y = 0; y < this.rows; y++){
      for(let x = 0; x < this.columns; x++){
        if(((x * this.scale) + this.scale + this.xoffset < 0) && ((x * this.scale) + this.xoffset > innerWidth)){
          //if off screen on x cord
          continue;
        }
        if(((y * this.scale) + this.scale + this.yoffset < 0) && ((y * this.scale) + this.yoffset > innerWidth)){
          //if off screen on y cord
          continue;
        }
        let tile = this.map[y][x];
        // console.log(tile, x, y)
        if(tile === -1){
          //if air
          continue;
        }else{
          image(tile.image, this.xoffset + (x * this.scale), this.yoffset + (y * this.scale), this.scale, this.scale);
        }
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

// class Map{
//   constructor(tileMap, tileMapInfo){

//   }
// }
