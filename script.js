"use strict";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");


const animationSpeed = 10;
const fps = 60;
const keyFrame = Math.round(fps / animationSpeed);
let currentFrame = 0;

let score = 0;

const cell = {
    size: 16,
    xCount: 31,
    yCount: 31
};

const field = {
    width: cell.xCount * cell.size,
    height: cell.yCount * cell.size
};

const snake = {
    tail: [   {
        x: Math.floor(cell.xCount / 2) * cell.size,
        y: Math.floor(cell.yCount / 2) * cell.size
    }],
    step: {
        x: 0,
        y: -cell.size
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

const berry = {
    x: null,
    y: null
}

function refreshBerryPosition() {
    berry.x = getRandomIntInclusive(0, cell.xCount) * cell.size;
    berry.y = getRandomIntInclusive(0, cell.yCount) * cell.size;
}

function drawSnake() {

        snake.tail.forEach((element,index) => {
            if(index===0){
                context.fillStyle = "#FA0556";
            }else {
                context.fillStyle = "#A00034";
            }
            context.fillRect(element.x, element.y, cell.size, cell.size);
            if(checkBoarderCollision(element)){
                return;
            };
            element.x += snake.step.x;
            element.y += snake.step.y;
        })

}

function drawBerry() {
    context.fillStyle = "#07fa1b";
    context.fillRect(berry.x, berry.y, cell.size, cell.size);
}

function checkIsBerryEaten() {
    if (snake.tail[0].x === berry.x && snake.tail[0].y === berry.y) {
        snake.tail.push(snake.tail[0]);

        document.getElementById("score").innerText = `${++score}`;
        refreshBerryPosition();
    }
}

function checkBoarderCollision(element){
    if (element.x<0){
            element.x=field.width-cell.size;
            return true;
    }
    if (element.x>field.width){
        element.x=0;
        return true;
    }
    if (element.y<0){
        element.y=field.height-cell.size;
        return true;
    }
    if (element.y>field.height){
        element.y=0;
        return true;
    }

    return false;
}

let count=0;
function gameLoop() {
    requestId = requestAnimationFrame(gameLoop);
    if (currentFrame != keyFrame) {
        currentFrame++;
        return;
    } else {
        currentFrame = 0;
        context.clearRect(0, 0, field.width, field.height);
        drawSnake();
        drawBerry();
        checkIsBerryEaten();
    }
    if(count%30===0){
        console.log(snake.tail)
        console.log(snake.step.x + "   " +snake.step.y)
    }
    count++;

}

function keyHandler(EO) {
    const key = EO.code;
    switch (key) {
        case "ArrowLeft":
        case "KeyA":
            snake.step.x = -cell.size;
            snake.step.y = 0;
            break;
        case "ArrowRight":
        case "KeyD":
            snake.step.x = cell.size;
            snake.step.y = 0;
            break;
        case "ArrowUp":
        case "KeyW":
            snake.step.x = 0;
            snake.step.y = -cell.size;
            break;
        case "ArrowDown":
        case "KeyS":
            snake.step.x = 0;
            snake.step.y = cell.size;
            break;
    }
}

refreshBerryPosition();
let requestId = requestAnimationFrame(gameLoop);
window.addEventListener("keydown", keyHandler);