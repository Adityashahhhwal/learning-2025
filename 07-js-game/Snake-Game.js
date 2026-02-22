const board = document.getElementById('game-board');
const gridSize = 20;
const logo = document.getElementById('logo');
const instructionText = document.getElementById('instruction-text');
const scoreText = document.getElementById('score');
//define game variables
let snake = [{ x: 2, y: 10 }]; //direction
let food = getPosition(); // 
let direction = 'up';
let gameSpeed = 200;
let gameStarted = false;
let gameinterval;

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

function draw() {
    board.innerHTML = '';
    drawSnake();
    drawFood();
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


function move() {
    const head = { ...snake[0] }; // create a duplicate of the head to calculate the new position

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
    snake.unshift(head); // add new head to the snake

    if (head.x == food.x && head.y == food.y) {
        food = getPosition();
        updateScore();
        increaseSpeed();
        restartGameInterval();
    } else {
        snake.pop();
    }

}
function updateScore() {
    scoreText.textContent = `Score: ${snake.length - 1}`;
}

function increaseSpeed() {
    if (gameSpeed > 150) {
        gameSpeed -= 10;
    } else if (gameSpeed > 100) {
        gameSpeed -= 5;
    } else if (gameSpeed > 50) {
        gameSpeed -= 2;
    }
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


function checkCollision() {
    const head = snake[0];

    //check wall collision
    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        endGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
        }
    }
}
//start the game
function startGame() {
    instructionText.style.display = 'none';
    logo.style.display = 'none';
    gameStarted = true;
    snake.length = 1; // reset snake to initial length
    gameinterval = setInterval(() => {
        if (!gameStarted) return;
        move();
        checkCollision();
        if (!gameStarted) return;
        draw();
    }, gameSpeed);
}

function endGame() {
    clearInterval(gameinterval);
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
function handleKeyPress(event) {
    if (
        (!gameStarted && event.code === 'Space') ||
        (!gameStarted && event.key === ' ')
    ) {
        startGame();
    } else {
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

