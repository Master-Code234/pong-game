// Selecting all dom elements
const table = document.querySelector("#table-container");
const pongTable = document.querySelector("#pongTable");
const ctx = pongTable.getContext("2d");
const scoreBoard = document.querySelector("#score");


// Getting the width and height of the table
const tableWidth = pongTable.width;
const tableHeight = pongTable.height;

// Create player 1 object
let player1 = {
  Score: 0,
  x: 0, // Up
  y: tableWidth / 3, // Down
  height: 100,
  width: 50,
  Color: "red",
};

const player1PaddleSpeed = 60;

// Create player 2 object
let player2 = {
  Score: 0,
  x: tableWidth / 1.1,
  y: tableHeight / 3,
  height: 100,
  width: 50,
  Color: "blue",
};
const player2PaddleSpeed = 60;

//Create ball object
let ball = {
  x: 200,
  y: 200,
  radius: 15,
  Color: "yellow",
};

// Call functions here
gameLoop();

// All Functions here

function preGame() {
  // planing to add text saying click to start later on
}

function gameLoop() {
  // Created a gameloop function that will update the screen for each frame
  drawPaddle1();
  drawPaddle2();
  drawBall();
  requestAnimationFrame(gameLoop); //calls the gameloop function to update the screen before the next repaint
}

playerControls();

// Draw Player 1
function drawPaddle1() {
  ctx.clearRect(0, 0, tableWidth, tableHeight);
  ctx.fillStyle = player1.Color;
  ctx.fillRect(player1.x, player1.y, player1.width, player1.height);
  //SYNTAX: fillRect(x, y, width, height)
}
// Draw Player 2
function drawPaddle2() {
  ctx.fillStyle = player2.Color;
  ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
}

// Create paddle boundaries
function outOfBounds() {}

// Create controls for player 1 and player 2
function playerControls() {
  // Listening for keydown events on the pongTable element
  document.addEventListener("keydown", (event) => {
    // console.log(`${event.code}`);

    switch (event.code) {
      case "KeyW":
        // Move the player up by 10 pixels
        player1.y -= player1PaddleSpeed;
        break;

      case "KeyS":
        player1.y += player1PaddleSpeed; // Move the player down by 10 pixels
        break;

      // Player 2 controls
      case "KeyA":
        player2.y -= player1PaddleSpeed;
        break;
      case "KeyD":
        player2.y += player2PaddleSpeed;
        break;
    }
  });
}

// create a ball
function drawBall() {
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false); // Draws a circle on the canvas
  // arc    (x,   y,    radius,   startAngle, endAngle, counterclockwise)
  ctx.stroke(); //Creates border
  ctx.fillStyle = ball.Color; // sets color for the ball
  ctx.fill(); // fills the ball with color
}

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
