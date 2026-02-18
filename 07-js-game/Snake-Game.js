const board = document.getElementById('game-board');
const gridSize = 20; 
const logo = document.getElementById('logo');
const instructionText = document.getElementById('instruction-text');
//define game variables
let snake = [{x:2, y:10}]; //direction
let food = getPosition(); // 
let direction = 'up';
let gameSpeed = 200;
let gameStarted = false;
let gameinterval;
//draw snake
function draw() {
    board.innerHTML = '';
    drawSnake();
    drawFood();
}

function drawSnake() {
    snake.forEach(position => {
        const snakeElement = createGameElement('div', 'snake');
        board.appendChild(snakeElement);
        setPosition(snakeElement,position);
    });
}
function drawFood() {
    const foodElement = createGameElement('div','food');
    board.appendChild(foodElement);
    setPosition(foodElement,food);
}

function createGameElement(tag, className ){
    const element = document.createElement(tag);
    element.className = className;

    return element;
}

// set the position of snake or food 

function setPosition(snakeElement,position){
    snakeElement.style.gridColumn = position.x; // 
    snakeElement.style.gridRow = position.y; //
}

// draw();


function getPosition() {
    const x = Math.floor(Math.random()*gridSize)+1;
    const y = Math.floor(Math.random()*gridSize)+1;

    return {x,y};
}

// moving the snake

function move(){
    const head = {...snake[0]};

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
    snake.unshift(head);
    
    if (head.x == food.x && head.y == food.y){
        food = getPosition();
    }else{
        snake.pop();
    }
}

let loopID = setInterval(() =>{
    draw();
    move();
},gameSpeed);

function checkCollison() {

}
function startGame() {
    instructionText.style.display = 'none';
    logo.style.display= 'none';
    gameStarted = true;

    gameinterval = setInterval(() =>{
        draw();
        move();
        //checkCollison();
    },gameSpeed);
}

function handleKeyPress(event) {
    if(
        (!gameStarted && event.code === 'Space')||
        (!gameStarted && event.key === ' ')
    ){
        startGame();
    }else{
        switch (event.key){
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
        }
    }
}

document.addEventListener('keydown',handleKeyPress);