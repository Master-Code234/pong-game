// Selecting all dom elements
const table = document.querySelector("#table-container");
const pongTable = document.querySelector("#pongTable");
const ctx = pongTable.getContext("2d");
const scoreBoard = document.querySelector("#score");
const resetBtn = document.querySelector("#resetBtn");

// Getting the width and height of the table
const tableWidth = pongTable.width;
console.log(tableWidth);
const tableHeight = pongTable.height;
console.log(tableHeight);

// player styles and ball color
const player1Color = "red";
const player2Color = "blue";
const ballColor = "yellow";

// Call functions here

// All Functions here

function preGame() {
  // planing to add text saying click to start later on
}

// Starts the game on click. Draws players on canvas
function startGame() {
  drawPaddle1();
  drawPaddle2();
}

// Draw Player 1
function drawPaddle1() {
  ctx.fillStyle = player1Color;
  ctx.fillRect(0, 90, 50, 100);
}
// Draw Player 2
function drawPaddle2() {
  ctx.fillStyle = player2Color;
  ctx.fillRect(450, 90, 50, 100);
}
// Create player 1 controls
function player1Controls() {}
// create player 2 controls
function player2Controls() {}

// create a ball
function drawBall() {}

// allow ball to move randomly
function moveBall() {}

// determines the balls direction
function ballDirection() {}

// determines if the ball has hit a player
function hitDetection() {}

// This will update the scoreboard if player 1 scores
function updatePlayer1Score() {}

// This will update the scoreboard if player 2 scores
function updatePlayer2Score() {}

// determines who won the game
function win() {}
// determines who lost the game
function lose() {}

// this will end the game and reset the players the ball and the scoreboard
function endGame() {}

//Event listners
pongTable.addEventListener("mouseover", preGame);
pongTable.addEventListener("click", startGame);
