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
  x: 0,
  y: tableWidth / 3,
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
  directionX: 3,
  directionY: -0.2,
  radius: 15,
  Color: "rgba(255, 255, 0, 0.9)",
};
console.log(ball.directionX);
console.log(ball.directionY);

// Call functions here
gameLoop();

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

function drawPaddle1() {
  // Draw Player 1

  ctx.clearRect(0, 0, tableWidth, tableHeight);
  ctx.fillStyle = player1.Color;
  ctx.fillRect(player1.x, player1.y, player1.width, player1.height);
}

function drawPaddle2() {
  // Draw Player 2

  ctx.fillStyle = player2.Color;
  ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
}

// Create paddle boundaries
function outOfBounds(x, y, x2, y2) {
  // Player 1 bounds
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
  document.addEventListener("keydown", (event) => {
    // Player 1 controls
    switch (event.code) {
      case "KeyW":
        player1.y -= player1PaddleSpeed;
        break;

      case "KeyS":
        player1.y += player1PaddleSpeed;
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
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
  ctx.strokeStyle = "gray";
  ctx.stroke();
  ctx.fillStyle = ball.Color;
  ctx.fill();
}
// Move Ball randomly on the canvas
function moveBall() {
  if (ball.y + ball.radius > tableHeight || ball.y - ball.radius < 0) {
    ball.directionY = -ball.directionY;
  }

  // these two lines of code update the balls position on the canvas
  ball.x += ball.directionX;
  ball.y += ball.directionY;
}

// Checks if the ball hits the player
function hitDetection() {
  const player1Left = player1.x;
  const player1Right = player1.x + player1.width;
  const player1Top = player1.y;
  const player1Bottom = player1.y + player1.height;

  const player2Left = player2.x;
  const player2Right = player2.x + player2.width;
  const player2Top = player2.y;
  const player2Bottom = player2.y + player2.height;

  const ballLeft = ball.x - ball.radius;
  const ballRight = ball.x + ball.radius;

  const ballTop = ball.y - ball.radius;
  const ballBottom = ball.y + ball.radius;

  if (
    player1Right >= ballLeft &&
    player1Top <= ballBottom &&
    player1Bottom > ballTop
  ) {
    ball.directionX = -ball.directionX;
  }
  if (
    player2Left <= ballRight &&
    player2Top <= ballBottom &&
    player2Bottom > ballTop
  ) {
    ball.directionX = -ball.directionX;
  }
}

// This will update the scoreboard if player 2 scores
function updatePlayer2Score() {
  if (
    ball.x + ball.radius < tableWidth &&
    ball.x - ball.radius < 0 &&
    ball.x + ball.radius < player1.x
  ) {
    ball.x = tableWidth / 2;
    player2.Score += 1;
    player2Score.style.color = "blue";
    player2Score.textContent = player2.Score;
  }
}

// This will update the scoreboard if player 1 scores
function updatePlayer1Score() {
  if (
    ball.x - ball.radius > tableWidth &&
    ball.x + ball.radius > 0 &&
    ball.x + ball.radius > player2.x
  ) {
    ball.x = tableWidth / 2;
    player1.Score += 1;
    player1Score.style.color = "red";
    player1Score.textContent = player1.Score;
  }
}

// determines who won the game
function win() {
  if (player2.Score >= 10) {
    window.alert("player 2 wins and player 1 loses");
    console.log("player 2 wins");
    requestAnimationFrame = false;
    window.location.reload();
  } else if (player1.Score >= 10) {
    window.alert("player 1 wins and player 2 loses");
    console.log("player 1 wins");
    requestAnimationFrame = false;
    window.location.reload();
  }
}
