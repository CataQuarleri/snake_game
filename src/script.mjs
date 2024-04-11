//Next steps:
// make it work with classes
//learn FPS management
//"tough head": create a powerup by putting a helmet on the snake and now it can go through the walls for a limited time
//"Bad apple": if the snake eats a brown apple/mushroom the stroboscope effect turns on for a limited time
//"Friend or foe?": a second snake shows up and moves randomly around the board, it has no boundaries except its own body and the player 1 body. Player 1 can loose if it hits the other snake
//"2 players game":  second screen or board for a 2 player game with limited time, the one with more points wins. Uses arrows on qwerty: "AWDS"
//"The world gets smaller": after certain level a fortress starts to build around the canvas, the board gets smaller
//"Speed up!": every 20 points the game gets faster
// import apple from "../img/imagesURL.mjs";

const apple =
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAF9UExURQAAALyoHo+CKRodNjQ0NLmmHTIyMtQ1FsV2Gv8ABOhXGdw5GuI4GYAAANM0FtQ0Fv+HMN87GuE5Gf9VANY1FuA4GNc2Fv9TIeQ7IeA4F9Q0FdI0FdIzFeI5GcgvFNAzFeE5Gtg1FtM0FeQ8GeI6GdEzFNEzFcwtF7qnHcayIcy3Isy3IrilHb2qHsy3I0A+MSMlNLepHb2rHrupIlhZL9MxFdY8F8Z9G5F0Jb09H+M5GeE5GdU0FtIzFdM0Ft03GOE3Gdc3G+A5GeE5GeE5GeE5GeE4GdM0FdEzFeE5GeE5GdQ0FtEzFeE5GeE5GdM0FtEzFeE5GeE5GdM0FtEzFeE5GdIzFdEzFeE5GeE5GdU0FtIzFeE5GeI5GdIzFdEzFeE5GdQ0FdEzFeE5GeE5GdI0FdIzFdk2F+E5GeE5GeE5GdQ0FdQ0Ft03GOE5GeE5GeE5GeE5Gci0Idg2F+E5GdIzFd03GNI0Fd44GNEzFds3GNc1F9M0Ft84GP///4cXyaYAAABydFJOUwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOjYASGNmIEwJp7dMrGjRZYigsFwp31+7cyN3r03IJefz7cx/c2R1E9/dCSPhFKujlKAm3rwdd+1INqqIKH676+KwcE2adnpVfEW3YvuAAAAABYktHRH4/uEFzAAAAB3RJTUUH6AQLExMChcMvGQAAAL9JREFUCNdjYGBgYNTQ1NJmYmZhgAJWHd0iPX0DNiiXnYPT0MjYhIubh4cXyOXjFzA1M7ewtLIWFBISZhDht7G1s3dwdHJ2cXUTEmUQE3f3KC4BA08vCUkGKW+f0jIIv8TXT4hB2j+gvALKDwwSYpAJDkHwQ4H8sPBSGD8iUoiBPyq6sgrKj4mVZZCTj4uvhipPEFJgUFRKTKqpBfOTU4SUGRiUpFPT0oG8jMwsIRWge1XVZLJzcvPyCwqFVNQZAKecOzHPVAcYAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDI0LTA0LTExVDE5OjE4OjU4KzAwOjAwI1eWawAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyNC0wNC0xMVQxOToxODo1OCswMDowMFIKLtcAAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjQtMDQtMTFUMTk6MTk6MDIrMDA6MDAGTTUcAAAAAElFTkSuQmCC';
const snakeboard = document.getElementById('snakeboard');
const snakeboard_ctx = snakeboard.getContext('2d');

console.log('APPLE', apple);
let snake = [
	{ x: 200, y: 100 },
	{ x: 190, y: 100 },
	{ x: 180, y: 100 },
	{ x: 170, y: 100 },
	{ x: 160, y: 100 }
];

let gameState = 'paused';

let dx = 10;
let dy = 0;

let foodX;
let foodY;

let speed = 180;

const speedControl = () => {
	if (speed > 135) {
		speed -= 10;
	} else {
		speed -= 3;
	}
};
//Customized colors
const customizations = document.getElementById('customizations');

const colors = {
	bodyBorder: 'black',
	bodyColor: '#E16C22',
	headColor: 'brown'
};

customizations.addEventListener('input', (e) => {
	console.log('E', e.target.name, e.target.value);
	colors[e.target.name] = e.target.value;
	drawSnake();
});

// Draw snake function
const drawSnake = function () {
	// Draw snake body
	snakeboard_ctx.fillStyle = colors.bodyColor;
	snakeboard_ctx.strokeStyle = colors.bodyBorder;
	// Draw each segment of the snake as a filled circle
	for (let i = 0; i < snake.length; i++) {
		snakeboard_ctx.beginPath();
		snakeboard_ctx.arc(snake[i].x + 7.5, snake[i].y + 7.5, 7.5, 0, 2 * Math.PI); // Draw a circle for each segment
		snakeboard_ctx.fill();
	}
	snakeboard_ctx.fillStyle = colors.headColor;
	snakeboard_ctx.beginPath();
	snakeboard_ctx.arc(snake[0].x + 7.5, snake[0].y + 7.5, 7.5, 0, 2 * Math.PI); // Draw a circle for the head
	snakeboard_ctx.fill();
};

