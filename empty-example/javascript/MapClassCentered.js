class Map{
  constructor(mapTiles, assets, scale){
    this.mapTiles = mapTiles;//arrays of arrays of map tiles with 1s and 0s
    this.columns = this.mapTiles[0].length;//get number of columns that map makes up
    this.rows = this.mapTiles.length;//get number of rows in the map
    this.brickTexture = assets.brick;//get the brick texture from the
    this.scale = scale/this.rows;
    this.y = 0;
    this.x = 0;
  }

  show(){
    for(let columnNumber = 0; columnNumber < this.rows; columnNumber++){
      for(let rowPosition = 0; rowPosition < this.columns; rowPosition++){
        if(this.mapTiles[columnNumber][rowPosition] === 1){
          image(this.brickTexture, rowPosition*this.scale+this.x, columnNumber*this.scale+this.y, this.scale, this.scale);
        }
      }
    }
  }

  translate(xoffset, yoffset){
    this.x += xoffset;
    this.y += yoffset;
  }

  getTileAt(x, y){
    return this.mapTiles[y][x];
  }

}
