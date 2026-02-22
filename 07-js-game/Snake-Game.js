const board = document.getElementById('game-board');
const gridSize = 20;
const logo = document.getElementById('logo');
const instructionText = document.getElementById('instruction-text');
const scoreText = document.getElementById('score');
const highScoreText = document.getElementById('highScore');
// Define game variables
let snake = [{ x: 2, y: 10 }]; // Snake starts as an array with one segment (the head) at x:2, y:10
let food = getPosition(); // Object keeping track of the x and y coordinates of the food
let direction = 'up'; // Stores the current moving direction
let gameSpeed = 200; // Delay in milliseconds for the game loop (lower is faster)
let gameStarted = false; // Tracks whether the game is currently actively playing
let gameinterval; // Variable to hold the setInterval timer so we can clear/restart it
let highScore = 0; // Tracks the highest score achieved

function drawSnake() {
    snake.forEach(position => {
        const snakeElement = createGameElement('div', 'snake');
        board.appendChild(snakeElement);
        setPosition(snakeElement, position);
    });
}

function drawFood() {
    const foodElement = createGameElement('div', 'food');
    board.appendChild(foodElement);
    setPosition(foodElement, food);
}

// Master draw function that updates the entire screen
function draw() {
    board.innerHTML = ''; // Wipes the board completely clean of the previous frame
    drawSnake(); // Redraws the snake at its new positions
    drawFood(); // Redraws the food
}

function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;

    return element;
}

// set the position of snake or food on the grid
function getPosition() {
    let x = Math.floor(Math.random() * gridSize) + 1;
    let y = Math.floor(Math.random() * gridSize) + 1;

    // Ensure food doesn't spawn on the snake
    while (snake.some(segment => segment.x === x && segment.y === y)) {
        x = Math.floor(Math.random() * gridSize) + 1;
        y = Math.floor(Math.random() * gridSize) + 1;
    }

    return { x, y };
}
function setPosition(snakeElement, position) {
    snakeElement.style.gridColumn = position.x;
    snakeElement.style.gridRow = position.y;
}


// Core logic for moving the snake one step
function move() {
    const head = { ...snake[0] }; // create a duplicate of the head to calculate the new position

    // Modify the new head's coordinates based on current direction
    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
        default:
            break;
    }
    snake.unshift(head); // Add the new head to the beginning of the snake array

    // Check if the new head position matches the food position (Snake ate food)
    if (head.x == food.x && head.y == food.y) {
        food = getPosition(); // Spawn a new food
        updateScore(); // Increased length means higher score
        increaseSpeed(); // Make the game slightly faster
        restartGameInterval(); // Restart the loop with the new, faster speed
    } else {
        snake.pop(); // Remove the last segment of the tail if no food was eaten so snake stays same length
    }

}

function increaseSpeed() {
    if (gameSpeed > 150) {
        gameSpeed -= 10;
    } else if (gameSpeed > 100) {
        gameSpeed -= 5;
    } else if (gameSpeed > 50) {
        gameSpeed -= 2;
    }
    console.log(gameSpeed);
}

function restartGameInterval() {
    clearInterval(gameinterval);
    gameinterval = setInterval(() => {
        if (!gameStarted) return;
        move();
        checkCollision();
        if (!gameStarted) return;
        draw();
    }, gameSpeed);
}

function updateScore() {
    let currentScore = snake.length - 1;
    scoreText.textContent = `Score: ${currentScore.toString().padStart(3, '0')}`;
}

function updateHighScore() {
    let currentScore = snake.length - 1;
    if (currentScore > highScore) {
        highScore = currentScore;
    }
    // Always update text and make visible so "000" or the real high score is shown
    highScoreText.textContent = `High Score: ${highScore.toString().padStart(3, '0')}`;
    highScoreText.style.display = 'block';
}

// Check if the snake has hit a wall or itself
function checkCollision() {
    const head = snake[0];

    // Check wall collision (coordinates less than 1 or greater than the grid size)
    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        endGame();
    }

    // Loop through the rest of the snake's body to see if the head has bumped into any segment
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame(); // Hit itself
        }
    }
}
// Initialize and start the game
function startGame() {
    instructionText.style.display = 'none'; // Hide the start screen text
    logo.style.display = 'none'; // Hide the logo
    gameStarted = true;
    snake.length = 1; // Reset snake length to 1 (just the head)

    // Start the repeating game loop
    gameinterval = setInterval(() => {
        if (!gameStarted) return; // Guard clause to exit if game ends
        move(); // Calculate new positions
        checkCollision(); // Check if snake died during move
        if (!gameStarted) return; // Guard clause again in case checkCollision killed the player
        draw(); // Actually draw the new frame onto the screen
    }, gameSpeed);
}

function endGame() {
    clearInterval(gameinterval);
    updateHighScore(); // MUST BE CALLED BEFORE RESETTING SNAKE
    alert('Game Over! Your score: ' + (snake.length - 1));
    snake = [{ x: 2, y: 10 }];
    direction = 'up';
    gameSpeed = 200;
    gameStarted = false;
    instructionText.style.display = 'block';
    logo.style.display = 'block';
    board.innerHTML = '';
    updateScore();
}
// Listen for player keyboard input
function handleKeyPress(event) {
    // If game is not active, treat spacebar as the "start/restart" button
    if (
        (!gameStarted && event.code === 'Space') ||
        (!gameStarted && event.key === ' ')
    ) {
        startGame();
    } else {
        // Prevent reversing direction directly back into oneself
        switch (event.key) {
            case 'ArrowUp':
                if (direction !== 'down') direction = 'up';
                break;
            case 'ArrowDown':
                if (direction !== 'up') direction = 'down';
                break;
            case 'ArrowRight':
                if (direction !== 'left') direction = 'right';
                break;
            case 'ArrowLeft':
                if (direction !== 'right') direction = 'left';
                break;
        }
    }
}

document.addEventListener('keydown', handleKeyPress);