function drawFood() {
	// snakeboard_ctx.fillStyle = 'red';
	// snakeboard_ctx.strokestyle = 'black';
	// snakeboard_ctx.fillRect(foodX, foodY, 12, 12);
	// snakeboard_ctx.strokeRect(foodX, foodY, 12, 12);
	let img = new Image();
	img.onload = function () {
		snakeboard_ctx.drawImage(img, foodX, foodY); // Or at whatever offset you like
	};
	img.src = apple;
}

function randomFood(min, max) {
	return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function generateFood() {
	speedControl();

	foodX = randomFood(0, snakeboard.width - 15);
	foodY = randomFood(0, snakeboard.height - 15);

	snake.forEach((part) => {
		const isEaten = part.x == foodX && part.y == foodY;
		if (isEaten) generateFood();
	});
}

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Creates the canvas - when the snake moves it clears the previous position of the snake
const clearCanvas = function () {
	let bgColor = 'white';
	let stroboscope = false; // later feature
	if (stroboscope) {
		let random = ['white', 'blue', 'green', 'pink', 'yellow'];
		let randomNumber = getRndInteger(0, random.length);
		bgColor = `${random[randomNumber]}`;
	}
	snake.forEach((segment) => {
		// Clear the portion of the canvas occupied by the current snake segment
		snakeboard_ctx.fillStyle = bgColor;
		snakeboard_ctx.strokeStyle = 'black';
		snakeboard_ctx.fillRect(segment.x, segment.y, 15, 15); // Assuming each segment is 15x15 pixels
	});

	// snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
	// snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
};

const moveSnake = function () {
	const head = { x: snake[0].x + dx, y: snake[0].y + dy };
	snake.unshift(head);
	const isEaten = snake[0].x == foodX && snake[0].y == foodY;
	if (isEaten) {
		generateFood();
	} else {
		snake.pop();
	}
	console.log('Snake position:', snake);
};

const changeDirection = function (e) {
	const LEFT_KEY = 'ArrowLeft';
	const RIGHT_KEY = 'ArrowRight';
	const UP_KEY = 'ArrowUp';
	const DOWN_KEY = 'ArrowDown';

	let keyPressed = e.key;
	const goingUp = dy === -10;
	const goingDown = dy === 10;
	const goingRight = dx === 10;
	const goingLeft = dx === -10;
	setTimeout(() => {
		if (keyPressed === LEFT_KEY && !goingRight) {
			dx = -10;
			dy = 0;
		}
		if (keyPressed === UP_KEY && !goingDown) {
			dx = 0;
			dy = -10;
		}
		if (keyPressed === RIGHT_KEY && !goingLeft) {
			dx = 10;
			dy = 0;
		}
		if (keyPressed === DOWN_KEY && !goingUp) {
			dx = 0;
			dy = 10;
		}
	}, 50);
};

const endOfGame = function () {
	for (let i = 4; i < snake.length; i++) {
		const collition = snake[0].x === snake[i].x && snake[0].y === snake[i].y;
		if (collition) {
			gameOver.style.display = 'block';
			playAgain.style.display = 'block';
			startButton.style.display = 'none';
			gameState = 'paused';
			return true;
		}
	}
	const hitLeftWall = snake[0].x < 0;
	const hitRightWall = snake[0].x > snakeboard.width - 10;
	const hitTopWall = snake[0].y < 0;
	const hitBottomWall = snake[0].y > snakeboard.height - 10;

	if (hitBottomWall || hitLeftWall || hitRightWall || hitTopWall) {
		gameOver.style.display = 'block';
		playAgain.style.display = 'block';
		startButton.style.display = 'none';
		gameState = 'paused';
	}

	return hitBottomWall || hitLeftWall || hitRightWall || hitTopWall;
};

document.addEventListener('keydown', changeDirection);

const levelUp = function () {
	console.log('SPEED', speed);
	console.log('score', score.textContent);

	// if (score.textContent > 10 && score.textContent % 15 == 0){
	// 	return speed -= 10
	// }
};

//Calls all functions
const main = function () {
	let score = document.getElementById('score');
	score.textContent = `${(snake.length - 5) * 10}`;
	gameState = 'running';
	if (endOfGame()) return;
	levelUp();
	setTimeout(function timer() {
		clearCanvas();
		moveSnake();
		drawSnake();
		drawFood();
		requestAnimationFrame(main);
	}, speed);
};

//buttons
const gameOver = document.getElementById('gameOver');
const startButton = document.getElementById('startBtn');
const playAgain = document.getElementById('playAgain');

function startGame() {
	snake = [
		{ x: 200, y: 100 },
		{ x: 190, y: 100 },
		{ x: 180, y: 100 },
		{ x: 170, y: 100 },
		{ x: 160, y: 100 }
	];
	dx = 10;
	dy = 0;
	speed = 180;
	main();
	generateFood();
	startButton.style.display = 'none';
	playAgain.style.display = 'none';
	gameOver.style.display = 'none';
}

playAgain.addEventListener('click', function () {
	gameOver.style.display = 'none';
	startButton.style.display = 'block';
	playAgain.style.display = 'none';
});

startButton.addEventListener('click', () => startGame());

document.addEventListener('keydown', function (e) {
	let playAgainButtonShows = getComputedStyle(playAgain, null).display == 'block';
	if (gameState == 'paused' && e.key == 'Enter' && !playAgainButtonShows) {
		startGame();
	}
});
