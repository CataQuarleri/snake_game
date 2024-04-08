const snakeboard = document.getElementById('snakeboard');
const snakeboard_ctx = snakeboard.getContext('2d');

let snake = [
	{ x: 200, y: 200 },
	{ x: 190, y: 200 },
	{ x: 180, y: 200 },
	{ x: 170, y: 200 },
	{ x: 160, y: 200 }
];

let dx = 10;
let dy = 0;

//Customized colors
const customizations = document.getElementById('customizations');

const colors = {
	bodyBorder: 'black',
	bodyColor: 'brown',
	headColor: 'brown'
};

customizations.addEventListener('input', (e) => {
	console.log('E', e.target.name, e.target.value);
	colors[e.target.name] = e.target.value;
	drawSnake();
});

//Draw snake function - check why first part "HEAD" is changing the whole body color
const drawSnake = function () {
	console.log("Drawing snake...");
	clearCanvas()
snake.forEach(snakeParts)
console.log("Snake drawn.");
	// snake.forEach((snakePart, i) => {
		// if (i === 0) {
		// 	snakeboard_ctx.fillStyle = colors.headColor;
		// 	snakeboard_ctx.strokeStyle = colors.bodyBorder;
		// 	snakeboard_ctx.roundRect(snakePart.x, snakePart.y, 10, 10, 50);
		// 	snakeboard_ctx.stroke();
		// 	snakeboard_ctx.fill();
		// } else {
		// snakeboard_ctx.fillStyle = colors.bodyColor;
		// snakeboard_ctx.strokeStyle = colors.bodyBorder;
		// snakeboard_ctx.roundRect(snakePart.x, snakePart.y, 10, 10, 50);
		// snakeboard_ctx.stroke();
		// snakeboard_ctx.fill();
		// }
	// });
};

const snakeParts = function(snakePart){
	snakeboard_ctx.fillStyle = colors.bodyColor;
		snakeboard_ctx.strokeStyle = colors.bodyBorder;
		snakeboard_ctx.roundRect(snakePart.x, snakePart.y, 15, 15, 50);
		snakeboard_ctx.stroke();
		snakeboard_ctx.fill();
}

//Creates the canvas - when the snake moves it clears the previous position of the snake
const clearCanvas = function () {
	console.log("Clearing canvas...");
	snakeboard_ctx.fillStyle = 'white';
	snakeboard_ctx.strokeStyle = 'black';
	snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
	snakeboard_ctx.fill()
	// snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
	console.log("Canvas cleared.");
    console.log("Canvas width:", snakeboard.width, "Canvas height:", snakeboard.height);
};


const moveSnake = function () {
	console.log("Moving snake...");
	const head = { x: snake[0].x + dx, y: snake[0].y + dy };
	snake.unshift(head);
	snake.pop();
	console.log("Snake position:", snake);
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
};

const endOfGame = function () {
	for (let i = 4; i < snake.length; i++){
		const collition = snake[0].x === snake[i].x && snake[0].y === snake[i].y
		if(collition){
			return true
		}
	}
	const hitLeftWall = snake[0].x < 0;
	const hitRightWall = snake[0].x > snakeboard.width - 10;
	const hitTopWall = snake[0].y < 0;
	const hitBottomWall = snake[0].y > snakeboard.height - 10;

	return hitBottomWall || hitLeftWall || hitRightWall || hitTopWall
}

document.addEventListener('keydown', changeDirection);

//Calls all functions
const main = function () {
    console.log("Main loop...");
	if (endOfGame()) return;
	setTimeout(function timer() {
		clearCanvas();
		moveSnake();
		drawSnake();
		main();
	}, 100);
	console.log("Main loop finished.");
};

main();
