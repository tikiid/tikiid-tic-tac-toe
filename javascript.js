// Partie javascript du projet morpion

// variables

var tiles = document.querySelectorAll(".tile");
let start = document.querySelector("#start-button");
let reset = document.querySelector("#reset-button");
let cache = document.querySelector("#cache");
let myBoard = [];

const widthBoard =  document.getElementById("#tiles").clientWidth;

cache.style.width = widthBoard;
cache.style.height = widthBoard;


var gameOver = false;
let thePlayer = 'X';
let turnCounter = 0;
let winTheGame;
// let player2 = 'O';


// initialisation du board
function initBoard(){
    thePlayer = 'X';
    turnCounter = 0;
    for (let theTile = 0 ; theTile < 9; theTile++) {
        myBoard[theTile] = getRandomInt(10001);
        tiles[theTile].textContent = '';
    }
}

console.log(myBoard);

function isLegalMove(tileContent){
    if (tileContent === 'X' || tileContent === 'O') {
        return false;
    } else {
        return true;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
  

function changePlayer(player){
    if (player === 'X') {
        return 'O';
    } else if (player === 'O') {
        return 'X';
    }
}

function addContentToTheTile(player, tile){
    tiles[tile].textContent = player;
}

function actualPlayer(player){
    if (player === 'O') {
        return 'O';
    } else {
        return 'X';
    }
}

function checkLines (theBoard){
    if (theBoard[0] === theBoard[1] && theBoard[0] === theBoard[2] && theBoard[1] === theBoard[2]) {
        return true;
    } else if( theBoard[3] === theBoard[4] && theBoard[3] === theBoard[5] && theBoard[4] === theBoard[5] ) {
        return true;
    } else if (theBoard[6] === theBoard[7] && theBoard[6] === theBoard[8] && theBoard[7] === theBoard[8]){
        return true;
    } else {
        return false;
    }
}

function checkColumn (theBoard) {
    if (theBoard[0] === theBoard[3] && theBoard[0] === theBoard[6] && theBoard[3] === theBoard[6]) {
        return true;
    } else if( theBoard[1] === theBoard[4] && theBoard[1] === theBoard[7] && theBoard[4] === theBoard[7] ) {
        return true;
    } else if (theBoard[2] === theBoard[5] && theBoard[2] === theBoard[8] && theBoard[5] === theBoard[8]){
        return true;
    } else {
        return false;
    }
}

function chekcDiagonal (theBoard) {
    if (theBoard[0] === theBoard[4] && theBoard[0] === theBoard[8] && theBoard[4] === theBoard[8]) {
        return true;
    } else if (theBoard[2] === theBoard[4] && theBoard[0] === theBoard[6] && theBoard[4] === theBoard[6]){
        return true;
    } else {
        return false;
    }
}

function desactivateCache() {
    cache.style.display = 'none';
}

function activateCache() {
    cache.style.display = 'block';
}

start.addEventListener('click', () => {
    if (gameOver === false){
        initBoard();
        desactivateCache();
        alert('début de la partie, les X commencent');
    }
    
});

reset.addEventListener('click', () => {
    if (gameOver == true){
        initBoard(myBoard);
        gameOver = false;
    }

});

// click every tiles from the array tiles that contain every div

for(let i = 0; i < tiles.length; i++){
    tiles[i].addEventListener('click', () => {
        console.log(i);
        // console.log(tiles[i]);
        if (isLegalMove(myBoard[i])) {
            myBoard[i] = actualPlayer(thePlayer);
            addContentToTheTile(thePlayer, i);
            
            // check win

            if ((checkLines(myBoard) || checkColumn(myBoard) || chekcDiagonal(myBoard)) == true){
                activateCache();
                gameOver = true;
                alert(`les ${thePlayer} ont gagné`);

            // check draw 
            
            } else if ( ((checkLines(myBoard) || checkColumn(myBoard) || chekcDiagonal(myBoard)) !== true) && turnCounter === 8 ){
                alert('égalité');
                activateCache();
                gameOver = true;
            }
            thePlayer = changePlayer(thePlayer);
            turnCounter++;
        } else {
            alert("coup invalide");
        }
        // console.log(myBoard);
    })
}

