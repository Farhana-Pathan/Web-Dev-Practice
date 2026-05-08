//board
let board;
const rowCount = 21;
const columnCount = 18;
const tileSize = 32;
const boardWidhth = columnCount * tileSize;
const boardHeight = rowCount * tileSize;
let context;

//images
let blueGhostImage;
let orangeGhostImage;
let pinkGhostImage;
let redGhostImage;
let pacmanUpImage;
let pacmanDownImage;
let pacmanLeftImage;
let pacmanRightImage;
let wallImage;

//Structure of Canvas
window.onload = function(){
    board = document.getElementById("board");
    board.height = boardHeight;
    board.widht = boardWidhth;
    context = board.getContext("2d")

    loadImages();
    loadMap();
    console.log(walls.size);
    console.log(foods.size);
    console.log(ghosts.size);

}

//Structure of Tile map 
const tileMap = [
  "XXXXXXXXXXXXXXXXXXX",
  "X        X        X",
  "X XX XXX X XXX XX X",
  "X                 X",
  "X XX X XXXXX X XX X",
  "X    X       X    X",
  "XXXX XXXX XXXX XXXX",
  "OOOX X       X XOOO",
  "XXXX X XXrXX X XXXX",
  "O      bpo      O",
  "XXXX X XXXXX X XXXX",
  "OOOX X       X XOOO",
  "XXXX X XXXXX X XXXX",
  "X        X        X",
  "X XX XXX X XXX XX X",
  "X    X   P   X    X",
  "XX X X XXXXX X X XX",
  "X    X       X    X",
  "X XXXXXX X XXXXXX X",
  "X                 X",
  "XXXXXXXXXXXXXXXXXXX"
];

//Refrence Vriables or Collections
const walls = new Set();
const foods = new Set();
const ghosts = new Set();
let pacman;

//Function to load Image 
function loadImages(){
    wallImage = new Image();
    wallImage.src = "assets/wall.png"

    buleGjostImage = new Image();
    buleGjostImage.src = "assets/blueGhost.png"
    orangeGhostImage = new Image();
    orangeGhostImage.src = "assets/orangeGhost.png"
    pinkGhostImage = new Image();
    pinkGhostImage.src = "assets/pinkGhost.png"
    redGhostImage = new Image();
    redGhostImage.src = "assets/redGhost.png"

    pacmanUpImage = new Image();
    pacmanUpImage.src = "assets/pacmanUp.png"
    pacmanDownImage = new Image();
    pacmanDownImage.src = "assets/pacmanDown.png"
    pacmanLeftImage = new Image();
    pacmanLeftImage.src = "assets/pacmanLeft.png"
    pacmanRightImage = new Image();
    pacmanRightImage.src = "assets/pacmanRight.png"
}

//tile map - this function itrate through tile map
function loadMap(){
    walls.clear();
    foods.clear();
    ghosts.clear();

    for(let r =0;r < rowCount; r++){
        for(let c = 0; c < columnCount; c++){
            const row = tileMap[r];
            const tileMapChar = row[c];

            const x = c*tileSize;
            const y = r*tileSize;

            if (tileMapChar == 'X'){//blosck wall
                const wall = new Block(wallImage, x, y, tileSize, tileSize);
                walls.add(wall);
            }
            else if(tileMapChar == "b"){//blue ghost 
                const blueGhost = new Block(blueGhostImage, x, y, tileSize, tileSize);
                ghosts.add(blueGhost);
            }
            else if(tileMapChar == "o"){// orange ghost
                const orangeGhost = new Block(orangeGhostImage, x, y, tileSize, tileSize);
                ghosts.add(orangeGhost);
            }
            else if(tileMapChar == "p"){// pink ghost 
                const pinkGhost = new Block(pinkGhostImage, x, y, tileSize, tileSize);
                ghosts.add(pinkGhost);
            }
            else if(tileMapChar == "r"){//red ghost 
                const redGhost = new Block(redGhostImage, x, y, tileSize, tileSize);
                ghosts.add(redGhost);
            }
            else if(tileMapChar == "P"){//pacman
                pacman = new Block(pacmanRightImage, x, y, tileSize, tileSize);
            }
            else if(tileMapChar == " "){
                const food = new Block(null, x + 14, y + 14, 4, 4);
                foods.add(food);
            }
        }
    }
}



//enitities in the game 
class Block {
    constructor(image, x, y, width, height){
        this.image = image;
        this.x = x;
        this.y = y;
        this.widht = width;
        this.height = height;

        this.startX = x;
        this.startY = y;
    }
}