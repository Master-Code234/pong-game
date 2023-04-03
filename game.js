// Selecting all dom elements
const table = document.querySelector("#table-container");
const pongTable = document.querySelector("#pongTable");
const ctx = pongTable.getContext("2d");
const scoreBoard = document.querySelector("#score");
const player1Score = document.querySelector("#player1-Score");
const player2Score = document.querySelector("#player2-Score");

// Getting the width and height of the table
const tableWidth = pongTable.width;
const tableHeight = pongTable.height;

// Create player 1 object
let player1 = {
  Score: 0,
  x: 0, // This is the left side of the player 1
  y: tableWidth / 3, // Top side of player 1
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
  x: tableWidth / 2, // Balls x starting point will always be in center
  y: tableHeight / 2, // Balls y starting point
  directionX: -0.5,
  directionY: 0,
  radius: 15,
  Color: "rgba(255, 255, 0, 0.9)",
};
console.log(ball.directionX);
console.log(ball.directionY);

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
  moveBall();
  hitDetection();
  updatePlayer2Score();
  updatePlayer1Score();
  win();
  outOfBounds(player1.x, player1.y, player2.x, player2.y);
  requestAnimationFrame(gameLoop); //calls the gameloop function to update the screen frame by frame
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
function outOfBounds(x, y, x2, y2) {
  // player 1 bounds

  // This code works by checking if Players are out of bounds by comparing their current y position to the height of the playing area minus the height of the player

  // If the y position is greater than this value, the player has moved past the bottom of the playing area and the function sets their position to the bottom of the playing area minus their players height

  if (y > tableHeight - player1.height) {
    player1.y = tableHeight - player1.height;
  } else if (y < 0) {
    player1.y = 0;
  }
  // player 2 bounds
  if (y2 > tableHeight - player2.height) {
    player2.y = tableHeight - player2.height;
  } else if (y2 < 0) {
    player2.y = 0;
  }
}

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
  ctx.beginPath(); // creates a new path for the ball
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false); // Draws a circle on the canvas
  // arc    (x,   y,    radius,   startAngle, endAngle, counterclockwise)
  ctx.strokeStyle = "gray"; // border color
  ctx.stroke(); //Creates border
  ctx.fillStyle = ball.Color; // sets color for the ball
  ctx.fill(); // fills the ball with color
}

// allow ball to move randomly
function moveBall() {
  // Makes the ball bounce horizontally on the canvas

  // This If statement checks if the ball has collided with the left or right edge of the canvas, by checking if the sum of the ball's x-position and its radius is greater than the width of the canvas

  // or if the difference between the ball's x-position and its radius is less than 0

  // Then it reverses the direction of the ball along the x-axis by changing the ball direction x to negative

  // Makes ball bounce of the top of the canvas
  if (ball.y + ball.radius > tableHeight || ball.y - ball.radius < 0) {
    ball.directionY = -ball.directionY;
  }

  // these two lines of code update the balls position on the canvas
  ball.x += ball.directionX;
  ball.y += ball.directionY;
}

function hitDetection() {
  // How to find left right top and bottom sides of the player
  //  left = player1.x;
  //  right = player1.x + player1.width;
  //  top = player1.y;
  //  bottom = player1.y + player1.height;

  // How to Find the left and right sides of the ball
  //  left = ball.x - ball.radius;
  //  right = ball.x + ball.radius;

  //  How to Find the top and bottom sides of the ball
  //  top = ball.y - ball.radius;
  //  bottom = ball.y + ball.radius;

  // radius distance between the center of the ball and its edge

  if (
    // Checks if the right side of player 1 is greater than the left side of the ball
    player1.x + player1.width > ball.x - ball.radius &&
    // Checks if the top of player 1 is less than the top of the ball
    player1.y - player1.height < ball.y - ball.radius &&
    // Checks if the bottom of player 1 is greater than top of the ball
    player1.y + player1.height > ball.y - ball.radius &&
    // Checks if the top of player 1 is less than top of the ball
    player1.y < ball.y - ball.radius
  ) {
    // If all conditions are true reverse the x direction of the ball
    ball.directionX = -ball.directionX;
    // Sets the y direction of the ball to a random number this causes the ball to bounce when it hits the player
    ball.directionY = Math.random();
  }
  if (
    // Checks if the right side of player 2 -75 is less than the left side of the ball
    player2.x + player2.width - 75 < ball.x - ball.radius &&
    // Checks if the top of player 2 is less than the top of the ball
    player2.y - player2.height < ball.y - ball.radius &&
    // Checks if the bottom of player 2 is greater than the top of the ball
    player2.y + player2.height > ball.y - ball.radius &&
    // Checks if the top of player 2 is less than the top of the ball
    player2.y < ball.y - ball.radius
  ) {
    // If all conditions are true reverse the x direction of the ball
    ball.directionX = -ball.directionX;
    // Sets the y direction of the ball to a random number this causes the ball to bounce when it hits the player
    ball.directionY = Math.random();
  }
}

//  Updates the scoreboard if player 2 scores
function updatePlayer2Score() {
  if (
    // Checks if the right side of the ball is less than the width of the table
    ball.x + ball.radius < tableWidth &&
    // Checks if the left side of the ball is less than 0
    ball.x - ball.radius < 0 &&
    // Checks if the right side of the ball has gone past the left side of player 1
    ball.x + ball.radius < player1.x
  ) {
    ball.x = tableWidth / 2; // Resets the ball to the center of the screen
    player2.Score += 1; // increment player 2 score
    player2Score.textContent = player2.Score; // set text content
  }
}

// Updates the scoreboard if player 1 scores
function updatePlayer1Score() {
  if (
    // Checks if the left side of the ball is greater than the width of the table
    ball.x - ball.radius > tableWidth &&
    // Checks if the right side of the ball is greater than 0
    ball.x + ball.radius > 0 &&
    // Checks if the right side of the ball has gone past the left side of player 2
    ball.x + ball.radius > player2.x
  ) {
    ball.x = tableWidth / 2; // Resets ball to the center of the screen
    player1.Score += 1; // increment player 1 score
    player1Score.textContent = player1.Score; // set text content
  }
  // return true;
}

// determines who won the game
function win() {
  if (player2.Score >= 10) {
    // Checks if player 1 score is greater than 10
    window.alert(`player 2 wins`);
    console.log("player 2 wins");
    requestAnimationFrame = false; // stops game loop
    window.location.reload(); // reloads the page
  } else if (player1.Score >= 10) {
    // Checks if player 2 score is greater than 10
    window.alert(`player 1 wins`);
    console.log("player 1 wins");
    requestAnimationFrame = false; // stops game loop
    window.location.reload(); // reloads the page
  }
}
