//board
let board;
const rowCount = 21;
const columnCount = 18;
const tileSize = 32;
const boardWidhth = columnCount * tileSize;
const boardHeight = rowCount * tileSize;


window.onload = function(){
    board = document.getElementById("board");
    board.height = boardHeight;
    board.widht = boardWidhth;
    context = board.getContext("2d")
}