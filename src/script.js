const snakeboard =
	document.getElementById('mainCanvas');
const snakeboard_ctx =
	snakeboard.getContext('2d');

const board_border = 'black';
const board_background = 'white';
const snake_col = 'lightblue';
const snake_border = 'darkblue';

let snake = [
	{ x: 200, y: 200 },
	{ x: 190, y: 200 },
	{ x: 180, y: 200 },
	{ x: 170, y: 200 },
	{ x: 160, y: 200 }
];

const drawSnake = function () {
	snake.forEach((snakePart) => {
		snakeboard_ctx.fillStyle = 'darkgreen';
		snakeboard_ctx.strokestyle = 'yellowgreen';
		snakeboard_ctx.fillRect(
			snakePart.x,
			snakePart.y,
			10,
			10
		);
		snakeboard_ctx.strokeRect(
			snakePart.x,
			snakePart.y,
			10,
			10
		);
	});
};
const clearCanvas = function () {
	snakeboard_ctx.fillStyle = 'white';
	snakeboard_ctx.strokeStyle = 'black';
	snakeboard_ctx.fillRect(
		0,
		0,
		snakeboard.width,
		snakeboard.height
	);
	snakeboard_ctx.strokeRect(
		0,
		0,
		snakeboard.width,
		snakeboard.height
	);
};

const main = function () {
	drawSnake();
};
