class Map{
  constructor(assets){
    this.mapTiles = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    this.columns = this.mapTiles[0].length;
    this.rows = this.mapTiles.length;
    this.brickTexture = assets[0];
    this.scale = screenY/this.rows;
  }

  show(){
    for(let columnNumber = 0; columnNumber < this.rows; columnNumber++){
      for(let rowPosition = 0; rowPosition < this.columns; rowPosition++){
        if(this.mapTiles[columnNumber][rowPosition] === 1){
          image(this.brickTexture, rowPosition*this.scale, columnNumber*this.scale, this.scale, this.scale);
        }
      }
    }
    console.log(this.columns, this.rows);
  }
}
