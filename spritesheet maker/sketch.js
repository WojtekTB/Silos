var imagePaths = [];

var images = [];

var dict = {};

var path_g = "./images/walk.sprite/"; 
var fileStart_g = "walking";
var numOfFrames_g = 15;


function formatFilePaths(initPath, start, numberOfFrames){
    for(let i = 0; i < numberOfFrames + 1; i++){
        let fileName = initPath + start;
        if(i < 10){
            fileName += `0${i}`
        }else{
            fileName += i;
        }
        imagePaths.push(`${fileName}.png`);//assume png because otherwise why even bother
    }
}


function preload(){
    formatFilePaths(path_g, fileStart_g, numOfFrames_g);

    for(let i = 0; i < imagePaths.length; i++){//load all of the images
            images.push(loadImage(imagePaths[i]));
    }
}

/**
 * I don't honestly think that it will matter how I actually place the images
 * on the canvas since I will give the position of them in a json doc anyways, 
 * so I will just put them all in one line
 */

function setup(){
    let spriteSheetWidth = 0;
    let spriteSheetHeight = 0;
    for(let image of images){//determine the dimentions of the sprite sheet
        if(spriteSheetHeight < image.height){
            spriteSheetHeight = image.height;
        }
        spriteSheetWidth += image.width;
    }
    createCanvas(spriteSheetWidth, spriteSheetHeight);
    background(0, 0, 0, 0);// black transparent background
    let drawX = 0;
    for(let i = 0 ; i < images.length; i++){
        image(images[i], drawX, 0);

        let j = "";
            if(i < 10){
                j += `0${i}`
            }else{
                j += i;
            }

        dict[fileStart_g + j] = {"x": drawX, "y": 0, "w": images[i].width, "h": images[i].height}

        drawX += images[i].width;
    }
    
    
    console.log(imagePaths, dict);
}